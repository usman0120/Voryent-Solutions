"use client";

import { TrendingUp } from "lucide-react";

export function SeoHealth() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          SEO Health
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Overall Score</span>
          <span className="font-bold text-emerald-500">92/100</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground pt-2">
          Your site is performing excellently in search rankings.
        </p>
      </div>
    </div>
  );
}
