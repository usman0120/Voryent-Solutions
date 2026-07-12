import * as z from "zod";
import { baseEntitySchema, seoSchema } from "./cms";

export const caseStudySchema = baseEntitySchema.extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().optional(),
  industry: z.string().optional(),
  projectType: z.string().optional(),
  heroHeadline: z.string().optional(),
  heroSubheadline: z.string().optional(),
  ctaText: z.string().optional(),
  outcomeSummary: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  overview: z.array(z.string()).default([]),
  challenge: z.array(z.string()).default([]),
  challengeList: z.array(z.string()).default([]),
  solution: z.array(z.string()).default([]),
  solutionList: z.array(z.string()).default([]),
  processSteps: z.array(
    z.object({ title: z.string(), description: z.string() })
  ).default([]),
  results: z.array(z.string()).default([]),
  imageSrc: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  seo: seoSchema.optional(),
});

export type CaseStudyFormValues = z.infer<typeof caseStudySchema>;
