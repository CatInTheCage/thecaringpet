// Reddit 痛点采集：last30days raw profile（正文摘录 + 高分评论 + engagement）。
// 2026-11-24 spike 实测：
// - items_by_source.reddit 每查询 ~12 条，约半数带实质正文（body = 标题 + "\n" + selftext，截断 ~500 字符）
// - 无正文帖 body 为 "标题\nNone" → 标 title_only，不计入有效痛点
// - top_comments / comment_insights 本次全空（评论增强未命中），字段原样保留，有值时才生成 comment 引用
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { REDDIT_TASKS, LAST30DAYS, LIMITS, BUDGETS_MS } from '../config.mjs';
import {
  run, resolveCertFile, makeRun, finishRun, makeItem, makeQuote, makeError,
  makeEnvelope, ensureDir,
} from '../lib/runtime.mjs';

export async function collectReddit({ outDir, onlyTask = null, log = console }) {
  const envelope = makeEnvelope('reddit');
  const certFile = await resolveCertFile();
  if (!certFile) log.log('  ⚠️ 未找到 certifi CA，last30days 的 HTTPS 调用可能失败');
  const deadline = Date.now() + BUDGETS_MS.reddit;
  const tasks = onlyTask ? REDDIT_TASKS.filter((t) => t.id === onlyTask) : REDDIT_TASKS;
  if (!tasks.length) throw new Error(`未知 reddit task: ${onlyTask}（可用: ${REDDIT_TASKS.map((t) => t.id).join(', ')}）`);
  await ensureDir(path.join(outDir, 'source', 'reddit'));

  for (const task of tasks) {
    if (Date.now() > deadline) {
      const r = makeRun(task.id, { topic: task.topic });
      r.status = 'skipped';
      r.errors.push(makeError('SKIPPED_TIME_BUDGET', '超过 reddit 路时间预算，未执行', { task_id: task.id }));
      envelope.runs.push(finishRun(r, Date.now()));
      log.log(`  ⏭ ${task.id}: 超预算跳过`);
      continue;
    }
    envelope.runs.push(await runOneTask(task, { outDir, certFile, log }));
  }
  return envelope;
}

async function runOneTask(task, { outDir, certFile, log }) {
  const started = Date.now();
  const r = makeRun(task.id, { topic: task.topic, subreddits: task.subreddits, days: 30, profile: 'raw' });
  const rawRel = `source/reddit/${task.id}.json`;
  const rawFile = path.join(outDir, rawRel);
  const env = { ...process.env };
  if (certFile) { env.SSL_CERT_FILE = certFile; env.REQUESTS_CA_BUNDLE = certFile; }
  const args = [
    LAST30DAYS.script, task.topic,
    '--search', 'reddit',
    '--subreddits', task.subreddits,
    '--days', '30',
    '--emit', 'json',
    '--json-profile', 'raw',
    '--no-browser-cookies',
    '--output', rawFile,
  ];

  let report = null;
  let lastErr = null;
  // 完全不可解析时重试一次（超时不重试——一次就要 6 分钟）
  for (let attempt = 0; attempt < 2 && !report; attempt++) {
    log.log(`  → reddit ${task.id}${attempt ? '（重试）' : ''}（最长 6 分钟）…`);
    const res = await run('python3', args, { timeoutMs: LIMITS.redditTaskTimeoutMs, env });
    if (res.timedOut) {
      lastErr = makeError('TIMEOUT', `超过 ${LIMITS.redditTaskTimeoutMs / 60000} 分钟被终止`, { task_id: task.id });
      break;
    }
    try { report = JSON.parse(await readFile(rawFile, 'utf8')); } catch { /* 落盘失败试 stdout */ }
    if (!report) { try { report = JSON.parse(res.stdout); } catch { /* 真的没数据 */ } }
    if (!report) {
      lastErr = makeError('UNPARSEABLE', `退出码 ${res.code}，输出不可解析：${res.stderr.trim().slice(-250)}`, { task_id: task.id, attempt });
    } else if (res.code !== 0) {
      r.status = 'partial';
      r.errors.push(makeError('NONZERO_EXIT', `last30days 退出码 ${res.code}（部分源失败，保留可用数据）`, { task_id: task.id }));
    }
  }

  if (!report) {
    r.status = 'error';
    if (lastErr) r.errors.push(lastErr);
    return finishRun(r, started);
  }

  // 提取顺序：items_by_source.reddit → ranked_candidates[].source_items → results（降级）
  let items = [];
  let degraded = false;
  if (Array.isArray(report.items_by_source?.reddit) && report.items_by_source.reddit.length) {
    items = report.items_by_source.reddit.map((it, idx) => ({ it, pointer: `/items_by_source/reddit/${idx}` }));
  } else if (Array.isArray(report.ranked_candidates) && report.ranked_candidates.length) {
    for (const c of report.ranked_candidates) {
      const sis = Array.isArray(c.source_items) ? c.source_items : [];
      for (const it of sis) {
        if (it.source === 'reddit') items.push({ it, pointer: `/ranked_candidates/${report.ranked_candidates.indexOf(c)}/source_items/${sis.indexOf(it)}` });
      }
    }
    if (!items.length) degraded = true;
  } else {
    degraded = true;
  }
  if (degraded) {
    r.status = 'partial';
    r.errors.push(makeError('PROFILE_DEGRADED', 'raw profile 中未找到 items_by_source.reddit，未提取到正文级条目', { task_id: task.id }));
  }

  const seen = new Set();
  for (const { it, pointer } of items) {
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    if (r.items.length >= LIMITS.redditItemsPerTask) break;
    r.items.push(normalizeItem(it, pointer, rawRel));
  }
  return finishRun(r, started);
}

