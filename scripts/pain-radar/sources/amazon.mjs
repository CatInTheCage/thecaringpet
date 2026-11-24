// Amazon 评论采集（webbridge）。
// 2026-11-24 spike 实测结论：
// - 评论页对所有过滤/排序/分页参数只返回固定 8 条 Top reviews（好评偏差），Customers-say 不可用
// - EdgeX Guard 反爬（/edgex/guard/rx）与 error/500 间歇出现；此时降级到 /dp 页评论区
//   （[data-hook="mobley-review-content"] 卡片，同样 8 条 Top reviews，标题/正文/链接/变体齐全）
// - webbridge evaluate 的 async/await 在部分页面挂起 → 所有等待在 Node 侧，页面内只跑同步代码
// - v1 全量保留 1-5 星，≤4 星筛选与 5 星对比抱怨由分析层完成；报告须标注 Top-reviews 样本偏差
import path from 'node:path';
import { AMAZON_ASINS, URLS, BUDGETS_MS } from '../config.mjs';
import { makeRun, finishRun, makeItem, makeQuote, makeError, makeEnvelope, writeJsonAtomic, ensureDir, sleep } from '../lib/runtime.mjs';

const GUARD_CHECK_JS = String.raw`(() => {
  return JSON.stringify({ guard: /edgex\/guard/.test(location.href) });
})()`;

const BLOCK_DETECT = String.raw`
  const out = { url: location.href, blocked: false, guard: /edgex\/guard/.test(location.href), serverError: /\/error\/500/.test(location.href), reviews: [] };
  const bt = document.body ? document.body.innerText : '';
  out.blocked = out.guard || out.serverError || /Robot Check|Enter the characters you see below|validateCaptcha/i.test(bt) || /ap\/signin|validateCaptcha/.test(location.href);
  if (out.blocked) return JSON.stringify(out);
`;

// 独立评论页：[data-hook="review"] 容器
function buildExtractJs() {
  return String.raw`(() => {
  ${BLOCK_DETECT}
  const revs = [...document.querySelectorAll('[data-hook="review"]')];
  out.reviews = revs.map((el) => {
    const starI = el.querySelector('i.review-rating, i.a-icon-star');
    const m = starI ? (starI.className.match(/a-star-(\d)/) || []) : [];
    const titleEl = el.querySelector('[data-hook="review-title"]');
    let title = titleEl ? titleEl.textContent : '';
    const alt = titleEl ? titleEl.querySelector('.a-icon-alt') : null;
    if (alt) title = title.replace(alt.textContent, '');
    const bodyEl = el.querySelector('[data-hook="review-body"]');
    const dateEl = el.querySelector('[data-hook="review-date"]');
    const helpEl = el.querySelector('[data-hook="helpful-vote-statement"]');
    const varEl = el.querySelector('[data-hook="format-strip"]');
    const linkEl = titleEl ? titleEl.querySelector('a[href]') : null;
    const cleanBody = (t) => (t || '')
      .replace(/高亮引用开始：/g, '')
      .replace(/高亮引用结束/g, '')
      .replace(/显示更多显示更少/g, '')
      .replace(/Show more\s*Show less/g, '')
      .replace(/\s+/g, ' ').trim();
    return {
      id: el.getAttribute('id') || null,
      rating: m[1] ? Number(m[1]) : null,
      title: title.replace(/\s+/g, ' ').trim(),
      body: cleanBody(bodyEl ? bodyEl.textContent : ''),
      date: dateEl ? dateEl.textContent.replace(/\s+/g, ' ').trim() : null,
      helpful: helpEl ? helpEl.textContent.replace(/\s+/g, ' ').trim() : null,
      variant: varEl ? varEl.textContent.replace(/\s+/g, ' ').trim() : null,
      verified: !!el.querySelector('[data-hook="avp-badge"]'),
      review_url: linkEl ? new URL(linkEl.getAttribute('href'), location.origin).href : null,
    };
  });
  return JSON.stringify(out);
})()`;
}

