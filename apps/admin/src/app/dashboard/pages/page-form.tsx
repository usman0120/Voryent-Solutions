"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLayout } from "@/components/cms/form-layout";
import { SlugField } from "@/components/cms/slug-field";
import { SeoEditor } from "@/components/cms/seo-editor";
import { StatusSelector } from "@/components/cms/status-selector";
import { baseEntitySchema, seoSchema } from "@/lib/validations/cms";
import { type Page, pagesService } from "@/lib/services/pages.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const pageSchema = baseEntitySchema.extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.string().default("General"),
  seo: seoSchema.optional(),
  contentBlocks: z.any().optional(),
});

type PageFormValues = z.infer<typeof pageSchema>;

interface PageFormProps {
  initialData?: Page;
  id?: string;
}

function JsonEditor({ value, onChange }: { value: any, onChange: (val: any) => void }) {
  const [strVal, setStrVal] = useState(value ? JSON.stringify(value, null, 2) : "{\n}");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <textarea
        className="flex min-h-[400px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
        value={strVal}
        onChange={(e) => {
          setStrVal(e.target.value);
          try {
            const parsed = JSON.parse(e.target.value);
            setError(null);
            onChange(parsed);
          } catch (err: any) {
            setError(err.message);
          }
        }}
      />
      {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function PageForm({ initialData, id }: PageFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      type: initialData?.type || "General",
      status: initialData?.status || "Draft",
      seo: initialData?.seo || {},
      contentBlocks: initialData?.contentBlocks || {},
    },
  });

  const onSubmit = async (values: PageFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await pagesService.update(id, values);
        toast({ title: "Page updated successfully." });
      } else {
        await pagesService.create(values as any);
        toast({ title: "Page created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      router.push("/dashboard/pages");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving page", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Page" : "Create Page"}
      description="Manage the content and SEO of this page."
      backHref="/dashboard/pages"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="About Us" {...field} />
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
                name="contentBlocks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Blocks (JSON)</FormLabel>
                    <FormControl>
                      <JsonEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <p className="text-[0.8rem] text-muted-foreground">Raw JSON object representing sections and content arrays.</p>
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Policy" />
                    </FormControl>
                    <FormMessage />
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
