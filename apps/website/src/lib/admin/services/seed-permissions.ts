import { permissionsService } from "./permissions.service";

const defaultPermissionGroups = [
  { module: "Dashboard", actions: ["Read"] },
  { module: "Pages", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Navigation", actions: ["Read", "Edit", "Publish"] },
  { module: "Footer", actions: ["Read", "Edit", "Publish"] },
  { module: "Services", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Industries", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Work", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Case Studies", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Blog", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Resources", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "FAQ", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Media", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Careers", actions: ["Read", "Create", "Edit", "Delete", "Publish"] },
  { module: "Applications", actions: ["Read", "Edit", "Delete"] },
  { module: "Employees", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Projects", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Contacts", actions: ["Read", "Edit", "Delete"] },
  { module: "Company", actions: ["Read", "Edit"] },
  { module: "Investors", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Finance", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Reports", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Users", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Roles", actions: ["Read", "Create", "Edit", "Delete"] },
  { module: "Settings", actions: ["Read", "Edit"] },
  { module: "AI", actions: ["Read", "Execute"] },
  { module: "Analytics", actions: ["Read"] },
];

export async function seedDefaultPermissions() {
  const existing = await permissionsService.getAll();
  const existingModules = existing.map(e => e.module);
  
  const toSeed = defaultPermissionGroups.filter(p => !existingModules.includes(p.module));
  
  if (toSeed.length === 0) return 0;

  for (const group of toSeed) {
    await permissionsService.create(group as any);
  }
  
  return toSeed.length;
}
