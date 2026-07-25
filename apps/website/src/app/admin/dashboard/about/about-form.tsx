"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutPageSchema, AboutPageFormValues } from "@/lib/admin/validations/about.schema";
import { Button } from "@voryent/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@voryent/ui";
import { Input, Textarea } from "@voryent/ui";
import { useUpdatePage } from "@/lib/admin/react-query/pages.hooks";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Separator } from "@voryent/ui";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import { compressImage } from "@/lib/admin/image-utils";
import Image from "next/image";

interface AboutFormProps {
  initialData?: any;
}

export function AboutForm({ initialData }: AboutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateMutation = useUpdatePage();

  const defaultData: AboutPageFormValues = {
    contentBlocks: {
      hero: {
        title: initialData?.contentBlocks?.hero?.title || "",
        description: initialData?.contentBlocks?.hero?.description || "",
        image: initialData?.contentBlocks?.hero?.image || "/Assets/Illustrations/AI Illustration.webp",
      },
      whoWeAre: {
        title: initialData?.contentBlocks?.whoWeAre?.title || "",
        paragraphs: initialData?.contentBlocks?.whoWeAre?.paragraphs || [""],
        pillars: initialData?.contentBlocks?.whoWeAre?.pillars || [],
      },
      missionVision: {
        mission: initialData?.contentBlocks?.missionVision?.mission || "",
        vision: initialData?.contentBlocks?.missionVision?.vision || "",
      },
      coreValues: {
        title: initialData?.contentBlocks?.coreValues?.title || "",
        description: initialData?.contentBlocks?.coreValues?.description || "",
        items: initialData?.contentBlocks?.coreValues?.items || [],
      },
      processSteps: {
        title: initialData?.contentBlocks?.processSteps?.title || "",
        description: initialData?.contentBlocks?.processSteps?.description || "",
        items: initialData?.contentBlocks?.processSteps?.items || [],
      },
      whyChooseVoryent: {
        title: initialData?.contentBlocks?.whyChooseVoryent?.title || "",
        description: initialData?.contentBlocks?.whyChooseVoryent?.description || "",
        items: initialData?.contentBlocks?.whyChooseVoryent?.items || [],
      },
      leadership: {
        title: initialData?.contentBlocks?.leadership?.title || "Our Leadership",
        members: initialData?.contentBlocks?.leadership?.members || [],
      },
      companyProfile: {
        title: initialData?.contentBlocks?.companyProfile?.title || "Company Profile",
        fields: initialData?.contentBlocks?.companyProfile?.fields || [
          { label: "Company Name", value: "Voryent Solutions" },
          { label: "Founded", value: "2026" },
          { label: "Headquarters", value: "Pakistan" },
          { label: "Industry", value: "Artificial Intelligence & Software Engineering" },
          { label: "Company Type", value: "Technology Company" },
          { label: "Business Model", value: "B2B & B2C" },
          { label: "Company Size", value: "Growing Team" },
          { label: "Service Area", value: "Worldwide" },
          { label: "Core Expertise", value: "AI, SaaS, Enterprise Software, Web & Mobile Development" },
          { label: "Company Registration Number", value: "C-72 LR of 1977-78" },
          { label: "National Tax Number", value: "1531096-5" },
          { label: "Status of the Company", value: "Public Listed Company" },
          { label: "Date of License", value: "1977-78" },
        ],
      }
    },
  };

  const form = useForm<AboutPageFormValues>({
    resolver: zodResolver(aboutPageSchema),
    defaultValues: defaultData,
  });

  const { fields: whoWeAreParagraphs, append: appendWhoWeAreParagraph, remove: removeWhoWeAreParagraph } = useFieldArray({
    control: form.control,
    name: "contentBlocks.whoWeAre.paragraphs" as never, // cast to never because of field array deep typing issues sometimes
  });

  const { fields: whoWeArePillars, append: appendWhoWeArePillar, remove: removeWhoWeArePillar } = useFieldArray({
    control: form.control,
    name: "contentBlocks.whoWeAre.pillars" as never,
  });

  const { fields: coreValuesItems, append: appendCoreValuesItem, remove: removeCoreValuesItem } = useFieldArray({
    control: form.control,
    name: "contentBlocks.coreValues.items" as never,
  });

  const { fields: processStepsItems, append: appendProcessStepsItem, remove: removeProcessStepsItem } = useFieldArray({
    control: form.control,
    name: "contentBlocks.processSteps.items" as never,
  });

  const { fields: whyChooseVoryentItems, append: appendWhyChooseVoryentItem, remove: removeWhyChooseVoryentItem } = useFieldArray({
    control: form.control,
    name: "contentBlocks.whyChooseVoryent.items" as never,
  });


  const { fields: leadershipMembers, append: appendLeadershipMember, remove: removeLeadershipMember } = useFieldArray({
    control: form.control,
    name: "contentBlocks.leadership.members" as never,
  });


  const { fields: companyProfileFields, append: appendCompanyProfileField, remove: removeCompanyProfileField } = useFieldArray({
    control: form.control,
    name: "contentBlocks.companyProfile.fields" as never,
  });

  const handleLeadershipImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressedBase64 = await compressImage(file, 800, 800, 0.7);
      form.setValue(`contentBlocks.leadership.members.${index}.image` as any, compressedBase64, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      toast.error("Failed to compress image");
    }
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Compress image
      const compressedBase64 = await compressImage(file, 800, 800, 0.7);
      form.setValue("contentBlocks.hero.image", compressedBase64, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      toast.error("Failed to compress image");
    }
  }

  async function onSubmit(data: AboutPageFormValues) {
    setIsSubmitting(true);
    try {
      await updateMutation.mutateAsync({
        id: "about", // The document ID is 'about' in 'pages' collection
        data: {
          contentBlocks: data.contentBlocks,
        },
      });
      toast.success("About page content updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save about page content");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
        
        {/* HERO SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contentBlocks.hero.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Building modern digital products..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentBlocks.hero.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" placeholder="e.g. We are a dedicated team..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentBlocks.hero.image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Illustration Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value && (
                        <div className="relative w-full max-w-sm aspect-video border rounded-md overflow-hidden bg-muted">
                          <Image src={field.value} alt="Hero image" fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                        />
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          {field.value && field.value !== "/Assets/Illustrations/AI Illustration.webp" ? "Change Image" : "Upload Image"}
                        </Button>
                        {field.value && field.value !== "/Assets/Illustrations/AI Illustration.webp" && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => form.setValue("contentBlocks.hero.image", "/Assets/Illustrations/AI Illustration.webp", { shouldValidate: true, shouldDirty: true })}
                          >
                            Reset to Default
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* WHO WE ARE */}
        <Card>
          <CardHeader>
            <CardTitle>Who We Are</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="contentBlocks.whoWeAre.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Who We Are" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Paragraphs</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhoWeAreParagraph("")}>
                  <Plus className="mr-2 h-4 w-4" /> Add Paragraph
                </Button>
              </div>
              {whoWeAreParagraphs.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`contentBlocks.whoWeAre.paragraphs.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-4">
                      <div className="flex-1">
                        <FormControl>
                          <Textarea className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="text-destructive mt-1" onClick={() => removeWhoWeAreParagraph(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Pillars (Cards)</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhoWeArePillar({ icon: "Code2", title: "", description: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Pillar
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {whoWeArePillars.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeWhoWeArePillar(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.whoWeAre.pillars.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Code2, Briefcase, Bot" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.whoWeAre.pillars.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Pillar title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.whoWeAre.pillars.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-[80px]" placeholder="Pillar description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MISSION & VISION */}
        <Card>
          <CardHeader>
            <CardTitle>Mission & Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:flex md:space-y-0 md:gap-6">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="contentBlocks.missionVision.mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="contentBlocks.missionVision.vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vision</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* CORE VALUES */}
        <Card>
          <CardHeader>
            <CardTitle>Core Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.coreValues.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.coreValues.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Value Items</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendCoreValuesItem({ icon: "Award", title: "", desc: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Value
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {coreValuesItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeCoreValuesItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.coreValues.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Award, Eye, Lightbulb" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.coreValues.items.${index}.title`}
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
                        name={`contentBlocks.coreValues.items.${index}.desc`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-[80px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROCESS STEPS */}
        <Card>
          <CardHeader>
            <CardTitle>Our Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.processSteps.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.processSteps.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Steps</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendProcessStepsItem({ icon: "Search", title: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Step
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {processStepsItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeProcessStepsItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.processSteps.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Search, PenTool, Code2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.processSteps.items.${index}.title`}
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
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WHY CHOOSE VORYENT */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Voryent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.whyChooseVoryent.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.whyChooseVoryent.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Reasons</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendWhyChooseVoryentItem({ icon: "Layers", title: "", desc: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Reason
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {whyChooseVoryentItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeWhyChooseVoryentItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.whyChooseVoryent.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Layers, Zap, Server" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.whyChooseVoryent.items.${index}.title`}
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
                        name={`contentBlocks.whyChooseVoryent.items.${index}.desc`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-[80px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>



        {/* OUR LEADERSHIP */}
        <Card>
          <CardHeader>
            <CardTitle>Our Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="contentBlocks.leadership.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Leadership Members</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendLeadershipMember({ name: "", title: "", image: "", linkedin: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {leadershipMembers.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8 z-10" onClick={() => removeLeadershipMember(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.leadership.members.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Photo</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                {field.value && (
                                  <div className="relative w-32 h-32 border rounded-full overflow-hidden bg-muted mx-auto">
                                    <Image src={field.value} alt="Photo" fill className="object-cover" />
                                  </div>
                                )}
                                <div className="flex justify-center">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id={`leadership-image-${index}`}
                                    onChange={(e) => handleLeadershipImageUpload(e, index)}
                                  />
                                  <label htmlFor={`leadership-image-${index}`}>
                                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer">
                                      <ImageIcon className="mr-2 h-4 w-4" />
                                      {field.value ? "Change Photo" : "Upload Photo"}
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.leadership.members.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Usman Asif" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.leadership.members.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Founder & CEO" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.leadership.members.${index}.linkedin`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>


        {/* COMPANY PROFILE */}
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="contentBlocks.companyProfile.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Profile Fields</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendCompanyProfileField({ label: "", value: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {companyProfileFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start relative bg-muted/50 p-4 rounded-md border">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8 z-10" onClick={() => removeCompanyProfileField(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.companyProfile.fields.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Founded" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.companyProfile.fields.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2026" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 sticky bottom-6 bg-background/80 backdrop-blur p-4 rounded-lg border shadow-lg z-10">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save About Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
