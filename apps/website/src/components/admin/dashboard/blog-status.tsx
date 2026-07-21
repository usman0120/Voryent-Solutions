"use client";

import { EmptyState } from "@/components/admin/ui/empty-state";
import { PenTool } from "lucide-react";

export function BlogStatus() {
  const posts: any[] = []; 

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Blog Status</h3>
      </div>
      <div className="p-6 pt-0">
        {posts.length > 0 ? (
          <div>{/* List goes here */}</div>
        ) : (
          <EmptyState
            title="No drafts"
            description="No blog posts are currently in progress."
            icon={<PenTool className="h-8 w-8 text-muted-foreground" />}
          />
        )}
      </div>
    </div>
  );
}
