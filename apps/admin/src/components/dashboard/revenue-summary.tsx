"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { BarChart3 } from "lucide-react";

export function RevenueSummary() {
  const data: any[] = []; // Real implementation uses Recharts

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Revenue Summary</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue breakdown.</p>
      </div>
      <div className="p-6 pt-0 h-[300px]">
        {data.length > 0 ? (
          <div>{/* Chart goes here */}</div>
        ) : (
          <EmptyState
            title="No data available"
            description="Revenue data will appear here once transactions start."
            icon={<BarChart3 className="h-10 w-10 text-muted-foreground" />}
            className="h-full border-none"
          />
        )}
      </div>
    </div>
  );
}
