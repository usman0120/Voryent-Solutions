import { CoreService, BaseEntity } from "./core.service";

export interface Role extends BaseEntity {
  name: string;
  description?: string;
  isSystem: boolean;
  permissions: Record<string, string[]>; // Map of module to allowed actions
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const rolesService = new CoreService<Role>("roles");
export type { Role as RoleType };
