import * as z from "zod";

export const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  applicationId: z.string().optional(),
  userId: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"]),
  manager: z.string().optional(),
  joiningDate: z.string().min(1, "Joining Date is required"),
  salary: z.string().optional(),
  currency: z.string().default("USD"),
  status: z.enum(["Active", "Probation", "Notice Period", "Resigned", "Terminated", "Inactive"]).default("Active"),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    phone: z.string().optional(),
  }).optional(),
  address: z.string().optional(),
  documents: z.array(
    z.object({
      name: z.string(),
      fileData: z.string(), // Base64 string
      uploadedAt: z.string(),
    })
  ).default([]),
  notes: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
