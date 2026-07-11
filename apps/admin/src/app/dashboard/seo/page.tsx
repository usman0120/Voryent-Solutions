"use client";

import { useQuery } from "@tanstack/react-query";
import { seoService } from "@/lib/services/seo.service";
import { SeoSettingsForm } from "./seo-settings-form";

export default function SeoPage() {
  const { data: seo, isLoading } = useQuery({
    queryKey: ["seo", "global"],
    queryFn: async () => {
      let doc = await seoService.getById("global");
      if (!doc) {
        doc = { siteName: "Voryent Solutions", defaultTitle: "Voryent Solutions" };
      }
      return doc;
    },
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading SEO settings...</div>;
  }

  return <SeoSettingsForm initialData={seo!} />;
}
