"use client";

import { can } from "@/lib/utils/permission-checker";
import { useAuth } from "@/providers/auth-provider";
import { ReactNode } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldAlert } from "lucide-react";

interface ModuleGuardProps {
  module: string;
  action?: string; // Default to "Read"
  children: ReactNode;
}

export function ModuleGuard({ module, action = "Read", children }: ModuleGuardProps) {
  const { user } = useAuth();
  
  const hasAccess = can(user, module, action);

  if (!hasAccess) {
    return (
      <div className="p-8">
        <EmptyState
          title="Access Denied"
          description={`You do not have permission to ${action.toLowerCase()} the ${module} module.`}
          icon={<ShieldAlert className="h-10 w-10 text-destructive" />}
        />
      </div>
    );
  }

  return <>{children}</>;
}
