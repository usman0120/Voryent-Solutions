import * as z from "zod";

export const userPreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  notificationsEnabled: z.boolean().default(true),
  emailAlerts: z.boolean().default(true),
});

export const userSchema = z.object({
  uid: z.string().optional(), // Firebase Auth UID
  email: z.string().email("Valid email is required"),
  displayName: z.string().min(2, "Name is required"),
  photo: z.string().optional(),
  roleId: z.string().min(1, "Role is required"),
  status: z.enum(["Active", "Invited", "Suspended", "Disabled"]).default("Invited"),
  department: z.string().optional(),
  position: z.string().optional(),
  isActive: z.boolean().default(true),
  preferences: userPreferencesSchema.default({
    theme: "system",
    notificationsEnabled: true,
    emailAlerts: true,
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;
