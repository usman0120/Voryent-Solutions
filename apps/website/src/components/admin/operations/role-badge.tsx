import { Badge } from "@voryent/ui";

interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  if (role.toLowerCase() === "admin") {
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Admin</Badge>;
  }
  return <Badge variant="outline">{role}</Badge>;
}
