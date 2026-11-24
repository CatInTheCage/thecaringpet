// Quora / Google 采集：Suggest 问题型联想 + PAA + Quora（经 Google SERP site:quora.com）。
// 2026-11-24 spike 实测：
// - Suggest client=firefox 端点返回 JSON 数组，gl=us 无地区噪声
// - PAA [data-q] 可抓，但会混入 Google 体验调查问卷（Extremely confident 等）需黑名单；
//   问题文本常粘 "An error has occurred. Please try again later."（答案懒加载失败）需剥离；v1 只抓问题不抓答案
// - Quora SERP #search a:has(h3) 可抓 10 条，标题即用户提问；snippet 为 SERP 摘要（不是回答全文）
// 注意（2026-11-24 实测）：webbridge evaluate 的 async/await 在部分页面（JSON 文本页等）会挂起，
// 因此所有等待一律在 Node 侧 sleep，页面内只跑同步提取代码。
import path from 'node:path';
import { QUORA_QUERIES, SUGGEST_SEEDS, PAA_QUERIES, URLS, LIMITS, BUDGETS_MS } from '../config.mjs';
import { makeRun, finishRun, makeItem, makeQuote, makeError, makeEnvelope, writeJsonAtomic, ensureDir, sleep } from '../lib/runtime.mjs';

const SUGGEST_JS = String.raw`(() => {
  const t = document.body ? document.body.innerText : '';
  try {
    const j = JSON.parse(t);
    return JSON.stringify({ items: Array.isArray(j[1]) ? j[1].slice(0, 10) : [] });
  } catch (e) {
    return JSON.stringify({ items: [], error: String(e).slice(0, 120), head: t.slice(0, 150) });
  }
})()`;

const SERP_COMMON = String.raw`
  const out = { url: location.href, blocked: false };
  const bt = document.body ? document.body.innerText : '';
  out.blocked = /unusual traffic|not a robot|recaptcha|Our systems have detected/i.test(bt);
  if (out.blocked) return JSON.stringify(out);
`;

function buildQuoraJs() {
  return String.raw`(() => {
  ${SERP_COMMON}
  out.results = [];
  const seen = new Set();
  document.querySelectorAll('#search a:has(h3)').forEach((a) => {
    const h = a.querySelector('h3');
    if (!h) return;
    let href = a.getAttribute('href') || '';
    if (href.startsWith('/url?')) {
      const u = new URL(href, location.origin);
      href = u.searchParams.get('q') || href;
    }
    if (!/^https?:\/\/(www\.)?quora\.com\//.test(href)) return;
    if (seen.has(href)) return;
    seen.add(href);
    const box = a.closest('.MjjYud, .g') || a.parentElement;
    const snippet = box ? box.innerText.replace(/\s+/g, ' ').trim().slice(0, 500) : '';
    out.results.push({ title: h.textContent.replace(/\s+/g, ' ').trim(), href, snippet });
  });
  return JSON.stringify(out);
})()`;
}

function buildPaaJs() {
  return String.raw`(() => {
  ${SERP_COMMON}
  const clean = (t) => (t || '').replace(/An error has occurred.*$/g, '').replace(/Please try again later.*$/g, '').replace(/\s+/g, ' ').trim();
  const blacklist = /Extremely confident|Very confident|Moderately confident|Very tailored|How relevant is the content on this page|accomplishing your goal|How tailored is this page/i;
  const qs = new Set();
  document.querySelectorAll('[data-q]').forEach((el) => {
    const t = clean(el.textContent);
    if (t && t.includes('?') && t.length < 180 && !blacklist.test(t)) qs.add(t);
  });
  if (!qs.size) {
    document.querySelectorAll('.related-question-pair').forEach((el) => {
      const t = clean(el.textContent);
      if (t && t.includes('?') && t.length < 180 && !blacklist.test(t)) qs.add(t);
    });
  }
  out.questions = [...qs].slice(0, ${LIMITS.paaPerQuery});
  return JSON.stringify(out);
})()`;
}

