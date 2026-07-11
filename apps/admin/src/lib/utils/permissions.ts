export type Role = "admin" | "Founder" | "CEO" | "HR" | "Recruiter" | "Analyst";

export const PERMISSIONS = {
  manage_jobs: ["admin", "Founder", "CEO", "HR"],
  publish_jobs: ["admin", "Founder", "CEO", "HR"],
  view_jobs: ["admin", "Founder", "CEO", "HR", "Recruiter", "Analyst"],
  view_applications: ["admin", "Founder", "CEO", "HR", "Recruiter", "Analyst"],
  move_candidates: ["admin", "Founder", "CEO", "HR", "Recruiter"],
  hire_candidate: ["admin", "Founder", "CEO", "HR"],
  manage_employees: ["admin", "Founder", "CEO", "HR"],
  view_hr_reports: ["admin", "Founder", "CEO", "HR", "Analyst"],
};

export type ActionType = keyof typeof PERMISSIONS;

export function hasPermission(role: string | null, action: ActionType): boolean {
  if (!role) return false;
  const allowedRoles = PERMISSIONS[action] || [];
  return allowedRoles.includes(role);
}
