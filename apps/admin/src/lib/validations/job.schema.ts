import * as z from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"]),
  workMode: z.enum(["Remote", "Hybrid", "On-site"]),
  experienceLevel: z.string().min(1, "Experience level is required"),
  salary: z.string().optional(),
  currency: z.string().default("USD"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  preferredSkills: z.string().optional(),
  benefits: z.string().optional(),
  status: z.enum(["Draft", "Published", "Paused", "Closed", "Archived"]).default("Draft"),
  featured: z.boolean().default(false),
  closingDate: z.string().optional().nullable(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;
