import { CoreService } from "./core.service";
import type { CaseStudyFormValues } from "../validations/case-study.schema";

export type CaseStudy = CaseStudyFormValues & {
  id: string;
  createdAt: any;
  updatedAt: any;
};

class CaseStudiesService extends CoreService<CaseStudyFormValues> {
  constructor() {
    super("case-studies");
  }
}

export const caseStudiesService = new CaseStudiesService();

export type CaseStudyLead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  location?: string;
  caseStudyId: string;
  caseStudyTitle: string;
  downloadedAt: any;
};

class CaseStudyLeadsService extends CoreService<any> {
  constructor() {
    super("caseStudyLeads");
  }
}

export const caseStudyLeadsService = new CaseStudyLeadsService();
