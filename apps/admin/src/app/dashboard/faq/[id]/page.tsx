"use client";

import { useQuery } from "@tanstack/react-query";
import { faqService } from "@/lib/services/faq.service";
import { FAQForm } from "../faq-form";
import { use } from "react";

export default function EditFAQ({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: item, isLoading } = useQuery({
    queryKey: ["faq", resolvedParams.id],
    queryFn: () => faqService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading FaqItem...</div>;
  }

  if (!item) {
    return <div className="flex h-64 items-center justify-center">FaqItem not found</div>;
  }

  return <FAQForm initialData={item} id={resolvedParams.id} />;
}
