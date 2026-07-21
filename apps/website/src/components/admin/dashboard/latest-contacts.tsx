"use client";

import { EmptyState } from "@/components/admin/ui/empty-state";
import { Users } from "lucide-react";

export function LatestContacts() {
  const contacts: any[] = []; 

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Latest Contacts</h3>
        <p className="text-sm text-muted-foreground">Recent inquiries and form submissions.</p>
      </div>
      <div className="p-6 pt-0">
        {contacts.length > 0 ? (
          <div>{/* Table goes here */}</div>
        ) : (
          <EmptyState
            title="No recent contacts"
            description="No new form submissions or inquiries."
            icon={<Users className="h-10 w-10 text-muted-foreground" />}
          />
        )}
      </div>
    </div>
  );
}
