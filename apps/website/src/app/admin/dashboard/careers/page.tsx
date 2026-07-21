"use client";

import { useQuery } from "@tanstack/react-query";
import { pagesService } from "@/lib/admin/services/pages.service";
import { CareersForm } from "./careers-form";

export default function CareersCMSPage() {
  const { data: careers, isLoading } = useQuery({
    queryKey: ["pages", "careers"],
    queryFn: async () => {
      let doc = await pagesService.getById("careers");
      if (!doc) {
        // Automatically create the singleton document if it doesn't exist
        await pagesService.create({ title: "Careers", slug: "careers", type: "Careers" } as any, "admin");
        doc = await pagesService.getById("careers");
      }
      return doc;
    },
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading Careers page data...</div>;
  }

  return <CareersForm initialData={careers!} />;
}