// /dp 页评论区：[data-hook="mobley-review-content"] 卡片（降级通道）
function buildDpExtractJs() {
  return String.raw`(() => {
  ${BLOCK_DETECT}
  const cards = [...document.querySelectorAll('[data-hook="mobley-review-content"]')];
  const cleanA11y = (t) => (t || '')
    .replace(/Brief content visible, double tap to read full content\.?/g, '')
    .replace(/Full content visible, double tap to read brief content\.?/g, '')
    .replace(/高亮引用开始：/g, '')
    .replace(/高亮引用结束/g, '')
    .replace(/显示更多显示更少/g, '')
    .replace(/Show more\s*Show less/g, '')
    .replace(/\s+/g, ' ').trim();
  out.reviews = cards.map((c) => {
    const starI = c.querySelector('i.a-icon-star');
    const m = starI ? (starI.className.match(/a-star-(\d)/) || []) : [];
    const titleEl = c.querySelector('[data-hook="reviewTitle"]');
    const bodyEl = c.querySelector('[data-hook="reviewText"]');
    const dateEl = c.querySelector('[data-hook="review-date"]');
    const varEl = c.querySelector('[data-hook="format-strip"]');
    const linkEl = [...c.querySelectorAll('a[href]')].find((a) => /customer-reviews\/srp/i.test(a.getAttribute('href') || ''));
    const idMatch = linkEl ? (linkEl.getAttribute('href').match(/srp\/-\/([A-Z0-9]+)/) || []) : [];
    return {
      id: idMatch[1] || null,
      rating: m[1] ? Number(m[1]) : null,
      title: titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '',
      body: cleanA11y(bodyEl ? bodyEl.textContent : ''),
      date: dateEl ? dateEl.textContent.replace(/\s+/g, ' ').trim() : null,
      helpful: null,
      variant: varEl ? varEl.textContent.replace(/\s+/g, ' ').trim() : null,
      verified: !!c.querySelector('[data-hook="avp-badge"]'),
      review_url: linkEl ? new URL(linkEl.getAttribute('href'), location.origin).href : null,
    };
  });
  return JSON.stringify(out);
})()`;
}

async function fetchReviews(wb, url, extractJs) {
  let nav = await wb.navigate(url);
  if (nav.error) nav = await wb.navigate(url); // 导航失败重试一次
  if (nav.error) return { navError: nav.error, reviews: [] };
  let guardWait = 0;
  while (guardWait < 15000) {
    const chk = await wb.evalJson(GUARD_CHECK_JS, { timeoutMs: 15000, retries: 0 });
    if (chk.error || !chk.value.guard) break;
    await sleep(3000);
    guardWait += 3000;
  }
  await sleep(4000);
  const ev = await wb.evalJson(extractJs, { timeoutMs: 30000 });
  if (ev.error) return { evalError: ev.error, reviews: [] };
  return ev.value;
}

const failed = (x) => !x || x.navError || x.evalError || x.blocked || !x.reviews || !x.reviews.length;

