"use client";

import { Badge } from "@/components/ui/badge";

interface PublishBadgeProps {
  isPublished: boolean;
}

export function PublishBadge({ isPublished }: PublishBadgeProps) {
  return isPublished ? (
    <Badge variant="default" className="bg-green-600 hover:bg-green-700">Published</Badge>
  ) : (
    <Badge variant="secondary">Draft</Badge>
  );
}
