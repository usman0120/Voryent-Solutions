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
import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import { compressImage } from "@/lib/admin/image-utils";
import Image from "next/image";

interface AboutFormProps {
  initialData?: any;
}

export function AboutForm({ initialData }: AboutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateMutation = useUpdatePage();

  const defaultData: AboutPageFormValues = {
    contentBlocks: {
      missionVision: {
        mission: initialData?.contentBlocks?.missionVision?.mission || "",
        vision: initialData?.contentBlocks?.missionVision?.vision || "",
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

  async function onSubmit(data: AboutPageFormValues) {
    setIsSubmitting(true);
    try {
      await updateMutation.mutateAsync({
        id: "about",
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
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeCompanyProfileField(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
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
        
        <div className="flex justify-end sticky bottom-6 bg-background/80 backdrop-blur-sm p-4 border rounded-xl shadow-sm">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? "Saving..." : "Save About Content"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
