import { CoreService, BaseEntity } from "./core.service";

export interface EmployeeDocument {
  name: string;
  fileData: string; // Base64 string
  uploadedAt: string;
}

export interface Employee extends Omit<BaseEntity, "status"> {
  employeeId: string;
  applicationId?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  manager?: string;
  joiningDate: string;
  salary?: string;
  currency: string;
  status: "Active" | "Probation" | "Notice Period" | "Resigned" | "Terminated" | "Inactive";
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  address?: string;
  documents?: EmployeeDocument[];
  notes?: string;
}

export const employeesService = new CoreService<Employee>("employees");
export type { Employee as EmployeeType };
