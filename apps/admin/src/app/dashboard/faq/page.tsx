"use client";

import { useQuery } from "@tanstack/react-query";
import { faqService } from "@/lib/services/faq.service";
import { DataTable } from "@/components/cms/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";

export default function FAQPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: () => faqService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FaqItem</h1>
          <p className="text-muted-foreground">Manage frequently asked questions.</p>
        </div>
        <Link href="/dashboard/faq/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add FaqItem
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading FAQs...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any} searchKey="question" />
          <DataTable columns={columns} data={items} searchKey="question" />
        </div>
      )}
    </div>
  );
}
