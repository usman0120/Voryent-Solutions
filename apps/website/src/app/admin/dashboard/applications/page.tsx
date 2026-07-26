"use client";

import { ApplicationsTable } from "@/components/admin/hr/applications-table";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/admin/utils/permissions";

export default function ApplicationsPage() {
  const { role } = useAuth();
  
  if (!hasPermission(role, "view_applications")) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-8">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to manage applications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationsTable />
        </CardContent>
      </Card>
    </div>
  );
}
