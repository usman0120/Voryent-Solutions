"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormLayout } from "@/components/cms/form-layout";
import { type SeoSettings, seoService } from "@/lib/services/seo.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const globalSeoSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  defaultTitle: z.string().min(1, "Default title is required"),
  titleTemplate: z.string().min(1, "Title template is required"),
  defaultDescription: z.string().min(1, "Default description is required"),
  defaultOgImage: z.string().optional(),
  twitterHandle: z.string().optional(),
});

type GlobalSeoFormValues = z.infer<typeof globalSeoSchema>;

export function SeoSettingsForm({ initialData }: { initialData?: SeoSettings }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GlobalSeoFormValues>({
    resolver: zodResolver(globalSeoSchema),
    defaultValues: {
      siteName: initialData?.siteName || "Voryent Solutions",
      defaultTitle: initialData?.defaultTitle || "Voryent Solutions",
      titleTemplate: initialData?.titleTemplate || "%s | Voryent Solutions",
      defaultDescription: initialData?.defaultDescription || "",
      defaultOgImage: initialData?.defaultOgImage || "",
      twitterHandle: initialData?.twitterHandle || "@voryent",
    },
  });

  const onSubmit = async (values: GlobalSeoFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData?.id) {
        await seoService.update(initialData.id, values);
      } else {
        await seoService.create(values, "global");
      }
      toast({ title: "SEO settings updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["seo"] });
    } catch (error: any) {
      toast({ title: "Error saving SEO settings", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Global SEO Settings"
      description="Manage default metadata for your website."
      backHref="/dashboard"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Voryent Solutions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Voryent Solutions - Innovative Web Agency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Template</FormLabel>
                  <FormControl>
                    <Input placeholder="%s | Voryent Solutions" {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">%s will be replaced by the page title</p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@voryent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultDescription"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Default Meta Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Fallback description for pages without one..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultOgImage"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Default OpenGraph Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
