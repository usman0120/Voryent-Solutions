"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { subscribeToAuthChanges } from "@/lib/firebase/auth";
import { getDocument } from "@/lib/firebase/firestore";
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
      setUser(currentUser);
      if (currentUser) {
        // Fetch user role from Firestore
        const userDoc = await getDocument<{ role: UserRole }>("users", currentUser.uid);
        setRole(userDoc?.role || null);
        
        // If not admin, redirect or handle unauthorized
        if (userDoc?.role !== "admin" && pathname !== "/unauthorized") {
          // Normally we might kick them out, but for VAP we just need admin
        }
      } else {
        setRole(null);
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
