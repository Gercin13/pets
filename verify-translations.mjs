// Proves getTranslationLinks(): switcher jumps to the same article's translation, not a 404.
const languages = { en: 'EN', de: 'DE', uk: 'UK' };
const posts = [
  { slug: 'en/vaccination-guide',          data: { translationKey: 'vaccination' } },
  { slug: 'de/impfratgeber',               data: { translationKey: 'vaccination' } },
  { slug: 'uk/posibnyk-z-vakcynatsii',     data: { translationKey: 'vaccination' } },
  { slug: 'en/dangerous-foods',            data: { translationKey: 'toxic-foods' } },
  { slug: 'de/gefaehrliche-lebensmittel',  data: { translationKey: 'toxic-foods' } },
  // NOTE: uk translation of 'toxic-foods' intentionally missing
];
const postName = (s) => s.split('/').slice(1).join('/');
const postHref = (p, lang) => `/${lang}/blog/${postName(p.slug)}`;
function getTranslationLinks(current) {
  const key = current.data.translationKey; const links = {};
  for (const code of Object.keys(languages)) {
    const m = posts.find((p) => p.slug.startsWith(`${code}/`) && p.data.translationKey === key);
    links[code] = m ? postHref(m, code) : `/${code}/`;
  }
  return links;
}
let pass=0, fail=0;
const eq=(l,g,w)=>{const ok=JSON.stringify(g)===JSON.stringify(w);console.log(`${ok?'PASS':'FAIL'}  ${l} → ${JSON.stringify(g)}${ok?'':`  (want ${JSON.stringify(w)})`}`);ok?pass++:fail++;};

console.log('=== On the German vaccination article, switcher links to each translation ===');
const deVax = getTranslationLinks(posts.find(p=>p.slug==='de/impfratgeber'));
eq('EN → real EN article', deVax.en, '/en/blog/vaccination-guide');
eq('DE → itself', deVax.de, '/de/blog/impfratgeber');
eq('UK → real UK article (different slug, NOT 404)', deVax.uk, '/uk/blog/posibnyk-z-vakcynatsii');
eq('UK link is NOT the German slug', deVax.uk.includes('impfratgeber'), false);

console.log('\n=== Missing translation falls back to that language home (no 404) ===');
const deFoods = getTranslationLinks(posts.find(p=>p.slug==='de/gefaehrliche-lebensmittel'));
eq('EN → real EN article', deFoods.en, '/en/blog/dangerous-foods');
eq('UK (missing) → UK home', deFoods.uk, '/uk/');

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail===0?0:1);
