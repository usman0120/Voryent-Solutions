"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/lib/services/blog.service";
import { BlogForm } from "../blog-form";
import { use } from "react";

export default function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const { data: item, isLoading } = useQuery({
    queryKey: ["blogPosts", resolvedParams.id],
    queryFn: () => blogService.getById(resolvedParams.id),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading post...</div>;
  }

  if (!item) {
    return <div className="flex h-64 items-center justify-center">Post not found</div>;
  }

  return <BlogForm initialData={item} id={resolvedParams.id} />;
}
