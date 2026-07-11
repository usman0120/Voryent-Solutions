"use client";

import { can } from "@/lib/utils/permission-checker";
import { useAuth } from "@/providers/auth-provider";
import { ReactNode } from "react";

interface PermissionGuardProps {
  module: string;
  action: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({ module, action, children, fallback = null }: PermissionGuardProps) {
  const { user } = useAuth();
  
  const hasAccess = can(user, module, action);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
