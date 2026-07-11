"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ProjectType, projectsService } from "@/lib/services/projects.service";
import { ProjectStatusBadge } from "@/components/operations/project-status-badge";
import { PriorityBadge } from "@/components/operations/priority-badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import { hasPermission } from "@/lib/utils/permissions";
import { Progress } from "@/components/ui/progress";

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<ProjectType>[] => [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => <div className="font-semibold text-foreground">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ProjectStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <PriorityBadge priority={row.getValue("priority")} />,
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="w-[100px] flex items-center gap-2">
        <Progress value={row.getValue("progress")} className="h-2 flex-1" />
        <span className="text-xs text-muted-foreground">{row.getValue("progress")}%</span>
      </div>
    ),
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
      const project = row.original;
      // Projects write access checks could be added here
      const canManage = hasPermission(userRole, "view_jobs"); // or specific permission

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
            <Link href={`/dashboard/projects/${project.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit Project
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                if (confirm("Are you sure you want to archive this project?")) {
                  await projectsService.archive(project.id!);
                  onRefresh();
                }
              }}
            >
              <Archive className="mr-2 h-4 w-4" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={async () => {
                if (confirm("Are you sure you want to permanently delete this project?")) {
                  await projectsService.delete(project.id!);
                  onRefresh();
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
