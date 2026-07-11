import { CoreService, BaseEntity } from "./core.service";

export interface ApplicationNote {
  id: string;
  authorName: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Application extends Omit<BaseEntity, "status"> {
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  resume: string; // Base64 encoded
  resumeName?: string;
  coverLetter?: string;
  availability: string;
  salaryExpectation?: string;
  currency: string;
  experienceYears?: number;
  skills?: string;
  education?: string;
  status:
    | "Applied"
    | "Screening"
    | "Interview Scheduled"
    | "Technical Review"
    | "Final Interview"
    | "Offer Sent"
    | "Hired"
    | "Rejected"
    | "Withdrawn";
  notes?: ApplicationNote[];
  appliedAt?: any;
  reviewedAt?: any;
  reviewedBy?: string;
}

export const applicationsService = new CoreService<Application>("applications");
export type { Application as ApplicationType };
