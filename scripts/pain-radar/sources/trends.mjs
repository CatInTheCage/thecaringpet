// Google Trends 采集：network 捕获 widgetdata/relatedsearches → DOM 文本兜底 → GSC 需求上下文降级。
// 2026-11-24 spike 实测：本机网络下 Trends explore 页外壳可加载，但 widget XHR 从未发出
// （Related queries 不出现，widgetdata 请求数为 0，长等待会导致 evaluate 超时）。
// 因此每词只做一次短超时尝试，失败立即降级 GSC，全部状态诚实落盘。
import path from 'node:path';
import { TRENDS_TERMS, URLS, LIMITS, BUDGETS_MS } from '../config.mjs';
import { makeRun, finishRun, makeItem, makeQuote, makeError, makeEnvelope, writeJsonAtomic, ensureDir, sleep } from '../lib/runtime.mjs';
import { findLatestGscDir, loadQueries, searchQueries } from '../lib/gsc.mjs';

const CHECK_RQ_JS = String.raw`(() => {
  const bt = document.body ? document.body.innerText : '';
  const idx = bt.search(/Related queries|相关查询/i);
  return JSON.stringify({ found: idx >= 0, bodyLen: bt.length, relatedQueriesText: idx >= 0 ? bt.slice(idx, idx + 3000) : null });
})()`;

const SCROLL_JS = String.raw`(() => { window.scrollTo(0, document.body.scrollHeight); return JSON.stringify({ ok: true }); })()`;

export async function collectTrends({ wb, outDir, gscRoot, onlyTask = null, log = console }) {
  const envelope = makeEnvelope('trends');
  const deadline = Date.now() + BUDGETS_MS.trends;
  const terms = onlyTask ? TRENDS_TERMS.filter((t) => t === onlyTask) : TRENDS_TERMS;
  if (!terms.length) throw new Error(`未知 trends 词: ${onlyTask}（可用: ${TRENDS_TERMS.join(', ')}）`);
  await ensureDir(path.join(outDir, 'source', 'trends'));

  // GSC 降级数据（懒加载一次）
  let gsc = null;
  async function getGsc() {
    if (gsc) return gsc;
    const latest = await findLatestGscDir(gscRoot);
    if (!latest) { gsc = { queries: [], date: null, dir: null }; return gsc; }
    gsc = { queries: await loadQueries(latest.dir), date: latest.date, dir: latest.dir };
    return gsc;
  }

  for (const term of terms) {
    const started = Date.now();
    const r = makeRun(term, { term, geo: 'US', timeframe: 'today 3-m', url: URLS.trendsExplore(term) });
    if (Date.now() > deadline) {
      r.status = 'skipped';
      r.errors.push(makeError('SKIPPED_TIME_BUDGET', '超过 trends 路时间预算', { task_id: term }));
      envelope.runs.push(finishRun(r, started));
      continue;
    }
    log.log(`  → trends "${term}"…`);
    let items = [];
    let widgetAttempted = false;

    try {
      await wb.network('start');
      const nav = await wb.navigate(URLS.trendsExplore(term));
      if (nav.error) {
        r.errors.push(makeError('NAVIGATE_FAIL', nav.error, { task_id: term, retryable: true }));
      } else {
        widgetAttempted = true;
        // Related queries 轮询在 Node 侧（页面内 async evaluate 会挂起，2026-11-24 实测）
        let rq = null;
        let evalErr = null;
        const pollStart = Date.now();
        while (Date.now() - pollStart < 25000) {
          const chk = await wb.evalJson(CHECK_RQ_JS, { timeoutMs: 15000, retries: 0 });
          if (chk.error) { evalErr = chk.error; break; }
          rq = chk.value;
          if (chk.value.found) break;
          await sleep(2000);
        }
        await wb.evalJson(SCROLL_JS, { timeoutMs: 15000, retries: 0 });
        await sleep(2500);
        const debug = { evaluate: evalErr || rq };
        // network 捕获的 relatedsearches 请求
        const list = await wb.network('list', { filter: 'relatedsearches' });
        const requests = Array.isArray(list.requests) ? list.requests : [];
        debug.relatedSearchesRequests = requests.map((q) => ({ requestId: q.requestId, status: q.status }));
        let parsedAny = false;
        for (const req of requests.slice(0, 4)) {
          const detail = await wb.network('detail', { requestId: req.requestId });
          const rawRel = `source/trends/${term.replace(/[^a-z0-9]+/gi, '_')}-${req.requestId}.json`;
          await writeJsonAtomic(path.join(outDir, rawRel), detail);
          const parsed = parseRelatedSearches(detail);
          if (parsed.error) {
            r.errors.push(makeError('TRENDS_PARSE', parsed.error, { task_id: term }));
            continue;
          }
          for (const q of parsed.queries.slice(0, LIMITS.trendsPerTerm)) {
            items.push(makeItem({
              kind: 'trend',
              title: q.query,
              url: q.link || URLS.trendsExplore(term),
              quotes: [makeQuote({ text: q.query, kind: 'search_query', url: q.link || URLS.trendsExplore(term), raw_ref: { file: rawRel, pointer: q.pointer || null } })],
              engagement: { value: q.value ?? null },
              metadata: { term, list_type: q.type, formattedValue: q.formattedValue ?? null, geo: 'US', timeframe: 'today 3-m', note: 'Google Trends 相对热度，非绝对搜索量' },
              raw_ref: { file: rawRel, pointer: q.pointer || null },
            }));
          }
          parsedAny = parsedAny || parsed.queries.length > 0;
        }
        if (!parsedAny && rq && rq.relatedQueriesText) {
          // DOM 文本兜底：保存原文但不编造结构化条目
          const domRel = `source/trends/${term.replace(/[^a-z0-9]+/gi, '_')}-dom.json`;
          await writeJsonAtomic(path.join(outDir, domRel), { term, text: rq.relatedQueriesText });
          r.errors.push(makeError('DOM_TEXT_ONLY', 'Related queries 仅有 DOM 文本（已存 source/），未解析为结构化条目', { task_id: term }));
        }
        if (!parsedAny && !requests.length) {
          r.errors.push(makeError('TRENDS_WIDGET_UNAVAILABLE', `widget XHR 未发出（bodyLen=${rq ? rq.bodyLen : 'n/a'}），本机网络下 Trends 数据接口不可达`, { task_id: term }));
        }
        await writeJsonAtomic(path.join(outDir, 'source', 'trends', `${term.replace(/[^a-z0-9]+/gi, '_')}-debug.json`), debug);
      }
    } catch (e) {
      r.errors.push(makeError('TRENDS_EXCEPTION', e.message || String(e), { task_id: term }));
    } finally {
      await wb.network('stop');
    }

    // === GSC 降级（非 Trends、非上升数据，明确标注） ===
    if (!items.length) {
      const g = await getGsc();
      const matches = g.queries.length ? searchQueries(g.queries, term, { limit: 8 }) : [];
      if (matches.length) {
        for (const q of matches) {
          items.push(makeItem({
            kind: 'gsc_context',
            title: q.query,
            url: null,
            quotes: [{ text: q.query, kind: 'search_query', url: null, engagement: { clicks: q.clicks, impressions: q.impressions }, raw_ref: { file: `gsc/${g.date}/查询数.csv`, pointer: `query: ${q.query}` }, published_at: null }],
            engagement: { clicks: q.clicks, impressions: q.impressions, position: q.position },
            metadata: {
              term,
              fallback: 'gsc_current_demand_context',
              gsc_snapshot: g.date,
              ctr: q.ctr,
              note: '⚠️ GSC 快照需求上下文，非 Google Trends、非上升数据；引用列应为 —',
            },
            raw_ref: { file: `gsc/${g.date}/查询数.csv`, pointer: `query: ${q.query}` },
          }));
        }
        r.errors.push(makeError('GSC_FALLBACK', `Trends 不可用，降级为 GSC(${g.date}) 需求上下文 ${matches.length} 条`, { task_id: term }));
      } else {
        r.errors.push(makeError('NO_GSC_MATCH', g.queries.length ? 'GSC 快照中无相关查询' : '无可用 GSC 快照', { task_id: term }));
      }
    }

    r.items = items;
    if (items.length && r.errors.length) r.status = 'partial';
    envelope.runs.push(finishRun(r, started));
    log.log(`    ${items.length} 条（${items[0] && items[0].kind === 'gsc_context' ? 'GSC 降级' : 'Trends'}）`);
  }
  return envelope;
}

