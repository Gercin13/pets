# Deploying PetExpert to Netlify (Astro SSR)

PetExpert ships mostly-static pages **plus one on-demand route** (`/`) that redirects
visitors to their `Accept-Language` locale (`/en`, `/de`, `/uk`). The `@astrojs/netlify`
adapter turns that route into a Netlify Function automatically — the rest is static on the CDN.

## 1. Prerequisites
- Node 18.20+ / 20 / 22 locally (Netlify is pinned to Node 20 via `netlify.toml`).
- A Netlify account and the site's Git repository.

## 2. What makes it work (already in the repo)
- **`astro.config.mjs`** — `output: 'hybrid'`, `adapter: netlify()`, i18n config, and
  `site` read from env: `SITE_URL` → Netlify's `URL` → `http://localhost:4321`.
- **`src/pages/index.astro`** — `export const prerender = false`; redirects `/` by Accept-Language.
- **`netlify.toml`** — build command, publish dir, Node version.

## 3. Deploy via Git (recommended)
1. Push the repo to GitHub/GitLab/Bitbucket.
2. Netlify → **Add new site → Import an existing project** → select the repo.
3. Netlify auto-detects Astro. Confirm (also pinned in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Site configuration → Environment variables** → add your canonical domain:
   - `SITE_URL = https://your-domain.com`  *(drives `<link rel="canonical">` + hreflang)*
5. **Deploy site.** Netlify installs deps, runs `astro build`, publishes `dist`, and wires
   the `/` Function. Every push to the production branch redeploys.

## 4. Deploy via Netlify CLI (alternative)
```bash
npm i -g netlify-cli
netlify login
netlify init                                   # link or create the site
netlify env:set SITE_URL "https://your-domain.com"
netlify deploy --build --prod
```

## 5. Verify after deploy
```bash
# Root Accept-Language redirect (the "/" Function):
curl -sI -H "Accept-Language: de-DE,de;q=0.9" https://your-domain.com/   # → 302 Location: /de
curl -sI -H "Accept-Language: uk"             https://your-domain.com/   # → /uk
curl -sI                                       https://your-domain.com/   # → /en

# Canonical + hreflang in the <head>:
curl -s https://your-domain.com/en/health | grep -iE 'hreflang|canonical'
```

## Notes & gotchas
- **Don't** add a static catch-all redirect (e.g. `/* -> /en`) in `netlify.toml` or
  `_redirects` — it would shadow the Accept-Language Function on `/`.
- **Custom domain:** set it in Netlify → *Domain management*, then set `SITE_URL` to it so
  canonical/hreflang use the real origin. If `SITE_URL` is unset, Netlify's built-in `URL`
  is used (which may be the `*.netlify.app` address).
- **Pure static instead of SSR?** Remove `export const prerender = false` from
  `src/pages/index.astro`, drop `adapter`/`output` from the config — `/` will then statically
  redirect to `/en` at build time (no per-visitor detection).
- **Images:** `public/img/**` currently holds 1×1 placeholders — replace them with real
  assets (same paths), or switch the `<img>` tags to `astro:assets` `<Image>` imports.
