"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateSettings, useSettingsGroup } from "@/lib/admin/react-query/settings.hooks";
import { socialSettingsSchema } from "@/lib/admin/validations/settings.schema";
import { 
  Button, 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
  Input,
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@voryent/ui";
import { toast } from "sonner";
import { useEffect } from "react";
import { Plus, Trash } from "lucide-react";

import * as z from "zod";

type SocialFormValues = z.infer<typeof socialSettingsSchema>;

export function SocialSettingsSection() {
  const { data: settingsData, isLoading } = useSettingsGroup("social");
  const updateMutation = useUpdateSettings();

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialSettingsSchema),
    defaultValues: { platforms: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "platforms",
  });

  useEffect(() => {
    if (settingsData?.values && Array.isArray(settingsData.values['platforms'])) {
      form.reset(settingsData.values as SocialFormValues);
    } else if (settingsData?.values) {
      // Migrate old data if present
      const migratedPlatforms: any[] = [];
      const oldVals = settingsData.values;
      Object.keys(oldVals).forEach(key => {
        if (oldVals[key] && key !== "platforms") {
          migratedPlatforms.push({ platform: key.charAt(0).toUpperCase() + key.slice(1), url: oldVals[key] });
        }
      });
      form.reset({ platforms: migratedPlatforms });
    }
  }, [settingsData, form]);

  const onSubmit = async (values: any) => {
    try {
      await updateMutation.mutateAsync({ groupId: "social", values });
      toast.success("Social settings saved successfully.");
    } catch (e: any) {
      toast.error(e.message || "Failed to save settings.");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground animate-pulse">Loading Social Settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>Connect your social presence dynamically.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 border p-4 rounded-md relative">
                  <FormField
                    control={form.control}
                    name={`platforms.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. YouTube, Instagram..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`platforms.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="md:mt-8 self-end text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ platform: "", url: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>

            <div className="flex justify-end pt-4 border-t">
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
