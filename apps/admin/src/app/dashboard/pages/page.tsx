"use client";

import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { pagesService } from "@/lib/services/pages.service";
import { DataTable } from "@/components/cms/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";

export default function PagesPage() {
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: () => pagesService.getAll(),
  });

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const { seedDefaultPages } = await import("@/lib/services/seed-pages");
      const seededCount = await seedDefaultPages();
      if (seededCount > 0) {
        alert(`Seeded ${seededCount} default pages.`);
        queryClient.invalidateQueries({ queryKey: ["pages"] });
      } else {
        alert("All default pages already exist.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to seed default pages.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your website's generic pages.</p>
        </div>
        <div className="flex gap-2">
          {pages.length < 5 && (
            <Button variant="secondary" onClick={handleSeed} disabled={isSeeding}>
              <Plus className="mr-2 h-4 w-4" /> 
              {isSeeding ? "Seeding..." : "Seed Default Pages"}
            </Button>
          )}
          <Link href="/dashboard/pages/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Page
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading pages...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={pages} searchKey="title" />
      )}
    </div>
  );
}
