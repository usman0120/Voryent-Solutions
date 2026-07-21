"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ContactType, contactsService } from "@/lib/admin/services/contacts.service";
import { ContactStatusBadge } from "@/components/admin/operations/contact-status-badge";
import { PriorityBadge } from "@/components/admin/operations/priority-badge";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Pencil, Archive, Trash2, Eye } from "lucide-react";
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
import { hasPermission } from "@/lib/admin/utils/permissions";

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<ContactType>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("company") || "-"}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate text-muted-foreground" title={row.getValue("subject")}>
        {row.getValue("subject")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ContactStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityBadge priority={row.getValue("priority")} />,
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
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
      const contact = row.original;
      // CRM access: Founder, CEO, Marketing, HR, Analyst
      // Usually Analyst is read-only, others can manage.
      const canManage = roleHasWriteAccess(userRole);

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
            <Link href={`/dashboard/contacts/${contact.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </Link>
            {canManage && (
              <>
                <Link href={`/dashboard/contacts/${contact.id}/edit`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit/Assign
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    if (confirm("Are you sure you want to archive this contact?")) {
                      await contactsService.archive(contact.id!);
                      onRefresh();
                    }
                  }}
                >
                  <Archive className="mr-2 h-4 w-4" /> Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                  onClick={async () => {
                    if (confirm("Are you sure you want to permanently delete this contact?")) {
                      await contactsService.delete(contact.id!);
                      onRefresh();
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function roleHasWriteAccess(role: string | null) {
  return role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Marketing" || role === "HR";
}
