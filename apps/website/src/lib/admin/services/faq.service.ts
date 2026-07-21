import { CoreService, BaseEntity } from "./core.service";

export interface FaqItem extends BaseEntity {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  featured?: boolean;
}

export const faqService = new CoreService<FaqItem>("faqItems");
