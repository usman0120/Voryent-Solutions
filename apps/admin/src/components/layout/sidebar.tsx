"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, FileText, Settings, LogOut, Activity, UserCheck, BookOpen, Building, PieChart, DollarSign } from "lucide-react";
import { cn } from "@voryent/ui";
import { logoutAdmin } from "@/lib/firebase/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/company", icon: Building, label: "Company Settings" },
  { href: "/dashboard/company/equity", icon: PieChart, label: "Cap Table" },
  { href: "/dashboard/finance", icon: DollarSign, label: "Financials" },
  { href: "/dashboard/hr", icon: Activity, label: "HR Dashboard" },
  { href: "/dashboard/projects", icon: Briefcase, label: "Projects CMS" },
  { href: "/dashboard/case-studies", icon: BookOpen, label: "Case Studies CMS" },
  { href: "/dashboard/services", icon: LayoutDashboard, label: "Services CMS" },
  { href: "/dashboard/industries", icon: Building, label: "Industries CMS" },
  { href: "/dashboard/careers", icon: BookOpen, label: "Careers CMS" },
  { href: "/dashboard/blog", icon: FileText, label: "Blog CMS" },
  { href: "/dashboard/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/dashboard/applications", icon: FileText, label: "Applications" },
  { href: "/dashboard/pipeline", icon: UserCheck, label: "Recruiting Pipeline" },
  { href: "/dashboard/employees", icon: Users, label: "Employees Directory" },
  { href: "/dashboard/settings", icon: Settings, label: "Global Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col border-r bg-background flex hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <img 
              src="/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.png" 
              alt="Voryent Admin" 
              className="object-contain w-full h-full dark:hidden"
            />
            <img 
              src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.png" 
              alt="Voryent Admin" 
              className="object-contain w-full h-full hidden dark:block"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Admin</h2>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={logoutAdmin}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
