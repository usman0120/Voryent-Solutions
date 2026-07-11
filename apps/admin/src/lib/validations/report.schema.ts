import * as z from "zod";

export const reportSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["Projects", "Finance", "HR", "CRM", "Investors", "Custom"]).default("Finance"),
  format: z.enum(["CSV", "PDF", "Excel"]).default("CSV"),
  dateRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  status: z.enum(["Draft", "Generating", "Ready", "Failed"]).default("Draft"),
  fileUrl: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
