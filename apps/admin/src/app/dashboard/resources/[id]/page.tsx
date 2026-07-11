"use client";

import { useQuery } from "@tanstack/react-query";
import { resourcesService } from "@/lib/services/resources.service";
import { ResourceForm } from "../resource-form";
import { use } from "react";

export default function EditResource({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: item, isLoading } = useQuery({
    queryKey: ["resources", resolvedParams.id],
    queryFn: () => resourcesService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading resource...</div>;
  }

  if (!item) {
    return <div className="flex h-64 items-center justify-center">Resource not found</div>;
  }

  return <ResourceForm initialData={item} id={resolvedParams.id} />;
}
