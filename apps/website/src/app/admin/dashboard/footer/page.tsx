"use client";

import { useQuery } from "@tanstack/react-query";
import { footerService } from "@/lib/admin/services/footer.service";
import { FooterForm } from "./footer-form";

export default function FooterPage() {
  const { data: footer, isLoading } = useQuery({
    queryKey: ["footer", "main"],
    queryFn: async () => {
      let doc = await footerService.getById("main");
      if (!doc) {
        doc = { columns: [] };
      }
      return doc;
    },
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading footer...</div>;
  }

  return <FooterForm initialData={footer!} />;
}
