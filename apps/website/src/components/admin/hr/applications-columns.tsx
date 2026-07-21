"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ApplicationType } from "@/lib/admin/services/applications.service";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Eye } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@voryent/ui";
import { Badge } from "@voryent/ui";
import { HireDialog } from "./hire-dialog";

const stageColorMap: Record<string, string> = {
  Applied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Screening: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Interview Scheduled": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Technical Review": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Final Interview": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Offer Sent": "bg-teal-500/10 text-teal-500 border-teal-500/20",
  Hired: "bg-green-500/10 text-green-500 border-green-500/20",
  Rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Withdrawn: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export const columns: ColumnDef<ApplicationType>[] = [
  {
    id: "name",
    header: "Candidate Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "jobTitle",
    header: "Applied Position",
    cell: ({ row }) => <div className="font-medium">{row.getValue("jobTitle")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => <div className="text-sm">{row.getValue("availability")}</div>,
  },
  {
    accessorKey: "status",
    header: "Pipeline Stage",
    cell: ({ row }) => {
      const stage = row.getValue("status") as string;
      const badgeClass = stageColorMap[stage] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
      return (
        <Badge variant="outline" className={badgeClass}>
          {stage}
        </Badge>
      );
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Applied Date",
    cell: ({ row }) => {
      const date = row.getValue("appliedAt") as any;
      if (!date) return "N/A";
      const jsDate = date.toDate ? date.toDate() : new Date(date);
      return <div className="text-sm">{format(jsDate, "MMM d, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const app = row.original;

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
              <Link href={`/admin/dashboard/applications/${app.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" /> View Profile & Details
                </DropdownMenuItem>
              </Link>
              {app.status === "Offer Sent" && (
                <HireDialog 
                  applicationId={app.id!}
                  candidateName={`${app.firstName} ${app.lastName}`}
                  candidateEmail={app.email}
                  candidatePhone={app.phone}
                  defaultPosition={app.jobTitle}
                  trigger={
                    <DropdownMenuItem className="cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50" onSelect={(e) => e.preventDefault()}>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Hire Candidate
                    </DropdownMenuItem>
                  }
                />
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export { stageColorMap };

