"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateSettings, useSettingsGroup } from "@/lib/react-query/settings.hooks";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "color" | "time";
  placeholder?: string;
}

interface SettingsSectionProps {
  groupId: string;
  title: string;
  description: string;
  schema: z.ZodObject<any>;
  fields: FieldDef[];
  defaultValues: any;
}

export function SettingsSection({ groupId, title, description, schema, fields, defaultValues }: SettingsSectionProps) {
  const { data: settingsData, isLoading } = useSettingsGroup(groupId);
  const updateMutation = useUpdateSettings();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (settingsData?.values) {
      form.reset(settingsData.values);
    }
  }, [settingsData, form]);

  const onSubmit = async (values: any) => {
    try {
      await updateMutation.mutateAsync({ groupId, values });
      toast.success(`${title} settings saved successfully.`);
    } catch (e: any) {
      toast.error(e.message || "Failed to save settings.");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground animate-pulse">Loading {title}...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(field => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input 
                          type={field.type || "text"} 
                          placeholder={field.placeholder} 
                          {...formField} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
