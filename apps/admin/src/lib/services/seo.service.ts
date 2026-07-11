import { CoreService, BaseEntity } from "./core.service";

export interface SeoSettings extends BaseEntity {
  siteTitle?: string;
  siteName?: string;
  defaultTitle?: string;
  titleTemplate?: string;
  defaultOgImage?: string;
  twitterHandle?: string;
  defaultDescription?: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
  robots?: string;
  canonical?: string;
  schema?: string;
  redirects?: any[];
}

export const seoService = new CoreService<SeoSettings>("settings"); // Will usually be stored as settings/seo
