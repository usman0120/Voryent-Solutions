"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Activity,
  UserCheck,
  BookOpen,
  Building,
  PieChart,
  DollarSign,
} from "lucide-react";
import { cn } from "@voryent/ui";
import { logoutAdmin } from "@/lib/admin/firebase/auth";

const websiteNavItems = [
  { href: "/admin/dashboard/projects", icon: Briefcase, label: "Projects CMS" },
  { href: "/admin/dashboard/case-studies", icon: BookOpen, label: "Case Studies CMS" },
  { href: "/admin/dashboard/services", icon: LayoutDashboard, label: "Services CMS" },
  { href: "/admin/dashboard/industries", icon: Building, label: "Industries CMS" },
  { href: "/admin/dashboard/careers", icon: BookOpen, label: "Careers CMS" },
  { href: "/admin/dashboard/blog", icon: FileText, label: "Blog CMS" },
  { href: "/admin/dashboard/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/admin/dashboard/hr", icon: Users, label: "Recruitment & HR" },
];

const systemNavItems = [
  { href: "/admin/dashboard/settings", icon: Settings, label: "Global Settings" },
  { href: "/admin/dashboard/export", icon: FileText, label: "Data Export & Backup" },
];

export function Sidebar() {
  const pathname = usePathname();

  const renderNavGroup = (title: string, items: any[]) => (
    <div className="mb-6">
      <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="bg-background hidden w-64 flex-col overflow-y-auto border-r md:flex">
      <div className="bg-background sticky top-0 z-10 border-b p-6">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <img
              src="/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.webp"
              alt="Voryent Admin"
              className="h-full w-full object-contain dark:hidden"
            />
            <img
              src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.webp"
              alt="Voryent Admin"
              className="hidden h-full w-full object-contain dark:block"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Admin</h2>
        </div>
      </div>
      <nav className="flex-1 p-4 pb-12">
        {renderNavGroup("Overview", [
          { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        ])}
        {renderNavGroup("Public Website Management", websiteNavItems)}
        {renderNavGroup("System", systemNavItems)}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={logoutAdmin}
          className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
