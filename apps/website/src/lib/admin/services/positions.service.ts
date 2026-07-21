import { CoreService, BaseEntity } from "./core.service";

export interface Position extends BaseEntity {
  name: string;
  department: string;
  description?: string;
}

export const positionsService = new CoreService<Position>("positions");
export type { Position as PositionType };
