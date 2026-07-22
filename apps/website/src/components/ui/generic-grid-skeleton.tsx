import { Skeleton } from "@voryent/ui";

interface GenericGridSkeletonProps {
  count?: number;
  columns?: number;
  className?: string;
}

export function GenericGridSkeleton({ count = 6, columns = 3, className = "" }: GenericGridSkeletonProps) {
  const colClass = 
    columns === 1 ? "grid-cols-1" :
    columns === 2 ? "grid-cols-1 md:grid-cols-2" :
    columns === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" :
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-6 w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50 space-y-4 animate-pulse">
          <Skeleton className="h-44 w-full rounded-lg bg-muted/60" />
          <Skeleton className="h-5 w-3/4 bg-muted/70" />
          <Skeleton className="h-4 w-full bg-muted/50" />
          <Skeleton className="h-4 w-5/6 bg-muted/50" />
          <div className="pt-2 flex items-center justify-between">
            <Skeleton className="h-8 w-24 rounded-md bg-muted/60" />
            <Skeleton className="h-8 w-8 rounded-full bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableGridSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3 p-4 border rounded-xl bg-card/40">
      <div className="flex items-center justify-between pb-3 border-b">
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
      <div className="space-y-2 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2 border-b border-border/20">
            <Skeleton className="h-5 w-1/4 rounded" />
            <Skeleton className="h-5 w-1/3 rounded" />
            <Skeleton className="h-5 w-1/6 rounded" />
            <Skeleton className="h-5 w-1/6 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
