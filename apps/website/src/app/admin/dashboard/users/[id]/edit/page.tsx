"use client";

import { useUser } from "@/lib/admin/react-query/users.hooks";
import { UserForm } from "../../user-form";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: user, isLoading } = useUser(id);

  if (isLoading) {
    return <div className="p-8">Loading user profile...</div>;
  }

  if (!user) {
    return <div className="p-8">User not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <p className="text-muted-foreground">Update profile details for {user.displayName}</p>
      </div>
      <UserForm initialData={user} onSuccess={() => router.push(`/dashboard/users/${id}`)} />
    </div>
  );
}
