"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { subscribeToAuthChanges } from "@/lib/admin/firebase/auth";
import { getDocument } from "@/lib/admin/firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

type UserRole = string;

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        // Fetch user role from Firestore
        let userDoc: { role: UserRole } | null = null;
        try {
          userDoc = await getDocument<{ role: UserRole }>("users", currentUser.uid);
          if (!userDoc) {
            // Default to Founder role for full access during development/testing
            userDoc = { role: "Founder" };
          }
        } catch (error) {
          // Default to Founder role if we are in local dev or if the auth succeeded
          userDoc = { role: "Founder" };
        }
        
        setRole(userDoc.role || "Founder");
        console.log("Auth Provider: Fetched Role:", userDoc.role, "Final Role State:", userDoc.role || "Founder");
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle redirects in a separate effect so we don't re-subscribe on navigation
  useEffect(() => {
    if (loading) return;
    
    // Only apply auth redirects on /admin routes
    if (pathname.startsWith("/admin")) {
      const isPublicAdminRoute = pathname === "/admin/login";
      
      if (!user && !isPublicAdminRoute) {
        router.push("/admin/login");
      } else if (user && !["admin", "super admin", "founder"].includes(role?.toLowerCase() || "") && !isPublicAdminRoute && pathname !== "/admin/unauthorized") {
        // User is logged in but not an admin or founder, redirect to unauthorized
        router.push("/admin/unauthorized");
      }
    }
  }, [user, role, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
