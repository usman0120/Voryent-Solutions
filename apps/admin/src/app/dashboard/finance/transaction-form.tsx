"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/validations";
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
import { useCreateTransaction, useUpdateTransaction } from "@/lib/react-query/finance.hooks";
import { toast } from "sonner";
import { TransactionType } from "@/lib/services/finance.service";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface TransactionFormProps {
  initialData?: TransactionType;
  onSuccess?: () => void;
}

export function TransactionForm({ initialData, onSuccess }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: initialData?.type || "Expense",
      category: initialData?.category || "Other",
      amount: initialData?.amount || 0,
      currency: initialData?.currency || "USD",
      date: initialData?.date || new Date().toISOString().split('T')[0],
      description: initialData?.description || "",
      status: initialData?.status || "Completed",
      reference: initialData?.reference || "",
      receiptUrl: initialData?.receiptUrl || "",
      notes: initialData?.notes || "",
    },
  });

  async function onSubmit(data: TransactionFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
          description: data.description,
        });
        toast.success("Transaction updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Transaction created successfully");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save transaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isIncome = form.watch("type") === "Income";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={isIncome ? "border-green-500 text-green-700" : "border-red-500 text-red-700"}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Income" className="text-green-700">Income</SelectItem>
                    <SelectItem value="Expense" className="text-red-700">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Subscription">Subscription</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Payroll">Payroll</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Legal">Legal/Professional</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Payment to supplier, Subscription renewal, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference / Invoice # (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="INV-2026-001" {...field} />
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
              <FormLabel>Internal Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional details..." 
                  className="h-24 resize-none bg-muted/20" 
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
            {isSubmitting ? "Saving..." : initialData ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
