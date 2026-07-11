import { CoreService, BaseEntity } from "./core.service";

export interface PermissionGroup extends BaseEntity {
  module: string;
  actions: string[];
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const permissionsService = new CoreService<PermissionGroup>("permissions");
export type { PermissionGroup as PermissionType };