export async function collectGoogle({ wb, outDir, onlyTask = null, log = console }) {
  const envelope = makeEnvelope('quora-google');
  const deadline = Date.now() + BUDGETS_MS['quora-google'];
  await ensureDir(path.join(outDir, 'source', 'quora-google'));
  let serpBlocked = false;

  const overBudget = () => Date.now() > deadline;
  const skipRun = (id, query, code, msg) => {
    const r = makeRun(id, query);
    r.status = 'skipped';
    r.errors.push(makeError(code, msg, { task_id: id }));
    return finishRun(r, Date.now());
  };

  // === 1. Suggest（独立端点，不受 SERP block 影响） ===
  for (const seed of SUGGEST_SEEDS) {
    const id = `suggest:${seed}`;
    if (onlyTask && onlyTask !== id) continue;
    if (overBudget()) { envelope.runs.push(skipRun(id, { seed }, 'SKIPPED_TIME_BUDGET', '超过 google 路时间预算')); continue; }
    const started = Date.now();
    const r = makeRun(id, { seed, url: URLS.googleSuggest(seed) });
    const nav = await wb.navigate(URLS.googleSuggest(seed));
    if (nav.error) {
      r.status = 'error';
      r.errors.push(makeError('NAVIGATE_FAIL', nav.error, { task_id: id, retryable: true }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    await sleep(1500); // Node 侧等待页面加载（页面内 async 会挂起，见文件头注释）
    const ev = await wb.evalJson(SUGGEST_JS, { timeoutMs: 30000 });
    if (ev.error || ev.value.error) {
      r.status = 'error';
      r.errors.push(makeError('EXTRACT_FAIL', ev.error || ev.value.error, { task_id: id }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    const rawRel = `source/quora-google/suggest-${seed.replace(/[^a-z0-9]+/gi, '_')}.json`;
    await writeJsonAtomic(path.join(outDir, rawRel), ev.value);
    ev.value.items.forEach((s, idx) => {
      r.items.push(makeItem({
        kind: 'suggest',
        title: s,
        url: URLS.googleSuggest(seed),
        quotes: [makeQuote({ text: s, kind: 'search_query', url: URLS.googleSuggest(seed), raw_ref: { file: rawRel, pointer: `/items/${idx}` } })],
        metadata: { seed, note: 'Google Suggest 联想词，非用户发帖原话' },
        raw_ref: { file: rawRel, pointer: `/items/${idx}` },
      }));
    });
    envelope.runs.push(finishRun(r, started));
    log.log(`  → suggest "${seed}": ${r.items.length} 条`);
  }

  // === 2. PAA ===
  for (const q of PAA_QUERIES) {
    const id = `paa:${q}`;
    if (onlyTask && onlyTask !== id) continue;
    if (overBudget()) { envelope.runs.push(skipRun(id, { query: q }, 'SKIPPED_TIME_BUDGET', '超过 google 路时间预算')); continue; }
    if (serpBlocked) { envelope.runs.push(skipRun(id, { query: q }, 'GOOGLE_BLOCK', 'Google SERP 已被反爬阻断，跳过')); continue; }
    const started = Date.now();
    const r = makeRun(id, { query: q, url: URLS.googleSerp(q) });
    const nav = await wb.navigate(URLS.googleSerp(q));
    if (nav.error) {
      r.status = 'error';
      r.errors.push(makeError('NAVIGATE_FAIL', nav.error, { task_id: id, retryable: true }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    await sleep(3500);
    const ev = await wb.evalJson(buildPaaJs(), { timeoutMs: 30000 });
    if (ev.error) {
      r.status = 'error';
      r.errors.push(makeError('EXTRACT_FAIL', ev.error, { task_id: id }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    if (ev.value.blocked) {
      serpBlocked = true;
      r.status = 'error';
      r.errors.push(makeError('GOOGLE_BLOCK', 'Google 反爬（unusual traffic / reCAPTCHA），停止 SERP 子通道', { task_id: id }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    const rawRel = `source/quora-google/paa-${q.replace(/[^a-z0-9]+/gi, '_')}.json`;
    await writeJsonAtomic(path.join(outDir, rawRel), ev.value);
    (ev.value.questions || []).forEach((question, idx) => {
      r.items.push(makeItem({
        kind: 'paa',
        title: question,
        url: URLS.googleSerp(q),
        quotes: [makeQuote({ text: question, kind: 'search_query', url: URLS.googleSerp(q), raw_ref: { file: rawRel, pointer: `/questions/${idx}` } })],
        metadata: { query: q, note: 'People Also Ask 问题，非用户发帖原话；无逐条答案 URL，关联 SERP' },
        raw_ref: { file: rawRel, pointer: `/questions/${idx}` },
      }));
    });
    envelope.runs.push(finishRun(r, started));
    log.log(`  → paa "${q}": ${r.items.length} 条`);
  }

  // === 3. Quora（SERP site:quora.com） ===
  for (const q of QUORA_QUERIES) {
    const id = `quora:${q}`;
    if (onlyTask && onlyTask !== id) continue;
    if (overBudget()) { envelope.runs.push(skipRun(id, { query: q }, 'SKIPPED_TIME_BUDGET', '超过 google 路时间预算')); continue; }
    if (serpBlocked) { envelope.runs.push(skipRun(id, { query: q }, 'GOOGLE_BLOCK', 'Google SERP 已被反爬阻断，跳过')); continue; }
    const started = Date.now();
    const r = makeRun(id, { query: q, url: URLS.googleSerp(q) });
    const nav = await wb.navigate(URLS.googleSerp(q));
    if (nav.error) {
      r.status = 'error';
      r.errors.push(makeError('NAVIGATE_FAIL', nav.error, { task_id: id, retryable: true }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    await sleep(3500);
    const ev = await wb.evalJson(buildQuoraJs(), { timeoutMs: 30000 });
    if (ev.error) {
      r.status = 'error';
      r.errors.push(makeError('EXTRACT_FAIL', ev.error, { task_id: id }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    if (ev.value.blocked) {
      serpBlocked = true;
      r.status = 'error';
      r.errors.push(makeError('GOOGLE_BLOCK', 'Google 反爬（unusual traffic / reCAPTCHA），停止 SERP 子通道', { task_id: id }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    const rawRel = `source/quora-google/quora-${q.replace(/[^a-z0-9]+/gi, '_')}.json`;
    await writeJsonAtomic(path.join(outDir, rawRel), ev.value);
    (ev.value.results || []).slice(0, LIMITS.quoraPerQuery).forEach((res, idx) => {
      r.items.push(makeItem({
        kind: 'quora_question',
        title: res.title,
        url: res.href,
        body_excerpt: res.snippet || null,
        body_kind: res.snippet ? 'serp_snippet' : null,
        quotes: res.snippet ? [makeQuote({ text: res.snippet, kind: 'serp_snippet', url: res.href, raw_ref: { file: rawRel, pointer: `/results/${idx}/snippet` } })] : [],
        metadata: { query: q, note: 'Quora 问题标题为用户提问原话；snippet 是 SERP 摘要，不是回答全文' },
        raw_ref: { file: rawRel, pointer: `/results/${idx}` },
      }));
    });
    envelope.runs.push(finishRun(r, started));
    log.log(`  → quora "${q}": ${r.items.length} 条`);
  }

  return envelope;
}
