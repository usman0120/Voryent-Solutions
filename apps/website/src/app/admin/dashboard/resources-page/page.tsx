"use client";

import { usePage } from "@/lib/admin/react-query/pages.hooks";
import { ResourcesForm } from "./resources-form";
import { useAuth } from "@/providers/auth-provider";

export default function ResourcesCMSPage() {
  const { role } = useAuth();
  const { data: pageData, isLoading } = usePage("resources");

  const canManage = role === "admin";

  if (!canManage) {
    return <div className="p-8 text-center text-muted-foreground">You do not have access to the Resources Page CMS.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center border rounded-md">
        <p className="text-muted-foreground">Loading Resources Page content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources Page CMS</h1>
        <p className="text-muted-foreground">
          Manage the content for the public Resources page. Changes saved here will immediately reflect on the live site.
        </p>
      </div>
      <ResourcesForm initialData={pageData} />
    </div>
  );
}
