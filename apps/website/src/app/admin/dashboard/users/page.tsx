"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useUsers } from "@/lib/admin/react-query/users.hooks";
import { DataTable } from "@/components/admin/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { can } from "@/lib/admin/utils/permission-checker"; // To be created in Step 3

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: users = [], isLoading } = useUsers();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  // Temp fallback before permission checker is fully wired
  const canManage = (user as any)?.role === "Super Admin" || (user as any)?.role === "Founder" || (user as any)?.role === "admin" || (user as any)?.role === "HR";

  const columns = getColumns(canManage, handleRefresh);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage admin portal access, roles, and accounts.</p>
        </div>
        {canManage && (
          <Button asChild>
  <Link href="/admin/dashboard/users/create">
              <Plus className="mr-2 h-4 w-4" /> Invite User
            </Link>
</Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="email"
          />
          <DataTable columns={columns} data={users} searchKey="email" />
        </div>
      )}
    </div>
  );
}
