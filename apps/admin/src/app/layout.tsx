import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query/provider";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voryent Admin Portal",
  description: "Administrative dashboard for Voryent Solutions",
  icons: {
    icon: "/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.png",
    shortcut: "/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.png",
    apple: "/Assets/Logos/Transparent logos/Icon-only_version_Logo_transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextTopLoader color="hsl(var(--primary))" showSpinner={true} />
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster position="top-center" richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
