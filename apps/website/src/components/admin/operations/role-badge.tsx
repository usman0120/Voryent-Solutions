import { Badge } from "@voryent/ui";

interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  // Common styling for recognizable roles, fallback for custom roles
  switch (role) {
    case "Super Admin":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Super Admin</Badge>;
    case "Founder":
    case "CEO":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{role}</Badge>;
    case "HR":
    case "Recruiter":
      return <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">{role}</Badge>;
    case "Finance":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{role}</Badge>;
    case "Marketing":
    case "Editor":
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">{role}</Badge>;
    case "Developer":
    case "Analyst":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{role}</Badge>;
    case "Guest":
      return <Badge variant="secondary">Guest</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
}
