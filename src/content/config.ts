import { defineCollection, z } from 'astro:content';

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    social_links: z.array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
      })
    ),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover_image: z.string().optional(),
    tags: z.array(z.string()),
    demo_url: z.string().url().optional(),
    demo_hint: z.string().optional(),
    github_url: z.string().url().optional(),
    description: z.string(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    resource_name: z.string(),
    category: z.enum(['工具', '书籍', '代码', '教程', '其他']),
    download_link: z.string().url(),
    rating: z.number().min(1).max(5).optional(),
    description: z.string(),
  }),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    cover_image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  about: aboutCollection,
  projects: projectsCollection,
  resources: resourcesCollection,
  posts: postsCollection,
};
