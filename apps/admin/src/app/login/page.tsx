"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, resetAdminPassword } from "@/lib/firebase/auth";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@voryent/ui";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      await resetAdminPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to send reset email");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginAdmin(email, password);
      toast.success("Successfully logged in");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 relative">
              <img 
                src="/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.png" 
                alt="Voryent Logo" 
                className="object-contain w-full h-full dark:hidden"
              />
              <img 
                src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.png" 
                alt="Voryent Logo" 
                className="object-contain w-full h-full hidden dark:block"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Voryent Admin</CardTitle>
          <CardDescription>
            Enter your email and password to access the portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@voryentsolutions.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
