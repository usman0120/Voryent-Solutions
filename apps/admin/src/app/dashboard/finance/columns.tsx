"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type TransactionType, financeService } from "@/lib/services/finance.service";
import { TransactionStatusBadge } from "@/components/operations/transaction-status-badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
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

export const getColumns = (userRole: string | null, onRefresh: () => void): ColumnDef<TransactionType>[] => [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      if (!date) return "N/A";
      return <div className="text-sm">{format(new Date(date), "MMM d, yyyy")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground line-clamp-1">{row.getValue("description")}</div>
        <div className="text-xs text-muted-foreground">{row.original.reference || "-"}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("category")}</Badge>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.original.type;
      const currency = row.original.currency;
      
      const isIncome = type === "Income";
      const formatted = amount.toLocaleString(undefined, { style: 'currency', currency: currency });
      
      return (
        <div className={`font-medium ${isIncome ? "text-green-600" : "text-red-600"}`}>
          {isIncome ? "+" : "-"}{formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <TransactionStatusBadge status={row.getValue("status")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      // Finance access: Founder, CEO, Finance
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
            <Link href={`/dashboard/finance/${transaction.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/finance/${transaction.id}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit Transaction
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={async () => {
                if (confirm("Are you sure you want to permanently delete this transaction?")) {
                  await financeService.delete(transaction.id!);
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
