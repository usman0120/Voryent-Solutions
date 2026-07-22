import { GenericGridSkeleton } from "@/components/ui/generic-grid-skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 space-y-8">
      <div className="h-8 w-64 bg-muted/40 rounded-md animate-pulse mb-8" />
      <GenericGridSkeleton count={6} columns={3} />
    </div>
  );
}
