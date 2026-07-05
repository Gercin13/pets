// Proves the language filtering + link-building logic for the blog collection.
// Mirrors the helper in src/lib/posts.ts (pure functions, no Astro needed).

// Simulated getCollection('blog') result — slugs include the language folder.
const posts = [
  { slug: 'en/vaccination-guide', data: { title: 'The Complete Guide to Pet Vaccination' } },
  { slug: 'de/impfratgeber', data: { title: 'Der komplette Impfratgeber' } },
  { slug: 'uk/posibnyk-z-vakcynatsii', data: { title: 'Повний посібник із вакцинації' } },
  { slug: 'de/gefaehrliche-lebensmittel', data: { title: 'Gefährliche Lebensmittel' } },
  { slug: 'en/health/senior-dogs', data: { title: 'Caring for Senior Dogs' } }, // nested subfolder
];

// --- the exact helpers from src/lib/posts.ts ---
const forLang = (lang) => posts.filter((p) => p.slug.startsWith(`${lang}/`));
const postName = (slug) => slug.split('/').slice(1).join('/'); // drop the language segment
const postHref = (p, lang) => `/${lang}/blog/${postName(p.slug)}`;
const routeParams = (slug) => {
  const [lang, ...rest] = slug.split('/');
  return { lang, slug: rest.join('/') };
};

let pass = 0, fail = 0;
const eq = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label} → ${JSON.stringify(got)}${ok ? '' : `  (expected ${JSON.stringify(want)})`}`);
  ok ? pass++ : fail++;
};

console.log('=== 1. Filter: only the current language shows ===');
eq('de page count', forLang('de').length, 2);
eq('de page slugs', forLang('de').map((p) => p.slug), ['de/impfratgeber', 'de/gefaehrliche-lebensmittel']);
eq('de page has NO en/uk posts', forLang('de').every((p) => p.slug.startsWith('de/')), true);
eq('en page count', forLang('en').length, 2);
eq('uk page count', forLang('uk').length, 1);

console.log('\n=== 2. Links: language appears exactly once ===');
eq('href de/impfratgeber @de', postHref({ slug: 'de/impfratgeber' }, 'de'), '/de/blog/impfratgeber');
eq('NOT doubled', postHref({ slug: 'de/impfratgeber' }, 'de').includes('/de/blog/de/'), false);
eq('href nested en/health/senior-dogs @en', postHref({ slug: 'en/health/senior-dogs' }, 'en'), '/en/blog/health/senior-dogs');

console.log('\n=== 3. Blog route getStaticPaths params match the links ===');
eq('params de/impfratgeber', routeParams('de/impfratgeber'), { lang: 'de', slug: 'impfratgeber' });
eq('params nested', routeParams('en/health/senior-dogs'), { lang: 'en', slug: 'health/senior-dogs' });

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail === 0 ? 0 : 1);
