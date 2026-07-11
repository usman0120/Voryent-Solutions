"use client";

import { useEmployees } from "@/lib/react-query/employees.hooks";
import { DataTable } from "@/components/cms/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";

export default function EmployeesPage() {
  const { role } = useAuth();
  const { data: employees = [], isLoading } = useEmployees();

  const canManage = hasPermission(role, "manage_employees");

  if (!canManage) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed rounded-lg bg-card text-muted-foreground">
        You do not have permission to view employee records.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground">Manage internal staff profiles, departments, and payroll details.</p>
        </div>
        <Link href="/dashboard/employees/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading employee records...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="position"
          />
          <DataTable columns={columns} data={employees} searchKey="position" />
        </div>
      )}
    </div>
  );
}
