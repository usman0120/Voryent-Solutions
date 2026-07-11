import { Badge } from "@/components/ui/badge";

interface InvestorStatusBadgeProps {
  status: string;
}

export function InvestorStatusBadge({ status }: InvestorStatusBadgeProps) {
  switch (status) {
    case "Prospect":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Prospect</Badge>;
    case "Negotiating":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Negotiating</Badge>;
    case "Active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "Exited":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Exited</Badge>;
    case "Archived":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
