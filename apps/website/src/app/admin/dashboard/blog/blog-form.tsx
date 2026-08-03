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
      title={id ? "Edit Article" : "Draft New Article"}
      description="Write, edit, and publish enterprise engineering insights."
      backHref="/admin/dashboard/blog"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-0">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 border border-border/60 bg-background">
            
            {/* Main Editor Column */}
            <div className="xl:col-span-2 border-b xl:border-b-0 xl:border-r border-border/60">
              <div className="p-8 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-2">Primary Content</h3>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">Article Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Scaling Microservices with Kubernetes" 
                            className="rounded-none border-border/60 text-lg h-14" 
                            {...field} 
                          />
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">URL Slug</FormLabel>
                        <FormControl>
                          <div className="rounded-none border border-border/60 overflow-hidden">
                            <SlugField 
                              value={field.value} 
                              onChange={field.onChange} 
                              sourceValue={form.watch("title")} 
                            />
                          </div>
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">Excerpt / Summary</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A concise summary for article cards and SEO..." 
                            className="rounded-none border-border/60 resize-none h-24"
                            {...field} 
                          />
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">Article Body</FormLabel>
                        <FormControl>
                          <div className="border border-border/60 rounded-none bg-background min-h-[400px]">
                            <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6 pt-8 border-t border-border/60">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-2">Search Engine Optimization</h3>
                  <FormField
                    control={form.control}
                    name="seo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="rounded-none border border-border/60 p-6 bg-muted/5">
                            <SeoEditor value={field.value} onChange={field.onChange} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            {/* Meta & Configuration Column */}
            <div className="bg-muted/10 p-8 space-y-10">
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-2">Publishing</h3>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Status</FormLabel>
                      <FormControl>
                        <div className="rounded-none border border-border/60 bg-background">
                          <StatusSelector value={field.value} onChange={field.onChange} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between border border-border/60 bg-background p-4 rounded-none">
                      <div className="space-y-1">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Featured Article</FormLabel>
                        <p className="text-xs text-muted-foreground leading-tight">Pin to top of blog index</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} className="rounded-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 pt-8 border-t border-border/60">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-2">Metadata</h3>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Engineering, AI" className="rounded-none border-border/60 bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Author</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Voryent Team" className="rounded-none border-border/60 bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags / Keywords Input */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest">Tags & Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentTags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-foreground text-background"
                      >
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive transition-colors text-background/60 hover:text-background"
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
                    placeholder="Type tag & press Enter..."
                    className="rounded-none border-border/60 bg-background"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-border/60">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-2">Media</h3>
                
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Cover Image</FormLabel>
                      <div className="space-y-4">
                        {field.value ? (
                          <div className="relative aspect-[16/9] w-full border border-border/60 bg-muted overflow-hidden group">
                            <img src={field.value} alt="Cover Preview" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="outline"
                                className="rounded-none border-border/60 text-[10px] font-bold uppercase tracking-widest h-8"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Replace Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-[16/9] w-full border border-dashed border-border/60 bg-background flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-6 w-6 mb-2 opacity-50" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Upload Cover</span>
                          </div>
                        )}
                        <FormControl>
                          <Input {...field} placeholder="Or paste image URL here..." className="rounded-none border-border/60 bg-background text-[10px]" />
                        </FormControl>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleCoverImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
