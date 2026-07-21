import * as z from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  company: z.string().optional(),
  email: z.string().email("Must be a valid email address"),
  phone: z.string().optional(),
  website: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().default("Website"),
  assignedTo: z.string().optional(),
  status: z.enum(["New", "Assigned", "In Progress", "Waiting", "Resolved", "Closed", "Archived"]).default("New"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
