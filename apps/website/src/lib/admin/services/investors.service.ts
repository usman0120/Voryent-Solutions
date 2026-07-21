import { CoreService, BaseEntity } from "./core.service";

export interface Investor extends BaseEntity {
  name: string;
  type: "Angel" | "VC" | "Private" | "Founder" | "Strategic" | "Other";
  email?: string;
  phone?: string;
  organization?: string;
  investmentAmount: number;
  currency: string;
  equityPercentage: number;
  investmentDate?: string | null;
  status: "Prospect" | "Negotiating" | "Active" | "Exited" | "Archived";
  documents: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  notes?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const investorsService = new CoreService<Investor>("investors");
export type { Investor as InvestorType };
