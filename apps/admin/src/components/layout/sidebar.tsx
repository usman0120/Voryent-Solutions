"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, FileText, Settings, LogOut, Activity, UserCheck, BookOpen } from "lucide-react";
import { cn } from "@voryent/ui";
import { logoutAdmin } from "@/lib/firebase/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/hr", icon: Activity, label: "HR Dashboard" },
  { href: "/dashboard/careers", icon: BookOpen, label: "Careers CMS" },
  { href: "/dashboard/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/dashboard/applications", icon: FileText, label: "Applications" },
  { href: "/dashboard/pipeline", icon: UserCheck, label: "Pipeline" },
  { href: "/dashboard/employees", icon: Users, label: "Employees" },
  { href: "/dashboard/blog", icon: FileText, label: "Blog" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col border-r bg-background flex hidden md:flex">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight">VAP</h2>
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
