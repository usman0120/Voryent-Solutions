"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Page, pagesService } from "@/lib/services/pages.service";
import { StatusBadge } from "@/components/cms/status-badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
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

export const columns: ColumnDef<Page>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div className="text-muted-foreground">/{row.getValue("slug")}</div>,
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
      const page = row.original;

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
            <Link href={`/dashboard/pages/${page.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit Page
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={() => {
                if(confirm("Are you sure you want to delete this page?")) {
                  pagesService.delete(page.id!);
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
