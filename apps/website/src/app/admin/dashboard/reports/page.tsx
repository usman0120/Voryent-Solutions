"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useReports } from "@/lib/admin/react-query/reports.hooks";
import { DataTable } from "@/components/admin/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: reports = [], isLoading } = useReports();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["reports"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canCreate = role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Finance" || role === "HR" || role === "Marketing";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate, schedule, and view aggregated data exports.</p>
        </div>
        {canCreate && (
          <Button asChild>
  <Link href="/admin/dashboard/reports/create">
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Link>
</Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading reports...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="title"
          />
          <DataTable columns={columns} data={reports} searchKey="title" />
        </div>
      )}
    </div>
  );
}
