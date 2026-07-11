/**
 * Centralized Permission Checker
 *
 * Checks if a user has a specific action permission for a given module.
 * 
 * Usage example:
 * can(currentUser, "Blog", "Publish")
 */
export function can(user: any, module: string, action: string): boolean {
  if (!user || !user.roleData) {
    // If the user object doesn't have populated roleData, default to checking role name strings for super users, 
    // but ideally roleData should be pre-populated by the AuthProvider.
    if (user?.role === "Super Admin" || user?.role === "Founder") return true;
    return false;
  }

  const roleName = user.roleData.name;
  if (roleName === "Super Admin") return true; // Super Admin has wildcard access intrinsically

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
