import { TableGridSkeleton } from "@/components/ui/generic-grid-skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <TableGridSkeleton rows={6} />
    </div>
  );
}
