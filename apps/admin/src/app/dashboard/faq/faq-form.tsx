"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormLayout } from "@/components/cms/form-layout";
import { StatusSelector } from "@/components/cms/status-selector";
import { baseEntitySchema } from "@/lib/validations/cms";
import { type FaqItem, faqService } from "@/lib/services/faq.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const faqSchema = baseEntitySchema.extend({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().optional(),
  order: z.number().default(0),
});

type FAQFormValues = z.infer<typeof faqSchema>;

interface FAQFormProps {
  initialData?: FaqItem;
  id?: string;
}

export function FAQForm({ initialData, id }: FAQFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: initialData?.question || "",
      answer: initialData?.answer || "",
      category: initialData?.category || "General",
      status: initialData?.status || "Draft",
      order: initialData?.order || 0,
    },
  });

  const onSubmit = async (values: FAQFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await faqService.update(id, values);
        toast({ title: "FaqItem updated successfully." });
      } else {
        await faqService.create(values as any);
        toast({ title: "FaqItem created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["faq"] });
      router.push("/dashboard/faq");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving FaqItem", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={id ? "Edit FaqItem" : "Create FaqItem"}
      description="Manage frequently asked questions."
      backHref="/dashboard/faq"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder="How does..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detailed answer..." {...field} className="min-h-[150px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <StatusSelector value={field.value} onChange={field.onChange} />
                    </FormControl>
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
                    <FormControl>
                      <Input {...field} placeholder="e.g. General, Pricing" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
