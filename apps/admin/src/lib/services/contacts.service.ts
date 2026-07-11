import { CoreService, BaseEntity } from "./core.service";

export interface Contact extends BaseEntity {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  subject: string;
  message: string;
  source: string;
  assignedTo?: string;
  status: "New" | "Assigned" | "In Progress" | "Waiting" | "Resolved" | "Closed" | "Archived";
  priority: "Low" | "Medium" | "High" | "Critical";
  tags: string[];
  notes?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const contactsService = new CoreService<Contact>("contacts");
export type { Contact as ContactType };
