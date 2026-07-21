"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, resetAdminPassword } from "@/lib/admin/firebase/auth";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@voryent/ui";
import { Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Please enter your email address first", variant: "destructive" });
      return;
    }
    try {
      await resetAdminPassword(email);
      toast({ title: "Password reset email sent! Check your inbox." });
    } catch (error: any) {
      console.error(error);
      toast({ title: error.message || "Failed to send reset email", variant: "destructive" });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginAdmin(email, password);
      toast({ title: "Successfully logged in" });
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error(error);
      toast({ title: error.message || "Failed to log in", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative h-12 w-12">
              <img
                src="/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.webp"
                alt="Voryent Logo"
                className="h-full w-full object-contain dark:hidden"
              />
              <img
                src="/Assets/Logos/Dark BG/Icon-only_version_Logo_Dark.webp"
                alt="Voryent Logo"
                className="hidden h-full w-full object-contain dark:block"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Voryent Admin</CardTitle>
          <CardDescription>Enter your email and password to access the portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
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
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary cursor-pointer border-none bg-transparent p-0 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
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
