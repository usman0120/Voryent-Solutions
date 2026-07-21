"use client";

import { EmptyState } from "@/components/admin/ui/empty-state";
import { Folder } from "lucide-react";

export function Projects() {
  const projects: any[] = []; 

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Projects</h3>
        <p className="text-sm text-muted-foreground">Ongoing client work.</p>
      </div>
      <div className="p-6 pt-0">
        {projects.length > 0 ? (
          <div>{/* Table goes here */}</div>
        ) : (
          <EmptyState
            title="No active projects"
            description="Start a new project to track its progress here."
            icon={<Folder className="h-10 w-10 text-muted-foreground" />}
            actionLabel="New Project"
            onAction={() => {}}
          />
        )}
      </div>
    </div>
  );
}
