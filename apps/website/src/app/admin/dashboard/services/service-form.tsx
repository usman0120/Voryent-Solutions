"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { FormLayout } from "@/components/admin/cms/form-layout";
import { SlugField } from "@/components/admin/cms/slug-field";
import { SeoEditor } from "@/components/admin/cms/seo-editor";
import { StatusSelector } from "@/components/admin/cms/status-selector";
import { StringArrayInput } from "@/components/admin/cms/string-array-input";
import { IconPicker } from "@/components/admin/cms/icon-picker";
import { serviceSchema } from "@/lib/admin/validations/service.schema";
import { type Service, servicesService } from "@/lib/admin/services/services.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialData?: Service;
  id?: string;
}

export function ServiceForm({ initialData, id }: ServiceFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      tagline: initialData?.tagline || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      icon: initialData?.icon || "Code2",
      featured: initialData?.featured || false,
      order: initialData?.order || 0,
      overview: initialData?.overview || [],
      features: initialData?.features || [],
      process: initialData?.process || [],
      technologies: initialData?.technologies || [],
      status: initialData?.status || "Draft",
      seo: initialData?.seo || {},
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "features"
  });

  const { fields: processFields, append: appendProcess, remove: removeProcess } = useFieldArray({
    control: form.control,
    name: "process"
  });

  const onSubmit = async (values: ServiceFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await servicesService.update(id, values);
        toast({ title: "Service updated successfully." });
      } else {
        await servicesService.create(values as any);
        toast({ title: "Service created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["services"] });
      router.push("/admin/dashboard/services");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving service", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Service" : "Create Service"}
      description="Manage the details of this service offering."
      backHref="/admin/dashboard/services"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control as any}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Custom Software Development" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
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
                  <FormField
                    control={form.control as any}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline / Short Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief summary of the service..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Full description for the details page..." className="min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
                    name="overview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overview Highlights</FormLabel>
                        <FormControl>
                          <StringArrayInput
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add a highlight bullet point..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Features Array */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {featureFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg relative space-y-4 bg-muted/30">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control as any}
                          name={`features.${index}.title`}
                          render={({ field: inputField }) => (
                            <FormItem>
                              <FormLabel>Feature Title</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Real-time Analytics" {...inputField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control as any}
                          name={`features.${index}.icon`}
                          render={({ field: inputField }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <FormControl>
                                <IconPicker
                                  value={inputField.value || "Code2"}
                                  onChange={inputField.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control as any}
                        name={`features.${index}.description`}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Feature description..." {...inputField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendFeature({ title: "", description: "", icon: "Code2" })}
                    className="w-full border-dashed"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Feature
                  </Button>
                </CardContent>
              </Card>

              {/* Process Array */}
              <Card>
                <CardHeader>
                  <CardTitle>Development Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {processFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg relative space-y-4 bg-muted/30 flex gap-4">
                      <div className="mt-8 text-muted-foreground cursor-move">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeProcess(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control as any}
                              name={`process.${index}.step`}
                              render={({ field: inputField }) => (
                                <FormItem>
                                  <FormLabel>Step</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...inputField} onChange={(e) => inputField.onChange(parseInt(e.target.value) || 0)} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-5">
                            <FormField
                              control={form.control as any}
                              name={`process.${index}.title`}
                              render={({ field: inputField }) => (
                                <FormItem>
                                  <FormLabel>Step Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Discovery" {...inputField} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="md:col-span-5">
                            <FormField
                              control={form.control as any}
                              name={`process.${index}.icon`}
                              render={({ field: inputField }) => (
                                <FormItem>
                                  <FormLabel>Icon</FormLabel>
                                  <FormControl>
                                    <IconPicker
                                      value={inputField.value || "Search"}
                                      onChange={inputField.onChange}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <FormField
                          control={form.control as any}
                          name={`process.${index}.description`}
                          render={({ field: inputField }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="What happens in this step..." {...inputField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendProcess({ step: (processFields.length + 1).toString(), title: "", description: "", icon: "Search" })}
                    className="w-full border-dashed"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Process Step
                  </Button>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control as any}
                    name="technologies"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <StringArrayInput
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add a technology (e.g. React, Node.js)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control as any}
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
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Meta Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing & Meta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control as any}
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
                    control={form.control as any}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as any}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Icon</FormLabel>
                        <FormControl>
                          <IconPicker value={field.value || "Code2"} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as any}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control as any}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Featured Service</FormLabel>
                          <p className="text-sm text-muted-foreground">Show on homepage</p>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
