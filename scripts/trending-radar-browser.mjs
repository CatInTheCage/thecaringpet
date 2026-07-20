// 浏览器热点抓取脚本 — 通过 Kimi WebBridge 本地 daemon (127.0.0.1:10086) 驱动真实浏览器，
// 抓取 trending-radar.mjs 覆盖不到的四路信号：Reddit / Google Suggest / Amazon BSR / Pinterest Trends。
// 这些站点有反爬或需登录态，curl 拿不到，必须走真实浏览器。
// 用法: node scripts/trending-radar-browser.mjs
// 前提: Kimi WebBridge daemon 已启动（~/.kimi-webbridge/bin/kimi-webbridge start）+ 浏览器开着
// 输出: 追加到 content-ideas/radar-YYYY-MM-DD.md（若不存在则新建）

import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DAEMON = 'http://127.0.0.1:10086/command';
const SESSION = 'tcp-radar-browser';
const OUT_DIR = path.join(ROOT, 'content-ideas');

// === 配置：抓什么 ===
// Reddit sub 列表：Reddit .rss 用 curl 抓不到（需登录态），走 webbridge 浏览器（带登录态）。
// 2026-07-18 实测可抓的 sub（posts:6 稳定）；Cats/pets/PetFood/dogadvice/dogtraining/dogcare 被限流（bodyLen:33 空白）。
const REDDIT_SUBS = [
  'CatAdvice', 'catcare', 'catquestions', 'CatTraining', 'kittens',  // 猫
  'dogs', 'puppy101', 'DogFood', 'AskVet',                            // 狗/通用
];
const SUGGEST_SEEDS = ['cat food', 'dog food', 'cat feeder', 'dog slow feeder', 'cat treats', 'pet poison']; // Google 长尾词种子
// Amazon: 用搜索页（按 popularity 排序）抓你已评测过的品类热销品。Best Sellers 页 URL 易失效，搜索页更稳。
const AMAZON_SEARCHES = [
  { kw: 'automatic cat feeder', label: '自动喂食器' },
  { kw: 'slow feeder dog bowl', label: '慢食碗' },
  { kw: 'lick mat for dogs', label: 'lick mat' },
  { kw: 'ceramic cat bowl', label: '陶瓷猫碗' },
];
// Pinterest Trends: 需 Pinterest Business 账号（已开通）。页面渲染不稳定（有时空白，疑似反爬），
// 脚本仍尝试抓每个宠物词的趋势；抓不到则该词降级为人工查提示。
const PINTEREST_TRENDS_TERMS = ['cat food', 'dog food', 'cat treats', 'dog treats', 'pet care'];

// === daemon 调用 ===
async function cmd(action, args) {
  const body = JSON.stringify({ action, args, session: SESSION });
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 45000);
  try {
    const res = await fetch(DAEMON, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: ctrl.signal,
    });
    clearTimeout(t);
    const j = await res.json();
    if (!j.ok) return { error: `daemon error: ${JSON.stringify(j).slice(0, 200)}` };
    return j.data;
  } catch (e) {
    clearTimeout(t);
    return { error: e.name === 'AbortError' ? 'daemon 超时 45s' : (e.message || String(e)) };
  }
}

async function ensureDaemon() {
  const r = await cmd('list_tabs', {});
  if (r.error) {
    console.error('❌ 连不上 Kimi WebBridge daemon。请先启动：');
    console.error('   ~/.kimi-webbridge/bin/kimi-webbridge start');
    console.error('   并确保浏览器开着、WebBridge 扩展已连接。');
    process.exit(1);
  }
}

// === 各路抓取 ===
async function scrapeReddit() {
  const all = [];
  for (const sub of REDDIT_SUBS) {
    const url = `https://www.reddit.com/r/${sub}/top/?t=week`;
    let items = [];
    let lastErr = '';
    // 最多重试 2 次（Reddit 偶发限流/加载慢）
    for (let attempt = 0; attempt < 2 && !items.length; attempt++) {
      const nav = await cmd('navigate', { url, newTab: false, group_title: 'TCP 热点扫描' });
      if (nav.error) { lastErr = nav.error; await sleep(2000); continue; }
      await sleep(4500); // 等帖子渲染
      await cmd('evaluate', { code: 'window.scrollTo(0,800)' });
      await sleep(1500);
      const ev = await cmd('evaluate', {
        code: `(()=>{const seen=new Set();const out=[];document.querySelectorAll('shreddit-post, article').forEach(p=>{const te=p.querySelector('a[slot=title], h3, [data-testid=post-title] a, a.title');const t=te?te.textContent.trim():'';const se=p.querySelector('[score], shreddit-post');let s=se&&se.getAttribute?se.getAttribute('score'):'';if(t&&!seen.has(t)){seen.add(t);out.push({t,s:s||''})}});return JSON.stringify(out.slice(0,8))})()`,
      });
      if (ev.error) { lastErr = ev.error; await sleep(2000); continue; }
      try { items = JSON.parse(ev.value || '[]'); } catch { items = []; }
    }
    all.push(lastErr && !items.length ? { sub, url, error: lastErr } : { sub, url, items });
  }
  return all;
}

