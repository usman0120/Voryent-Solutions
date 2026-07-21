import { Badge } from "@voryent/ui";

interface ContactStatusBadgeProps {
  status: string;
}

export function ContactStatusBadge({ status }: ContactStatusBadgeProps) {
  switch (status) {
    case "New":
      return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
    case "Assigned":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Assigned</Badge>;
    case "In Progress":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
    case "Waiting":
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Waiting</Badge>;
    case "Resolved":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
    case "Closed":
      return <Badge variant="secondary">Closed</Badge>;
    case "Archived":
      return <Badge variant="outline">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
