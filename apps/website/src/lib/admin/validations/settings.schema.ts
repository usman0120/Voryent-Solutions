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

export const contactSettingsSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  mapUrl: z.string().url().optional().or(z.literal("")),
  officeHours: z.string(),
});

export const socialSettingsSchema = z.object({
  platforms: z.array(z.object({
    platform: z.string().min(1, "Platform name is required"),
    url: z.string().min(1, "URL/Link is required"),
  })).default([]),
});

