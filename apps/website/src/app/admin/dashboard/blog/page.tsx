"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/lib/admin/services/blog.service";
import { DataTable } from "@/components/admin/cms/data-table";
import { columns } from "./columns";
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from "@voryent/ui";
import { Plus, Newspaper, MailCheck } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";
import { SubscriptionsTable } from "./subscriptions-table";
import { TableGridSkeleton } from "@/components/ui/generic-grid-skeleton";

export default function BlogPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => blogService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">Write articles and manage newsletter subscribers.</p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/blog/create">
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="articles" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" /> Articles
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <MailCheck className="h-4 w-4" /> Subscriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {isLoading ? (
            <TableGridSkeleton rows={5} />
          ) : (
            <div className="space-y-4">
              <DataTableToolbar table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any} searchKey="title" />
              <DataTable columns={columns} data={items} searchKey="title" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="subscriptions">
          <SubscriptionsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
