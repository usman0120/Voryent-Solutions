"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { FileText } from "lucide-react";

export function RecentApplications() {
  const applications: any[] = []; 

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Recent Applications</h3>
      </div>
      <div className="p-6 pt-0">
        {applications.length > 0 ? (
          <div>{/* List goes here */}</div>
        ) : (
          <EmptyState
            title="No recent applications"
            description="Waiting for new candidates to apply."
            icon={<FileText className="h-8 w-8 text-muted-foreground" />}
          />
        )}
      </div>
    </div>
  );
}
