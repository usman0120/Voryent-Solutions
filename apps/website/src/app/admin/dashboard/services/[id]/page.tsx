"use client";

import { useQuery } from "@tanstack/react-query";
import { servicesService } from "@/lib/admin/services/services.service";
import { ServiceForm } from "../service-form";
import { use } from "react";

export default function EditService({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: service, isLoading } = useQuery({
    queryKey: ["services", resolvedParams.id],
    queryFn: () => servicesService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading service...</div>;
  }

  if (!service) {
    return <div className="flex h-64 items-center justify-center">Service not found</div>;
  }

  return <ServiceForm initialData={service} id={resolvedParams.id} />;
}
