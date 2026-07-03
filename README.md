# The Caring Pet（贴心宠物）

基于科研依据的宠物喂养指南与产品测评网站，帮助主人为自家毛孩子做出更明智的决策。

- 站点：[thecaringpet.com](https://thecaringpet.com)
- 技术栈：[Astro 7](https://astro.build) 静态站点
- 部署：每次推送到 `main` 自动部署到 **Cloudflare Pages**

## 项目简介

The Caring Pet 是一个内容型独立站，主打**慢食碗、益智喂食器、舔食垫**等宠物喂养相关的研究型指南和带联盟（affiliate）链接的产品测评。站点采用静态生成，主要内容为博客文章，并按分类组织。

待发布的文章主题包括：

- 狗狗为什么吃得太快
- 最佳慢食狗碗推荐
- 大型犬慢食碗推荐
- 缓解焦虑的益智喂食器
- 狗狗舔食垫推荐
- 陶瓷 vs 塑料慢食碗对比
- 慢食碗尺寸选购指南
- 如何清洗慢食碗

## 环境要求

- Node.js **>= 22.12.0**（版本由 `.nvmrc` 固定为 `22`，Cloudflare 构建时会读取该文件）

## 常用命令

所有命令均在项目根目录下运行：

| 命令               | 说明                                            |
| :----------------- | :---------------------------------------------- |
| `npm install`      | 安装依赖                                        |
| `npm run dev`      | 启动本地开发服务器 `http://localhost:4321`      |
| `npm run build`    | 构建生产版本到 `./dist/`                        |
| `npm run preview`  | 部署前本地预览构建结果                          |
| `npm run astro ...`| 运行 Astro CLI 命令（如 `astro check`）          |

> 提交前请用 `npm run build` 校验改动（这是唯一的校验关卡，项目未配置 lint/test）。由于静态产物行为与开发服务器不同（尤其是结尾斜杠处理），建议用 `npm run preview` 验证构建结果。

## 目录结构

```text
├── public/                 # 静态资源（图片、favicon 等）
│   └── images/
├── src/
│   ├── assets/             # 起始模板遗留的占位图与字体
│   ├── components/         # Astro 组件（Header、Footer、ProductCard 等）
│   ├── content/
│   │   └── blog/           # 博客文章（Markdown / MDX）
│   ├── layouts/            # Page.astro、BlogPost.astro 布局
│   ├── pages/              # 路由页面
│   ├── styles/             # 全局样式 global.css
│   ├── consts.ts           # 站点全局常量
│   └── content.config.ts   # 内容集合 schema 定义
├── astro.config.mjs        # output: 'static'，trailingSlash: 'always'
├── package.json
└── tsconfig.json
```

## 重要约定

### 结尾斜杠

`astro.config.mjs` 设置了 `trailingSlash: 'always'`，因此**所有内部链接都必须以 `/` 结尾**（如 `/blog/`、`/about/`、`/categories/best-picks/`）。缺少结尾斜杠会在静态构建中导致 404。

- 文章链接：`/blog/${post.id}/`（`post.id` 为去掉扩展名的文件名）
- 分类链接：`/categories/${cat.slug}/`

### 内容集合（博客）

文章存放于 `src/content/blog/`，frontmatter schema 定义于 `src/content.config.ts`：

| 字段          | 类型      | 说明                                     |
| :------------ | :-------- | :--------------------------------------- |
| `title`       | string    | 标题                                     |
| `description` | string    | 描述                                     |
| `pubDate`     | date      | 发布日期                                 |
| `updatedDate` | date      | 更新日期（可选）                         |
| `heroImage`   | string    | 头图，默认 `/images/hero.jpg`            |
| `categories`  | string[]  | 分类 slug 数组，默认 `[]`                |
| `author`      | string    | 作者，默认 "The Caring Pet Research Team"|
| `readingTime` | number    | 阅读时长（可选）                         |
| `featured`    | boolean   | 是否精选，默认 `false`                   |

文章通过 `getCollection('blog')` 查询，并按 `updatedDate || pubDate` 倒序排列。

### 分类系统

有效的分类 slug 共四个：`best-picks`、`pet-knowledge`、`problem-solving`、`care-guides`。

分类信息在以下三处硬编码，修改时必须保持同步：

1. `src/pages/index.astro` — 首页分类网格
2. `src/pages/blog/index.astro` — 文章列表筛选标签
3. `src/pages/categories/[slug].astro` — 分类元数据与 `getStaticPaths`

## 上线前需替换的占位符

正式上线前，请替换以下占位值：

- `src/consts.ts` 中的 `GA_TRACKING_ID`（Google Analytics）
- `src/components/NewsletterForm.astro` 中的 `PLACEHOLDER_CONVERTKIT_ACTION_URL`（ConvertKit 邮件订阅）
- `src/components/ProductCard.astro` 中的 `PLACEHOLDER_AMAZON_TAG-20`（Amazon 联盟标签）

## 部署

站点托管在 **Cloudflare Pages**，每次推送到 `main` 分支自动触发构建：Cloudflare 运行 `npm run build` 并发布 `dist/` 目录。Node 版本由 `.nvmrc`（`22`）和 `package.json` 的 `engines`（`>=22.12.0`）共同约束——请保持 `.nvmrc` 满足 engines 下限，否则构建会失败。项目不使用 GitHub Actions。
