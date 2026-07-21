"use client";

import { useQuery } from "@tanstack/react-query";
import { industriesService } from "@/lib/admin/services/industries.service";
import { DataTable } from "@/components/admin/cms/data-table";
import { columns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";

export default function IndustriesPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["industries"],
    queryFn: () => industriesService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industries</h1>
          <p className="text-muted-foreground">Manage the industries you serve.</p>
        </div>
        <Button asChild>
  <Link href="/admin/dashboard/industries/create">
            <Plus className="mr-2 h-4 w-4" /> Add Industry
          </Link>
</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading industries...</p>
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
