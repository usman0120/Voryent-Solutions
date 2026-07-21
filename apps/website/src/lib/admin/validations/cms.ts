import * as z from "zod";

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal("")),
  canonical: z.string().url().optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
  noFollow: z.boolean().default(false),
  openGraph: z.record(z.string(), z.any()).optional(),
  twitter: z.record(z.string(), z.any()).optional(),
  schema: z.string().optional(), // JSON-LD string
});

export const baseEntitySchema = z.object({
  status: z.enum(["Draft", "Published", "Archived"]).default("Draft"),
});
