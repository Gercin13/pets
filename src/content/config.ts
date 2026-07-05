import { defineCollection, z } from 'astro:content';

// Blog collection. Files live in language folders: blog/en/…, blog/de/…, blog/uk/…
// `translationKey` (optional) is the SAME string across the language versions of one
// article, so the language switcher can jump between translations. If it's omitted,
// the helper falls back to matching by file name (see src/lib/posts.ts).
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    category: z.string().optional(),
    cover: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