export async function collectAmazon({ wb, outDir, onlyTask = null, log = console }) {
  const envelope = makeEnvelope('amazon');
  const deadline = Date.now() + BUDGETS_MS.amazon;
  const tasks = onlyTask ? AMAZON_ASINS.filter((t) => t.asin === onlyTask) : AMAZON_ASINS;
  if (!tasks.length) throw new Error(`未知 ASIN: ${onlyTask}`);
  await ensureDir(path.join(outDir, 'source', 'amazon'));
  let consecutiveBlocks = 0;
  let stopped = false;

  for (const task of tasks) {
    const started = Date.now();
    const r = makeRun(task.asin, { asin: task.asin, category: task.category, product: task.product, url: URLS.amazonReviews(task.asin), sample_note: 'top_reviews_only_positive_bias' });
    if (stopped || Date.now() > deadline) {
      r.status = 'skipped';
      r.errors.push(makeError(stopped ? 'SKIPPED_AFTER_BLOCK' : 'SKIPPED_TIME_BUDGET', stopped ? '连续验证码/登录墙，本路已停止；人工处理后 --only=amazon 重跑' : '超过 amazon 路时间预算', { task_id: task.asin }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    log.log(`  → amazon ${task.asin}（${task.product}）…`);

    let raw = await fetchReviews(wb, URLS.amazonReviews(task.asin), buildExtractJs());
    let sourcePage = 'product-reviews';
    if (failed(raw)) {
      const first = { ...raw, reviews: undefined };
      log.log('    评论页不可用，降级 /dp 评论区…');
      const dp = await fetchReviews(wb, `https://www.amazon.com/dp/${task.asin}`, buildDpExtractJs());
      if (!failed(dp)) {
        raw = dp;
        sourcePage = 'dp';
        raw.degraded_from = first;
      } else {
        raw = { ...dp, primary_error: first };
      }
    }
    raw.source_page = sourcePage;
    await writeJsonAtomic(path.join(outDir, 'source', 'amazon', `${task.asin}.json`), raw);
    const rawRel = `source/amazon/${task.asin}.json`;

    if (raw.navError || raw.evalError) {
      r.status = 'error';
      r.errors.push(makeError('FETCH_FAIL', raw.navError || raw.evalError, { task_id: task.asin, retryable: true }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    if (raw.blocked) {
      consecutiveBlocks++;
      r.status = 'error';
      const code = raw.guard ? 'AMAZON_GUARD' : raw.serverError ? 'AMAZON_500' : 'CAPTCHA_OR_SIGNIN';
      r.errors.push(makeError(code, raw.guard ? 'EdgeX Guard 反爬验证未通过（15s 内未跳回，/dp 降级同样被拦）' : raw.serverError ? 'Amazon 返回 error/500（平台风控）' : '检测到验证码或登录墙（不自动绕过）', { task_id: task.asin, url: raw.url }));
      envelope.runs.push(finishRun(r, started));
      await wb.navigate('about:blank'); // 挑战页会持续刷新，重置避免影响后续
      if (consecutiveBlocks >= 2) { stopped = true; log.log('  🛑 连续 2 个 ASIN 被 block，停止 amazon 路'); }
      continue;
    }
    consecutiveBlocks = 0;
    if (!raw.reviews || !raw.reviews.length) {
      r.errors.push(makeError('NO_REVIEWS', '评论页与 /dp 页均无评论条目（可能页面结构变化）', { task_id: task.asin, url: raw.url }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }

    raw.reviews.forEach((rev, idx) => {
      if (!rev.body) return; // 无正文评论不保留（无法引用）
      const pointer = `/reviews/${idx}`;
      const reviewUrl = rev.review_url || (rev.id ? URLS.amazonReview(rev.id) : raw.url);
      r.items.push(makeItem({
        kind: 'amazon_review',
        title: rev.title || null,
        url: reviewUrl,
        body_excerpt: rev.body,
        body_kind: 'review',
        quotes: [makeQuote({
          text: rev.body,
          kind: 'review',
          url: reviewUrl,
          engagement: { rating: rev.rating, helpful: rev.helpful },
          raw_ref: { file: rawRel, pointer: `${pointer}/body` },
          published_at: rev.date,
        })],
        engagement: { rating: rev.rating, helpful: rev.helpful },
        published_at: rev.date,
        metadata: {
          asin: task.asin,
          category: task.category,
          product: task.product,
          review_id: rev.id,
          variant: rev.variant,
          verified: rev.verified,
          source_page: sourcePage,
          top_reviews_sample: true,
        },
        raw_ref: { file: rawRel, pointer },
      }));
    });
    envelope.runs.push(finishRun(r, started));
    log.log(`    ${r.items.length} 条（${sourcePage}）`);
  }
  return envelope;
}
