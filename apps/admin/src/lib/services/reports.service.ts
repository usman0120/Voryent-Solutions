import { CoreService, BaseEntity } from "./core.service";

export interface Report extends BaseEntity {
  title: string;
  description?: string;
  type: "Projects" | "Finance" | "HR" | "CRM" | "Investors" | "Custom";
  format: "CSV" | "PDF" | "Excel";
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  status: "Draft" | "Generating" | "Ready" | "Failed";
  fileUrl?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const reportsService = new CoreService<Report>("reports");
export type { Report as ReportType };
