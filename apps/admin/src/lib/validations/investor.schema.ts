import * as z from "zod";

export const investorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.enum(["Angel", "VC", "Private", "Founder", "Strategic", "Other"]).default("Angel"),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  organization: z.string().optional(),
  investmentAmount: z.number().min(0).default(0),
  currency: z.string().default("USD"),
  equityPercentage: z.number().min(0).max(100).default(0),
  investmentDate: z.string().optional().nullable(),
  status: z.enum(["Prospect", "Negotiating", "Active", "Exited", "Archived"]).default("Prospect"),
  documents: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
  })).default([]),
  notes: z.string().optional(),
});

export type InvestorFormValues = z.infer<typeof investorSchema>;
