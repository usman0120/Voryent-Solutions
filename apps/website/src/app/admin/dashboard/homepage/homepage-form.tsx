"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { type Page, pagesService } from "@/lib/admin/services/pages.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { GripVertical } from "lucide-react";

const homepageSectionSchema = z.object({
  id: z.string(),
  enabled: z.boolean().default(true),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  order: z.number().default(0),
});

const homepageSchema = z.object({
  title: z.string().default("Homepage"),
  sections: z.array(homepageSectionSchema),
});

type HomepageFormValues = z.infer<typeof homepageSchema>;

const defaultSections = [
  { id: "hero", title: "Hero Section", enabled: true, order: 0 },
  { id: "services-preview", title: "Services Preview", enabled: true, order: 1 },
  { id: "why-choose-us", title: "Why Choose Us", enabled: true, order: 2 },
  { id: "process", title: "Our Process", enabled: true, order: 3 },
  { id: "industries", title: "Industries We Serve", enabled: true, order: 4 },
  { id: "featured-work", title: "Featured Work", enabled: true, order: 5 },
  { id: "cta", title: "Call to Action", enabled: true, order: 6 },
];

export function HomepageForm({ initialData }: { initialData?: Page }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HomepageFormValues>({
    resolver: zodResolver(homepageSchema),
    defaultValues: {
      title: initialData?.title || "Homepage",
      sections: initialData?.sections?.length ? initialData.sections : defaultSections,
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const onSubmit = async (values: HomepageFormValues) => {
    try {
      setIsSubmitting(true);
      await pagesService.update("homepage", { ...values, slug: "home", type: "Homepage" });
      toast({ title: "Homepage updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["pages", "homepage"] });
    } catch (error: any) {
      toast({ title: "Error saving homepage", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Manage Homepage"
      description="Configure homepage sections and ordering."
      backHref="/dashboard"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-4 border p-4 rounded-md bg-card">
                <div className="mt-2 text-muted-foreground cursor-grab active:cursor-grabbing">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">{field.id.replace(/-/g, " ")}</h3>
                    <FormField
                      control={form.control}
                      name={`sections.${index}.enabled`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormLabel className="mb-0">Enabled</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch(`sections.${index}.enabled`) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`sections.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sections.${index}.subtitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sections.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
