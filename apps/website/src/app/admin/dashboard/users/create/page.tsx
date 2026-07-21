"use client";

import { UserForm } from "../user-form";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invite User</h1>
        <p className="text-muted-foreground">Create a new admin portal profile and send an invitation.</p>
      </div>
      <UserForm onSuccess={() => router.push("/dashboard/users")} />
    </div>
  );
}
