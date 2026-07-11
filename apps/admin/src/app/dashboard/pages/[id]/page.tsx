"use client";

import { useQuery } from "@tanstack/react-query";
import { pagesService } from "@/lib/services/pages.service";
import { PageForm } from "../page-form";
import { use } from "react";

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: page, isLoading } = useQuery({
    queryKey: ["pages", resolvedParams.id],
    queryFn: () => pagesService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading page...</div>;
  }

  if (!page) {
    return <div className="flex h-64 items-center justify-center">Page not found</div>;
  }

  return <PageForm initialData={page} id={resolvedParams.id} />;
}
