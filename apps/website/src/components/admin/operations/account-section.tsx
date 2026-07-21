import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import { resetAdminPassword } from "@/lib/admin/firebase/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Label } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { toast } from "sonner";
import { updateDocument, getDocument } from "@/lib/admin/firebase/firestore";
import { Monitor, Smartphone, ShieldAlert, Laptop } from "lucide-react";
import { arrayUnion, arrayRemove } from "firebase/firestore";

function getDeviceIcon(os: string) {
  if (os === "iOS" || os === "Android") return Smartphone;
  if (os === "Mac OS") return Laptop;
  return Monitor;
}

export function AccountSection() {
  const { user, role } = useAuth();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbSessions, setDbSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      const fetchUserData = async () => {
        const data = await getDocument<{ displayName?: string, infoDetails?: string, sessions?: any[] }>("users", user.uid);
        if (data) {
          if (data.displayName) setName(data.displayName);
          if (data.infoDetails) setInfo(data.infoDetails);
          if (data.sessions) setDbSessions(data.sessions);
        }
      };
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const sessionId = localStorage.getItem("voryent_session_id") || `sess_${Math.random().toString(36).substring(2, 15)}`;
      if (!localStorage.getItem("voryent_session_id")) {
        localStorage.setItem("voryent_session_id", sessionId);
      }
      setCurrentSessionId(sessionId);

      const ua = navigator.userAgent;
      let os = "Unknown OS";
      
      if (ua.includes("Win")) os = "Windows";
      else if (ua.includes("Mac")) os = "Mac OS";
      else if (ua.includes("Linux")) os = "Linux";
      else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
      else if (ua.includes("Android")) os = "Android";

      let browser = "Unknown Browser";
      if (ua.includes("Edg")) browser = "Edge";
      else if (ua.includes("Chrome")) browser = "Chrome";
      else if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

      const deviceString = `${os} - ${browser}`;
      const timeStr = new Date().toLocaleString();

      // Check if current session exists in dbSessions, if not add it
      const addSessionIfMissing = async () => {
        const data = await getDocument<{ sessions?: any[] }>("users", user.uid);
        const sessions = data?.sessions || [];
        if (!sessions.find((s: any) => s.id === sessionId)) {
          const newSession = {
            id: sessionId,
            device: deviceString,
            os: os,
            location: "Current Location",
            time: timeStr
          };
          await updateDocument("users", user.uid, {
            sessions: arrayUnion(newSession)
          });
          setDbSessions([...sessions, newSession]);
        } else {
          // Update last active time optionally
          const updatedSessions = sessions.map((s: any) => 
            s.id === sessionId ? { ...s, time: timeStr } : s
          );
          await updateDocument("users", user.uid, { sessions: updatedSessions });
          setDbSessions(updatedSessions);
        }
      };
      
      addSessionIfMissing();
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDocument("users", user.uid, {
        displayName: name,
        infoDetails: info,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!user?.email) {
      toast.error("User email not found");
      return;
    }
    try {
      await resetAdminPassword(user.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  const handleLogoutAll = async () => {
    if (!user) return;
    const currentSession = dbSessions.find(s => s.id === currentSessionId);
    if (!currentSession) return;
    
    try {
      await updateDocument("users", user.uid, {
        sessions: [currentSession]
      });
      setDbSessions([currentSession]);
      toast.success("Logged out from all other devices.");
    } catch (error) {
      toast.error("Failed to logout from other devices.");
    }
  };

  const handleRevokeSession = async (sessionToRevoke: any) => {
    if (!user) return;
    try {
      await updateDocument("users", user.uid, {
        sessions: arrayRemove(sessionToRevoke)
      });
      setDbSessions(dbSessions.filter(s => s.id !== sessionToRevoke.id));
      toast.success("Session revoked successfully.");
    } catch (error) {
      toast.error("Failed to revoke session.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account & Security</CardTitle>
        <CardDescription>Manage your personal admin account settings and password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" value={user?.email || ""} disabled />
            <p className="text-xs text-muted-foreground">Your email cannot be changed.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={role || ""} disabled className="capitalize" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input 
              id="name" 
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="info">Info / Bio</Label>
            <Input 
              id="info" 
              placeholder="Short bio or role description" 
              value={info} 
              onChange={(e) => setInfo(e.target.value)} 
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="grid gap-2">
            <Label>Password Management</Label>
            <p className="text-sm text-muted-foreground">
              To update your password, we will send a secure password reset link to your email address.
            </p>
            <Button variant="outline" onClick={handleForgotPassword} className="w-fit mt-2">
              Send Password Reset Email
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <Label>Active Sessions</Label>
              <p className="text-sm text-muted-foreground">
                Devices currently logged into your admin account.
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleLogoutAll}>
              <ShieldAlert className="w-4 h-4 mr-2" />
              Log Out All Other Devices
            </Button>
          </div>
          
          <div className="space-y-3 mt-4">
            {dbSessions.map((session) => {
              const Icon = getDeviceIcon(session.os);
              const isCurrent = session.id === currentSessionId;
              return (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {session.device} {isCurrent && <span className="text-xs text-primary font-bold ml-2">(Current)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                  </div>
                </div>
                {!isCurrent && (
                  <Button variant="ghost" size="sm" onClick={() => handleRevokeSession(session)}>
                    Revoke
                  </Button>
                )}
              </div>
            )})}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
