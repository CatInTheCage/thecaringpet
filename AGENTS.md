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
- `src/components/PoisonHotlines.astro` — renders the ASPCA / Pet Poison Helpline blocks from `consts.ts`; used across the toxin-lookup tool pages.
- `src/components/ToxinDisclaimer.astro` — emergency disclaimer banner used on toxin-lookup pages.

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

The site imports Google Fonts (`Inter` for body, `Playfair Display` for headings). Article body text is constrained to `.container-narrow` (max-width 720px) for readability.

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
