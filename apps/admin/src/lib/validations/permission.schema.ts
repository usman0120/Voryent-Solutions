import * as z from "zod";

export const permissionSchema = z.object({
  module: z.string().min(2, "Module name is required"),
  actions: z.array(z.string()).min(1, "At least one action is required"),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;
