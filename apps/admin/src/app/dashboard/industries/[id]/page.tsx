"use client";

import { useQuery } from "@tanstack/react-query";
import { industriesService } from "@/lib/services/industries.service";
import { IndustryForm } from "../industry-form";
import { use } from "react";

export default function EditIndustry({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: item, isLoading } = useQuery({
    queryKey: ["industries", resolvedParams.id],
    queryFn: () => industriesService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading industry...</div>;
  }

  if (!item) {
    return <div className="flex h-64 items-center justify-center">Industry not found</div>;
  }

  return <IndustryForm initialData={item} id={resolvedParams.id} />;
}
