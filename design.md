# Design — The Caring Pet

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre

editorial — warm broadsheet/magazine voice for a research-backed pet care publisher.

## Macrostructure family

- Hub / discovery pages (homepage, blog index, category pages): **Ecosystem Index** — multiple discovery surfaces (latest / by category / tools), rail-titled bands, no宣言式 hero.
- Article pages (blog posts, toxin pages): **Long Document** family — continuous prose, inline section heads, typography carries the page. Interaction-layer fixes only (focus rings, transitions); structure stays.
- Tool pages (calculators, toxin lookup): **Workbench** family — the interactive tool is the content; minimal chrome around it.

## Theme

Warm paper, terracotta accent, near-black warm ink. Source of truth: HSL triplets
in `src/styles/global.css` (`--background`, `--primary`, `--secondary`, …).

- paper: `hsl(32 45% 97%)` (warm off-white)
- surface: `hsl(30 30% 99%)`
- ink: `hsl(30 10% 18%)`
- muted ink: `hsl(30 8% 42%)`
- rule: `hsl(30 18% 87%)`
- accent (terracotta): `hsl(17 58% 56%)` — ≤ 5 % of any viewport
- accent-dark: `hsl(17 54% 46%)`
- secondary (sage): `hsl(130 16% 55%)` — badges/soft fills only
- focus: `hsl(17 58% 56%)` (same as accent, `--color-focus`)

## Typography

- Display: Playfair Display, 600/700, **roman only** (no italic headers, ever)
- Body: Inter, 400/500/600
- H1: `clamp(2.5rem, 5vw, 4rem)`, tracking -0.02em
- H2: `clamp(1.75rem, 4vw, 2.5rem)`
- Article body measure: 720px (`.container-narrow`)

## Spacing

4-point named scale in `global.css` (`--spacing-xs` … `--spacing-4xl`). Pages use
named tokens, never raw values. Section rhythm varies per section — never the
same padding on every section.

## Motion

- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` · `--ease-in: cubic-bezier(0.7, 0, 0.84, 0)` · `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
- Durations: `--dur-short: 220ms` · `--dur-med: 300ms`
- Never `transition: all`; never browser-default `ease`; never bounce/overshoot on UI state.
- One signal per element on hover (color OR shadow OR 1-2px translate — not all).
- Reduced-motion: `prefers-reduced-motion: reduce` collapses everything to ≤150ms opacity crossfade; `scroll-behavior: smooth` disabled.

## Microinteractions stance

- Silent success; no celebratory toasts.
- Focus rings appear instantly (`:focus-visible`, 2px `--color-focus`, offset 2px) — never animated in.
- No hover-only affordances: anything revealed on hover must be reachable by focus/tap.

## CTA voice

- Primary: `.btn-primary` — terracotta fill, white text, 8px radius, semibold.
- Secondary: `.btn-secondary` — transparent fill, terracotta 40% border.
- Labels are short verbs ("Explore Guides", "Try it"), never wrap to two lines.

## Nav & footer

- Nav: **N6 Newspaper masthead** — tagline line, centered wordmark (bowl logo + Playfair site title), inline nav row, double hairline rule. Not sticky; mobile collapses to menu disclosure.
- Footer: **Ft7 Newsletter-first** — subscription block is the primary element; single inline link row; 12px muted colophon. No 4-column index, no social-icon row.

## Per-page allowances

- Hub pages MAY use asymmetric article grids and typographic category rows.
- Article pages are typography-only; ProductCard / FAQ / callout components unchanged.
- Tool pages: function carries the page; severity badge system (`--tox-*`) unchanged.
- Eyebrows (`.section-eyebrow`): default OFF. Max 1 per page, only when genuinely ordinal.

## What pages MUST share

- Bowl logo + Playfair wordmark.
- Terracotta accent and its ≤5% discipline.
- Playfair Display headings + Inter body.
- `.btn` CTA voice (shape, radius, padding).
- Hairline rule language (`hsl(30 18% 87%)`) as the primary divider.

## What pages MAY differ on

- Macrostructure within the family for that page type.
- Grid asymmetry ratios, rail composition on hub pages.
- Section padding rhythm.

## Exports

### tokens.css

```css
:root {
  --color-paper:      hsl(32 45% 97%);
  --color-paper-2:    hsl(32 30% 94%);
  --color-surface:    hsl(30 30% 99%);
  --color-ink:        hsl(30 10% 18%);
  --color-ink-2:      hsl(30 8% 42%);
  --color-rule:       hsl(30 18% 87%);
  --color-accent:     hsl(17 58% 56%);
  --color-accent-ink: hsl(0 0% 100%);
  --color-accent-dark:hsl(17 54% 46%);
  --color-secondary:  hsl(130 16% 55%);
  --color-focus:      hsl(17 58% 56%);

  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --space-xs: 0.25rem; --space-sm: 0.5rem;  --space-md: 1rem;
  --space-lg: 1.5rem;  --space-xl: 2rem;    --space-2xl: 3rem;
  --space-3xl: 5rem;   --space-4xl: 6rem;

  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-short: 220ms;
  --dur-med:   300ms;

  --radius-button: 8px;
  --radius-card: 12px;
}
```
