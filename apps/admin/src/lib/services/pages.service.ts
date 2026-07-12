import { CoreService, BaseEntity } from "./core.service";

export interface Page extends BaseEntity {
  title: string;
  slug: string;
  type: string;
  hero?: any;
  sections?: any[];
  contentBlocks?: any;
  seo?: any;
  publishedAt?: any;
  publishedBy?: string;
  lastEditedBy?: string;
}

export const pagesService = new CoreService<Page>("pages");
