import { CoreService, BaseEntity } from "./core.service";

export interface Resource extends BaseEntity {
  title: string;
  slug: string;
  category: "Guide" | "Template" | "Checklist" | "Documentation" | "Download";
  description?: string;
  fileUrl?: string;
  type?: string;
  coverImage?: string;
  gated?: boolean;
  externalUrl?: string;
  cover?: string;
  featured?: boolean;
  seo?: any;
}

export const resourcesService = new CoreService<Resource>("resources");
