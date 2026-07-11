"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, RoleFormValues } from "@/lib/validations";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateRole, useUpdateRole } from "@/lib/react-query/roles.hooks";
import { toast } from "sonner";
import { RoleType } from "@/lib/services/roles.service";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface RoleFormProps {
  initialData?: RoleType;
  onSuccess?: () => void;
}

export function RoleForm({ initialData, onSuccess }: RoleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      isSystem: initialData?.isSystem || false,
      permissions: initialData?.permissions || {},
    },
  });

  async function onSubmit(data: RoleFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
          name: data.name,
        });
        toast.success("Role updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Role created successfully");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save role");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSystem = form.watch("isSystem");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Account Manager" {...field} disabled={isSystem} />
              </FormControl>
              {isSystem && <FormDescription>System roles cannot be renamed.</FormDescription>}
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
                <Textarea 
                  placeholder="What does this role allow?" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-medium mb-2">Permissions Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Permissions are managed via the Permissions Matrix. Creating a role here generates an empty role. You can assign permissions to it later on the Permissions page.
          </p>
          {initialData && (
            <div className="flex flex-wrap gap-2">
              {Object.keys(initialData.permissions || {}).length > 0 ? (
                Object.entries(initialData.permissions).map(([mod, actions]) => (
                  <Badge key={mod} variant="secondary">
                    {mod}: {actions.length} actions
                  </Badge>
                ))
              ) : (
                <span className="text-sm italic text-muted-foreground">No permissions assigned yet.</span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Role Info" : "Create Empty Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
