"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useReports } from "@/lib/react-query/reports.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: reports = [], isLoading } = useReports();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["reports"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canCreate = role === "Founder" || role === "CEO" || role === "Finance" || role === "HR" || role === "Marketing";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate, schedule, and view aggregated data exports.</p>
        </div>
        {canCreate && (
          <Link href="/dashboard/reports/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Button>
          </Link>
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
