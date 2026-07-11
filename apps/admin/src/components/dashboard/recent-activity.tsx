"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { Activity } from "lucide-react";

export function RecentActivity() {
  const activities: any[] = []; // Empty for now to show empty state

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest actions across the platform.</p>
      </div>
      <div className="p-6 pt-0">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {/* List activities */}
          </div>
        ) : (
          <EmptyState
            title="No recent activity"
            description="There are no recent activities to show right now."
            icon={<Activity className="h-10 w-10 text-muted-foreground" />}
          />
        )}
      </div>
    </div>
  );
}
