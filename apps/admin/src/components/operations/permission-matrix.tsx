"use client";

import { usePermissions } from "@/lib/react-query/permissions.hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PermissionMatrix() {
  const { data: permissions = [], isLoading } = usePermissions();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading permission definitions...</div>;
  }

  if (permissions.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No permissions defined in the registry yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {permissions.map((group) => (
        <Card key={group.id}>
          <CardHeader className="pb-2 border-b mb-4">
            <CardTitle className="text-lg flex justify-between items-center">
              {group.module}
              <Badge variant="secondary" className="text-xs">{group.actions.length} Actions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {group.actions.map(action => (
                <Badge key={action} variant="outline" className="bg-primary/5">
                  {action}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
