// 社交聚合扫描脚本 — 用 last30days（reddit/web/youtube 跨平台聚合）+ agent-reach 的 Exa 语义搜索，
// 补齐 trending-radar.mjs（召回/毒素 RSS）与 trending-radar-browser.mjs（浏览器四路）覆盖不到的信号：
// 跨源聚类判断层、YouTube 视频趋势、语义新闻搜索；配 SCRAPECREATORS_API_KEY 后自动加 pinterest/tiktok。
// 用法: node scripts/trending-radar-social.mjs [--only-topic "<query>"] [--skip-exa] [--days N]
// 前提: python3 + ~/.claude/skills/last30days（零配置即可跑 reddit/web/youtube）；Exa 需 mcporter（项目 config/mcporter.json）
// 输出: 合并进 content-ideas/radar-YYYY-MM-DD.md（SOCIAL-RADAR 标记，同日重跑幂等替换）；
//       原始 JSON 存档在 content-ideas/raw/（该目录已 gitignore）
// 注意: 不接 x/Twitter —— XAI_API_KEY 付费且 x.com 在本网络不可达（cookie 兜底也死了），仅文档记录。
//       有意跳过 hackernews/polymarket/github —— 宠物内容信号≈0，只增延迟。

import { readFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { mergeIntoRadar } from './lib/radar-merge.mjs';

// ROOT 从 import.meta.url 推导（不用 process.cwd()）：cron 下 cwd 不定，
// 且 mcporter 的 exa 配置在项目级 config/mcporter.json，必须 cwd=仓库根目录。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'content-ideas');
const RAW_DIR = path.join(OUT_DIR, 'raw');
const L30D = process.env.LAST30DAYS_PY
  || path.join(os.homedir(), '.claude/skills/last30days/scripts/last30days.py');
const L30D_ENV_FILE = path.join(os.homedir(), '.config/last30days/.env');
const TOPIC_TIMEOUT_MS = 6 * 60_000; // 单主题硬杀（last30days 典型 1-3 分钟，discovery 腿可能更久）
const EXA_TIMEOUT_MS = 60_000;

const BEGIN_MARKER = '<!-- SOCIAL-RADAR-BEGIN scripts/trending-radar-social.mjs -->';
const END_MARKER = '<!-- SOCIAL-RADAR-END -->';

// === 配置：扫什么 ===
// 4 个主题对齐站点内容簇。串行跑（keyless reddit 并发会限流），典型总时长 ~9 分钟。
// keyExtra: 检测到 SCRAPECREATORS_API_KEY 时追加的源（视觉/产品类平台）。
const TOPICS = [
  {
    query: 'senior cat care and aging cat health',
    sources: ['reddit', 'web', 'youtube'], // cat-age 是已验证高需求簇；youtube 出护理视频趋势
    keyExtra: ['pinterest', 'tiktok'],
  },
  {
    query: 'slow feeder bowls and automatic pet feeders',
    sources: ['reddit', 'web', 'youtube'], // 联盟产品簇，视频评测有价值
    keyExtra: ['pinterest', 'tiktok'],
  },
  {
    query: 'pet food safety recalls and toxic foods',
    sources: ['reddit', 'web'], // 与召回/毒素两路呼应；youtube 边际价值低，省 1-2 分钟
    keyExtra: ['pinterest'],
  },
  {
    query: 'new dog owner care and training basics',
    sources: ['reddit', 'youtube'], // 泛狗护理簇；web 相对 reddit 增量小，保持精简
    keyExtra: ['pinterest', 'tiktok'],
  },
];

const EXA_QUERIES = [
  'pet food recall news this week',
  'pet care trends 2026',
];

// 未配 key 时的诚实提示（脚本自己输出，不依赖 last30days 上报 —— 更明确，也不怕 schema 漂移）
const SETUP_HINT = '免费 10,000 次：python3 ~/.claude/skills/last30days/scripts/last30days.py setup --github（GitHub 设备码登录，无需信用卡）';
const KEY_HINTS = {
  pinterest: `- ⚠️ pinterest: skipped-unconfigured（需 SCRAPECREATORS_API_KEY，${SETUP_HINT}）`,
  tiktok: `- ⚠️ tiktok: skipped-unconfigured（需 SCRAPECREATORS_API_KEY，${SETUP_HINT}）`,
};

// === 工具 ===
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function stamp() {
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function nowStr() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function parseArgs(argv) {
  const args = { onlyTopic: null, skipExa: false, days: 30 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--only-topic') args.onlyTopic = argv[++i];
    else if (argv[i] === '--skip-exa') args.skipExa = true;
    else if (argv[i] === '--days') args.days = Number(argv[++i]) || 30;
  }
  return args;
}

// 解析 ~/.config/last30days/.env（KEY=VALUE，忽略 # 注释），process.env 兜底
async function detectKeys() {
  let fileEnv = '';
  try { fileEnv = await readFile(L30D_ENV_FILE, 'utf8'); } catch { /* 不存在 */ }
  const fromFile = (k) => new RegExp(`^\\s*${k}\\s*=\\s*\\S+`, 'm').test(fileEnv);
  return {
    scrapecreators: fromFile('SCRAPECREATORS_API_KEY') || !!process.env.SCRAPECREATORS_API_KEY,
    xai: fromFile('XAI_API_KEY') || !!process.env.XAI_API_KEY, // 检测到也不用，仅 console 提示
  };
}

// spawn 收集器：返回 { code, stdout, stderr, timedOut }
function run(cmd, args, { cwd = ROOT, timeoutMs, env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const t = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeoutMs);
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('error', (e) => { clearTimeout(t); resolve({ code: -1, stdout, stderr: String(e), timedOut }); });
    child.on('close', (code) => { clearTimeout(t); resolve({ code, stdout, stderr, timedOut }); });
  });
}

