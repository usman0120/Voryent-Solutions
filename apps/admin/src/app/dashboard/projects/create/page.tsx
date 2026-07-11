"use client";

import { ProjectForm } from "../project-form";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
        <p className="text-muted-foreground">Add a new project to track.</p>
      </div>
      <ProjectForm onSuccess={() => router.push("/dashboard/projects")} />
    </div>
  );
}
