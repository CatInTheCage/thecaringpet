# 痛点周报分析 SOP（Claude 每周三执行）

采集脚本（`npm run pain`）只产出原始数据。**你（Claude）负责分析**：过滤、聚类、评分、选题、写报告。
本周原始数据：`content-ideas/raw/pain-points/<YYYY-MM-DD>/`（下文称 `$DIR`）。
输出报告：`content-ideas/pain-points-<YYYY-MM-DD>.md`。

## 红线（违反任何一条 = 报告作废）

1. **引用必须可溯源**：每条"用户原话引用"必须能在 `$DIR` 对应 raw item 中找到**连续逐字子串**，且 URL 一致。不改拼写、不翻译、不补词、不合并两句。要缩短就取更短的连续片段（可用 `…` 标注首尾截断，但中间不能断）。
2. **不足不凑数**：任何平台有效痛点 <10 条，只写真实行并在表头和"采集完整性"标 ⚠️。禁止编造条目、频率、链接、趋势。
3. **标题不冒充正文**：`title_only` 的 Reddit 帖不能引用正文（没有正文）；Suggest/PAA/Trends/GSC 的查询词只能标"搜索查询词"，不能写成"用户发帖说"。
4. **失败必须可见**：采集错误（manifest / runs[].errors）全部进入报告第 1 节和第 9 节，不得淡化。
5. **选题必须查重**：见第 4 节。Top3 不允许与现有文章搜索意图重复。

## 1. 输入与完整性检查

按顺序读：

1. `$DIR/manifest.json` — 每路 items / items_with_quotes / errors / status。某路 `present:false` 或 `SOURCE_FATAL` → 该路报告写"采集失败"并标 ⚠️，不要留空不说话。
2. `$DIR/reddit.json`、`amazon.json`、`quora-google.json`、`trends.json` — 标准化条目。
3. `$DIR/source/**` — 只在核对引用时读（文件大，按需）。
4. 最新 GSC 快照：`content-ideas/gsc/<最新日期>/查询数.csv` 和 `网页.csv`。
5. `src/content/blog/` 全部文章的 frontmatter（title/description/categories），必要时 grep H2。

过滤规则：

| 平台 | 剔除 | 注意 |
|---|---|---|
| reddit | 晒宠/meme/纯标题（`metadata.title_only`）、非猫狗（鱼缸/乌龟 feeder 等）、与宠物痛点无关（中国食品安全等） | `body_kind:"selftext"` 的可引用正文；`top_comments` 有值时可引用评论（kind:"comment"） |
| amazon | `rating` 为空的条目优先剔除 | **样本是 Top reviews（好评偏差）**：≤4 星优先；5 星只取含对比/抱怨信号的（"I had a metal slow feeder and…"、"the only bowl that actually…"里的旧方案不满）。频率表述不得外推为真实差评率 |
| quora_question | 非 quora.com、Arduino 等技术 DIY、明显 SEO 垃圾问题 | 标题=用户提问原话可引用（标"问题标题"）；`serp_snippet` 是 Google 摘要不是回答全文 |
| suggest / paa | 调查问卷残留、与宠物无关 | 只能标"搜索查询词" |
| trend | `list_type:"unknown"` 的不得写成"上升" | 相对热度非搜索量 |
| gsc_context | — | **不是 Trends、不是上升数据**；引用列写 `—` |

去重：先按 canonical URL 去重，再按"问题 + 场景 + 期望结果"跨平台聚类（同一痛点在多平台出现时合并为一个需求，证据并列）。

目标：每平台 10–15 个有效痛点。Quora/Google 表中 Quora ≥2 条、PAA ≥2 条（有数据时），别让 Suggest 占满。

## 2. 引用审计（机械化，必做）

写报告前，对准备引用的每条 quote 验证 raw_ref。可用此模式抽查（至少 20 条，Top10 涉及的全部必查）：

```bash
cd <repo> && node -e '
const fs = require("fs");
const dir = "content-ideas/raw/pain-points/<YYYY-MM-DD>";
const env = JSON.parse(fs.readFileSync(dir + "/reddit.json", "utf8")); // 换平台文件名
for (const run of env.runs) for (const it of run.items) for (const q of it.quotes || []) {
  const raw = JSON.parse(fs.readFileSync(dir + "/" + q.raw_ref.file, "utf8"));
  const val = q.raw_ref.pointer.split("/").filter(Boolean).reduce((o, k) => o && o[k], raw);
  const ok = typeof val === "string" && val.includes(q.text.slice(0, 60));
  if (!ok) console.log("MISMATCH:", it.url, q.raw_ref.pointer);
}
console.log("audit done");
'
```

`gsc_context` 的 raw_ref.file 是 `gsc/<date>/查询数.csv`（CSV 不是 JSON），pointer 为 `query: <查询词>`——用查询词文本在 CSV 中定位核对（**不要用行号**：查询词含引号/换行时逻辑行与物理行会错位，2026-11-24 实测偏差 1 行）。
引用 Top reviews 的 Amazon 评论时，URL 用 item.url（页面原样评论链接）。

