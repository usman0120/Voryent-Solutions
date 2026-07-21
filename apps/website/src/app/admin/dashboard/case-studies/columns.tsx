"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type CaseStudy } from "@/lib/admin/services/case-studies.service";
import { Badge } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voryent/ui";
import { useDeleteCaseStudy } from "@/lib/admin/react-query/case-studies.hooks";

export const columns: ColumnDef<CaseStudy>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Published" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      return row.getValue("featured") ? <Badge variant="outline">Featured</Badge> : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const caseStudy = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteMutation = useDeleteCaseStudy();
      
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
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/case-studies/${caseStudy.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this case study?")) {
                  deleteMutation.mutate(caseStudy.id);
                }
              }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
