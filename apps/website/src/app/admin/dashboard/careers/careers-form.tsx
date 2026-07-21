"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { type Page, pagesService } from "@/lib/admin/services/pages.service";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";

const benefitItemSchema = z.object({
  icon: z.string().min(1, "Icon name is required"),
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
});

const processStepSchema = z.object({
  icon: z.string().min(1, "Icon name is required"),
  title: z.string().min(1, "Title is required"),
});

const faqItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

const careersSchema = z.object({
  title: z.string().default("Careers"),
  hero: z.object({
    badge: z.string().min(1, "Hero badge is required"),
    title: z.string().min(1, "Hero title is required"),
    description: z.string().min(1, "Hero description is required"),
  }),
  benefits: z.object({
    title: z.string().min(1, "Benefits title is required"),
    description: z.string().min(1, "Benefits description is required"),
    items: z.array(benefitItemSchema),
  }),
  hiringProcess: z.object({
    title: z.string().min(1, "Hiring process title is required"),
    description: z.string().min(1, "Hiring process description is required"),
    steps: z.array(processStepSchema),
  }),
  cta: z.object({
    title: z.string().min(1, "CTA title is required"),
    description: z.string().min(1, "CTA description is required"),
    buttonText: z.string().min(1, "CTA button text is required"),
  }),
  faq: z.object({
    title: z.string().min(1, "FAQ title is required"),
    description: z.string().min(1, "FAQ description is required"),
    items: z.array(faqItemSchema),
  }),
  emptyState: z.object({
    title: z.string().min(1, "Empty state title is required"),
    description: z.string().min(1, "Empty state description is required"),
  }),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

type CareersFormValues = z.infer<typeof careersSchema>;

const defaultValues: CareersFormValues = {
  title: "Careers",
  hero: {
    badge: "Join the Team",
    title: "Build software that makes a difference.",
    description: "At Voryent, we value engineering excellence, continuous learning, extreme ownership, and seamless collaboration.",
  },
  benefits: {
    title: "Why Work With Voryent",
    description: "We provide the environment, tools, and culture you need to do your best work and grow your career.",
    items: [
      { icon: "MapPin", title: "Remote-first", desc: "Work from wherever you are most productive." },
      { icon: "Code2", title: "Modern Tech Stack", desc: "Work with React, Next.js, Node, and the latest AI integrations." },
      { icon: "BookOpen", title: "Learning & Growth", desc: "Dedicated budgets for courses and certifications." },
    ],
  },
  hiringProcess: {
    title: "Our Hiring Process",
    description: "A transparent, respectful, and efficient process designed to let you show your true capabilities.",
    steps: [
      { icon: "FileText", title: "Apply" },
      { icon: "Search", title: "Review" },
      { icon: "Users", title: "Interview" },
      { icon: "Settings", title: "Technical Discussion" },
      { icon: "Award", title: "Offer" },
      { icon: "ThumbsUp", title: "Welcome" },
    ],
  },
  cta: {
    title: "Ready to make an impact?",
    description: "Join our team and help us build scalable, high-performance software solutions.",
    buttonText: "Apply Now",
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Common questions about working at Voryent Solutions.",
    items: [
      { question: "Do you offer remote work?", answer: "Yes, we are a remote-first company." },
      { question: "What tech stack do you use?", answer: "We primarily work with React, Next.js, Node.js, and TypeScript." },
    ],
  },
  emptyState: {
    title: "No open positions at the moment.",
    description: "We don't have any specific roles open right now, but we are always looking for talented team members.",
  },
  seo: {
    title: "Careers | Voryent Solutions",
    description: "Join Voryent Solutions. Build software that makes a difference.",
  },
};

export function CareersForm({ initialData }: { initialData?: Page }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CareersFormValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: initialData ? (initialData as any) : defaultValues,
  });

  const benefitsArray = useFieldArray({ control: form.control, name: "benefits.items" });
  const stepsArray = useFieldArray({ control: form.control, name: "hiringProcess.steps" });
  const faqArray = useFieldArray({ control: form.control, name: "faq.items" });

  const onSubmit = async (values: CareersFormValues) => {
    try {
      setIsSubmitting(true);
      await pagesService.update("careers", { ...values, slug: "careers", type: "Careers" });
      toast({ title: "Careers CMS page updated successfully." });
      queryClient.invalidateQueries({ queryKey: ["pages", "careers"] });
    } catch (error: any) {
      toast({ title: "Error saving Careers CMS", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Manage Careers Page"
      description="Configure public careers page content, benefits, hiring steps, FAQs, and SEO."
      backHref="/dashboard"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-6">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6 gap-2">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="cta">CTA & Empty</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* HERO TAB */}
            <TabsContent value="hero" className="space-y-4 border p-6 rounded-lg bg-card">
              <h3 className="text-lg font-medium">Hero Section</h3>
              <FormField
                control={form.control}
                name="hero.badge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badge Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hero.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description Text</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            {/* BENEFITS TAB */}
            <TabsContent value="benefits" className="space-y-4 border p-6 rounded-lg bg-card">
              <h3 className="text-lg font-medium">Benefits Section</h3>
              <FormField
                control={form.control}
                name="benefits.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefits Section Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benefits.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefits Section Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Benefit Cards</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => benefitsArray.append({ icon: "Heart", title: "New Benefit", desc: "Description" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Benefit
                  </Button>
                </div>

                {benefitsArray.fields.map((item, index) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-md bg-muted/20 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`benefits.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon (Lucide name)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="MapPin, Code2, Heart, etc." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`benefits.items.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`benefits.items.${index}.desc`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-3">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="mt-6"
                      onClick={() => benefitsArray.remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* PROCESS TAB */}
            <TabsContent value="process" className="space-y-4 border p-6 rounded-lg bg-card">
              <h3 className="text-lg font-medium">Hiring Process Section</h3>
              <FormField
                control={form.control}
                name="hiringProcess.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Process Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hiringProcess.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Process Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Workflow Steps</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => stepsArray.append({ icon: "FileText", title: "New Step" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Step
                  </Button>
                </div>

                {stepsArray.fields.map((item, index) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-md bg-muted/20 items-center">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`hiringProcess.steps.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon (Lucide name)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Search, Users, Award, etc." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`hiringProcess.steps.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Step Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={index === 0}
                        onClick={() => stepsArray.move(index, index - 1)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={index === stepsArray.fields.length - 1}
                        onClick={() => stepsArray.move(index, index + 1)}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => stepsArray.remove(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* CTA & EMPTY STATE TAB */}
            <TabsContent value="cta" className="space-y-6 border p-6 rounded-lg bg-card">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Call to Action Banner</h3>
                <FormField
                  control={form.control}
                  name="cta.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cta.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cta.buttonText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">No Open Roles (Empty State)</h3>
                <FormField
                  control={form.control}
                  name="emptyState.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empty State Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emptyState.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empty State Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            {/* FAQ TAB */}
            <TabsContent value="faq" className="space-y-4 border p-6 rounded-lg bg-card">
              <h3 className="text-lg font-medium">FAQs Section</h3>
              <FormField
                control={form.control}
                name="faq.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FAQs Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="faq.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FAQs Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">FAQ Items</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => faqArray.append({ question: "New Question", answer: "Answer content." })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add FAQ
                  </Button>
                </div>

                {faqArray.fields.map((item, index) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-md bg-muted/20 items-start">
                    <div className="flex-1 space-y-4">
                      <FormField
                        control={form.control}
                        name={`faq.items.${index}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`faq.items.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={2} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="mt-6"
                      onClick={() => faqArray.remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* SEO TAB */}
            <TabsContent value="seo" className="space-y-4 border p-6 rounded-lg bg-card">
              <h3 className="text-lg font-medium">Careers SEO Metadata</h3>
              <FormField
                control={form.control}
                name="seo.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </FormLayout>
  );
}
