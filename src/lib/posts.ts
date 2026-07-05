import { getCollection, type CollectionEntry } from 'astro:content';
import { languages, type Lang } from '../i18n/ui';

// Posts live in language folders, so each entry's slug is like "de/impfratgeber".

/** Published posts for one locale, newest first. */
export async function getLocalizedPosts(lang: Lang): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog');
  return all
    .filter((p) => p.slug.startsWith(`${lang}/`))
    .filter((p) => !p.data.draft)
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
}

/** Published posts for one locale AND one nav section (e.g. "training"), newest first. */
export async function getSectionPosts(lang: Lang, section: string): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog');
  return all
    .filter((p) => p.slug.startsWith(`${lang}/`))
    .filter((p) => !p.data.draft)
    .filter((p) => p.data.section === section)
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
}

/** Post name without the leading language segment: "de/my-post" → "my-post". */
export function postName(slug: string): string {
  return slug.split('/').slice(1).join('/');
}

/** Canonical URL — language appears exactly once: "/de/blog/my-post". */
export function postHref(post: CollectionEntry<'blog'>, lang: Lang): string {
  return `/${lang}/blog/${postName(post.slug)}`;
}

/** translationKey if set, else the file name — so same-named files across languages link up. */
export function keyOf(post: CollectionEntry<'blog'>): string {
  return post.data.translationKey ?? postName(post.slug);
}

/** A single published post for one locale, matched by its translationKey (or file name). */
export async function getPostByKey(lang: Lang, key: string): Promise<CollectionEntry<'blog'> | undefined> {
  const all = await getCollection('blog');
  return all.find((p) => p.slug.startsWith(`${lang}/`) && !p.data.draft && keyOf(p) === key);
}

/**
 * URLs to every translation of `current`, keyed by language. Missing translations fall
 * back to that language's homepage (never a 404). Pass to <BaseLayout localeLinks={…}>.
 */
export async function getTranslationLinks(
  current: CollectionEntry<'blog'>,
): Promise<Record<Lang, string>> {
  const all = await getCollection('blog');
  const key = keyOf(current);
  const links = {} as Record<Lang, string>;
  for (const code of Object.keys(languages) as Lang[]) {
    const match = all.find((p) => p.slug.startsWith(`${code}/`) && keyOf(p) === key);
    links[code] = match ? postHref(match, code) : `/${code}/`;
  }
  return links;
}
