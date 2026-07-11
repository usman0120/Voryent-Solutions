"use client";

import { useQuery } from "@tanstack/react-query";
import { servicesService } from "@/lib/services/services.service";
import { DataTable } from "@/components/cms/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings.</p>
        </div>
        <Link href="/dashboard/services/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any} searchKey="title" />
          <DataTable columns={columns} data={services} searchKey="title" />
        </div>
      )}
    </div>
  );
}
