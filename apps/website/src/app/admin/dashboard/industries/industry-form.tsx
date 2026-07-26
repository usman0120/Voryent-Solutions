"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { industrySchema } from "@/lib/admin/validations/industry.schema";
import { type Industry, industriesService } from "@/lib/admin/services/industries.service";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { IconPicker } from "@/components/admin/cms/icon-picker";
import { compressImage } from "@/lib/admin/image-utils";
import { Button } from "@voryent/ui";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import Image from "next/image";

type IndustryFormValues = z.infer<typeof industrySchema>;

interface IndustryFormProps {
  initialData?: Industry;
  id?: string;
}

export function IndustryForm({ initialData, id }: IndustryFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<IndustryFormValues>({
    resolver: zodResolver(industrySchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      overview: initialData?.overview || "",
      icon: initialData?.icon || "Building2",
      coverImage: initialData?.coverImage || "",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      challenges: initialData?.challenges || [],
      expertise: initialData?.expertise || [],
      howWeHelp: initialData?.howWeHelp || [],
      offerings: initialData?.offerings || [],
      steps: initialData?.steps || [],
      technologies: initialData?.technologies || [],
      relatedCaseStudies: initialData?.relatedCaseStudies || [],
      seo: initialData?.seo || {},
    },
  });

  const { fields: challengesFields, append: appendChallenge, remove: removeChallenge } = useFieldArray({
    control: form.control,
    name: "challenges",
  });
  const { fields: expertiseFields, append: appendExpertise, remove: removeExpertise } = useFieldArray({
    control: form.control,
    name: "expertise",
  });
  const { fields: howWeHelpFields, append: appendHowWeHelp, remove: removeHowWeHelp } = useFieldArray({
    control: form.control,
    name: "howWeHelp",
  });
  const { fields: offeringsFields, append: appendOffering, remove: removeOffering } = useFieldArray({
    control: form.control,
    name: "offerings",
  });
  const { fields: stepsFields, append: appendStep, remove: removeStep } = useFieldArray({
    control: form.control,
    name: "steps",
  });
  const { fields: relatedCaseStudiesFields, append: appendRelatedCaseStudy, remove: removeRelatedCaseStudy } = useFieldArray({
    control: form.control,
    name: "relatedCaseStudies" as never, // Using never because of primitive array in RHF
  });

  const onSubmit = async (values: IndustryFormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await industriesService.update(id, values);
        toast({ title: "Industry updated successfully." });
      } else {
        await industriesService.create(values as any);
        toast({ title: "Industry created successfully." });
      }
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      router.push("/admin/dashboard/industries");
      router.refresh();
    } catch (error: any) {
      toast({ title: "Error saving industry", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64String = await compressImage(file, 1920, 1080, 0.8);
        form.setValue("coverImage", base64String, { shouldDirty: true });
        toast({ title: "Image uploaded and compressed" });
      } catch (err) {
        toast({ title: "Error compressing image", variant: "destructive" });
      }
    }
  };

  return (
    <FormLayout
      title={id ? "Edit Industry" : "Create Industry"}
      description="Manage the details of this industry."
      backHref="/admin/dashboard/industries"
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>Basic Info & Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control as any}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Healthcare" {...field} />
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description (Card)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief summary for cards..." {...field} />
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
                        <FormLabel>Full Overview (Page Content)</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[120px]" placeholder="Deep dive into the industry..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* CHALLENGES */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Key Challenges</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendChallenge({ title: "", description: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Challenge
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {challengesFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border rounded-md">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeChallenge(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pr-8">
                        <FormField control={form.control as any} name={`challenges.${index}.title`} render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`challenges.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* EXPERTISE */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Our Expertise</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendExpertise({ title: "", description: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Expertise
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expertiseFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border rounded-md">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeExpertise(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pr-8">
                        <FormField control={form.control as any} name={`expertise.${index}.title`} render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`expertise.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* HOW WE HELP */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">How We Help</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendHowWeHelp({ title: "", description: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Point
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {howWeHelpFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border rounded-md">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeHowWeHelp(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pr-8">
                        <FormField control={form.control as any} name={`howWeHelp.${index}.title`} render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`howWeHelp.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* OFFERINGS */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Our Offerings</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendOffering({ title: "", description: "", icon: "Box" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Offering
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offeringsFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border rounded-md">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeOffering(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pr-8">
                        <FormField control={form.control as any} name={`offerings.${index}.icon`} render={({ field }) => (
                          <FormItem><FormLabel>Icon</FormLabel><FormControl><IconPicker value={field.value || "Box"} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`offerings.${index}.title`} render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`offerings.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* STEPS */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Process / Steps</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendStep({ title: "", description: "" })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Step
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stepsFields.map((field, index) => (
                    <div key={field.id} className="relative p-4 border rounded-md">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeStep(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="space-y-4 pr-8">
                        <FormField control={form.control as any} name={`steps.${index}.title`} render={({ field }) => (
                          <FormItem><FormLabel>Step {index + 1} Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control as any} name={`steps.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* RELATED CASE STUDIES */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Related Case Studies</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => form.setValue("relatedCaseStudies", [...form.getValues("relatedCaseStudies") || [], ""])}>
                    <Plus className="h-4 w-4 mr-2" /> Add Case Study URL
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.watch("relatedCaseStudies") || []).map((_, index) => (
                    <div key={index} className="flex items-end gap-2">
                      <div className="flex-1">
                        <FormField control={form.control as any} name={`relatedCaseStudies.${index}`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="/case-studies/some-project" {...field} value={field.value as string} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive h-10 w-10" 
                        onClick={() => {
                          const items = [...form.getValues("relatedCaseStudies") || []];
                          items.splice(index, 1);
                          form.setValue("relatedCaseStudies", items);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* TECHNOLOGIES */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Technology Expertise</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => form.setValue("technologies", [...form.getValues("technologies") || [], ""])}>
                    <Plus className="h-4 w-4 mr-2" /> Add Technology
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.watch("technologies") || []).map((_, index) => (
                    <div key={index} className="flex items-end gap-2">
                      <div className="flex-1">
                        <FormField control={form.control as any} name={`technologies.${index}`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>Technology Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Next.js, React, Node.js" {...field} value={field.value as string} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive h-10 w-10" 
                        onClick={() => {
                          const items = [...form.getValues("technologies") || []];
                          items.splice(index, 1);
                          form.setValue("technologies", items);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

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
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
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
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry Icon</FormLabel>
                        <FormControl>
                          <IconPicker value={field.value || "Building2"} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control as any}
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control as any}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL or Upload</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {field.value && (
                              <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                                <Image
                                  src={field.value}
                                  alt="Cover image"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Input
                                placeholder="https://..."
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                              <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
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
