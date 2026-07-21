"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type UserType, usersService } from "@/lib/admin/services/users.service";
import { UserStatusBadge } from "@/components/admin/operations/user-status-badge";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Pencil, Trash2, Eye, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voryent/ui";

export const getColumns = (canManage: boolean, onRefresh: () => void): ColumnDef<UserType>[] => [
  {
    accessorKey: "displayName",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          {row.original.displayName?.[0] || "?"}
        </div>
        <div>
          <div className="font-semibold text-foreground line-clamp-1">
            {row.getValue("displayName")}
          </div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "roleId",
    header: "Role",
    cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("roleId")}</span>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("department") || "-"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <UserStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const date = row.getValue("lastLogin") as any;
      if (!date) return <span className="text-muted-foreground text-xs">Never</span>;
      const jsDate = date.toDate ? date.toDate() : new Date(date);
      return <div className="text-sm">{format(jsDate, "MMM d, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userProfile = row.original;

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
            <Link href={`/dashboard/users/${userProfile.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Profile
              </DropdownMenuItem>
            </Link>
            
            {canManage && (
              <>
                <Link href={`/dashboard/users/${userProfile.id}/edit`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit User
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                
                {userProfile.status !== "Suspended" ? (
                  <DropdownMenuItem 
                    className="cursor-pointer text-yellow-600 focus:bg-yellow-50 focus:text-yellow-700"
                    onClick={async () => {
                      if (confirm(`Suspend ${userProfile.displayName}?`)) {
                        await usersService.update(userProfile.id!, { status: "Suspended", isActive: false });
                        onRefresh();
                      }
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" /> Suspend Access
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    className="cursor-pointer text-green-600 focus:bg-green-50 focus:text-green-700"
                    onClick={async () => {
                      if (confirm(`Reactivate ${userProfile.displayName}?`)) {
                        await usersService.update(userProfile.id!, { status: "Active", isActive: true });
                        onRefresh();
                      }
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Reactivate Access
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                  onClick={async () => {
                    if (confirm("Permanently delete this user profile? (This does not delete the Firebase Auth account automatically unless a Cloud Function is configured).")) {
                      await usersService.delete(userProfile.id!);
                      onRefresh();
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Profile
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
