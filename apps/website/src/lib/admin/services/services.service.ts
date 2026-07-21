import { CoreService, BaseEntity } from "./core.service";

export interface Service extends BaseEntity {
  title: string;
  slug: string;
  excerpt?: string;
  hero?: any;
  overview?: string;
  benefits?: any[];
  process?: any[];
  technologies?: any[];
  faq?: any[];
  seo?: any;
  icon?: string;
  featured?: boolean;
  order?: number;
}

export const servicesService = new CoreService<Service>("services");
