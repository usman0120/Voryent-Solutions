import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const industrySchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().optional(),
  icon: z.string().optional(),
  hero: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }).optional(),
  challenges: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  solutions: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  relatedServices: z.array(z.string()).optional(), // Array of Service Slugs or IDs
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  seo: seoSchema.optional(),
});

export type IndustryFormValues = z.infer<typeof industrySchema>;
