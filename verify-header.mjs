// Proves the Header's language-switcher + active-link logic (pure copies of the functions).
const languages = { en: 'EN', de: 'DE', uk: 'UK' };

function switchTo(pathname, search, code) {
  const segments = pathname.split('/');
  if (segments[1] in languages) segments[1] = code;
  else segments.splice(1, 0, code);
  let path = segments.join('/');
  if (path === `/${code}`) path = `/${code}/`;
  return path + search;
}
function isActive(pathname, href) {
  let rest = '/' + pathname.split('/').slice(2).join('/');
  rest = rest.replace(/\/$/, '') || '/';
  return rest === href || rest.startsWith(`${href}/`);
}

let pass = 0, fail = 0;
const eq = (label, got, want) => {
  const ok = got === want;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label} → ${JSON.stringify(got)}${ok ? '' : `  (expected ${JSON.stringify(want)})`}`);
  ok ? pass++ : fail++;
};

console.log('=== Language switcher stays on the SAME page ===');
eq('/de/health → uk', switchTo('/de/health', '', 'uk'), '/uk/health');
eq('/de/best-picks → en', switchTo('/de/best-picks', '', 'en'), '/en/best-picks');
eq('/uk/blog/impfratgeber → de', switchTo('/uk/blog/impfratgeber', '', 'de'), '/de/blog/impfratgeber');
eq('/de/ (home) → uk', switchTo('/de/', '', 'uk'), '/uk/');
eq('/de (home, no slash) → uk', switchTo('/de', '', 'uk'), '/uk/');
eq('/ (no lang) → de', switchTo('/', '', 'de'), '/de/');
eq('preserves query string', switchTo('/de/health', '?page=2', 'uk'), '/uk/health?page=2');
eq('same-lang click is a no-op path', switchTo('/de/nutrition', '', 'de'), '/de/nutrition');

console.log('\n=== Active nav state ===');
eq('/de/health active for /health', isActive('/de/health', '/health'), true);
eq('/de/health/ (trailing) active for /health', isActive('/de/health/', '/health'), true);
eq('/de/nutrition NOT active for /health', isActive('/de/nutrition', '/health'), false);
eq('/de/ home NOT active for /health', isActive('/de/', '/health'), false);
eq('/de/blog/x NOT active for /health', isActive('/de/blog/x', '/health'), false);

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`);
process.exit(fail === 0 ? 0 : 1);
