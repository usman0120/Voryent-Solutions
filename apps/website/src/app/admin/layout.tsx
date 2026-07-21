import { ReactQueryProvider } from "@/lib/admin/react-query/provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voryent Admin Portal",
  description: "Administrative dashboard for Voryent Solutions",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  );
}
