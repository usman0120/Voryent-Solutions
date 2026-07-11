"use client";

import { useQueryClient } from "@tanstack/react-query";
import { PermissionMatrix } from "@/components/operations/permission-matrix";
import { Button } from "@/components/ui/button";
import { DatabaseBackup } from "lucide-react";
import { seedDefaultPermissions } from "@/lib/services/seed-permissions";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { can } from "@/lib/utils/permission-checker";
import { ModuleGuard } from "@/components/operations/module-guard";

export default function PermissionsPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  // Fallback before permissions are fully wired to backend auth: 
  const canManage = (user as any)?.role === "Super Admin" || (user as any)?.role === "Founder";

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const count = await seedDefaultPermissions();
      toast.success(count > 0 ? `Seeded ${count} missing permission modules.` : "All permissions are already configured.");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    } catch (e) {
      console.error(e);
      toast.error("Failed to seed permissions.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <ModuleGuard module="Users" action="Read"> 
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Permissions Registry</h1>
            <p className="text-muted-foreground">System-wide definitions of available modules and actions.</p>
          </div>
          {canManage && (
            <Button variant="secondary" onClick={handleSeed} disabled={isSeeding}>
              <DatabaseBackup className="mr-2 h-4 w-4" /> 
              {isSeeding ? "Seeding..." : "Seed Default Definitions"}
            </Button>
          )}
        </div>

        <PermissionMatrix />
      </div>
    </ModuleGuard>
  );
}
