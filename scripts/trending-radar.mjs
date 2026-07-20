// 每日热点聚合脚本 — 抓取宠物健康领域的实时信号源（RSS），聚合成一份选题候选单
// 零依赖：只用 Node 22 内置 fetch + 简易 XML 解析
// 用法: node scripts/trending-radar.mjs
// 输出: content-ideas/radar-YYYY-MM-DD.md

import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'content-ideas');

// === 信号源 ===
// 召回源几经改版：FDA/AVMA 的 RSS 已失效或上 WAF 反爬（2026-07-17 实测）。
// openFDA food/enforcement 数据本质上只覆盖人类食品召回，过滤 pet/dog/cat 会误报无关召回，不可用。
// 现用 Petful 召回追踪页（HTML，聚合 FDA+厂商宠物召回，实时更新）+ Pet Poison Helpline RSS。
// 抓取失败会在报告里标注 ❌，不中断整体流程。
const SOURCES = [
  {
    type: 'petful',
    group: '召回 / 紧急',
    name: 'Petful 宠物食品召回追踪',
    url: 'https://www.petful.com/recalls/',
    feed: 'https://www.petful.com/recalls/',
    note: '聚合 FDA+厂商宠物食品召回，实时更新。新召回一出 → 加 toxin 数据 或 写召回解析时效文（内链到对应 toxin 页）。',
  },
  {
    type: 'rss',
    group: '毒素 / 季节性危险',
    name: 'Pet Poison Helpline 博客',
    url: 'https://www.petpoisonhelpline.com/category/blog/',
    feed: 'https://www.petpoisonhelpline.com/feed/',
    note: '季节性毒素预警、新中毒趋势。看是否有新毒素要加进 src/data/toxins/。',
  },
];

// 其他召回源人工核对（无可用自动 feed）：
//   - FDA 动物兽医召回: 页面路径已 404，FDA 改版中
//   - AVMA: https://www.avma.org/resources-tools/animal-health-and-welfare/pet-food-recalls （被 Incapsula WAF 拦）
//   - ASPCA: https://www.aspca.org/news （无可用 RSS）

// === 极简 RSS/Atom XML 解析 ===
// 只取 item/entry 的 title + link + pubDate/published/updated + description/summary
function parseFeed(xml, sourceName) {
  const items = [];
  // 兼容 RSS <item> 和 Atom <entry>
  const entryRe = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null) {
    const block = m[1];
    const title = pick(block, 'title');
    let link = pick(block, 'link');
    // Atom 的 link 在 href 属性里
    if (!link) {
      const lm = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/);
      if (lm) link = lm[1];
    }
    const date = pick(block, 'pubDate') || pick(block, 'published') || pick(block, 'updated') || '';
    const desc = stripTags(pick(block, 'description') || pick(block, 'summary') || '').slice(0, 280);
    if (title) items.push({ title: decodeEntities(title).trim(), link: decodeEntities(link).trim(), date, desc });
  }
  return items;
}

function pick(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = block.match(re);
  return m ? m[1].trim() : '';
}
function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))) // &#x27; 等
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))                       // &#038; 等
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

// 抓单个源，失败返回 { error }
async function fetchSource(src) {
  if (src.type === 'petful') return fetchPetful(src);
  return fetchRss(src);
}

async function fetchRss(src) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(src.feed, {
      headers: { 'User-Agent': 'TheCaringPet-TrendingRadar/1.0 (+https://thecaringpet.com)' },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    clearTimeout(t);
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const xml = await res.text();
    const items = parseFeed(xml, src.name);
    if (!items.length) return { error: '解析后无条目（可能 feed URL 已变更）' };
    return { items: items.slice(0, 8) }; // 每源最多 8 条
  } catch (e) {
    return { error: e.name === 'AbortError' ? '超时 12s' : (e.message || String(e)) };
  }
}

