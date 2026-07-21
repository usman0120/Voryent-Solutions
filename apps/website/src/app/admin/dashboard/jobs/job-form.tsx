"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { SlugField } from "@/components/admin/cms/slug-field";
import { SeoEditor } from "@/components/admin/cms/seo-editor";
import { RichTextEditor } from "@/components/admin/cms/rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@voryent/ui";
import { jobSchema, type JobFormValues } from "@/lib/admin/validations/job.schema";
import { type JobType } from "@/lib/admin/services/jobs.service";
import { useCreateJob, useUpdateJob } from "@/lib/admin/react-query/jobs.hooks";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { departmentsService } from "@/lib/admin/services/departments.service";
import { positionsService } from "@/lib/admin/services/positions.service";

interface JobFormProps {
  initialData?: JobType | null;
  id?: string;
}

const defaultDepartments = ["Engineering", "Product", "Design", "Marketing", "HR", "Sales", "Operations"];
const defaultEmploymentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const defaultWorkModes = ["Remote", "Hybrid", "On-site"];

export function JobForm({ initialData, id }: JobFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  // Queries for dynamic departments and positions
  const { data: dbDepts = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentsService.getAll(),
  });

  const departmentsList = dbDepts.length > 0 ? dbDepts.map((d) => d.name) : defaultDepartments;

  const createMutation = useCreateJob(user?.uid);
  const updateMutation = useUpdateJob(user?.uid);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      department: initialData?.department || "",
      location: initialData?.location || "Remote",
      employmentType: initialData?.employmentType || "Full-time",
      workMode: initialData?.workMode || "Remote",
      experienceLevel: initialData?.experienceLevel || "Mid-Level",
      salary: initialData?.salary || "",
      currency: initialData?.currency || "USD",
      description: initialData?.description || "",
      responsibilities: initialData?.responsibilities || "",
      requirements: initialData?.requirements || "",
      preferredSkills: initialData?.preferredSkills || "",
      benefits: initialData?.benefits || "",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      closingDate: initialData?.closingDate || "",
      seo: initialData?.seo || { title: "", description: "" },
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data: values as any });
        toast({ title: "Job updated successfully." });
      } else {
        await createMutation.mutateAsync(values as any);
        toast({ title: "Job created successfully." });
      }
      router.push("/dashboard/jobs");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error saving job",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Job Post" : "Create Job Post"}
      description="Define role details, requirements, benefits, and publishing options."
      backHref="/admin/dashboard/jobs"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Frontend Engineer" {...field} />
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
                      <FormLabel>Slug (for Careers website URL)</FormLabel>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departmentsList.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA or Remote" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {defaultEmploymentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {defaultWorkModes.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <FormControl>
                          <Input placeholder="Mid-Level, Senior, Lead" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Salary Range (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $120,000 - $150,000" {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Rich Text Areas */}
              <div className="space-y-6 pt-4 border-t">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description (Overview)</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsibilities</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Skills (Nice to have)</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits & Perks</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* SEO Component */}
              <div className="pt-4 border-t">
                <FormField
                  control={form.control}
                  name="seo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SeoEditor value={field.value || {}} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sidebar configurations */}
            <div className="space-y-6">
              <div className="border rounded-lg p-6 space-y-6 bg-card">
                <h3 className="font-semibold text-lg border-b pb-2">Publishing settings</h3>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Paused">Paused</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="closingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closing Date</FormLabel>
                      <FormControl>
                        <Input type="date" value={field.value || ""} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-md border p-4 bg-muted/20">
                      <div className="space-y-0.5">
                        <FormLabel>Featured Post</FormLabel>
                        <p className="text-xs text-muted-foreground">Highlight at top of Careers page</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