## 3. GSC 交叉验证

- 对每个候选 Top 需求，在 `查询数.csv` 搜关键词及同义变体，记录真实 clicks / impressions / position 写进"发生频率信号"（如"GSC 近 3 月相关查询曝光 1.2K"）。
- **不得**把多个相似查询的 impressions 加成"搜索量"；不得把查询与具体页面逐行关联（查询表无 page 列）。
- `网页.csv` 只用于判断现有页面整体表现与更新优先级。
- 快照日期超过 45 天 → 时效佐证降级或不用。GSC 不额外加分，只影响 F/T 判断。

## 4. 选题查重（33 篇，2026-11-24 清单）

每个候选选题标 **New / Update / Section** 之一：
- **Update**：搜索意图已被某篇覆盖 → 更新该文（加厚/加 FAQ/换标题）。
- **Section**：只是某篇的子问题 → 加成该文章节或 FAQ，不开新文。
- **New**：人群、场景或决策意图明显不同，能用一句话写出差异化。

强制冲突检查（出现以下意图时默认不是 New）：

| 意图 | 已有文章 |
|---|---|
| 泛狗吃太快 | why-does-my-dog-eat-so-fast |
| 慢食碗清洁 | how-to-clean-slow-feeder-bowl |
| 慢食碗尺寸/大狗 | slow-feeder-bowl-size-guide、best-slow-feeder-for-large-dogs |
| 陶瓷 vs 塑料慢食碗 | ceramic-vs-plastic-slow-feeder |
| 泛慢食碗选购 | best-slow-feeder-dog-bowls |
| 喂食器断网/停电 | do-automatic-pet-feeders-need-wifi |
| 自动喂食器选购 | best-automatic-cat-feeders-2026 |
| 多猫偷粮/microchip | best-microchip-cat-feeders-2026、resident-cat-bullying-new-kitten |
| 饮水机选购 | best-cat-water-fountains-2026 |
| 陶瓷猫碗 | best-ceramic-cat-bowls-2026 |
| lick mat / 嗅闻垫 / 益智玩具 | best-lick-mats-for-dogs、best-snuffle-mats-for-dogs-2026、best-puzzle-feeders-for-anxious-dogs |
| 猫不吃东西（老年/肾病） | senior-cat-kidney-disease |
| 喂药 | how-to-give-a-cat-a-pill |
| 猫年龄/寿命/老年护理 | cat-years-to-human-years、why-some-cats-live-to-20、adopting-a-senior-cat、senior-cat-pain-signs、when-to-say-goodbye-senior-cat |
| 新猫/新狗清单 | new-cat-owner-checklist、new-puppy-essentials-checklist |
| 尿频/尿闭 | cat-straining-to-pee |
| 猫肢体语言 | cat-body-language-guide |
| 毒素（节日/空气清新剂/召回） | halloween/thanksgiving/christmas-*、are-plug-in-air-fresheners-toxic-to-cats、*-recall-*、answers-pet-food-fda-warning-salmonella-listeria、why-so-many-pet-food-recalls-2026 |

Top3 若为 Update，标题给修订标题并标 `Update: /blog/<slug>/`，不伪装新文。

## 5. 需求强度评分（1–10）

五维各打 1–10，加权：

```
总分 = round(0.30×F + 0.25×P + 0.20×C + 0.15×S + 0.10×T)
```

| 维度 | 权重 | 锚点 |
|---|---|---|
| F 频率 | 30% | 1–2 单个弱信号；4–5 多条独立条目或两个平台；6–7 5–8 条且≥2 平台；8–9 ≥3 平台且有 GSC/Trends 佐证；10 多周多平台一致 |
| P 痛苦度 | 25% | 1–2 好奇；3–4 轻微不便；5–6 反复清洁/浪费钱粮；7–8 漏餐、焦虑、破坏、明显健康担忧；9–10 紧急安全风险 |
| C 商业契合 | 20% | 1–2 无伦理产品契合；3–4 间接；5–6 相邻类目；7–8 现有 ASIN 可解决部分；9–10 直接且诚实的购买决策 |
| S 站点契合 | 15% | 1–2 偏站；5–6 护理健康；7–8 现有内容簇；9–10 核心变现簇且意图可区分 |
| T 时效 | 10% | 1–2 无日期；5 近 30 天；7–8 近 7 天多次出现或 rising；9–10 Breakout/已核实紧急事件 |

限制：
- 单一平台来源 F 最高 6；Quora-only 交叉验证前 F 最高 4。
- 无日期证据 T 最高 5。
- 医疗紧急程度**不**转化为高商业分（急症场景 C 通常 ≤3）。
- 跨平台聚类的同一痛点用同一总分，各平台表内评分一致。
- Top10 按总分降序；平分依次比独立平台数、P、C。
- **Top3 必须 ≥2 个独立信号来源 + ≥1 条 Reddit/Amazon/Quora 真实文本证据**。

## 6. 报告模板（严格按此结构）

文件：`content-ideas/pain-points-<YYYY-MM-DD>.md`

