import { CoreService, BaseEntity } from "./core.service";

export interface Job extends BaseEntity {
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  workMode: "Remote" | "Hybrid" | "On-site";
  experienceLevel: string;
  salary?: string;
  currency: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  preferredSkills?: string;
  benefits?: string;
  featured?: boolean;
  closingDate?: string | null;
  seo?: {
    title?: string;
    description?: string;
  };
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const jobsService = new CoreService<Job>("jobs");
export type { Job as JobType };
