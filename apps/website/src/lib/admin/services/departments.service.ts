import { CoreService, BaseEntity } from "./core.service";

export interface Department extends BaseEntity {
  name: string;
  code?: string;
  description?: string;
  manager?: string;
}

export const departmentsService = new CoreService<Department>("departments");
export type { Department as DepartmentType };
