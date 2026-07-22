"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Button, Label } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { SlugField } from "@/components/admin/cms/slug-field";
import { SeoEditor } from "@/components/admin/cms/seo-editor";
import { StatusSelector } from "@/components/admin/cms/status-selector";
import { RichTextEditor } from "@/components/admin/cms/rich-text-editor";
import { baseEntitySchema, seoSchema } from "@/lib/admin/validations/cms";
import { type BlogPost, blogService } from "@/lib/admin/services/blog.service";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const blogSchema = baseEntitySchema.extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  featured: z.boolean().default(false),
  seo: seoSchema.optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: BlogPost;
  id?: string;
}

export function BlogForm({ initialData, id }: BlogFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      category: initialData?.category || "General",
      tags: initialData?.tags || [],
      author: initialData?.author || "Voryent Team",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      seo: initialData?.seo || {},
    },
  });

  const currentTags = form.watch("tags") || [];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,|,$/g, "");
      if (val && !currentTags.includes(val)) {
        form.setValue("tags", [...currentTags, val]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue("tags", currentTags.filter((t) => t !== tagToRemove));
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Image too large", description: "Please upload an image under 2MB.", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          form.setValue("coverImage", base64);
          toast({ title: "Cover image uploaded successfully." });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: BlogFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await blogService.update(id, values);
        toast({ title: "Post updated successfully." });
      } else {
        await blogService.create(values as any);
        toast({ title: "Post created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      router.push("/admin/dashboard/blog");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving post", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Post" : "Create Post"}
      description="Write and publish blog articles."
      backHref="/admin/dashboard/blog"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="10 Ways to Scale Your Software Platform" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <SlugField 
                        value={field.value} 
                        onChange={field.onChange} 
                        sourceValue={form.watch("title")} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Short summary for post preview cards..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Content</FormLabel>
                    <FormControl>
                      <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="seo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SeoEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <StatusSelector value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Engineering, AI, Cloud" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags / Keywords Input */}
              <div className="space-y-2">
                <Label>Tags & Keywords</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {currentTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <Input 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type tag & press Enter or comma..."
                />
                <p className="text-xs text-muted-foreground">Press Enter or comma to add tags. Used for matching related blogs.</p>
              </div>

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Voryent Team" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Image URL + Base64 Upload */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input {...field} placeholder="https://... or upload local image" />
                      </FormControl>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleCoverImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" /> Upload Image (Base64)
                      </Button>
                      {field.value && (
                        <div className="mt-2 relative aspect-[16/9] w-full rounded-md overflow-hidden border">
                          <img src={field.value} alt="Cover Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Post</FormLabel>
                      <p className="text-sm text-muted-foreground">Highlight on main blog index</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
