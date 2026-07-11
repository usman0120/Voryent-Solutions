import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  switch (priority) {
    case "Low":
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Low</Badge>;
    case "Medium":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
    case "High":
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}
