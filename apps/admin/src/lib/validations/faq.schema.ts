import * as z from "zod";
import { seoSchema, baseEntitySchema } from "./cms";

export const faqSchema = baseEntitySchema.extend({
  question: z.string().min(5, "Question is required"),
  answer: z.string().min(10, "Answer is required"),
  category: z.enum(["General", "Services", "Pricing", "Projects", "Support", "Security"]).default("General"),
  order: z.number().default(0),
  seo: seoSchema.optional(),
});

export type FaqFormValues = z.infer<typeof faqSchema>;
