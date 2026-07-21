"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@voryent/ui";
import { LogOut, ShieldAlert } from "lucide-react";
import { logoutAdmin } from "@/lib/admin/firebase/auth";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <ShieldAlert className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-destructive">Access Denied</CardTitle>
          <CardDescription>
            You do not have the required permissions to access the admin portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground pb-6">
          If you believe this is an error, please contact your system administrator to verify your role assignment.
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout} variant="default" className="w-full gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