```markdown
# 每周真实用户痛点与内容机会 <YYYY-MM-DD>

> 数据：content-ideas/raw/pain-points/<date>/（采集脚本只产原始数据，分析为 Claude 生成）。
> 引用均可溯源（raw_ref + URL）；评分是启发式判断，不是搜索量。

## 1. 采集完整性
| 平台 | 原始条目 | 有效痛点 | 有原文引用条目 | 状态/警告 |
（manifest 数字 + ⚠️：Amazon Top-reviews 好评偏差、Trends 是否 GSC 降级、各路过期/失败）

## 2. Reddit 痛点（≥10 或 ⚠️）
| 需求描述 | 来源平台/帖子 | 用户原话引用 | 发生频率信号 | 现有糟糕方案 | 对应的内容选题 | 可推荐的亚马逊产品类目 | 需求强度评分(1-10) |

## 3. Amazon 评论痛点（≥10 或 ⚠️）
（同八列；频率信号写"X/16 ASIN 出现同类抱怨"而非差评率）

## 4. Quora / Google 痛点（≥10 或 ⚠️；Quora≥2、PAA≥2）
（同八列；Suggest/PAA 行的原话列标"搜索查询词"）

## 5. Google Trends / 需求趋势（≥10 或 ⚠️；GSC 降级时表头改名并注明）
（同八列；GSC 降级行引用列写 —）

## 6. Top 10 最强需求（按强度排序）
| 排名 | 需求 | 总分 | F/P/C/S/T | 独立证据（平台数+URL） | 建议动作（New/Update/Section） |

## 7. Top 3 内容选题
### 1. <需求名>
- English SEO Title: "<恰好一个标题>"
- Primary keyword / search intent:
- New / Update / Section（Update 标 /blog/<slug>/）:
- 查重与差异化说明:
- 证据 URL（≥2 独立来源 + ≥1 真实文本）:
### 2. …
### 3. …

## 8. 巨头没做好、细分市场空白的候选机会
| 细分需求 | 重复证据 | 现有方案失败点 | 空白假设 | 验证状态（待 SERP 验证） |

## 9. 可能踩的坑 + 采集错误与证据说明
```

第 8 节"空白"只能写**候选**：需同时满足 重复抱怨（≥3 条独立证据）+ 现有方案失败点明确 + 细分场景具体 + 查重后非重复选题。未做 SERP 实测一律标"待 SERP 验证"。

第 9 节固定包含：
- **Amazon 评论仅内部研究用，不能复制进公开文章**（Amazon ToS + 版权）；Top-reviews 好评偏差、变体合并问题、近期差评≠整体故障率。
- Reddit 原话公开引用须改写、匿名、去身份信息；敏感医疗故事不直接引用。
- YMYL（医疗/毒素/急症）选题需兽医来源 + 免责声明；产品不能替代诊疗；操作示例只用猫狗专用食品，争议食物只以"避免"形式提及。
- Trends 0–100 / Rising / Breakout 是相对指标；GSC 降级数据不是趋势。
- Quora 有 SEO 垃圾问题；Suggest/PAA 有个性化与地区偏差，需跨源验证。
- GSC 快照含无关查询（AI 合成查询假象），查询表无 page 列。
- 选题查重（2026-10-16 猫寿命文自相残杀教训）。
- 抓不到就标 ⚠️，不伪造。
- 本周 runs[].errors 逐条列出（平台、task、code、message）。

## 7. 每周运行（用户视角）

```bash
npm run radar:all   # = 召回RSS(保留) + 四路痛点采集（~30-45 分钟，浏览器开标签组）
# 然后对 Claude 说：
# 「按 scripts/pain-radar/ANALYSIS.md 分析今天的 pain-points 原始数据，生成今天的痛点周报」
```

某路失败：Amazon 遇验证码/Guard → 人工在浏览器里完成验证后 `npm run pain -- --only=amazon`；
Google 遇反爬 → 稍后 `npm run pain -- --only=quora-google`；
Trends 本机不可达是常态 → 自动 GSC 降级，无需处理。
重跑某路只替换该路 JSON，manifest 自动重建。

## 8. 已知局限与后续研究项（2026-11-24 spike 记录）

- **Amazon**：评论页对所有过滤/排序/分页参数只返回固定 8 条 Top reviews；EdgeX Guard 偶发（等 15s 可过）；Customers-say insights 不可用。后续：研究水合早期星级过滤按钮（snapshot + click）、cdp trusted input。
- **Reddit**：last30days raw 约半数条目带正文（selftext 截 ~500 字符）；top_comments 评论增强常为空——可选增强：对高 engagement 帖用 webbridge 补抓正文+top comments。
- **Trends**：本机网络 widget XHR 不发（外壳可加载），三档降级中 GSC 是常态产出；有两份可比 GSC 快照后可算 `gsc_impression_delta`（展示变化代理，仍非 Trends）。
- **Suggest**：走浏览器是为复用系统代理；若 Node fetch 可直连可改直抓省时（未验证）。
