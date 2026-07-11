"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FormLayout } from "@/components/cms/form-layout";
import { SlugField } from "@/components/cms/slug-field";
import { SeoEditor } from "@/components/cms/seo-editor";
import { StatusSelector } from "@/components/cms/status-selector";
import { baseEntitySchema, seoSchema } from "@/lib/validations/cms";
import { type Industry, industriesService } from "@/lib/services/industries.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const industrySchema = baseEntitySchema.extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
  seo: seoSchema.optional(),
});

type IndustryFormValues = z.infer<typeof industrySchema>;

interface IndustryFormProps {
  initialData?: Industry;
  id?: string;
}

export function IndustryForm({ initialData, id }: IndustryFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IndustryFormValues>({
    resolver: zodResolver(industrySchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      icon: initialData?.icon || "",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      seo: initialData?.seo || {},
    },
  });

  const onSubmit = async (values: IndustryFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await industriesService.update(id, values);
        toast({ title: "Industry updated successfully." });
      } else {
        await industriesService.create(values as any);
        toast({ title: "Industry created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      router.push("/dashboard/industries");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving industry", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Industry" : "Create Industry"}
      description="Manage the details of this industry."
      backHref="/dashboard/industries"
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
                    <FormLabel>Industry Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Healthcare" {...field} />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief summary..." {...field} />
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Heart" />
                    </FormControl>
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
                      <FormLabel className="text-base">Featured</FormLabel>
                      <p className="text-sm text-muted-foreground">Show on homepage</p>
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
