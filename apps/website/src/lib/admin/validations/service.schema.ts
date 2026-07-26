import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const serviceSchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  tagline: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  icon: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  overview: z.array(z.string()).optional(),
  features: z.array(z.object({
    title: z.string(),
    icon: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  process: z.array(z.object({
    step: z.string().optional(),
    title: z.string(),
    icon: z.string().optional(),
    description: z.string(),
  })).optional(),
  technologies: z.array(z.string()).optional(),
  seo: seoSchema.optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
