import { CoreService, BaseEntity } from "./core.service";

export interface Project extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  type: string;
  status: "Planning" | "Active" | "On Hold" | "Completed" | "Cancelled" | "Archived";
  priority: "Low" | "Medium" | "High" | "Critical";
  client?: string;
  industry?: string;
  startDate?: string | null;
  targetDate?: string | null;
  completedDate?: string | null;
  budget?: number | null;
  currency: string;
  progress: number;
  teamMembers: string[];
  projectManager?: string;
  technologies: string[];
  repository?: string;
  website?: string;
  attachments: Array<{
    name: string;
    url: string;
    size: number;
    type: string;
  }>;
  notes?: string;
  tags: string[];
  milestones?: {
    id?: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: "Pending" | "In Progress" | "Completed";
  }[];
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const projectsService = new CoreService<Project>("projects");
export type { Project as ProjectType };
