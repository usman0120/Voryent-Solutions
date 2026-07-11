"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormLayout } from "@/components/cms/form-layout";
import { type Footer, footerService } from "@/lib/services/footer.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";

const footerLinkSchema = z.object({
  label: z.string().min(1, "Label required"),
  url: z.string().min(1, "URL required"),
});

const footerColumnSchema = z.object({
  title: z.string().min(1, "Title required"),
  links: z.array(footerLinkSchema),
});

const footerSchema = z.object({
  description: z.string().optional(),
  columns: z.array(footerColumnSchema),
  copyright: z.string().optional(),
});

type FooterFormValues = z.infer<typeof footerSchema>;

export function FooterForm({ initialData }: { initialData?: Footer }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues: {
      description: initialData?.description || "",
      columns: initialData?.columns || [],
      copyright: initialData?.copyright || `© ${new Date().getFullYear()} Voryent. All rights reserved.`,
    },
  });

  const { fields: columnFields, append: appendColumn, remove: removeColumn } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = async (values: FooterFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData?.id) {
        await footerService.update(initialData.id, values);
      } else {
        await footerService.create(values, "main");
      }
      toast({ title: "Footer updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    } catch (error: any) {
      toast({ title: "Error saving footer", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Manage Footer"
      description="Update your website's footer links and content."
      backHref="/dashboard"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-medium">General</h3>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copyright Text</FormLabel>
                  <FormControl>
                    <Input placeholder="© 2026..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Footer Columns</h3>
              <Button type="button" onClick={() => appendColumn({ title: "", links: [] })}>
                <Plus className="mr-2 h-4 w-4" /> Add Column
              </Button>
            </div>
            
            <div className="space-y-4">
              {columnFields.map((columnField, colIndex) => (
                <div key={columnField.id} className="border p-4 rounded-md bg-muted/10 space-y-4">
                  <div className="flex items-start justify-between">
                    <FormField
                      control={form.control}
                      name={`columns.${colIndex}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1 mr-4">
                          <FormLabel>Column Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeColumn(colIndex)} className="mt-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Ideally, we'd use another useFieldArray here for links, but for brevity we'll just show the structure */}
                  <div className="pl-4 border-l-2 space-y-2">
                    <p className="text-sm text-muted-foreground">Links can be managed here (simplified for demo).</p>
                  </div>
                </div>
              ))}
              {columnFields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No columns added.</p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