function normalizeItem(it, pointer, rawRel) {
  // body = 标题 + "\n" + selftext（"None" 表示无正文）
  let bodyText = (it.body || '').trim();
  if (it.title && bodyText.startsWith(it.title)) bodyText = bodyText.slice(it.title.length).trim();
  if (/^(None|null)$/i.test(bodyText)) bodyText = '';
  const titleOnly = !bodyText;
  const engagement = {
    score: it.engagement?.score ?? null,
    num_comments: it.engagement?.num_comments ?? null,
    upvote_ratio: it.engagement?.upvote_ratio ?? null,
  };
  const quotes = [];
  if (!titleOnly) {
    quotes.push(makeQuote({
      text: bodyText,
      kind: 'post_body',
      url: it.url,
      engagement,
      raw_ref: { file: rawRel, pointer: `${pointer}/body` },
      published_at: it.published_at || null,
    }));
  }
  // 评论增强有值时才生成 comment 引用（excerpt 为逐字摘录）
  const topComments = Array.isArray(it.metadata?.top_comments) ? it.metadata.top_comments : [];
  topComments.forEach((c, ci) => {
    const field = c.excerpt ? 'excerpt' : c.text ? 'text' : c.body ? 'body' : null;
    const text = field ? c[field] : '';
    if (!text) return;
    quotes.push(makeQuote({
      text,
      kind: 'comment',
      url: c.url || it.url,
      engagement: { score: c.score ?? null },
      raw_ref: { file: rawRel, pointer: `${pointer}/metadata/top_comments/${ci}/${field}` },
      published_at: c.date || c.published_at || null,
    }));
  });
  return makeItem({
    kind: 'reddit_post',
    title: it.title,
    url: it.url,
    body_excerpt: titleOnly ? null : bodyText,
    body_kind: titleOnly ? null : 'selftext',
    quotes,
    engagement,
    published_at: it.published_at || null,
    metadata: {
      subreddit: it.container || null,
      title_only: titleOnly,
      relevance_hint: it.relevance_hint ?? null,
      local_relevance: it.local_relevance ?? null,
      snippet: it.snippet || null,
      comment_insights: it.metadata?.comment_insights ?? [],
      top_comments: topComments,
    },
    raw_ref: { file: rawRel, pointer },
  });
}
