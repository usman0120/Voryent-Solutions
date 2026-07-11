import * as z from "zod";

export const settingsSchema = z.object({
  group: z.string(), // "general", "branding", "social", etc.
  values: z.record(z.string(), z.any()), // Dynamic object based on group
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

// Specific schemas for validation in the UI:
export const generalSettingsSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  websiteUrl: z.string().url("Must be a valid URL"),
  timezone: z.string(),
  language: z.string(),
  dateFormat: z.string(),
});

export const brandingSettingsSchema = z.object({
  logo: z.string().url().optional().or(z.literal("")),
  wordmark: z.string().url().optional().or(z.literal("")),
  favicon: z.string().url().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color"),
});

export const contactSettingsSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  mapUrl: z.string().url().optional().or(z.literal("")),
  officeHours: z.string(),
});

export const socialSettingsSchema = z.object({
  linkedIn: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  x: z.string().url().optional().or(z.literal("")), // Twitter/X
  facebook: z.string().url().optional().or(z.literal("")),
  whatsapp: z.string().optional(),
});

export const seoSettingsSchema = z.object({
  siteTitle: z.string().min(1, "Site Title is required"),
  siteDescription: z.string().min(10, "Site Description must be at least 10 characters"),
  defaultKeywords: z.string().optional(),
  defaultOgImage: z.string().url().optional().or(z.literal("")),
  twitterImage: z.string().url().optional().or(z.literal("")),
  robots: z.string().optional().default("index, follow"),
  canonicalBaseUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  organizationName: z.string().optional(),
  organizationLogo: z.string().url().optional().or(z.literal("")),
  organizationEmail: z.string().email().optional().or(z.literal("")),
  organizationPhone: z.string().optional(),
  organizationAddress: z.string().optional(),
});

export const analyticsSettingsSchema = z.object({
  ga4Id: z.string().optional(),
  gscVerificationId: z.string().optional(),
  bingVerificationId: z.string().optional(),
  clarityId: z.string().optional(),
});