async function scrapeGoogleSuggest() {
  const all = [];
  for (const seed of SUGGEST_SEEDS) {
    const url = `https://www.google.com/complete/search?output=toolbar&hl=en&q=${encodeURIComponent(seed)}`;
    const nav = await cmd('navigate', { url, newTab: false });
    if (nav.error) { all.push({ seed, error: nav.error }); continue; }
    await sleep(1200);
    const ev = await cmd('evaluate', {
      // 解析 XML suggest 数据
      code: `(()=>{const txt=document.body.innerText;const ms=[...txt.matchAll(/data="([^"]+)"/g)].map(m=>m[1]);return JSON.stringify(ms.slice(0,10))})()`,
    });
    if (ev.error) { all.push({ seed, error: ev.error }); continue; }
    let items = [];
    try { items = JSON.parse(ev.value || '[]'); } catch { items = []; }
    all.push({ seed, items });
  }
  return all;
}

async function scrapeAmazon() {
  const all = [];
  for (const q of AMAZON_SEARCHES) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(q.kw)}&s=exact-aware-popularity-rank`;
    let items = [];
    let lastErr = '';
    // 最多重试 2 次（Amazon 偶发 page load timeout）
    for (let attempt = 0; attempt < 2 && !items.length; attempt++) {
      const nav = await cmd('navigate', { url, newTab: false });
      if (nav.error) { lastErr = nav.error; await sleep(2000); continue; }
      await sleep(4500);
      const ev = await cmd('evaluate', {
        code: `(()=>{const out=[];document.querySelectorAll('[data-component-type=s-search-result]').forEach((el,i)=>{const te=el.querySelector('h2 a span, h2 span');const t=te?te.textContent.trim():'';if(t&&t.length>3)out.push({rank:i+1,t})});return JSON.stringify(out.slice(0,8))})()`,
      });
      if (ev.error) { lastErr = ev.error; await sleep(2000); continue; }
      try { items = JSON.parse(ev.value || '[]'); } catch { items = []; }
    }
    all.push(lastErr && !items.length ? { ...q, url, error: lastErr } : { ...q, url, items });
  }
  return all;
}

// Pinterest Trends：需 Business 账号（已开通）。页面渲染慢，需较长等待。
// 对每个宠物词搜索，抓上升趋势词 + 增长率。
async function scrapePinterest() {
  const all = [];
  for (const term of PINTEREST_TRENDS_TERMS) {
    const url = `https://trends.pinterest.com/?geo=US&q=${encodeURIComponent(term)}`;
    const nav = await cmd('navigate', { url, newTab: false });
    if (nav.error) { all.push({ term, error: nav.error }); continue; }
    await sleep(8000); // Pinterest Trends 渲染慢
    await cmd('evaluate', { code: 'window.scrollTo(0,600)' });
    await sleep(2500);
    const ev = await cmd('evaluate', {
      // 抓趋势卡片：标题 + 增长率（"较上月增长 N%"）
      code: `(()=>{if(!document.body.innerText.trim())return JSON.stringify({empty:true,items:[]});const out=[];const seen=new Set();document.querySelectorAll('div,span,a,h2,h3').forEach(el=>{if(el.children.length<=2){const t=(el.textContent||'').trim();const gm=t.match(/增长\\s*([\\d,]+)%/);const isTrend=gm||(t.length>2&&t.length<45&&!/^(美国|加拿大|地区|趋势|Beta|焦点|购物|了解|查看|Pinterest|the Caring Pet)/.test(t)&&!/^(较上月|旅行|美妆|运动|家居|食品)/.test(t));if(isTrend&&!seen.has(t)){seen.add(t);out.push(t)}}});return JSON.stringify({empty:false,items:out.slice(0,12)})})()`,
    });
    if (ev.error) { all.push({ term, error: ev.error }); continue; }
    let parsed = {};
    try { parsed = JSON.parse(ev.value || '{}'); } catch { parsed = {}; }
    all.push({ term, items: parsed.items || [], empty: parsed.empty });
  }
  return all;
}