// macOS Python.org 框架 Python 默认不带 CA 根证书（urllib 报 CERTIFICATE_VERIFY_FAILED）。
// 2026-07-27 实测：不配 SSL_CERT_FILE 时 last30days 的 reddit/grounding/ScrapeCreators 全部
// 因此失败（"unreachable"）；配上 certifi 的 cacert.pem 后 pinterest/tiktok 立刻 ok。
let _certFile = null;
async function resolveCertFile() {
  if (_certFile !== null) return _certFile;
  if (process.env.SSL_CERT_FILE) { _certFile = process.env.SSL_CERT_FILE; return _certFile; }
  const r = await run('python3', ['-c', 'import certifi; print(certifi.where())'], { timeoutMs: 15000 });
  _certFile = r.code === 0 ? r.stdout.trim() : '';
  return _certFile;
}

// === last30days 主题执行器（单主题失败不影响其他主题） ===
async function runTopic(topic, { days, keys, certFile }) {
  const sources = [...topic.sources, ...(keys.scrapecreators ? topic.keyExtra : [])];
  const outPath = path.join(RAW_DIR, `.tmp-${Date.now()}-${Math.floor(Math.random() * 1e6)}.json`);
  await mkdir(RAW_DIR, { recursive: true });

  // 给子进程补 CA 证书（见 resolveCertFile 注释）；REQUESTS_CA_BUNDLE 覆盖 requests 库
  const env = { ...process.env };
  if (certFile) { env.SSL_CERT_FILE = certFile; env.REQUESTS_CA_BUNDLE = certFile; }

  const r = await run('python3', [
    L30D, topic.query,
    '--search', sources.join(','),
    '--quick',
    '--days', String(days),
    '--emit', 'json',
    '--json-profile', 'agent',
    '--no-browser-cookies',
    '--output', outPath,
    '--save-dir', RAW_DIR,
  ], { timeoutMs: TOPIC_TIMEOUT_MS, env });

  if (r.timedOut) return { topic, error: `超时 ${TOPIC_TIMEOUT_MS / 60000} 分钟已终止` };

  // 不信退出码：优先解析 --output 文件，兜底 stdout（last30days 部分失败时非零退出但 JSON 可用）
  let report = null;
  try { report = JSON.parse(await readFile(outPath, 'utf8')); } catch { /* 落盘失败则试 stdout */ }
  if (!report) { try { report = JSON.parse(r.stdout); } catch { /* 真的没数据 */ } }

  if (!report) {
    const tail = r.stderr.trim().slice(-300).replace(/\n/g, ' ');
    return { topic, error: `退出码 ${r.code}，输出不可解析${tail ? `：${tail}` : ''}` };
  }
  return { topic, report, exitCode: r.code };
}

