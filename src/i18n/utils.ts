import { ui, languages, defaultLang, type Lang, type UIKey } from './ui';

/** Read the active locale from the first path segment (/de/…, /uk/…). Falls back to default. */
export function getLangFromUrl(url: URL): Lang {
  const segment = url.pathname.split('/')[1];
  return segment in languages ? (segment as Lang) : defaultLang;
}

/** Returns a `t()` translator bound to a locale, with graceful fallback to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Prefix an internal path with the active locale: ("/health", "de") -> "/de/health". */
export function localizePath(path: string, lang: Lang): string {
  const suffix = path === '/' ? '' : path;
  return `/${lang}${suffix}`;
}

/** Strip the locale segment so routes can be compared: "/de/health" -> "/health". */
export function stripLang(pathname: string): string {
  const segments = pathname.split('/');
  if (segments[1] in languages) segments.splice(1, 1);
  const rest = segments.join('/');
  return rest === '' ? '/' : rest;
}

/** Swap the locale in the current URL while preserving the sub-path and query string. */
export function switchLangPath(url: URL, lang: Lang): string {
  if (url.pathname === '/') return `/${lang}${url.search}`;
  const segments = url.pathname.split('/');
  if (segments[1] in languages) {
    segments[1] = lang;
  } else {
    segments.splice(1, 0, lang);
  }
  return segments.join('/') + url.search;
}

/** True when `href` matches the current route (locale-agnostic). Handles nested article routes. */
export function isActive(url: URL, href: string): boolean {
  const path = stripLang(url.pathname);
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

/** Localized reading-time label from a minute count: readingTime(5, 'uk') -> "5 хв читання". */
export function readingTime(minutes: number, lang: Lang): string {
  return `${minutes} ${ui[lang]['article.readingUnit']}`;
}
