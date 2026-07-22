"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle, Label } from "@voryent/ui";
import { Shield, KeyRound, UserCircle } from "lucide-react";
import { resetAdminPassword } from "@/lib/admin/firebase/auth";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin/services/activity-logs.service";

export default function AccountSecurityPage() {
  const { user, role } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsUpdating(true);
    try {
      await updateProfile(user, { displayName });
      await logActivity("Update Profile", "Updated display name.", user.uid);
      toast.success("Profile updated successfully. Refresh to see changes globally.");
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    setIsResetting(true);
    try {
      await resetAdminPassword(user.email);
      await logActivity("Password Reset Request", `Requested password reset for ${user.email}.`, user.uid);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (e: any) {
      toast.error(e.message || "Failed to send reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account & Security</h1>
        <p className="text-muted-foreground">Manage your personal admin account and security settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" /> Profile Details
            </CardTitle>
            <CardDescription>Update your display name.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={user?.email || ""} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Current Role</Label>
                <Input id="role" value={typeof role === 'string' ? role : (role as any)?.name || "N/A"} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input 
                  id="name" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  placeholder="e.g. John Doe"
                />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Security & Sessions
            </CardTitle>
            <CardDescription>Manage password and authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Reset Password</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  We will send a password reset link to <strong>{user?.email}</strong>. You will be logged out once you change it.
                </p>
                <Button variant="outline" onClick={handlePasswordReset} disabled={isResetting || !user?.email}>
                  <KeyRound className="h-4 w-4 mr-2" />
                  {isResetting ? "Sending..." : "Send Reset Email"}
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-1">Current Session</h4>
              <div className="text-sm space-y-1 mt-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">UID:</span> {user?.uid}</p>
                <p><span className="font-medium text-foreground">Last Sign In:</span> {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : "Unknown"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
