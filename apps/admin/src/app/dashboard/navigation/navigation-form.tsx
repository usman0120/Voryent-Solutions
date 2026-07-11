"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormLayout } from "@/components/cms/form-layout";
import { type Navigation, navigationService } from "@/lib/services/navigation.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";

const navItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  url: z.string().min(1, "URL is required"),
  order: z.number().default(0),
  visible: z.boolean().default(true),
  newTab: z.boolean().default(false),
});

const navigationSchema = z.object({
  logo: z.string().optional(),
  items: z.array(navItemSchema),
  theme: z.string().optional(),
});

type NavigationFormValues = z.infer<typeof navigationSchema>;

export function NavigationForm({ initialData }: { initialData?: Navigation }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NavigationFormValues>({
    resolver: zodResolver(navigationSchema),
    defaultValues: {
      logo: initialData?.logo || "",
      items: initialData?.items || [],
      theme: initialData?.theme || "light",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (values: NavigationFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData?.id) {
        await navigationService.update(initialData.id, values);
      } else {
        await navigationService.create(values, "main");
      }
      toast({ title: "Navigation updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["navigation"] });
    } catch (error: any) {
      toast({ title: "Error saving navigation", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Manage Navigation"
      description="Update your website's main menu and links."
      backHref="/dashboard"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-medium">Global Settings</h3>
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Menu Items</h3>
              <Button type="button" onClick={() => append({ label: "", url: "", order: fields.length, visible: true, newTab: false })}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-4 border p-4 rounded-md bg-muted/20">
                  <FormField
                    control={form.control}
                    name={`items.${index}.label`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.visible`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-center space-y-2 mb-2">
                        <FormLabel>Visible</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" size="icon" className="mb-0.5" onClick={() => remove(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No menu items added.</p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
