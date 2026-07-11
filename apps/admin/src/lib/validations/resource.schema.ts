import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const resourceSchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  type: z.enum(["Case Study", "Whitepaper", "Ebook", "Webinar", "Guide"]).default("Case Study"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  downloadUrl: z.string().optional(),
  content: z.string().optional(), // Markdown or rich text
  author: z.string().optional(),
  date: z.string().optional(), // ISO date string
  seo: seoSchema.optional(),
});

export type ResourceFormValues = z.infer<typeof resourceSchema>;
