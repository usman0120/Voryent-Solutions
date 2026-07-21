"use client";

import { EmptyState } from "@/components/admin/ui/empty-state";
import { Briefcase } from "lucide-react";

export function OpenJobs() {
  const jobs: any[] = []; // Empty state for now

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Open Jobs</h3>
        <p className="text-sm text-muted-foreground">Currently active job postings.</p>
      </div>
      <div className="p-6 pt-0">
        {jobs.length > 0 ? (
          <div>{/* Table goes here */}</div>
        ) : (
          <EmptyState
            title="No open jobs"
            description="You don't have any active job postings right now."
            icon={<Briefcase className="h-10 w-10 text-muted-foreground" />}
            actionLabel="Create Job"
            onAction={() => {}}
          />
        )}
      </div>
    </div>
  );
}