// 解析 network detail 中的 relatedsearches 响应。
// detail 结构未经实测（本机抓不到请求），做防御式解析并把原始 detail 落盘供首跑后修正。
function parseRelatedSearches(detail) {
  try {
    let body = detail.responseBody ?? detail.body ?? detail.response?.body ?? detail.data ?? null;
    if (body && typeof body === 'object' && body.base64Encoded) {
      body = Buffer.from(body.body || '', 'base64').toString('utf8');
    }
    if (typeof body !== 'string' || !body.trim()) return { error: 'network detail 中无响应 body', queries: [] };
    // 去 anti-XSSI 前缀 )]}',
    const cleaned = body.replace(/^\)\]\}',?\s*/, '');
    const j = JSON.parse(cleaned);
    const ranked = j.default?.rankedList || j.rankedList || [];
    const queries = [];
    ranked.forEach((list, li) => {
      const items = list.rankedKeyword || list.items || [];
      items.forEach((kw, ki) => {
        const query = kw.query ?? kw.title ?? kw.keyword ?? null;
        if (!query) return;
        const value = kw.value ?? kw.formattedValue ?? null;
        const isRising = /Breakout|^\+%|^\+?\d+%$|^\d+%$/.test(String(kw.formattedValue ?? '')) || kw.type === 'rising';
        queries.push({
          query,
          value: typeof value === 'number' ? value : null,
          formattedValue: kw.formattedValue ?? null,
          link: kw.link ? new URL(kw.link, 'https://trends.google.com').href : null,
          // 不靠数组位置猜 Top/Rising：有百分比/Breakout 特征才标 rising，否则 unknown
          type: isRising ? 'rising' : 'unknown',
          pointer: `/default/rankedList/${li}/rankedKeyword/${ki}`,
        });
      });
    });
    if (!queries.length) return { error: 'relatedsearches 响应结构不符（rankedList 为空或字段变更）', queries: [] };
    return { queries };
  } catch (e) {
    return { error: `relatedsearches 解析异常: ${e.message}`, queries: [] };
  }
}
