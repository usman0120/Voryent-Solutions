"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type EmployeeType } from "@/lib/services/employees.service";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@voryent/ui";

const empStatusColorMap: Record<string, string> = {
  Active: "bg-green-500/10 text-green-500 border-green-500/20",
  Probation: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Notice Period": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Resigned: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  Terminated: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export const columns: ColumnDef<EmployeeType>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => <div className="font-semibold">{row.getValue("employeeId")}</div>,
  },
  {
    id: "name",
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div className="font-medium">{row.getValue("position")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("department")}</div>,
  },
  {
    accessorKey: "employmentType",
    header: "Type",
    cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("employmentType")}</div>,
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date",
    cell: ({ row }) => <div className="text-sm">{row.getValue("joiningDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const badgeClass = empStatusColorMap[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
      return (
        <Badge variant="outline" className={badgeClass}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const emp = row.original;

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
            <Link href={`/dashboard/employees/${emp.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" /> View Full Profile
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export { empStatusColorMap };
