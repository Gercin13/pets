// Executable verification of the i18n redirect + hreflang + routing logic.
// The functions below are copied VERBATIM from the project source (src/i18n/utils.ts,
// src/pages/index.astro, src/layouts/BaseLayout.astro) so this exercises the real logic.
// (Full `astro build` can't run here — the npm registry is policy-blocked in this sandbox.)
import fs from 'node:fs';

// ---- from src/i18n/ui.ts ----
const languages = { en: 'EN', de: 'DE', uk: 'UK' };
const defaultLang = 'en';

// ---- from src/i18n/utils.ts (verbatim bodies) ----
function getLangFromUrl(url) {
  const segment = url.pathname.split('/')[1];
  return segment in languages ? segment : defaultLang;
}
function localizePath(path, lang) {
  const suffix = path === '/' ? '' : path;
  return `/${lang}${suffix}`;
}
function stripLang(pathname) {
  const segments = pathname.split('/');
  if (segments[1] in languages) segments.splice(1, 1);
  const rest = segments.join('/');
  return rest === '' ? '/' : rest;
}
function switchLangPath(url, lang) {
  if (url.pathname === '/') return `/${lang}${url.search}`;
  const segments = url.pathname.split('/');
  if (segments[1] in languages) segments[1] = lang;
  else segments.splice(1, 0, lang);
  return segments.join('/') + url.search;
}
function isActive(url, href) {
  const path = stripLang(url.pathname);
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

// ---- from src/pages/index.astro (verbatim) ----
const supported = Object.keys(languages);
function fromAcceptLanguage(header) {
  if (!header) return undefined;
  return header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { base: tag.toLowerCase().split('-')[0], q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => supported.includes(entry.base))?.base;
}
function preferredFor(header, astroPreferred) {
  return (
    (astroPreferred && supported.includes(astroPreferred) ? astroPreferred : undefined) ??
    fromAcceptLanguage(header) ??
    defaultLang
  );
}

// ---- from src/layouts/BaseLayout.astro (hreflang builder) ----
const SITE = new URL('https://petexpert.com');
function hreflangTags(pathname) {
  const lang = getLangFromUrl(new URL(pathname, SITE));
  const basePath = stripLang(pathname);
  const suffix = basePath === '/' ? '' : basePath;
  const hrefFor = (loc) => new URL(`/${loc}${suffix}`, SITE).href;
  const tags = [`<link rel="canonical" href="${hrefFor(lang)}" />`];
  for (const loc of Object.keys(languages)) tags.push(`<link rel="alternate" hreflang="${loc}" href="${hrefFor(loc)}" />`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="${hrefFor(defaultLang)}" />`);
  return tags;
}

// ---- test harness ----
let pass = 0, fail = 0;
const eq = (label, got, want) => {
  const ok = got === want;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}  →  ${JSON.stringify(got)}${ok ? '' : `  (expected ${JSON.stringify(want)})`}`);
  ok ? pass++ : fail++;
};

console.log('\n=== 1. Root redirect: Accept-Language → /{locale} ===');
const cases = [
  ['de-DE,de;q=0.9,en;q=0.8', undefined, 'de'],
  ['uk,en;q=0.5', undefined, 'uk'],
  ['en-US,en;q=0.9', undefined, 'en'],
  ['fr-FR,fr;q=0.9,es;q=0.8', undefined, 'en'], // no supported → default
  ['de;q=0.7,uk;q=0.9', undefined, 'uk'],       // q-weight wins (uk 0.9 > de 0.7)
  ['', undefined, 'en'],
  [null, undefined, 'en'],
  ['en;q=0.1', 'de', 'de'],                      // Astro.preferredLocale takes priority
];
for (const [header, astroPreferred, want] of cases) {
  const loc = preferredFor(header, astroPreferred);
  eq(`Accept-Language ${JSON.stringify(header)}${astroPreferred ? ` +preferred=${astroPreferred}` : ''} → redirect /${loc}`, `/${loc}`, `/${want}`);
}

console.log('\n=== 2. hreflang + canonical per page ===');
for (const path of ['/en', '/de/health', '/uk/health/complete-guide-to-pet-vaccination']) {
  console.log(`\n  ${path}:`);
  for (const t of hreflangTags(path)) console.log('    ' + t);
}
// assertions
eq('hreflang de for /de/health', hreflangTags('/de/health').some((t) => t.includes('hreflang="de"') && t.includes('/de/health')), true);
eq('x-default → en for /uk/health', hreflangTags('/uk/health').some((t) => t.includes('x-default') && t.endsWith('/en/health" />')), true);
eq('canonical uses current locale for /de/health', hreflangTags('/de/health')[0], '<link rel="canonical" href="https://petexpert.com/de/health" />');

console.log('\n=== 3. Routing helpers ===');
eq('getLangFromUrl(/de/health)', getLangFromUrl(new URL('https://x/de/health')), 'de');
eq('getLangFromUrl(/health) → default', getLangFromUrl(new URL('https://x/health')), 'en');
eq('switchLangPath(/en/health → uk)', switchLangPath(new URL('https://x/en/health'), 'uk'), '/uk/health');
eq('switchLangPath(/ → de)', switchLangPath(new URL('https://x/'), 'de'), '/de');
eq('localizePath(/health, uk)', localizePath('/health', 'uk'), '/uk/health');
eq('localizePath(/, en)', localizePath('/', 'en'), '/en');
eq('isActive(/de/health, /health)', isActive(new URL('https://x/de/health'), '/health'), true);
eq('isActive(/de/training, /health)', isActive(new URL('https://x/de/training'), '/health'), false);

console.log('\n=== 4. i18n dictionary key parity (en / de / uk) ===');
const uiSrc = fs.readFileSync('src/i18n/ui.ts', 'utf8');
function keysFor(loc) {
  const start = uiSrc.indexOf(`\n  ${loc}: {`);
  const end = uiSrc.indexOf('\n  },', start);
  const block = uiSrc.slice(start, end);
  return new Set([...block.matchAll(/'([\w.]+)':/g)].map((m) => m[1]));
}
const kEn = keysFor('en'), kDe = keysFor('de'), kUk = keysFor('uk');
const diff = (a, b) => [...a].filter((x) => !b.has(x));
eq('en key count', kEn.size > 0, true);
eq('de has all en keys', diff(kEn, kDe).length === 0, true);
eq('uk has all en keys', diff(kEn, kUk).length === 0, true);
eq('de has no extra keys', diff(kDe, kEn).length === 0, true);
eq('uk has no extra keys', diff(kUk, kEn).length === 0, true);
console.log(`    (en=${kEn.size}, de=${kDe.size}, uk=${kUk.size} keys)`);

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail === 0 ? 0 : 1);
