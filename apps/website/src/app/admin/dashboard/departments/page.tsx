"use client";

import { HiredRoster } from "@/components/admin/hr/hired-roster";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/admin/utils/permissions";

export default function DepartmentsPage() {
  const { role } = useAuth();
  
  if (!hasPermission(role, "manage_employees")) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-8">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to manage departments and employees.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <Card>
        <CardContent className="pt-6">
          <HiredRoster />
        </CardContent>
      </Card>
    </div>
  );
}
