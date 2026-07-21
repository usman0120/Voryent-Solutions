import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.string().min(1, "Project type is required"),
  status: z.enum(["Planning", "Active", "On Hold", "Completed", "Cancelled", "Archived"]).default("Planning"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),
  client: z.string().optional(),
  industry: z.string().optional(),
  startDate: z.string().optional().nullable(),
  targetDate: z.string().optional().nullable(),
  completedDate: z.string().optional().nullable(),
  budget: z.number().optional().nullable(),
  currency: z.string().default("USD"),
  progress: z.number().min(0).max(100).default(0),
  teamMembers: z.array(z.string()).default([]),
  projectManager: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  repository: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    size: z.number(),
    type: z.string()
  })).default([]),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  milestones: z.array(z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).default("Pending"),
  })).default([]),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
