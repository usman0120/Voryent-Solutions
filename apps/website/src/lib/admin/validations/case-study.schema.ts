import * as z from "zod";
import { baseEntitySchema } from "./cms";

export const caseStudySchema = baseEntitySchema.extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  industry: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  downloadLink: z.string().optional(),
  fileBase64: z.string().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
});

export type CaseStudyFormValues = z.infer<typeof caseStudySchema>;
