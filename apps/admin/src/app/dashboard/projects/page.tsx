"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useProjects } from "@/lib/react-query/projects.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: projects = [], isLoading } = useProjects();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const columns = getColumns(role, handleRefresh);
  // Using view_projects to determine if they can see it. Founder, CEO, Developer usually can manage.
  const canCreate = role === "Founder" || role === "CEO" || role === "Developer"; 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage internal and client projects.</p>
        </div>
        {canCreate && (
          <Link href="/dashboard/projects/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
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
