import { CoreService, BaseEntity } from "./core.service";

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notificationsEnabled: boolean;
  emailAlerts: boolean;
}

export interface User extends BaseEntity {
  uid?: string; // Links to Firebase Auth uid
  email: string;
  displayName: string;
  photo?: string;
  roleId: string;
  status: "Active" | "Invited" | "Suspended" | "Disabled";
  department?: string;
  position?: string;
  lastLogin?: any; // Firestore Timestamp
  isActive: boolean;
  preferences: UserPreferences;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export const usersService = new CoreService<User>("users");
export type { User as UserType };
