"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateSettings, useSettingsGroup } from "@/lib/admin/react-query/settings.hooks";
import { contactSettingsSchema } from "@/lib/admin/validations/settings.schema";
import { 
  Button, 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
  Input,
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@voryent/ui";
import { toast } from "sonner";
import { useEffect } from "react";
import * as z from "zod";

type ContactSettingsValues = z.infer<typeof contactSettingsSchema>;

export function ContactSettingsSection() {
  const { data: settingsData, isLoading } = useSettingsGroup("contact");
  const updateMutation = useUpdateSettings();

  const form = useForm<ContactSettingsValues>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: { 
      email: "",
      phone: "",
      address: "",
      mapUrl: "",
      officeHours: ""
    },
  });

  useEffect(() => {
    if (settingsData?.values) {
      form.reset(settingsData.values as ContactSettingsValues);
    }
  }, [settingsData, form]);

  const onSubmit = async (values: ContactSettingsValues) => {
    try {
      await updateMutation.mutateAsync({ groupId: "contact", values });
      toast.success("Contact settings saved successfully.");
    } catch (e: any) {
      toast.error(e.message || "Failed to save settings.");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground animate-pulse">Loading Contact Settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Manage your public-facing contact details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Physical Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Business St, City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mapUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Google Maps URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://maps.google.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="officeHours"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Office Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon-Fri 9AM-5PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
