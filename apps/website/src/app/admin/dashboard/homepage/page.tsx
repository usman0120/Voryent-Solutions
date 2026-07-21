"use client";

import { useQuery } from "@tanstack/react-query";
import { pagesService } from "@/lib/admin/services/pages.service";
import { HomepageForm } from "./homepage-form";

export default function HomepagePage() {
  const { data: homepage, isLoading } = useQuery({
    queryKey: ["pages", "homepage"],
    queryFn: async () => {
      let doc = await pagesService.getById("homepage");
      if (!doc) {
        // Automatically create the singleton document if it doesn't exist
        await pagesService.create({ title: "Homepage", slug: "home", type: "Homepage" } as any, "admin");
        doc = await pagesService.getById("homepage");
      }
      return doc;
    },
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading homepage data...</div>;
  }

  return <HomepageForm initialData={homepage!} />;
}
