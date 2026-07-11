"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useJobs } from "@/lib/react-query/jobs.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";

export default function JobsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: jobs = [], isLoading } = useJobs();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canCreate = hasPermission(role, "manage_jobs");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Open Positions</h1>
          <p className="text-muted-foreground">Manage job listings for Voryent Careers page.</p>
        </div>
        {canCreate && (
          <Link href="/dashboard/jobs/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Position
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading positions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="title"
          />
          <DataTable columns={columns} data={jobs} searchKey="title" />
        </div>
      )}
    </div>
  );
}
