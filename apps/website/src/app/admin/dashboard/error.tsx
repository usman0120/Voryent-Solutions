"use client";

import { useEffect } from "react";
import { DataErrorDisplay } from "@/components/ui/data-error-display";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <DataErrorDisplay
        title="Admin Dashboard Error"
        message={error.message || "An unexpected error occurred while loading this section of the admin panel."}
        onRetry={reset}
      />
    </div>
  );
}
