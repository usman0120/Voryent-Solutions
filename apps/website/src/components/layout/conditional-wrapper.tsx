"use client";

import { usePathname } from "next/navigation";

interface ConditionalWrapperProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function ConditionalWrapper({ header, footer, children }: ConditionalWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isAdmin && header}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {!isAdmin && footer}
    </div>
  );
}
