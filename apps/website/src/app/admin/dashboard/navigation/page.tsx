"use client";

import { useQuery } from "@tanstack/react-query";
import { navigationService } from "@/lib/admin/services/navigation.service";
import { NavigationForm } from "./navigation-form";

export default function NavigationPage() {
  const { data: navigation, isLoading } = useQuery({
    queryKey: ["navigation", "main"],
    queryFn: async () => {
      // Assuming singleton with ID 'main'
      let nav = await navigationService.getById("main");
      if (!nav) {
        nav = { items: [] };
      }
      return nav;
    },
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading navigation...</div>;
  }

  return <NavigationForm initialData={navigation!} />;
}
