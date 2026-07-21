"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type RoleType, rolesService } from "@/lib/admin/services/roles.service";
import { RoleBadge } from "@/components/admin/operations/role-badge";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voryent/ui";
import { Badge } from "@voryent/ui";

export const getColumns = (canManage: boolean, onEdit: (role: RoleType) => void, onRefresh: () => void): ColumnDef<RoleType>[] => [
  {
    accessorKey: "name",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <RoleBadge role={row.original.name} />
        {row.original.isSystem && (
          <Badge variant="outline" className="text-xs px-1.5 py-0">System</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-1">{row.getValue("description")}</span>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Perms Configured",
    cell: ({ row }) => {
      const perms = row.original.permissions || {};
      const numModules = Object.keys(perms).length;
      return <span className="text-sm font-medium">{numModules} Modules</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as any;
      if (!date) return "N/A";
      const jsDate = date.toDate ? date.toDate() : new Date(date);
      return <div className="text-sm">{format(jsDate, "MMM d, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            {canManage && (
              <>
                <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(role)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit Details
                </DropdownMenuItem>
                
                {!role.isSystem && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                      onClick={async () => {
                        if (confirm(`Permanently delete custom role '${role.name}'? Users assigned to this role will lose access.`)) {
                          await rolesService.delete(role.id!);
                          onRefresh();
                        }
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Custom Role
                    </DropdownMenuItem>
                  </>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
