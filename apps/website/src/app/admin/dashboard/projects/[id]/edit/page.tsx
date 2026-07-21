"use client";

import { useProject } from "@/lib/admin/react-query/projects.hooks";
import { ProjectForm } from "../../project-form";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return <div className="p-8">Loading project...</div>;
  }

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update details for {project.name}.</p>
      </div>
      <ProjectForm initialData={project} onSuccess={() => router.push(`/dashboard/projects/${id}`)} />
    </div>
  );
}
