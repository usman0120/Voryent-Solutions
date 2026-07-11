import { Badge } from "@/components/ui/badge";

interface ReportStatusBadgeProps {
  status: string;
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  switch (status) {
    case "Draft":
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Draft</Badge>;
    case "Generating":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 animate-pulse">Generating</Badge>;
    case "Ready":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ready</Badge>;
    case "Failed":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
