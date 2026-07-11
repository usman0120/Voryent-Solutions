import { CoreService, BaseEntity } from "./core.service";

export interface Navigation extends BaseEntity {
  logo?: string;
  items: Array<{
    label: string;
    url: string;
    order: number;
    visible: boolean;
    newTab: boolean;
  }>;
  cta?: any;
  social?: any;
  theme?: string;
}

export const navigationService = new CoreService<Navigation>("navigation");
