import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const pageSchema = baseEntitySchema.extend({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  content: z.record(z.string(), z.any()), // Dynamic content sections
  seo: seoSchema.optional(),
});

export type PageFormValues = z.infer<typeof pageSchema>;