// Petful 召回追踪页：HTML，解析召回条目（<h3> 标题 + 旁边日期）。
// 页面结构 2026-07-17 实测：召回条目标题为 <h3 class="font-bold text-dark truncate">…</h3>，
// 日期为 "Month DD, YYYY" 文本。按出现顺序即为最新→最旧。
const MONTHS = { January:1, February:2, March:3, April:4, May:5, June:6, July:7, August:8, September:9, October:10, November:11, December:12 };
async function fetchPetful(src) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch(src.feed, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    clearTimeout(t);
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const html = await res.text();
    // 抓所有召回标题（h3 带 truncate class）
    const titleRe = /<h3[^>]*class="[^"]*font-bold[^"]*truncate[^"]*"[^>]*>([\s\S]*?)<\/h3>/g;
    const titles = [];
    let m;
    while ((m = titleRe.exec(html)) !== null) {
      const t = decodeEntities(stripTags(m[1])).trim();
      if (t) titles.push(t);
    }
    // 抓所有日期 "Month DD, YYYY"
    const dateRe = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(20\d{2})\b/g;
    const dates = [];
    while ((m = dateRe.exec(html)) !== null) {
      const mo = String(MONTHS[m[1]]).padStart(2, '0');
      const da = String(+m[2]).padStart(2, '0');
      dates.push(`${m[3]}-${mo}-${da}`);
    }
    if (!titles.length) return { error: '页面结构已变更，未解析到召回标题' };
    // 页面按最新→最旧排列。标题和日期不一定严格一一对应，
    // 所以不强制配对：取最近 10 条标题，日期能就近配上就配、配不上留空。
    const items = titles.slice(0, 10).map((title, i) => ({
      title,
      link: src.url,
      date: dates[i] || '',
      desc: '',
    }));
    return { items };
  } catch (e) {
    return { error: e.name === 'AbortError' ? '超时 15s' : (e.message || String(e)) };
  }
}

// 过滤近 N 天的条目（按日期字符串粗筛；解析不了日期的就保留）
function withinDays(dateStr, days) {
  if (!dateStr) return true; // 解析不了日期 → 保留，避免漏掉
  const t = Date.parse(dateStr);
  if (isNaN(t)) return true;
  return (Date.now() - t) / 86400000 <= days;
}

