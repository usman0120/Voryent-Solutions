import { CoreService, BaseEntity } from "./core.service";

export interface BlogSubscription extends BaseEntity {
  email: string;
  subscribedAt?: any;
  status?: string;
}

export const subscriptionService = new CoreService<BlogSubscription>("blogSubscriptions");
