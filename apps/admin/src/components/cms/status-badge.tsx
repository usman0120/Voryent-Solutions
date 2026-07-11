"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "Draft" | "Published" | "Archived" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "Published":
      return <Badge variant="default" className="bg-green-600 hover:bg-green-700">{status}</Badge>;
    case "Draft":
      return <Badge variant="secondary">{status}</Badge>;
    case "Archived":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
