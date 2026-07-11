"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ReportType, reportsService } from "@/lib/services/reports.service";
import { ReportStatusBadge } from "@/components/operations/report-status-badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye, Download, Play } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<ReportType>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-semibold text-foreground line-clamp-1">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("type")}</Badge>,
  },
  {
    accessorKey: "format",
    header: "Format",
    cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("format")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ReportStatusBadge status={row.getValue("status")} />,
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
      const report = row.original;
      // Assume all admin users can run/view reports, but only creators/super admins can delete
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
            <Link href={`/dashboard/reports/${report.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </Link>
            
            {report.status === "Ready" && report.fileUrl && (
              <DropdownMenuItem className="cursor-pointer" onClick={() => window.open(report.fileUrl, '_blank')}>
                <Download className="mr-2 h-4 w-4" /> Download File
              </DropdownMenuItem>
            )}

            {canManage && (
              <>
                <Link href={`/dashboard/reports/${report.id}/edit`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" /> Edit Config
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={async () => {
                    // Placeholder for report generation trigger
                    alert("Report generation triggered! (Placeholder)");
                    await reportsService.update(report.id!, { status: "Generating" });
                    onRefresh();
                  }}
                >
                  <Play className="mr-2 h-4 w-4" /> Generate Now
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                  onClick={async () => {
                    if (confirm("Are you sure you want to permanently delete this report configuration?")) {
                      await reportsService.delete(report.id!);
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
  return role === "Founder" || role === "CEO" || role === "Finance" || role === "HR" || role === "Marketing";
}
