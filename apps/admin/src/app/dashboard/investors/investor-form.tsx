"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorSchema, InvestorFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateInvestor, useUpdateInvestor } from "@/lib/react-query/investors.hooks";
import { toast } from "sonner";
import { InvestorType } from "@/lib/services/investors.service";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface InvestorFormProps {
  initialData?: InvestorType;
  onSuccess?: () => void;
}

export function InvestorForm({ initialData, onSuccess }: InvestorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateInvestor();
  const updateMutation = useUpdateInvestor();

  const form = useForm<InvestorFormValues>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "Angel",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      organization: initialData?.organization || "",
      investmentAmount: initialData?.investmentAmount || 0,
      currency: initialData?.currency || "USD",
      equityPercentage: initialData?.equityPercentage || 0,
      investmentDate: initialData?.investmentDate || "",
      status: initialData?.status || "Prospect",
      notes: initialData?.notes || "",
      documents: initialData?.documents || [],
    },
  });

  async function onSubmit(data: InvestorFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
          investorName: data.name,
        });
        toast.success("Investor updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Investor created successfully");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save investor");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investor Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe or Acme VC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Capital" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investor Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Angel">Angel</SelectItem>
                    <SelectItem value="VC">VC</SelectItem>
                    <SelectItem value="Private">Private Equity</SelectItem>
                    <SelectItem value="Founder">Founder</SelectItem>
                    <SelectItem value="Strategic">Strategic</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="Negotiating">Negotiating</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Exited">Exited</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="investmentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Amount</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input placeholder="USD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equityPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equity %</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Terms, conditions, or internal notes..." 
                  className="h-24 resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Investor" : "Add Investor"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
