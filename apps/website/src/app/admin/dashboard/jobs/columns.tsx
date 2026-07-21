"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type JobType, jobsService } from "@/lib/admin/services/jobs.service";
import { StatusBadge } from "@/components/admin/cms/status-badge";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Pencil, Archive, Trash2 } from "lucide-react";
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

interface CellProps {
  row: any;
  userRole: string | null;
  onRefresh: () => void;
}

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<JobType>[] => [
  {
    accessorKey: "title",
    header: "Job Title",
    cell: ({ row }) => <div className="font-semibold text-foreground">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("department")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "employmentType",
    header: "Type",
    cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("employmentType")}</div>,
  },
  {
    accessorKey: "workMode",
    header: "Mode",
    cell: ({ row }) => <div className="text-sm">{row.getValue("workMode")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as any;
      if (!date) return "N/A";
      const jsDate = date.toDate ? date.toDate() : new Date(date);
      return <div className="text-sm">{format(jsDate, "MMM d, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      const canManage = hasPermission(userRole, "manage_jobs");

      if (!canManage) return null;

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
            <Link href={`/dashboard/jobs/${job.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit Job
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                if (confirm("Are you sure you want to archive this job?")) {
                  await jobsService.archive(job.id!);
                  onRefresh();
                }
              }}
            >
              <Archive className="mr-2 h-4 w-4" /> Archive Job
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={async () => {
                if (confirm("Are you sure you want to permanently delete this job?")) {
                  await jobsService.delete(job.id!);
                  onRefresh();
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
