import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';

// Canonical origin for absolute canonical + hreflang URLs.
// Priority: SITE_URL (set it in Netlify → Environment variables to your custom domain)
//        → URL (Netlify's production URL, injected automatically at build time)
//        → localhost fallback for `astro dev` / local builds.
const SITE = process.env.SITE_URL || process.env.URL || 'http://localhost:4321';

export default defineConfig({
  site: SITE,
  output: 'hybrid', // static by default; only routes with `prerender = false` render on demand
  adapter: netlify(),
  integrations: [tailwind(), mdx()],
  i18n: {
    locales: ['en', 'de', 'uk'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true, // /en is always explicit
      redirectToDefaultLocale: false, // our src/pages/index.astro picks the locale via Accept-Language
    },
  },
});
