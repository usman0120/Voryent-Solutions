"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateUser, useUpdateUser } from "@/lib/react-query/users.hooks";
import { toast } from "sonner";
import { UserType } from "@/lib/services/users.service";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface UserFormProps {
  initialData?: UserType;
  onSuccess?: () => void;
}

export function UserForm({ initialData, onSuccess }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: initialData?.email || "",
      displayName: initialData?.displayName || "",
      roleId: initialData?.roleId || "Guest",
      status: initialData?.status || "Invited",
      department: initialData?.department || "",
      position: initialData?.position || "",
      isActive: initialData?.isActive ?? true,
      preferences: initialData?.preferences || {
        theme: "system",
        notificationsEnabled: true,
        emailAlerts: true,
      }
    },
  });

  async function onSubmit(data: UserFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
          displayName: data.displayName,
        });
        toast.success("User profile updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("User profile created. Invitation sent (simulated).");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save user profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} disabled={!!initialData} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Placeholder for seeded roles */}
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Founder">Founder</SelectItem>
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Invited">Invited</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Senior Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">User Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="preferences.theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dashboard Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferences.emailAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Alerts</FormLabel>
                    <FormDescription>
                      Receive system notifications via email.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
