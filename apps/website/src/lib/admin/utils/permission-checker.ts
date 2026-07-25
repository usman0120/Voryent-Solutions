/**
 * Centralized Permission Checker
 *
 * Checks if a user has a specific action permission for a given module.
 * 
 * Usage example:
 * can(currentUser, "Blog", "Publish")
 */
export function can(user: any, module: string, action: string, roleString?: string | null): boolean {
  if (roleString) {
    const rs = roleString.toLowerCase();
    if (rs === "admin") return true;
  }

  if (!user || !user.roleData) {
    if (user?.role) {
      const ur = user.role.toLowerCase();
      if (ur === "admin") return true;
    }
    return false;
  }

  const roleName = user.roleData.name;
  if (roleName === "admin") return true; // admin has wildcard access intrinsically

  const permissions = user.roleData.permissions || {};

  // Check wildcard module
  if (permissions["*"]) {
    if (permissions["*"].includes("*") || permissions["*"].includes(action)) {
      return true;
    }
  }

  // Check specific module
  const modulePerms = permissions[module];
  if (!modulePerms) return false;

  // Module wildcard or specific action
  return modulePerms.includes("*") || modulePerms.includes(action);
}
