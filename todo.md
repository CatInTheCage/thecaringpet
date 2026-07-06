# 宠物喂食网站下一阶段工作清单

> 详细的方法论和执行指南见 [STRATEGY.md](./STRATEGY.md)。本文档只保留具体待办事项和里程碑。

## 当前阶段判断

网站已正式上线（`thecaringpet.com`），技术架构、SEO 基础、核心内容已就绪。当前阶段从**内容播种期**进入**内容放量 + 权威建设期**。核心任务：**持续输出用户真正在搜的内容，并建立外部权威信号**。

---

## P0：持续输出高质量内容（最高优先级）

目标：每周 1-2 篇原创长文，3 个月内达到 30+ 篇深度内容。

### 已完成基础内容（8 篇）

- [x] `best-slow-feeder-dog-bowls.mdx`
- [x] `best-slow-feeder-for-large-dogs.mdx`
- [x] `best-puzzle-feeders-for-anxious-dogs.mdx`
- [x] `best-lick-mats-for-dogs.mdx`
- [x] `why-does-my-dog-eat-so-fast.mdx`
- [x] `ceramic-vs-plastic-slow-feeder.mdx`
- [x] `slow-feeder-bowl-size-guide.mdx`
- [x] `how-to-clean-slow-feeder-bowl.mdx`

### 新内容选题（接下来 10 篇，按优先级排序）

- [ ] **Best automatic cat feeders 2026**（猫咪内容缺口，高商业意图）
- [ ] **Best ceramic cat bowls**（猫咪内容缺口）
- [ ] **How to stop a dog from eating too fast: 7 vet-approved methods**（问题型长尾）
- [ ] **Best raised dog bowls for large breeds / arthritis**（护理导向）
- [ ] **Stainless steel vs ceramic dog bowls: which is safer?**（对比型）
- [ ] **Best interactive dog feeders for smart dogs**（评测型）
- [ ] **How much should I feed my dog by weight and age**（信息型大流量）
- [ ] **Best dog water fountains 2026**（扩展产品线）
- [ ] **Dog food bowl placement guide**（护理指南）
- [ ] **Best slow feeder bowls for flat-faced dogs**（长尾细分）

### 每篇文章标准

- [ ] 明确 1 个主关键词 + 3-5 个相关长尾词
- [ ] 至少 2000 字
- [ ] 包含 2-4 个 ProductCard 组件 + Amazon 联盟链接
- [ ] 包含对比表格
- [ ] 包含 FAQ 模块
- [ ] heroImage 使用真实/高质量产品图
- [ ] 添加内部链接指向相关文章和分类页
- [ ] 产品图必须与 ASIN 实际商品一致

---

## P1：建立外链和权威度（与 P0 并行，第 1 个月开始）

新站没有权重，外链是 Google 信任你的核心投票。

### 低门槛外链（本周可做）

- [ ] Reddit：在 r/dogs、r/puppy101、r/dogtraining、r/cats 真诚回答喂养问题，自然引用文章
- [ ] Quora：回答 "best slow feeder bowl"、"why does my dog eat fast" 等问题
- [ ] Pinterest：为每篇文章制作 3-5 张竖版 Pin 图，链接回网站
- [ ] 社交媒体账号：Twitter/X 或 Instagram 作为辅助分发渠道

### 中等难度外链（第 2-3 个月）

- [ ] 列出 10-20 个宠物/狗狗领域可投稿的博客
- [ ] 撰写 1-2 篇客座博客投稿（guest post）
- [ ] 找到 10 个宠物资源推荐页，联系站长推荐内容
- [ ] 每月目标：5-10 条相关外链

### 高价值外链（持续）

- [ ] HARO / Qwoted / Help a B2B Writer：以宠物喂养专家身份投稿，争取媒体引用
- [ ] 联系小型宠物博主，请求评测或引用你的研究文章

---

## P2：关键词研究和搜索意图

不要凭感觉写内容，要写用户正在搜的内容。

- [ ] 用 Google 自动补全收集 50+ 长尾关键词
- [ ] 用 Google "People Also Ask" 为每篇文章扩展 FAQ
- [ ] 用 AnswerThePublic / Ubersuggest / Ahrefs Free 验证搜索量
- [ ] 分析前 10 名竞争对手：他们写了什么、缺了什么、你能写得更好吗？
- [ ] 建立关键词映射表：主关键词 → 文章标题 → 搜索意图（信息/商业/交易）

### 选词原则

