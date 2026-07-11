"use client";

import { useApplications } from "@/lib/react-query/applications.hooks";
import { DataTable } from "@/components/cms/data-table";
import { columns } from "./columns";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";

export default function ApplicationsPage() {
  const { role } = useAuth();
  const { data: applications = [], isLoading } = useApplications();

  const canView = hasPermission(role, "view_applications");

  if (!canView) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed rounded-lg bg-card text-muted-foreground">
        You do not have permission to view candidate applications.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
        <p className="text-muted-foreground">Review, screen, and track candidates applying for open roles.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="jobTitle"
          />
          <DataTable columns={columns} data={applications} searchKey="jobTitle" />
        </div>
      )}
    </div>
  );
}
