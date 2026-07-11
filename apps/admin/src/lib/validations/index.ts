import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  description: z.string().min(20, "Description must be at least 20 characters"),
  status: z.enum(["Open", "Closed", "Draft"]),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Name is required"),
  client: z.string().min(2, "Client name is required"),
  status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]),
  dueDate: z.date(),
  budget: z.number().min(0),
});

export * from "./job.schema";
export * from "./application.schema";
export * from "./employee.schema";
export * from "./project.schema";
export * from "./cms";
export * from "./page.schema";
export * from "./service.schema";
export * from "./industry.schema";
export * from "./faq.schema";
export * from "./resource.schema";
export * from "./blog.schema";
export * from "./contact.schema";
export * from "./company.schema";
export * from "./investor.schema";
export * from "./transaction.schema";
export * from "./report.schema";
export * from "./user.schema";
export * from "./role.schema";
export * from "./permission.schema";
export * from "./settings.schema";
export * from "./activity.schema";
export * from "./ai-request.schema";