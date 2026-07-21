import * as z from "zod";

export const companyLeadershipSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  ownershipPercentage: z.number().min(0).max(100).default(0),
  joinedAt: z.string().optional(),
  status: z.string().default("Active"),
  notes: z.string().optional(),
});

export const companySchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  legalName: z.string().min(2, "Legal Name is required"),
  registrationNumber: z.string().optional(),
  taxNumber: z.string().optional(),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  
  industry: z.string().optional(),
  foundedDate: z.string().optional(),
  
  // Brand & About
  description: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  values: z.string().optional(),
  logo: z.string().optional(),
  brandAssets: z.array(z.string()).default([]),
  
  // Links
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    github: z.string().optional(),
  }).optional(),
  
  // Leadership & Ownership
  leadership: z.array(companyLeadershipSchema).default([]),
  ownership: z.string().optional(), // Text describing ownership structure if needed
});

export type CompanyFormValues = z.infer<typeof companySchema>;
