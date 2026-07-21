import { Badge } from "@voryent/ui";

interface ProjectStatusBadgeProps {
  status: string;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  switch (status) {
    case "Planning":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Planning</Badge>;
    case "Active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "On Hold":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">On Hold</Badge>;
    case "Completed":
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">Completed</Badge>;
    case "Cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "Archived":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
