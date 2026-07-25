export type Role = "admin";

export const PERMISSIONS = {
  manage_jobs: ["admin"],
  publish_jobs: ["admin"],
  view_jobs: ["admin"],
  view_applications: ["admin"],
  move_candidates: ["admin"],
  hire_candidate: ["admin"],
  manage_employees: ["admin"],
  view_hr_reports: ["admin"],
  read_settings: ["admin"],
  manage_settings: ["admin"],
  read_pipeline: ["admin"],
  read_employee_records: ["admin"],
};

export type ActionType = keyof typeof PERMISSIONS;

export function hasPermission(role: string | null, action: ActionType): boolean {
  if (!role) return false;
  if (role === "admin") return true;
  return false;
}
