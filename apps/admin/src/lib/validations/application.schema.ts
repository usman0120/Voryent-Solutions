import * as z from "zod";

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
  github: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  portfolio: z.string().url("Invalid Portfolio URL").or(z.literal("")).optional(),
  website: z.string().url("Invalid Website URL").or(z.literal("")).optional(),
  resume: z.string().min(1, "Resume file is required"), // Base64 string
  resumeName: z.string().optional(),
  coverLetter: z.string().optional(),
  availability: z.string().min(1, "Availability is required"),
  salaryExpectation: z.string().optional(),
  currency: z.string().default("USD"),
  experienceYears: z.coerce.number().min(0, "Experience must be 0 or more").optional(),
  skills: z.string().optional(),
  education: z.string().optional(),
  status: z.enum([
    "Applied",
    "Screening",
    "Interview Scheduled",
    "Technical Review",
    "Final Interview",
    "Offer Sent",
    "Hired",
    "Rejected",
    "Withdrawn"
  ]).default("Applied"),
  notes: z.array(
    z.object({
      id: z.string(),
      authorName: z.string(),
      authorId: z.string(),
      text: z.string(),
      createdAt: z.string(),
    })
  ).default([]),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
