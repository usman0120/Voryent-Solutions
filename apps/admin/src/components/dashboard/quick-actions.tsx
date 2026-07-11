"use client";

import { Plus, Upload, UserPlus, Settings } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "New Job", icon: Plus },
    { label: "Add Contact", icon: UserPlus },
    { label: "Upload Document", icon: Upload },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <h3 className="font-semibold leading-none tracking-tight">Quick Actions</h3>
      </div>
      <div className="p-6 pt-0 grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-background p-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            <action.icon className="h-5 w-5" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
