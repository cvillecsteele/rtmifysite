import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const standards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/standards' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(155),
    standard: z.enum(['as9100', 'iso-13485', 'do-178c', 'iec-62304', 'iso-26262', 'aspice']),
    badge_color: z.string(),
    clauses: z.array(
      z.object({
        ref: z.string(),
        label: z.string(),
      })
    ),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { standards, blog };
