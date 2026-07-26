import { CoreService, BaseEntity } from "./core.service";

import { type ProjectFormValues } from "../validations/project.schema";

export type Project = ProjectFormValues & BaseEntity & {
  createdBy?: string | null;
  updatedBy?: string | null;
};

export const projectsService = new CoreService<Project>("projects");
export type { Project as ProjectType };
