import * as z from "zod";

export const caseStudyLeadSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  caseStudyId: z.string().min(1, "Case Study ID is required"),
  caseStudyTitle: z.string().min(1, "Case Study Title is required"),
});

export type CaseStudyLeadFormValues = z.infer<typeof caseStudyLeadSchema>;
