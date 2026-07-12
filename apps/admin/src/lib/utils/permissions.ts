export type Role = "admin" | "Super Admin" | "Founder" | "CEO" | "HR" | "Recruiter" | "Analyst";

export const PERMISSIONS = {
  manage_jobs: ["admin", "Super Admin", "Founder", "CEO", "HR"],
  publish_jobs: ["admin", "Super Admin", "Founder", "CEO", "HR"],
  view_jobs: ["admin", "Super Admin", "Founder", "CEO", "HR", "Recruiter", "Analyst"],
  view_applications: ["admin", "Super Admin", "Founder", "CEO", "HR", "Recruiter", "Analyst"],
  move_candidates: ["admin", "Super Admin", "Founder", "CEO", "HR", "Recruiter"],
  hire_candidate: ["admin", "Super Admin", "Founder", "CEO", "HR"],
  manage_employees: ["admin", "Super Admin", "Founder", "CEO", "HR"],
  view_hr_reports: ["admin", "Super Admin", "Founder", "CEO", "HR", "Analyst"],
  read_settings: ["admin", "Super Admin", "Founder", "CEO"],
  manage_settings: ["admin", "Super Admin", "Founder"],
  read_pipeline: ["admin", "Super Admin", "Founder", "CEO", "HR", "Recruiter"],
  read_employee_records: ["admin", "Super Admin", "Founder", "CEO", "HR"],
};

export type ActionType = keyof typeof PERMISSIONS;

export function hasPermission(role: string | null, action: ActionType): boolean {
  if (!role) return false;
  if (role === "Super Admin" || role === "Founder") return true;
  const allowedRoles = PERMISSIONS[action] || [];
  return allowedRoles.includes(role);
}