// === Exa 语义搜索（agent-reach 通道，经 mcporter；需 cwd=ROOT 读项目级 config/mcporter.json） ===
// 注意：mcporter --output json 输出的是 JS 对象字面量（无引号键 + 字符串拼接），不是合法 JSON；
// --output text 才是稳定的 "Title:/URL:/Published:" 文本块，按行解析。
async function runExa() {
  const results = await Promise.all(EXA_QUERIES.map(async (q) => {
    const r = await run('mcporter', [
      'call', `exa.web_search_exa(query: "${q}", numResults: 5)`, '--output', 'text',
    ], { cwd: ROOT, timeoutMs: EXA_TIMEOUT_MS });
    if (r.timedOut) return { q, error: '超时 60s' };
    // 解析 "Title: ...\nURL: ...\nPublished: ..." 块
    const items = [];
    const titles = [...r.stdout.matchAll(/^Title: (.+)$/gm)];
    const urls = [...r.stdout.matchAll(/^URL: (\S+)$/gm)];
    const dates = [...r.stdout.matchAll(/^Published: (\S+)$/gm)];
    for (let i = 0; i < Math.min(titles.length, urls.length); i++) {
      const published = (dates[i]?.[1] || '').slice(0, 10);
      items.push({ title: titles[i][1].trim(), url: urls[i][1].trim(), published: published === 'N/A' ? '' : published });
    }
    if (!items.length) return { q, error: `输出不可解析（退出码 ${r.code}；检查 mcporter 与 config/mcporter.json，需 cwd=仓库根目录）` };
    return { q, items };
  }));
  return results;
}

// === Markdown 渲染（沿用 radar 既有约定） ===
function sourceStatusLine(sourceStatus) {
  const parts = [];
  for (const [src, st] of Object.entries(sourceStatus || {})) {
    if (st === 'ok') parts.push(`${src} ✓`);
    else if (st === 'no-results') parts.push(`${src} ○ 无结果`);
    else parts.push(`${src} ⚠️ ${st}`);
  }
  return parts.join(' · ');
}

function topicMd(res, { keys }) {
  const { topic } = res;
  const lines = [`### [跨平台聚合 / last30days] ${topic.query}`, ''];
  // 未配 key 的源：脚本自己输出诚实提示
  if (!keys.scrapecreators) for (const s of topic.keyExtra) lines.push(KEY_HINTS[s]);

  if (res.error) {
    lines.push(`- ⚠️ 本主题抓取失败: ${res.error}`, '', '（未抓到数据）', '');
    return lines.join('\n');
  }

  const { report } = res;
  const statusLine = sourceStatusLine(report.source_status);
  lines.push(`- 窗口: 近 ${report.window_days ?? 30} 天 · 源状态: ${statusLine || '（无）'}`);
  if (res.exitCode) lines.push(`- ⚠️ last30days 退出码 ${res.exitCode}（部分源失败，以下为可用数据）`);
  lines.push('');

  // 聚类摘要：跨源聚合的判断层，比原始条目更有价值
  const clusters = (report.clusters ?? []).slice(0, 4);
  if (clusters.length) {
    lines.push('**聚类摘要**（last30days 跨源聚合）');
    for (const c of clusters) {
      const srcs = Array.isArray(c.sources) ? c.sources.join(', ') : '';
      lines.push(`- **${c.title || '（无标题）'}** — ${c.summary || ''}（来源: ${srcs} · 互动量 ${c.engagement_total ?? 0}）`);
    }
    lines.push('');
  }

  // 高分条目 top5
  const results = [...(report.results ?? [])]
    .sort((a, b) => (b.relevance_score ?? 0) - (a.relevance_score ?? 0))
    .slice(0, 5);
  if (results.length) {
    lines.push('**高分条目**');
    for (const it of results) {
      const date = (it.published_at || '').slice(0, 10);
      lines.push(`- **[${it.title || it.url}](${it.url})** — ${it.source} · ${date} · 相关度 ${(it.relevance_score ?? 0).toFixed(2)}`);
    }
    lines.push('');
  }

  if (!clusters.length && !results.length) lines.push('（未抓到数据）', '');
  return lines.join('\n');
}

