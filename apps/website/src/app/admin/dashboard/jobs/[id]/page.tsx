"use client";

import { useJob } from "@/lib/admin/react-query/jobs.hooks";
import { JobForm } from "../job-form";
import { use } from "react";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const resolvedParams = use(params);
  const { data: job, isLoading } = useJob(resolvedParams.id);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading job details...</div>;
  }

  if (!job) {
    return <div className="flex h-64 items-center justify-center">Job post not found.</div>;
  }

  return <JobForm initialData={job} id={resolvedParams.id} />;
}
