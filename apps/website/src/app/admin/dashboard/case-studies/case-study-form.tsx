"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { SlugField } from "@/components/admin/cms/slug-field";
import { SeoEditor } from "@/components/admin/cms/seo-editor";
import { StatusSelector } from "@/components/admin/cms/status-selector";
import { caseStudySchema, type CaseStudyFormValues } from "@/lib/admin/validations/case-study.schema";
import { useCreateCaseStudy, useUpdateCaseStudy } from "@/lib/admin/react-query/case-studies.hooks";
import { type CaseStudy } from "@/lib/admin/services/case-studies.service";
import { useRouter } from "next/navigation";
import { StringArrayInput } from "@/components/admin/cms/string-array-input";

interface CaseStudyFormProps {
  initialData?: CaseStudy;
  id?: string;
}

export function CaseStudyForm({ initialData, id }: CaseStudyFormProps) {
  const router = useRouter();
  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();

  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "",
      industry: initialData?.industry || "",
      projectType: initialData?.projectType || "",
      heroHeadline: initialData?.heroHeadline || "",
      heroSubheadline: initialData?.heroSubheadline || "",
      ctaText: initialData?.ctaText || "Let's Talk",
      outcomeSummary: initialData?.outcomeSummary || "",
      technologies: initialData?.technologies || [],
      overview: initialData?.overview || [],
      challenge: initialData?.challenge || [],
      challengeList: initialData?.challengeList || [],
      solution: initialData?.solution || [],
      solutionList: initialData?.solutionList || [],
      processSteps: initialData?.processSteps || [],
      results: initialData?.results || [],
      imageSrc: initialData?.imageSrc || "",
      coverImage: initialData?.coverImage || "",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      seo: initialData?.seo || {},
    },
  });

  const onSubmit = async (values: CaseStudyFormValues) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data: values });
    } else {
      await createMutation.mutateAsync(values);
    }
    router.push("/dashboard/case-studies");
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <FormLayout
      title={id ? "Edit Case Study" : "Create Case Study"}
      description="Manage the details of this case study."
      backHref="/admin/dashboard/case-studies"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <SlugField 
                        value={field.value} 
                        onChange={field.onChange} 
                        sourceValue={form.watch("title")} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Web App" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Healthcare" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. End-to-End" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="heroHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Headline</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Headline for case study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heroSubheadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Subheadline</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Subheadline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Just String Arrays for simplicity instead of Rich Text for overview etc. */}
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overview (Paragraphs)</FormLabel>
                    <FormControl>
                      <StringArrayInput value={field.value} onChange={field.onChange} placeholder="Add paragraph..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge (Paragraphs)</FormLabel>
                    <FormControl>
                      <StringArrayInput value={field.value} onChange={field.onChange} placeholder="Add challenge paragraph..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution (Paragraphs)</FormLabel>
                    <FormControl>
                      <StringArrayInput value={field.value} onChange={field.onChange} placeholder="Add solution paragraph..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="seo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SeoEditor value={field.value} onChange={field.onChange} />
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
                name="imageSrc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/Assets/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured</FormLabel>
                      <p className="text-sm text-muted-foreground">Show on homepage</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
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
