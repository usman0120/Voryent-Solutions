import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const blogSchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().optional(), // Markdown or rich text
  coverImage: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().optional(), // ISO date string
  seo: seoSchema.optional(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
