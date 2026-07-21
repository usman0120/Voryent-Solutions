import { CoreService, BaseEntity } from "./core.service";

export interface CompanyLeadership {
  name: string;
  role: string;
  ownershipPercentage: number;
  joinedAt?: string;
  status: string;
  notes?: string;
}

export interface Company extends BaseEntity {
  companyName: string;
  legalName: string;
  registrationNumber?: string;
  taxNumber?: string;
  email?: string;
  phone?: string;
  website?: string;
  
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  
  industry?: string;
  foundedDate?: string;
  
  description?: string;
  mission?: string;
  vision?: string;
  values?: string;
  logo?: string;
  brandAssets: string[];
  
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
  
  leadership: CompanyLeadership[];
  ownership?: string;
  
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const companiesService = new CoreService<Company>("companies");
export type { Company as CompanyType };
