import * as z from "zod";

export const activitySchema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
  module: z.string(),
  action: z.string(),
  entityId: z.string().optional(),
  entityType: z.string().optional(),
  summary: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});