function stamp() {
  // 不用 new Date() 的复杂格式，直接拼 YYYY-MM-DD（脚本环境允许 new Date()，这里是普通 Node 非 workflow）
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

async function main() {
  console.log('📡 正在抓取宠物健康热点信号源…\n');
  await mkdir(OUT_DIR, { recursive: true });

  // 串行抓取（并发 fetch 在某些源上会偶发 handshake 失败）
  const results = [];
  for (const src of SOURCES) {
    const r = await fetchSource(src);
    results.push({ src, ...r });
  }

  // 打印到控制台
  for (const r of results) {
    console.log(`\n=== [${r.src.group}] ${r.src.name} ===`);
    console.log(`    ${r.src.feed}`);
    if (r.error) {
      console.log(`    ❌ 抓取失败: ${r.error}`);
      continue;
    }
    // 召回类：展示全部解析到的条目（看趋势，不限 30 天）；毒素类：近 30 天
    const isRecall = r.src.group.includes('召回');
    const recent = r.items.filter((it) => withinDays(it.date, 30));
    const shown = isRecall ? r.items.slice(0, 10) : (recent.length ? recent : r.items).slice(0, 6);
    for (const it of shown) {
      const d = it.date ? ` (${it.date.slice(0, 16)})` : '';
      console.log(`    • ${it.title}${d}`);
      if (it.desc) console.log(`      ${it.desc}`);
    }
  }

  // 生成 Markdown 报告
  const lines = [];
  lines.push(`# 热点扫描报告 ${stamp()}`);
  lines.push('');
  lines.push('> 由 \`scripts/trending-radar.mjs\` 自动生成。供选题参考，非实时抓取的最终结论。');
  lines.push('> 抓取失败的源用 ❌ 标注（feed URL 可能变更，需人工核对）。');
  lines.push('');
  lines.push('> ⚠️ **召回日期警示**：Petful 列表页显示的日期是"最后核查日"（如 2026-07-17），');
  lines.push('> **不是召回发生日**。写召回文前必须点进详情页核实真实的 FDA 公告/警告信日期。');
  lines.push('> （2026-07-19 实测：Answers 召回列表显示 07-17，实际 FDA 警告信日期是 2025-06-18。）');
  lines.push('');
  lines.push('## 信号源快照');
  lines.push('');

  let anyRecall = false;
  for (const r of results) {
    lines.push(`### [${r.src.group}] ${r.src.name}`);
    lines.push(`- 主页: ${r.src.url}`);
    lines.push(`- Feed: ${r.src.feed}`);
    lines.push(`- 用途: ${r.src.note}`);
    if (r.error) {
      lines.push(`- ❌ **抓取失败**: ${r.error}`);
      // 召回源失败也要标红，因为可能漏掉紧急召回
      if (r.src.group.includes('召回')) anyRecall = true;
      lines.push('');
      continue;
    }
    const isRecallMd = r.src.group.includes('召回');
    const recent = r.items.filter((it) => withinDays(it.date, 30));
    const shown = isRecallMd ? r.items.slice(0, 10) : (recent.length ? recent : r.items).slice(0, 6);
    if (isRecallMd && shown.length) {
      // 有召回条目就标记，提示人工核对是否要写时效文 / 加 toxin
      anyRecall = true;
    }
    lines.push('');
    for (const it of shown) {
      const d = it.date ? ` — ${it.date.slice(0, 16)}` : '';
      lines.push(`- **[${it.title}](${it.link})**${d}`);
      if (it.desc) lines.push(`  ${it.desc}`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## 下一步行动建议');
  lines.push('');
  if (anyRecall) {
    lines.push('⚠️ **有召回信号 / 召回源抓取异常** — 人工核对最新召回：');
    lines.push('  1. 确认是否需要在 `src/data/toxins/` 加 toxin 数据');
    lines.push('  2. 是否写一篇"召回解析 + 主人该怎么做"时效文（内链到对应 toxin 页）');
    lines.push('  3. 召回文时效权重高，发得快能截流量');
    lines.push('');
  }
  lines.push('**选题四路信号补充（脚本未覆盖，需人工或 Claude 跑）**:');
  lines.push('- Google Trends: trends.google.com → 搜 "cat food"/"dog feeder" → Related queries → Rising');
  lines.push('- GSC: 哪些查询带来曝光但没点击 → 旧文加厚信号');
  lines.push('- Reddit: r/CatAdvice r/Cats r/dogs r/PetFood 按 week 排序看高频提问');
  lines.push('- Amazon BSR: 评测过的品类 BSR 异常上升的 SKU');
  lines.push('- Pinterest Trends: trends.pinterest.com');
  lines.push('');
  lines.push('**已验证高需求聚类**: cat-age → 扩主题簇（猫寿命/老年猫护理/各阶段喂养/猫牙齿年龄），与 cat-years-to-human-years 文章 + cat-age-calculator 互链。');
  lines.push('');

  const outFile = path.join(OUT_DIR, `radar-${stamp()}.md`);
  await writeFile(outFile, lines.join('\n'), 'utf8');
  console.log(`\n✅ 报告已生成: ${path.relative(ROOT, outFile)}`);
  console.log(`   共 ${results.length} 个源，${results.filter((r) => !r.error).length} 个抓取成功，${results.filter((r) => r.error).length} 个失败。`);
  if (anyRecall) console.log('   ⚠️ 检测到召回信号或召回源异常，请人工核对。');
}

main().catch((e) => {
  console.error('脚本出错:', e);
  process.exit(1);
});
