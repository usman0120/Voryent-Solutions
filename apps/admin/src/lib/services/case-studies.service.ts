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
