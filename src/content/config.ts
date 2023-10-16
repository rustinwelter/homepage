import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    postDate: z.date(),
    lastUpdateDate: z.date().optional(),
    readTime: z.number(),
  }),
});

export const collections = {
  blog: postCollection,
};
