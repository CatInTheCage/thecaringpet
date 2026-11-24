#!/usr/bin/env node
// 痛点采集主控：四路串行 → 统一原始 JSON → manifest。
// 用法：
//   npm run pain                                  # 全量（~30-45 分钟）
//   npm run pain -- --only=reddit                 # 单路
//   npm run pain -- --only=amazon --task=B00FPKNRG4
//   npm run pain -- --only=quora-google "--task=suggest:why does my cat"
//   npm run pain -- --only=trends "--task=slow feeder dog bowl"
// 输出：content-ideas/raw/pain-points/YYYY-MM-DD/{manifest,reddit,amazon,quora-google,trends}.json + source/
// 红线：只采集，不分析；失败诚实落盘；单路失败不影响他路；仅参数错误/写盘失败才 exit 1。
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectReddit } from './sources/reddit.mjs';
import { collectAmazon } from './sources/amazon.mjs';
import { collectGoogle } from './sources/google.mjs';
import { collectTrends } from './sources/trends.mjs';
import { createWebbridge } from './lib/webbridge.mjs';
import { WEBBRIDGE_SESSION } from './config.mjs';
import { ensureDir, writeJsonAtomic, readJsonSafe, stamp, nowIso } from './lib/runtime.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SOURCES = ['reddit', 'amazon', 'quora-google', 'trends'];

function parseArgs(argv) {
  const args = { only: null, task: null };
  for (const a of argv) {
    if (a.startsWith('--only=')) args.only = a.slice(7);
    else if (a.startsWith('--task=')) args.task = a.slice(7);
  }
  if (args.only && !SOURCES.includes(args.only)) {
    console.error(`❌ --only 必须是 ${SOURCES.join('|')} 之一（收到: ${args.only}）`);
    process.exit(1);
  }
  return args;
}

async function rebuildManifest(outDir, date) {
  const sources = {};
  for (const s of SOURCES) {
    const env = await readJsonSafe(path.join(outDir, `${s}.json`));
    if (!env) { sources[s] = { present: false }; continue; }
    let items = 0;
    let withQuotes = 0;
    let errors = (env.errors || []).length;
    let duration = 0;
    const statusCount = {};
    for (const r of env.runs || []) {
      items += r.items.length;
      withQuotes += r.items.filter((i) => (i.quotes || []).length).length;
      errors += r.errors.length;
      duration += r.duration_ms || 0;
      statusCount[r.status] = (statusCount[r.status] || 0) + 1;
    }
    sources[s] = { present: true, file: `${s}.json`, runs: (env.runs || []).length, status: statusCount, items, items_with_quotes: withQuotes, errors, duration_ms: duration };
  }
  const manifest = { schema_version: 'pain-radar.manifest.v1', date, generated_at: nowIso(), sources };
  await writeJsonAtomic(path.join(outDir, 'manifest.json'), manifest);
  return manifest;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = stamp();
  const outDir = path.join(ROOT, 'content-ideas', 'raw', 'pain-points', date);
  await ensureDir(outDir);
  const targets = args.only ? [args.only] : SOURCES;
  console.log(`📡 痛点采集 ${date} → ${path.relative(ROOT, outDir)}`);
  console.log(`   路数: ${targets.join(', ')}${args.task ? ` · task: ${args.task}` : ''}\n`);

  let wb = null;
  if (targets.some((t) => t !== 'reddit')) {
    wb = createWebbridge(WEBBRIDGE_SESSION);
    await wb.ensureDaemon(); // 浏览器路必需；连不上则抛错退出（reddit 单路不需要）
  }

  for (const s of targets) {
    const started = Date.now();
    try {
      let envelope;
      if (s === 'reddit') envelope = await collectReddit({ outDir, onlyTask: args.task });
      else if (s === 'amazon') envelope = await collectAmazon({ wb, outDir, onlyTask: args.task });
      else if (s === 'quora-google') envelope = await collectGoogle({ wb, outDir, onlyTask: args.task });
      else envelope = await collectTrends({ wb, outDir, gscRoot: path.join(ROOT, 'content-ideas', 'gsc'), onlyTask: args.task });
      // --task 单任务补跑：合并进现有平台文件（替换同 id 的 run，保留其他 runs），避免调试清掉已采数据。
      // --only 整路重跑（不带 --task）：整路替换。
      if (args.task) {
        const existing = await readJsonSafe(path.join(outDir, `${s}.json`));
        if (existing && Array.isArray(existing.runs) && existing.runs.length) {
          const newIds = new Set(envelope.runs.map((r) => r.id));
          const kept = existing.runs.filter((r) => !newIds.has(r.id));
          envelope.runs = [...kept, ...envelope.runs];
          envelope.errors = [...(existing.errors || []), ...(envelope.errors || [])];
        }
      }
      await writeJsonAtomic(path.join(outDir, `${s}.json`), envelope);
      const items = envelope.runs.reduce((n, r) => n + r.items.length, 0);
      console.log(`✅ ${s}: ${items} 条原始条目（${((Date.now() - started) / 60000).toFixed(1)} 分钟）\n`);
    } catch (e) {
      console.error(`❌ ${s} 路失败: ${e.message}`);
      await writeJsonAtomic(path.join(outDir, `${s}.json`), {
        schema_version: 'pain-radar.raw.v1', platform: s, collected_at: nowIso(), target_min_items: 10, runs: [],
        errors: [{ code: 'SOURCE_FATAL', message: String(e.message || e).slice(0, 500), timestamp: nowIso(), retryable: true }],
      });
    }
  }

  if (wb) await wb.closeSession(); // 与 radar:browser 既定惯例一致：跑完关闭本任务标签组

  const manifest = await rebuildManifest(outDir, date);
  console.log('📊 采集完整性:');
  for (const [s, m] of Object.entries(manifest.sources)) {
    if (!m.present) { console.log(`   ${s}: 未运行`); continue; }
    console.log(`   ${s}: ${m.items} 条（含原文引用 ${m.items_with_quotes}）· runs ${m.runs} · 错误 ${m.errors}`);
  }
  console.log(`\n下一步：对 Claude 说「按 scripts/pain-radar/ANALYSIS.md 分析 ${date} 的 pain-points 原始数据，生成本周痛点报告」。`);
  console.log('⚠️ 原始条目数 ≠ 有效痛点数；不足 10 条或采集失败会在报告里标 ⚠️，不凑数。');
}

main().catch((e) => { console.error('脚本出错:', e); process.exit(1); });
