"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRoles } from "@/lib/react-query/roles.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, DatabaseBackup } from "lucide-react";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { can } from "@/lib/utils/permission-checker";
import { seedDefaultRoles } from "@/lib/services/seed-roles";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RoleForm } from "./role-form";
import { RoleType } from "@/lib/services/roles.service";

export default function RolesPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: roles = [], isLoading } = useRoles();
  const [isSeeding, setIsSeeding] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  };

  const handleEdit = (role: RoleType) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingRole(null);
    setIsDialogOpen(true);
  };

  const canManage = (user as any)?.role === "Super Admin" || (user as any)?.role === "Founder";

  const columns = getColumns(canManage, handleEdit, handleRefresh);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const seededCount = await seedDefaultRoles();
      toast.success(seededCount > 0 ? `Seeded ${seededCount} default roles.` : "All default roles already exist.");
      handleRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to seed default roles.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
          <p className="text-muted-foreground">Manage user roles and system definitions.</p>
        </div>
        <div className="flex gap-2">
          {canManage && roles.length < 5 && (
            <Button variant="secondary" onClick={handleSeed} disabled={isSeeding}>
              <DatabaseBackup className="mr-2 h-4 w-4" /> 
              {isSeeding ? "Seeding..." : "Seed Default Roles"}
            </Button>
          )}
          {canManage && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> New Custom Role
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading roles...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="name"
          />
          <DataTable columns={columns} data={roles} searchKey="name" />
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingRole ? "Edit Role" : "Create Custom Role"}</DialogTitle>
          </DialogHeader>
          <RoleForm initialData={editingRole || undefined} onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
