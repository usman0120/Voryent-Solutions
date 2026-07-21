"use client";

import { useQuery } from "@tanstack/react-query";
import { resourcesService } from "@/lib/admin/services/resources.service";
import { DataTable } from "@/components/admin/cms/data-table";
import { columns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";

export default function ResourcesPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => resourcesService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Manage downloadable files, case studies, and guides.</p>
        </div>
        <Button asChild>
  <Link href="/admin/dashboard/resources/create">
            <Plus className="mr-2 h-4 w-4" /> Add Resource
          </Link>
</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading resources...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any} searchKey="title" />
          <DataTable columns={columns} data={items} searchKey="title" />
        </div>
      )}
    </div>
  );
}
