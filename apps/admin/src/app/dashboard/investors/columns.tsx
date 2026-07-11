"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InvestorType, investorsService } from "@/lib/services/investors.service";
import { InvestorStatusBadge } from "@/components/operations/investor-status-badge";
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
import { Badge } from "@/components/ui/badge";

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<InvestorType>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground">{row.getValue("name")}</div>
        <div className="text-xs text-muted-foreground">{row.original.organization || "Individual"}</div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("type")}</Badge>,
  },
  {
    accessorKey: "investmentAmount",
    header: "Investment",
    cell: ({ row }) => {
      const amount = row.getValue("investmentAmount") as number;
      const currency = row.original.currency;
      return (
        <div className="font-medium">
          {amount.toLocaleString(undefined, { style: 'currency', currency: currency })}
        </div>
      );
    },
  },
  {
    accessorKey: "equityPercentage",
    header: "Equity",
    cell: ({ row }) => <div>{row.getValue("equityPercentage")}%</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <InvestorStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "investmentDate",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("investmentDate") as string;
      if (!date) return "N/A";
      return <div className="text-sm">{format(new Date(date), "MMM d, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const investor = row.original;
      // Investors module: usually restricted to Founder, CEO, Finance
      const canManage = roleHasWriteAccess(userRole);

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
            <Link href={`/dashboard/investors/${investor.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/investors/${investor.id}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit Investor
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                if (confirm("Are you sure you want to archive this investor?")) {
                  await investorsService.archive(investor.id!);
                  onRefresh();
                }
              }}
            >
              <Archive className="mr-2 h-4 w-4" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={async () => {
                if (confirm("Are you sure you want to permanently delete this investor?")) {
                  await investorsService.delete(investor.id!);
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

function roleHasWriteAccess(role: string | null) {
  return role === "Founder" || role === "CEO" || role === "Finance";
}
