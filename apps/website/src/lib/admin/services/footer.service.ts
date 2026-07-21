import { CoreService, BaseEntity } from "./core.service";

export interface Footer extends BaseEntity {
  description?: string;
  columns?: any[];
  links?: any[];
  socialLinks?: any[];
  copyright?: string;
  legalLinks?: any[];
}

export const footerService = new CoreService<Footer>("footer");
