"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useProjects } from "@/lib/admin/react-query/projects.hooks";
import { DataTable } from "@/components/admin/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/admin/utils/permissions";
import { TableGridSkeleton } from "@/components/ui/generic-grid-skeleton";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: projects = [], isLoading } = useProjects();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const columns = getColumns(role, handleRefresh);
  // Using view_projects to determine if they can see it. Founder, CEO, Developer usually can manage.
  const canCreate = role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Developer"; 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage internal and client projects.</p>
        </div>
        {canCreate && (
          <Button asChild>
            <Link href="/admin/dashboard/projects/create">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Link>
          </Button>
        )}
      </div>

      {isLoading ? (
        <TableGridSkeleton rows={5} />
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="name"
          />
          <DataTable columns={columns} data={projects} searchKey="name" />
        </div>
      )}
    </div>
  );
}
