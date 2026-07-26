import { CoreService, BaseEntity } from "./core.service";
import { type IndustryFormValues } from "../validations/industry.schema";

export type Industry = IndustryFormValues & BaseEntity;

export const industriesService = new CoreService<Industry>("industries");
