import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const serviceSchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().optional(),
  icon: z.string().optional(),
  hero: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }).optional(),
  overview: z.string().optional(),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
  process: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  technologies: z.array(z.string()).optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  seo: seoSchema.optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
