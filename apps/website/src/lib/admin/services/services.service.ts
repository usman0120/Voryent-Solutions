import { CoreService, BaseEntity } from "./core.service";

import { type ServiceFormValues } from "../validations/service.schema";

export type Service = ServiceFormValues & BaseEntity;

export const servicesService = new CoreService<Service>("services");
