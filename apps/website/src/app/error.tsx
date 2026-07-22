"use client";

import { useEffect } from "react";
import { Container } from "@voryent/ui";
import { DataErrorDisplay } from "@/components/ui/data-error-display";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public Error Boundary caught error:", error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center min-h-[65vh] py-12">
      <DataErrorDisplay
        title="We couldn't load this page"
        message={error.message || "An unexpected network or system error occurred while retrieving content. Please try refreshing."}
        onRetry={reset}
        className="max-w-xl w-full"
      />
    </Container>
  );
}