// === 工具 ===
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function stamp() {
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function nowStr() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

// === Markdown 组装 ===
function redditMd(rows) {
  const lines = ['### [真实提问 / Reddit] Reddit 本周热帖（浏览器抓取）', `- 抓取时间: ${nowStr()}`, ''];
  let any = false;
  for (const r of rows) {
    if (r.error) { lines.push(`- ⚠️ r/${r.sub} 抓取失败: ${r.error}`); continue; }
    if (!r.items || !r.items.length) { lines.push(`- r/${r.sub}: 无数据`); continue; }
    any = true;
    lines.push(`**r/${r.sub}** (${r.url})`);
    for (const it of r.items) {
      lines.push(`- ${it.s ? `↑${it.s} ` : ''}${it.t}`);
    }
    lines.push('');
  }
  if (!any) lines.push('（未抓到数据，可能页面结构变化或需登录）');
  lines.push('');
  return lines.join('\n');
}

function suggestMd(rows) {
  const lines = ['### [搜索需求 / Google 长尾词] Google Suggest（浏览器抓取）', `- 抓取时间: ${nowStr()}`, ''];
  let any = false;
  for (const r of rows) {
    if (r.error) { lines.push(`- ⚠️ "${r.seed}" 抓取失败: ${r.error}`); continue; }
    if (!r.items || !r.items.length) continue;
    any = true;
    lines.push(`**种子词: ${r.seed}** → ${r.items.join(' · ')}`);
  }
  if (!any) lines.push('（未抓到数据）');
  lines.push('');
  return lines.join('\n');
}

function amazonMd(rows) {
  const lines = ['### [竞品 / Amazon 热销] Amazon 搜索热销品（浏览器抓取）', `- 抓取时间: ${nowStr()}`, ''];
  let any = false;
  for (const r of rows) {
    if (r.error) { lines.push(`- ⚠️ "${r.kw}" 抓取失败: ${r.error}`); continue; }
    if (!r.items || !r.items.length) { lines.push(`- ${r.label}（${r.kw}）: 无数据`); continue; }
    any = true;
    lines.push(`**${r.label}**（搜索: ${r.kw}）`);
    for (const it of r.items) {
      lines.push(`- #${it.rank} ${it.t}`);
    }
    lines.push('');
  }
  if (!any) lines.push('（未抓到数据，可能需登录或被反爬）');
  lines.push('');
  return lines.join('\n');
}

// Pinterest Trends：输出每个宠物词的上升趋势词
function pinterestMd(rows) {
  const lines = ['### [竞品 / Pinterest Trends] Pinterest 宠物趋势（浏览器抓取）', `- 抓取时间: ${nowStr()}`, ''];
  let any = false;
  for (const r of rows) {
    if (r.error) { lines.push(`- ⚠️ "${r.term}" 抓取失败: ${r.error}`); continue; }
    if (r.empty) { lines.push(`- ${r.term}: 页面未渲染（Pinterest 反爬，人工查 https://trends.pinterest.com/?q=${encodeURIComponent(r.term)} ）`); continue; }
    if (!r.items || !r.items.length) { lines.push(`- ${r.term}: 无趋势词`); continue; }
    any = true;
    lines.push(`**${r.term}**`);
    for (const t of r.items) lines.push(`- ${t}`);
    lines.push('');
  }
  if (!any) lines.push('（未抓到数据）');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  console.log('🌐 通过 Kimi WebBridge 驱动浏览器抓取四路热点…\n');
  await ensureDaemon();
  await mkdir(OUT_DIR, { recursive: true });

  console.log('  → Reddit…');
  const reddit = await scrapeReddit();
  console.log('  → Google Suggest…');
  const suggest = await scrapeGoogleSuggest();
  console.log('  → Amazon 热销…');
  const amazon = await scrapeAmazon();
  console.log('  → Pinterest Trends（宠物词）…');
  const pinterest = await scrapePinterest();

  // 关掉会话的标签组（保持浏览器干净）
  await cmd('close_session', {});

  const md = [
    '<!-- 来自 scripts/trending-radar-browser.mjs（Kimi WebBridge 浏览器抓取） -->',
    `## 浏览器抓取（${nowStr()}）`,
    '',
    redditMd(reddit),
    suggestMd(suggest),
    amazonMd(amazon),
    pinterestMd(pinterest),
  ].join('\n');

  // 追加到今天的 radar 报告；若不存在则新建
  const outFile = path.join(OUT_DIR, `radar-${stamp()}.md`);
  let existing = '';
  try { existing = await readFile(outFile, 'utf8'); } catch { /* 不存在 */ }

  if (existing) {
    // 已有报告：在"下一步行动建议"之前插入浏览器抓取段落
    const marker = '---\n\n## 下一步行动建议';
    let merged;
    if (existing.includes(marker)) {
      merged = existing.replace(marker, md + '\n---\n\n## 下一步行动建议');
    } else {
      merged = existing + '\n\n' + md;
    }
    await writeFile(outFile, merged, 'utf8');
  } else {
    await writeFile(outFile, `# 热点扫描报告 ${stamp()}\n\n${md}`, 'utf8');
  }

  console.log(`\n✅ 四路抓取完成，已${existing ? '追加到' : '新建'} ${path.relative(ROOT, outFile)}`);
  console.log('   Reddit subs: ' + reddit.filter((r) => r.items && r.items.length).length + `/${REDDIT_SUBS.length} 成功`);
  console.log('   Google Suggest: ' + suggest.filter((r) => r.items && r.items.length).length + `/${SUGGEST_SEEDS.length} 成功`);
  console.log('   Amazon 搜索: ' + amazon.filter((r) => r.items && r.items.length).length + `/${AMAZON_SEARCHES.length} 成功`);
  console.log('   Pinterest: ' + pinterest.filter((r) => r.items && r.items.length).length + `/${PINTEREST_TRENDS_TERMS.length} 个词有趋势`);
}

main().catch((e) => { console.error('脚本出错:', e); process.exit(1); });