- 优先长尾、低竞争、有商业意图的词
- 新站避免正面竞争 "dog food" 这种大词
- 优先 "best xxx for xxx"、"how to xxx"、"xxx vs xxx"

---

## P3：EEAT 优化（YMYL 领域必须做）

宠物健康是影响用户健康/金钱的领域，Google 对 EEAT（经验、专业、权威、可信）很严格。

- [ ] 完善 About 页面：介绍研究团队背景、内容审核标准、兽医咨询来源
- [ ] 每篇文章底部添加作者信息（可用默认作者 + 研究审核说明）
- [ ] 引用真实研究、兽医机构（AVMA、AKC、AAHA、Cornell 等）
- [ ] 保持 Affiliate Disclosure 明显且完整
- [ ] 产品评测基于真实 ASIN，图片与产品一致
- [ ] 添加 " medically reviewed by" 或 "veterinary sources" 标注（如有可能）

---

## P4：SEO 技术维护（已完成大部分，定期维护）

- [x] 域名购买并绑定 Cloudflare Pages
- [x] Google Analytics 4 安装
- [x] Google Search Console 验证并提交 sitemap
- [x] Bing Webmaster Tools 提交
- [x] 修复标题重复问题
- [x] 添加 favicon.ico 和自定义 404 页面
- [x] 修复年龄计算器分享功能
- [ ] 压缩 `public/images/` 中图片（TinyPNG/Squoosh），输出 WebP 备用
- [ ] 删除未使用资源：`src/assets/fonts/` 和 `src/assets/blog-placeholder-*.jpg`
- [ ] 检查每篇文章 meta description 是否包含主关键词
- [ ] 跑 PageSpeed Insights，移动端目标 ≥90 分
- [ ] 检查所有内部链接是否以 `/` 结尾
- [ ] 监控 Search Console "页面" 报告，修复抓取/索引错误

---

## P5：变现和增长基础设施

- [x] 重构占位符：Amazon tag、ConvertKit URL、GA ID 已集中到 `src/consts.ts`
- [x] 申请 Amazon Associates 账号
- [x] 制作免费 lead magnet：《Dog Feeding Safety Checklist》PDF
- [ ] 替换 `src/consts.ts` 中的 `AMAZON_ASSOCIATES_TAG`（确认已替换为真实 tag）
- [ ] 注册 ConvertKit / Mailchimp 并替换 `CONVERTKIT_FORM_URL`
- [ ] 设置邮件订阅自动化：下载 checklist → 进入欢迎序列 → 推送精选文章

---

## P6：收录索引（非核心，顺手做）

- [x] 提交 sitemap 到 Google 和 Bing
- [x] 手动请求编入索引：首页 + 5 个核心页面
- [ ] 分批提交剩余页面（文章 → 分类/工具 → 静态页），每天不超过 10 个

> **提醒**：手动提交只是加速收录，不决定排名。即使不手动提交，Google 也会通过 sitemap 和外链自然发现页面。

---

## 4 周执行节奏

| 周次 | 重点任务 |
|------|---------|
| 第 1 周 | 输出 2 篇新文章（猫咪方向）+ Reddit/Quora 回答 5 个问题 + Pinterest 发 10 个 Pin |
| 第 2 周 | 输出 2 篇狗狗长尾文章 + 压缩图片 + 清理未使用资源 |
| 第 3 周 | 输出 1 篇 3000+ 字支柱内容 + 联系 3-5 个宠物博主 + 完善 About 页面 |
| 第 4 周 | 更新 2 篇旧文章 + 检查 Search Console 数据 + 制定下月关键词清单 |

---

## 关键提醒

1. **内容数量 > 完美主义**：先保证每周稳定输出，再追求完美。
2. **外链和内容同等重要**：没有外链，Google 不会信任新站。
3. **长尾词优先**：不要碰 "dog food" 这种大词，先从 "best slow feeder bowl for large dogs" 开始。
4. **坚持 6 个月再评估**：SEO 见效周期通常是 3-6 个月，前 3 个月流量低是正常的。
5. **不要买垃圾外链**：会被 Google 惩罚， manual outreach 才是王道。

记录时间：2026-07-06

---

## 已完成里程碑

- [x] 2026-06-24：8 篇核心文章重写完
- [x] 2026-06-26：品牌重塑为 The Caring Pet，绑定 thecaringpet.com
- [x] 2026-07-04：域名购买、Amazon Associates、GA4、GSC、Bing WMT 全部完成
- [x] 2026-07-05：修复标题重复、favicon.ico、自定义 404 页面
- [x] 2026-07-06：修复年龄计算器分享功能
