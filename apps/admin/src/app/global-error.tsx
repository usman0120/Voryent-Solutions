"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong!</h2>
          <p className="text-muted-foreground mb-6 max-w-[500px]">
            We apologize for the inconvenience. An unexpected error has occurred in the application.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
