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
  address?: string;
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
  
  education?: Array<{
    school: string;
    fieldOfStudy?: string;
    degree?: string;
    startDate?: string;
    endDate?: string;
  }>;
  
  experience?: Array<{
    title: string;
    company?: string;
    industry?: string;
    summary?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
  }>;
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
