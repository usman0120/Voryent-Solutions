import { UserType } from "@/lib/admin/services/users.service";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import { UserStatusBadge } from "./user-status-badge";
import { Mail, Briefcase, Hash, Calendar } from "lucide-react";
import { format } from "date-fns";

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              {user.photo ? (
                <img src={user.photo} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.displayName?.[0] || "?"
              )}
            </div>
            <div>
              <CardTitle className="text-xl">{user.displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.position || "Staff Member"}</p>
            </div>
          </div>
          <UserStatusBadge status={user.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4 border-t">
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${user.email}`} className="text-foreground hover:underline">
              {user.email}
            </a>
          </div>
          {user.department && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span className="text-foreground">{user.department}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Hash className="w-4 h-4" />
            <span className="text-foreground">Role: <span className="font-semibold">{user.roleId}</span></span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Last Login: {user.lastLogin ? format(new Date(user.lastLogin.toDate ? user.lastLogin.toDate() : user.lastLogin), "MMM d, yyyy") : "Never"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
