"use client";

import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@voryent/ui";

interface DataErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function DataErrorDisplay({
  title = "Failed to load data",
  message = "We encountered a network or server error while retrieving this content. Please check your connection and try again.",
  onRetry,
  className = "",
}: DataErrorDisplayProps) {
  const isNetwork = message.toLowerCase().includes("network") || message.toLowerCase().includes("fetch");

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-xl border border-destructive/20 bg-destructive/5 my-6 space-y-4 ${className}`}>
      <div className="p-3 rounded-full bg-destructive/10 text-destructive">
        {isNetwork ? <WifiOff className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2 mt-2">
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
      )}
    </div>
  );
}
