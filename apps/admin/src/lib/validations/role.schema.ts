import * as z from "zod";

export const roleSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  isSystem: z.boolean().default(false),
  permissions: z.record(z.string(), z.array(z.string())).default({}), // Map of Module -> Actions
});

export type RoleFormValues = z.infer<typeof roleSchema>;
