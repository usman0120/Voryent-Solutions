import { CoreService, BaseEntity } from "./core.service";

export interface Industry extends BaseEntity {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  hero?: any;
  benefits?: any[];
  featured?: boolean;
  seo?: any;
  order?: number;
}

export const industriesService = new CoreService<Industry>("industries");