function exaMd(rows) {
  const lines = [];
  for (const r of rows) {
    lines.push(`### [全网语义搜索 / Exa] ${r.q}`, '');
    if (r.error) { lines.push(`- ⚠️ Exa 语义搜索失败: ${r.error}`, ''); continue; }
    if (!r.items.length) { lines.push('（未抓到数据）', ''); continue; }
    for (const it of r.items) lines.push(`- **[${it.title || it.url}](${it.url})**${it.published ? ` — ${it.published}` : ''}`);
    lines.push('');
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log('📡 通过 last30days + agent-reach(Exa) 抓取社交聚合信号…\n');

  const keys = await detectKeys();
  const certFile = await resolveCertFile();
  console.log(`  key 检测: SCRAPECREATORS_API_KEY ${keys.scrapecreators ? '✓（启用 pinterest/tiktok）' : '✗（pinterest/tiktok 将标注 skipped-unconfigured）'}`);
  console.log(`  CA 证书: ${certFile || '未找到 certifi（last30days 的 HTTPS 调用可能失败）'}`);
  if (keys.xai) console.log('  检测到 XAI_API_KEY —— 按设计不接入 x（付费 + x.com 本网络不可达）');

  const topics = args.onlyTopic ? TOPICS.filter((t) => t.query === args.onlyTopic) : TOPICS;
  if (!topics.length) {
    console.error(`❌ --only-topic 未匹配任何主题: ${args.onlyTopic}`);
    console.error('   可用主题:\n' + TOPICS.map((t) => `   - ${t.query}`).join('\n'));
    process.exit(1);
  }

  const topicResults = [];
  for (const topic of topics) {
    console.log(`  → last30days: ${topic.query}（最长 6 分钟）…`);
    topicResults.push(await runTopic(topic, { days: args.days, keys, certFile }));
  }

  let exaResults = [];
  if (args.skipExa) {
    console.log('  → Exa: 已跳过（--skip-exa）');
  } else {
    console.log('  → Exa 语义搜索 ×2…');
    exaResults = await runExa();
  }

  const block = [
    BEGIN_MARKER,
    `## 社交聚合扫描（${nowStr()}）`,
    '',
    ...topicResults.map((r) => topicMd(r, { keys })),
    exaResults.length ? exaMd(exaResults) : '',
    END_MARKER,
  ].join('\n');

  const { file: outFile, action } = await mergeIntoRadar({
    outDir: OUT_DIR,
    block,
    beginMarker: BEGIN_MARKER,
    endMarker: END_MARKER,
    stamp: stamp(),
  });
  const actionLabel = { created: '新建', inserted: '追加到', replaced: '更新', appended: '追加到' }[action];

  const okTopics = topicResults.filter((r) => !r.error).length;
  const okExa = exaResults.filter((r) => !r.error).length;
  console.log(`\n✅ 社交聚合扫描完成，已${actionLabel} ${path.relative(ROOT, outFile)}`);
  console.log(`   last30days 主题: ${okTopics}/${topics.length} 成功`);
  if (!args.skipExa) console.log(`   Exa 查询: ${okExa}/${EXA_QUERIES.length} 成功`);
  console.log(`   原始 JSON: ${path.relative(ROOT, RAW_DIR)}/`);
  console.log('   若全部失败，排查: python3 ~/.claude/skills/last30days/scripts/last30days.py doctor --json');
  // 除写文件抛错外恒 exit 0：报告里的 ⚠️ 就是给定时任务看的诚实记录
}

main().catch((e) => { console.error('脚本出错:', e); process.exit(1); });
