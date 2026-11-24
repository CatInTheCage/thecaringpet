# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is **The Caring Pet**, an Astro 7 static site for research-backed pet feeding guides and product reviews. It is built from the Astro blog starter template and deployed as a static site to Cloudflare Pages.

## Common commands

All commands run from the repository root:

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview the production build locally
npm run astro ...    # Run Astro CLI commands (e.g., astro check)
```

Use `npm run build` to validate changes before committing. Use `npm run preview` to verify the built site, because the static output behavior differs from the dev server (especially around trailing slashes). There is no lint or test tooling configured; `npm run build` (which runs `astro build`) is the only validation gate.

### Deployment

The site auto-deploys to **Cloudflare Pages** on every push to `main` (GitHub repo `CatInTheCage/thecaringpet`). Cloudflare runs `npm run build` and serves `dist/`. The Node version is pinned by `.nvmrc` (`22`) and `package.json` `engines` (`>=22.12.0`) — Cloudflare reads `.nvmrc`, so keep it satisfying the engines floor or the build fails. There is no GitHub Actions workflow; the old GitHub Pages workflow was removed in favor of Cloudflare.

## Architecture

### Astro configuration

`astro.config.mjs` uses `output: 'static'` and `trailingSlash: 'always'`. This means every internal URL must end with `/` (e.g., `/blog/`, `/about/`, `/categories/best-picks/`). Paths without a trailing slash will 404 on the static build or on simple static hosts.

### Content collections

Blog posts live in `src/content/blog/` as Markdown or MDX files. The collection is defined in `src/content.config.ts` with this schema:

- `title`: string
- `description`: string
- `pubDate`: date
- `updatedDate`: date (optional)
- `heroImage`: string, defaults to `/images/hero.jpg`
- `categories`: array of category slugs, defaults to `[]`
- `author`: string, defaults to "The Caring Pet Research Team"
- `readingTime`: number (optional)
- `featured`: boolean, defaults to `false`

Posts are queried with `getCollection('blog')` and sorted by `updatedDate || pubDate` descending. The post URL is always `/blog/${post.id}/` where `post.id` is the filename without extension.

### Pages and routing

- `src/pages/index.astro` — homepage with hero, category grid, latest articles, and research process section.
- `src/pages/blog/index.astro` — paginated-style list of all articles with category filter pills.
- `src/pages/blog/[...slug].astro` — dynamic article pages; passes the post and full post list to `BlogPost` layout.
- `src/pages/categories/[slug].astro` — dynamic category pages for `best-picks`, `pet-knowledge`, `problem-solving`, `care-guides`. Includes an "All" filter pill linking back to `/blog/`.
- `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/newsletter.astro`, `src/pages/privacy-policy.astro`, `src/pages/affiliate-disclosure.astro` — static pages.
- `src/pages/tools/cat-age-calculator/` and `src/pages/tools/dog-age-calculator/` — interactive age calculators (with share functionality).
- `src/pages/tools/pet-toxin-lookup/` — static directory of toxin pages (`index.astro` + `[slug].astro`), each generated from the toxin data collections in `src/data/toxins/` (food, household, insecticides, medications, plants) typed by `src/types/toxin.ts`. Renders ASPCA/Pet Poison Helpline numbers from `consts.ts`.
- `src/pages/tools/pet-recall-checker/` — pet food recall checker (`index.astro` + `[slug].astro`), generated from `src/data/recalls.ts` typed by `src/types/recall.ts`. Client-side search matches brand/product/aliases/company/hazard plus lot codes (case-insensitive prefix match, ≥3 chars). Status semantics: `active` (company recall in effect), `fda-advisory` (FDA-issued warning, no full company recall), `terminated` (FDA closed; home stock still needs checking). Every entry must cite the FDA notice URL and carry `lastVerified`.
- `src/pages/search.astro` — client-side search powered by Pagefind.
- `src/pages/rss.xml.js` — RSS feed using `@astrojs/rss`.

### Layouts

- `src/layouts/Page.astro` — wrapper for static pages. Accepts `title`, `description`, `image`, `breadcrumbs`, and `showNewsletter` props. Renders a narrow container, optional breadcrumbs, page header, slot content, and a newsletter form.
- `src/layouts/BlogPost.astro` — wrapper for individual blog posts. Renders the post header, hero image, Markdown/MDX content, affiliate disclosure, newsletter form, and related articles.

### Components

- `src/components/Header.astro` — sticky header with bowl-logo `<img>` + text (`SITE_TITLE`) and mobile hamburger menu. Navigation links must keep trailing slashes.
- `src/components/Footer.astro` — site footer with logo, mascot image (`/images/footer-mascot.jpg`), explore/company/connect links, and affiliate disclosure.
- `src/components/BaseHead.astro` — shared `<head>` content including global CSS, meta tags, Open Graph, Twitter cards, and conditional GA4 snippet.
- `src/components/HeaderLink.astro` — active-state aware navigation link.
- `src/components/Breadcrumbs.astro` — schema.org breadcrumb list.
- `src/components/RelatedArticles.astro` — shows up to three related posts by category on article pages.
- `src/components/NewsletterForm.astro` — email/lead-magnet form; imports `NEWSLETTER_FORM_URL` from `consts.ts`. Currently a Google Form (interim) until ConvertKit/Mailchimp is wired up.
- `src/components/ProductCard.astro` — affiliate product card; builds Amazon links with `AMAZON_ASSOCIATES_TAG` from `consts.ts` (`thecaringpet-20`).
- `src/components/FAQ.astro` — schema.org FAQ accordion.
- `src/components/AffiliateDisclosure.astro` — disclosure banner linking to `/affiliate-disclosure/`.
- `src/components/FormattedDate.astro` — date formatter.
- `src/components/CatAgeCalculatorEmbed.astro` — a self-contained, embeddable cat-age calculator for use inside blog posts (scoped class/data prefixes so it can coexist on any page). Uses the 16-5-4 model; the full version lives at `/tools/cat-age-calculator/`.
- `src/components/PoisonHotlines.astro` — renders the ASPCA / Pet Poison Helpline blocks from `consts.ts`; used across the toxin-lookup tool pages and the recall checker (empty state + detail pages).
- `src/components/ToxinDisclaimer.astro` — emergency disclaimer banner used on toxin-lookup pages and the recall checker.

### Styling

Global styles live in `src/styles/global.css`. The design system uses HSL CSS custom properties:

- `--background`: warm off-white
- `--foreground`: near-black
- `--primary`: terracotta / burnt orange (`17 58% 56%`)
- `--primary-dark`: darker terracotta for hover states
- `--secondary`: sage green
- `--secondary-dark`: darker sage
- `--muted-foreground`, `--border`, `--card`, etc.

Utility classes include `.container`, `.container-narrow`, `.section`, `.card`, `.badge`, `.btn`, `.btn-primary`, `.btn-secondary`, `.text-muted`, `.section-eyebrow`, `.affiliate-disclosure`, `.newsletter-form`, and `.faq-item`.

Fonts (`Inter` for body, `Playfair Display` for headings) are **self-hosted via `@fontsource` npm packages** (latin subsets, weights: Inter 400/500/600/700, Playfair 600/700), imported in `BaseHead.astro`. Do not reintroduce Google Fonts `<link>`/`@import` — the render-blocking `fonts.googleapis.com` stylesheet made pages load very slowly from regions where Google domains are slow/unreachable (2026-10-27 fix). Article body text is constrained to `.container-narrow` (max-width 720px) for readability. `public/_headers` sets long-lived caching for `/_astro/`, `/fonts/`, `/images/`, and `/downloads/` on Cloudflare Pages.

### Constants and IDs

`src/consts.ts` exports the live values (all placeholders have been replaced):

- `SITE_TITLE` = "The Caring Pet"
- `SITE_DESCRIPTION`, `SITE_URL`, `AFFILIATE_DISCLOSURE`, `SITE_AUTHOR`
- `GA_TRACKING_ID` = `'G-3J7J1Y6XGP'` (real GA4 measurement ID)
- `AMAZON_ASSOCIATES_TAG` = `'thecaringpet-20'` (real, used by `ProductCard`)
- `NEWSLETTER_FORM_URL` / `CAT_CHECKLIST_FORM_URL` / `PUPPY_CHECKLIST_FORM_URL` — three Google Form URLs for the lead magnets (interim; upgrade to ConvertKit/Mailchimp later for email capture)
- `ASPCA_POISON_HOTLINE` / `PPH_POISON_HOTLINE` — poison-control hotline objects (name, phone, tel, url, lastVerified) rendered across the toxin-lookup tool by `PoisonHotlines.astro`. Numbers must be re-verified periodically (see the `poison-hotline-recheck` memory note); an outdated number would mislead someone in an emergency.

### Cat age conversion standard

The site uses the **16-5-4 model** for cat-years-to-human-years: year 1 ≈ 16 human years, year 2 ≈ +5 (total ≈ 21), each year after ≈ +4. This is applied consistently in `/tools/cat-age-calculator/`, the `CatAgeCalculatorEmbed` component, and the `cat-years-to-human-years` article. Source: Cornell Feline Health Center ("The Special Needs of the Senior Cat"). Do not revert to the older 15-9-4 model or cite International Cat Care (icatcare.org) — it is a potential SEO/content competitor and its numbers differ from Cornell's. See the `cat-age-conversion-sources` memory note for the full verification record.

### Images and assets

- `public/images/` — site images including hero, post hero images, about photo, and footer mascot.
- `public/images/products/` — product images named after ASIN/model; must match the actual ASIN linked in `ProductCard` (see Content asset standards).
- `public/images/pins/` (PNG, source) and `public/images/pins-upload/` (compressed JPG) — auto-generated Pinterest Pin images (1000×1500). Regenerate with `node scripts/make-pinterest-pins.mjs` after editing the `PINS` array at the top of that script.
- `public/downloads/` — lead-magnet PDFs and HTML sources (`dog-feeding-safety-checklist`, `new-cat-owner-checklist`, `new-puppy-essentials-checklist`).
- `public/images/logo-horizontal.svg`, `public/images/logo-mark.svg`, `public/images/logo-horizontal.png`, `public/images/logo-mark.png` — these exist but are not used in the current header/footer.
- `public/favicon.svg` — the live favicon: the bowl-with-food logo (terracotta), derived from `logos/无水印logo/IMG_8305.svg` (VTracer output). Centered via `viewBox="438 389 1170 1170"` (the source had no viewBox and a white-background `<path>` that had to be stripped, or it rendered as a white square). Optimized with `svgo` (~51 KB; the raw traced file is 222 KB). `public/favicon.png` (64px) and `public/favicon.ico` (multi-size 16/32/48/64/128/256) are raster fallbacks generated from it via `qlmanage` + Pillow. **Do not use `sharp` to render this SVG** — sharp's SVG renderer produces a broken 999×19 sliver from the `transform="translate(...)"` path structure; use `qlmanage -t -s N -o /tmp file.svg` (macOS Quick Look) instead.
- `public/images/bowl-logo.png` — the same bowl logo as a 96×96 transparent PNG, used by the Header and Footer `<img class="logo-icon">` / `<img class="footer-logo-icon">` (kept small for performance; the SVG is too heavy at 51 KB to inline on every page).
- **Logo history (don't relitigate):** a paw-print SVG was tried twice (hand-written + Bootstrap-style geometry) and the user found both ugly/un-paw-like. The bowl-with-food logo is the keeper — the user confirmed it looks good. The earlier `favicon-traced.svg` and `favicon.svg.bowl-backup` were deleted. Source logo files live outside the repo at `../logos/无水印logo/` (PNG + SVG variants, `IMG_8305` is the chosen one).
- `src/assets/` — emptied (starter placeholders and unused fonts were removed).

### Internal link convention

Because `trailingSlash: 'always'` is enabled, every hardcoded internal link must end with `/`:

- `/blog/`
- `/about/`
- `/categories/best-picks/`
- `/affiliate-disclosure/`
- `/privacy-policy/`
- `/newsletter/`

Dynamic post links use `/blog/${post.id}/` and category links use `/categories/${cat.slug}/`. The `HeaderLink.astro` active-state logic assumes trailing-slash URLs.

### Header logo

The header logo is a bowl-with-food `<img>` (`public/images/bowl-logo.png`, 96px) plus the `SITE_TITLE` text. It matches the favicon. Earlier attempts used a paw-print SVG (hand-written and Bootstrap-style) — the user found both ugly; the bowl logo is the confirmed keeper. The full-res source SVG (51 KB) is too heavy to inline on every page, so a small PNG is used for the header/footer and the SVG is reserved for the favicon.

### Category system

Categories are hardcoded in three places and must stay in sync:

1. `src/pages/index.astro` — category grid
2. `src/pages/blog/index.astro` — filter pills
3. `src/pages/categories/[slug].astro` — category metadata and `getStaticPaths`

The valid category slugs are: `best-picks`, `pet-knowledge`, `problem-solving`, `care-guides`. Post frontmatter uses these exact slugs in the `categories` array.

### Content asset standards

This is a content-heavy affiliate site. When writing or rewriting blog posts, aim for:

- One primary keyword + 3–5 related long-tail keywords per post.
- At least 2,000 words of original, research-backed content.
- 2–4 `ProductCard` components with real Amazon ASINs and product images that match the actual ASIN.
- A comparison table.
- An `FAQ` component for schema.org FAQ markup.
- Internal links to related articles and category pages (with trailing slashes).
- Hero images in `public/images/` named after the article slug.

**Critical:** Product images in `public/images/products/` must match the actual ASIN being linked. Do not reuse images across different models, pack sizes, or variants.

### Pinterest publishing pipeline

Pin publishing runs through the Pinterest **API v5** (app `caringpet-publisher`, app_id 1643158). **Manual weekly cadence, tied to the Wednesday article-writing routine — user requires human review; do NOT schedule it (launchd / `.claude/scheduled_tasks.json` cron never fires reliably on this machine and was deliberately removed 2026-11-23).**

```bash
node scripts/pinterest/publish-pins.mjs --dry   # preview: review titles/links/boards first
node scripts/pinterest/publish-pins.mjs          # publish next 3 pending pins
```

- **Queue**: `scripts/pinterest/pin-queue.json` (13 evergreen pins as of 2026-11-23; money pages first). **Copy**: `pinterest-pin-copy.md` (28 entries). **Images**: `public/images/pins-upload/*.jpg` — these ARE committed (un-ignored 2026-11-23) because the API references them live at `thecaringpet.com/images/pins-upload/`; regenerate all via `npm run pins`. **Idempotent state**: `content-ideas/pinterest-state.json` — published/failed records make re-runs safe; `--pin <id>` retries individual failures.
- **Token**: `~/.config/thecaringpet/pinterest-token` (OAuth user token, write scopes). Console quick-generator issues read-only scopes only — regenerate via `node scripts/pinterest/oauth-token.mjs` (one browser Allow click). App credentials: `~/.config/thecaringpet/pinterest-app.json`. On 401 → re-run the OAuth script; on 403 code 29 → app still on Trial access (Standard access requested 2026-11-23, video demo recorded); on 429 → just re-run later.
- **Network**: terminal needs the local proxy (`127.0.0.1:7890`, ApexCore system proxy) to reach `api.pinterest.com` — the script auto-detects: port 7890 open → proxies, else connects direct. `NODE_USE_ENV_PROXY` must be set before process start (handled by the script's self-restart bootstrap).
- **Known platform quirk**: Pinterest serves soft-blocked blank shells to the Chrome/webbridge environment (all routes `bodyLen 0`); **Safari is unaffected** — drive Pinterest web pages via Safari + AppleScript, not webbridge. Boards live at `Cat Care Tips` / `Dog Feeding & Enrichment` / `New Pet Parent Checklist` / `Pet Safety & Health` (queue auto-creates missing ones once write access is granted).
- **Adding pins for a new article**: add copy to `pinterest-pin-copy.md` + a `PINS` entry in `scripts/make-pinterest-pins.mjs` → `npm run pins` → commit & push the new JPG (must be deployed before publishing) → append to `pin-queue.json`.

### Pain-point radar pipeline (需求/痛点检索)

Weekly Wednesday routine (manual trigger preferred; cron 09:07 Wed via `.claude/scheduled_tasks.json` is unreliable on this machine). Two layers — **scripts collect raw data only; Claude analyzes in-session**:

1. **Collect** — `npm run radar:all` = `radar` (Petful recalls + PPH toxins RSS + recall-coverage check, unchanged) + `pain` (4-source pain collector, ~30–45 min, drives Chrome via webbridge; opens a tab group and closes it when done).
   - `scripts/pain-radar/` — `index.mjs` (CLI: `--only=reddit|amazon|quora-google|trends`, `--task=<id>` for single query/ASIN), `config.mjs` (all queries + 16 verified ASINs), `sources/{reddit,amazon,google,trends}.mjs`, `lib/{runtime,webbridge,gsc}.mjs`.
   - **Reddit**: last30days `--json-profile=raw` (no `--quick`) → post bodies (selftext ~500 chars) + engagement; ~half of items have bodies, `title_only` items don't count as pain evidence. **Amazon**: Top-reviews sample only — star filters/sort/pagination params all dead as of 2026-11-24 (fixed 8 reviews/ASIN, positive bias; EdgeX Guard anti-bot appears intermittently, 15 s auto-wait then skip). **Quora/Google**: Quora via Google SERP `site:quora.com`, problem-type Suggest seeds (`gl=us`), PAA questions. **Trends**: network capture of `widgetdata/relatedsearches` → DOM → GSC fallback; Trends widget XHR never fires on this network, so GSC `gsc_current_demand_context` (NOT trends, NOT rising) is the usual output.
   - Output: `content-ideas/raw/pain-points/<date>/` (manifest + 4 platform JSON + `source/` originals). Uniform envelope with `quotes[].raw_ref` (file + JSON pointer) for citation audit. Scripts never emit analysis fields (no scores/ideas); all failures recorded honestly with error codes.
2. **Analyze (Claude)** — follow `scripts/pain-radar/ANALYSIS.md`: filter/cluster, GSC cross-check, 33-article dedup (New/Update/Section), F/P/C/S/T weighted scoring (0.30F+0.25P+0.20C+0.15S+0.10T), verbatim quote audit (substring + raw_ref + URL). Report → `content-ideas/pain-points-<date>.md`: 4 platform tables (≥10 pain points each or ⚠️, fixed 8 columns), Top 10 ranked, Top 3 English SEO titles, gap opportunities, pitfalls. Never pad to 10; never fabricate quotes.

Retry one lane: `npm run pain -- --only=amazon` (after manually passing captcha/EdgeX Guard in Chrome). `radar:browser` / `radar:social` are retired from the weekly loop since 2026-11-24 (kept for ad-hoc deep research); the old Reddit top-week / Amazon BSR / Pinterest Trends lanes are gone. Legacy reports: `content-ideas/radar-YYYY-MM-DD.md` (merge helper `scripts/lib/radar-merge.mjs`, only used by legacy scripts).

**Recall coverage check (automated since 2026-08-03):** `trending-radar.mjs` reads brand/alias tokens from `src/data/recalls.ts` and flags any Petful recall item not yet covered in the dataset as "疑似未收录" in the action section — those entries must be verified against the FDA notice and added to `recalls.ts` (the Pet Recall Checker's data source), with `lastVerified` set to that day. This keeps `/tools/pet-recall-checker/` current without a separate maintenance task.

| Script | npm run | Needs | Sources |
|---|---|---|---|
| `scripts/trending-radar.mjs` | `radar` | nothing | Petful recalls, Pet Poison Helpline RSS |
| `scripts/pain-radar/index.mjs` | `pain` | kimi-webbridge daemon + browser (reddit lane: python3 only) | Reddit bodies, Amazon reviews, Quora/Suggest/PAA, Trends (+GSC fallback) |
| `scripts/trending-radar-browser.mjs` / `trending-radar-social.mjs` | `radar:browser` / `radar:social` (retired from weekly loop) | — | legacy; ad-hoc deep research only |
| `scripts/revenue-export.mjs` | `revenue:export` | Google OAuth app creds `~/.config/thecaringpet/google-oauth-app.json` + first-run browser consent | Weekly revenue-review assembly: GSC page+query export to `content-ideas/gsc/<date>/` (same CSV format as manual exports, readable by `gsc.mjs`), GA4 page-level `amazon_click`, and a pre-filled `revenue-log.csv` row (Amazon columns left blank). Same date window for GSC+GA4. **PARKED 2026-11-24**: Google domains unreachable from this machine (company proxy and personal VPN both blocked), so until a working route appears the weekly cadence is manual GSC export + panel reads, with Claude assembling same-window numbers |
| `scripts/optimize-images.mjs` | `images:optimize` | python3 + Pillow (webp support) | Batch-convert `public/images` JPG/PNG → WebP and rewrite references. Excludes `pins-upload/`, `pins/`, `checklist/` (legacy PDF generator), logos/favicon. Default dry-run; `--apply` executes |
| `scripts/pagespeed.mjs` | `pagespeed` | nothing (free PSI API); requires a route to `googleapis.com` — see revenue-export PARKED note below | Mobile performance score + top-3 diagnostics for core URLs; `--desktop` / `--url` flags |
| `scripts/audit-pin-utm.mjs` | — | nothing | Audit `pin-queue.json` UTM params: core slow-feeder pages must carry `utm_campaign=slow_feeder_90d`, all pins `utm_source`/`utm_medium` + `utm_content=<pin-id>`; idempotent `--fix` |

`radar:social` runs 4 fixed pet topics through `~/.claude/skills/last30days/scripts/last30days.py` (`--quick --days 30 --emit json`, serial, 6-min per-topic kill) plus 2 Exa queries (`mcporter call exa.web_search_exa`, spawned with cwd=repo root because the Exa MCP server is configured in project-level `config/mcporter.json`). Useful flags: `--only-topic "<query>"`, `--skip-exa`, `--days N`. It always exits 0 unless writing the report fails — per-source failures are recorded as ⚠️ lines in the report; never fabricate data for them.

**Known network limitations on this machine** (2026-07-27): `web`/grounding keyless is dead, hackernews/polymarket/github not working; reddit ✓ and youtube ⚠️ partial — but ONLY with `SSL_CERT_FILE` pointing at certifi's CA bundle (system Python 3.12 ships no root certs; `radar:social` resolves this automatically via `resolveCertFile`). The Exa lane works and is the strongest zero-config signal. The report's ⚠️ lines document failures honestly each week.

Keys: `SCRAPECREATORS_API_KEY` is configured in `~/.config/last30days/.env` (free 10,000-call tier via `last30days.py setup --github`, set up 2026-07-27) — pinterest/tiktok are enabled in `radar:social`, though the deterministic fallback planner may not route to them in mixed-source runs (a hand-authored `--plan` file would fix routing). `XAI_API_KEY` is deliberately NOT wired in (paid; x.com unreachable from this network). OpenCLI Chrome extension (agent-reach) → richer Reddit/Twitter/XHS for manual agent-reach use; not part of the cron pipeline.
