"use client";

import { useUser } from "@/lib/admin/react-query/users.hooks";
import { useAuth } from "@/providers/auth-provider";
import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { UserCard } from "@/components/admin/operations/user-card";
import { ChevronLeft, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const resolvedParams = use(params);
  const { user: currentUser } = useAuth();
  
  const { data: userProfile, isLoading } = useUser(resolvedParams.id);
  
  const canManage = (currentUser as any)?.role === "Super Admin" || (currentUser as any)?.role === "Founder" || (currentUser as any)?.role === "admin" || (currentUser as any)?.role === "HR" || currentUser?.uid === userProfile?.uid;

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="flex h-64 items-center justify-center">User not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/users" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Users
        </Link>
        {canManage && (
          <Button asChild size="sm" variant="outline">
  <Link href={`/dashboard/users/${userProfile.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" /> Edit Profile
            </Link>
</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserCard user={userProfile} />
        </div>
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="permissions">Role & Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Account Created</p>
                      <p className="font-medium">
                        {userProfile.createdAt ? new Date(userProfile.createdAt as any).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Status</p>
                      <p className="font-medium">{userProfile.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="permissions" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Role: {userProfile.roleId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Permissions configuration will be displayed here once the Permissions module is fully implemented. 
                    This user inherits all permissions assigned to the "{userProfile.roleId}" role.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6 mt-4">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground text-sm">
                  Activity Logs module will provide this data in Step 5.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Theme</span>
                    <span className="font-medium capitalize">{userProfile.preferences?.theme || "system"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">In-App Notifications</span>
                    <span className="font-medium">{userProfile.preferences?.notificationsEnabled ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Email Alerts</span>
                    <span className="font-medium">{userProfile.preferences?.emailAlerts ? "Enabled" : "Disabled"}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
