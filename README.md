# PetExpert

Trilingual (EN / DE / UK) pet-care media site. Astro + Tailwind + MDX, deployed on Netlify (SSR for the language redirect, static everywhere else).

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build
npm run check    # type-check (astro check)
```

## Stack

- **Astro 4** (`output: 'hybrid'`), TypeScript (strict)
- **Tailwind CSS v3** via `@astrojs/tailwind` — "Warm Professionalism" tokens in `tailwind.config.mjs`
- **MDX + Content Collections** for articles
- **@astrojs/netlify** adapter

## Structure

```
src/
├─ i18n/           languages + UI strings (ui.ts), helpers (utils.ts)
├─ layouts/        BaseLayout (shell + SEO), ArticleLayout (MDX)
├─ components/     Header, Footer, ProductCard, StarRating
├─ lib/            posts.ts (collection helpers)
├─ content/
│  ├─ config.ts    blog collection schema
│  └─ blog/{en,de,uk}/*.md   articles (translations share `translationKey`)
└─ pages/
   ├─ index.astro                 "/" → Accept-Language redirect (SSR)
   ├─ 404.astro                    branded 404
   └─ [lang]/
      ├─ index.astro               homepage
      ├─ health.astro              Health category (bespoke)
      ├─ best-picks.astro          product recommendations
      ├─ [category].astro          Training / Nutrition / Choosing a Pet / Pet Life
      └─ blog/[...slug].astro      article pages
public/img/        images (samples — replace with your own)
```

## i18n

- URLs are locale-prefixed: `/en/…`, `/de/…`, `/uk/…`
- `/` redirects to the visitor's `Accept-Language` (needs the SSR adapter)
- Every page emits `canonical` + `hreflang` alternates
- The language switcher stays on the current page — and on articles it jumps to the
  matching translation via `translationKey` (see `src/lib/posts.ts`)

## Deploy

See **DEPLOY.md** (Netlify + the `SITE_URL` env var for canonical/hreflang).

## Notes

- Section pages *Training / Nutrition / Choosing a Pet / Pet Life* are scaffolds
  (`[category].astro`) — add real content when ready.
- Images in `public/img/**` are samples — replace them with your own (keep the paths).
- The `preview-*.html` files and `verify-*.mjs` scripts are dev aids, not part of the build.
