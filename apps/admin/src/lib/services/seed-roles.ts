import { rolesService } from "./roles.service";

const defaultRoles = [
  {
    name: "Super Admin",
    description: "Unrestricted access to all modules and configurations.",
    isSystem: true,
    permissions: {
      "*": ["*"], // Wildcard indicator
    }
  },
  {
    name: "Founder",
    description: "Full access to operations, but cannot delete Super Admins.",
    isSystem: true,
    permissions: {
      "*": ["*"], // Will be filtered in UI/can utility
    }
  },
  {
    name: "CEO",
    description: "Read and manage operations, reports, and settings.",
    isSystem: true,
    permissions: {
      "Operations": ["Read", "Create", "Edit"],
      "Reports": ["Read", "Create", "Edit", "Delete"],
      "Settings": ["Read", "Edit"]
    }
  },
  {
    name: "HR",
    description: "Manage recruitment, employees, and applications.",
    isSystem: true,
    permissions: {
      "Careers": ["Read", "Create", "Edit", "Delete", "Publish"],
      "Applications": ["Read", "Edit"],
      "Employees": ["Read", "Create", "Edit", "Delete"]
    }
  },
  {
    name: "Finance",
    description: "Manage financial records and reports.",
    isSystem: true,
    permissions: {
      "Finance": ["Read", "Create", "Edit", "Delete"],
      "Reports": ["Read", "Create", "Edit"]
    }
  },
  {
    name: "Marketing",
    description: "Manage CMS, blog, SEO, and resources.",
    isSystem: true,
    permissions: {
      "Blog": ["Read", "Create", "Edit", "Delete", "Publish"],
      "Services": ["Read", "Create", "Edit", "Publish"],
      "Case Studies": ["Read", "Create", "Edit", "Publish"],
      "SEO": ["Read", "Edit"],
      "Resources": ["Read", "Create", "Edit"]
    }
  },
  {
    name: "Editor",
    description: "Create and edit content, but cannot publish without review.",
    isSystem: true,
    permissions: {
      "Blog": ["Read", "Create", "Edit"],
      "Case Studies": ["Read", "Create", "Edit"]
    }
  },
  {
    name: "Recruiter",
    description: "Review applications and manage job postings.",
    isSystem: true,
    permissions: {
      "Careers": ["Read", "Create", "Edit", "Publish"],
      "Applications": ["Read", "Edit"]
    }
  },
  {
    name: "Analyst",
    description: "Read-only access to analytics and reports.",
    isSystem: true,
    permissions: {
      "Analytics": ["Read"],
      "Reports": ["Read"]
    }
  },
  {
    name: "Developer",
    description: "Manage projects, media, and technical CMS configuration.",
    isSystem: true,
    permissions: {
      "Projects": ["Read", "Create", "Edit"],
      "Media": ["Read", "Create", "Edit", "Delete"],
      "Settings": ["Read"]
    }
  },
  {
    name: "Guest",
    description: "Minimal read-only access to dashboard.",
    isSystem: true,
    permissions: {
      "Dashboard": ["Read"]
    }
  }
];

export async function seedDefaultRoles() {
  const existingRoles = await rolesService.getAll();
  const existingNames = existingRoles.map(r => r.name);
  
  const toSeed = defaultRoles.filter(r => !existingNames.includes(r.name));
  
  if (toSeed.length === 0) return 0;

  for (const role of toSeed) {
    await rolesService.create(role as any);
  }
  
  return toSeed.length;
}
