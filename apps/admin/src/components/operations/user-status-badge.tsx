import { Badge } from "@/components/ui/badge";

interface UserStatusBadgeProps {
  status: string;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  switch (status) {
    case "Active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "Invited":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Invited</Badge>;
    case "Suspended":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Suspended</Badge>;
    case "Disabled":
      return <Badge variant="secondary">Disabled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
