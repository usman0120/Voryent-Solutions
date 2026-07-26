"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/admin/validations";
import { Button } from "@voryent/ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@voryent/ui";
import { useCreateProject, useUpdateProject } from "@/lib/admin/react-query/projects.hooks";
import { toast } from "sonner";
import { ProjectType } from "@/lib/admin/services/projects.service";
import * as React from "react";
import { useState } from "react";
import { ArrayInput } from "@/components/admin/array-input";
import { Slider } from "@/components/admin/ui/slider";
import { Separator, Label } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { Upload, X, Trash2, Plus } from "lucide-react";

interface ProjectFormProps {
  initialData?: ProjectType;
  onSuccess?: () => void;
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const formatDate = (date: any) => {
    if (!date) return "";
    if (typeof date === "string") {
      // Return YYYY-MM-DD from an ISO string
      return date.split("T")[0];
    }
    if (date.toDate) {
      return date.toDate().toISOString().split("T")[0];
    }
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      type: initialData?.type || "",
      status: initialData?.status || "Planning",
      priority: initialData?.priority || "Medium",
      client: initialData?.client || "",
      industry: initialData?.industry || "",
      startDate: formatDate(initialData?.startDate),
      targetDate: formatDate(initialData?.targetDate),
      completedDate: formatDate(initialData?.completedDate),
      budget: Number(initialData?.budget) || 0,
      currency: initialData?.currency || "USD",
      progress: Number(initialData?.progress) || 0,
      teamMembers: initialData?.teamMembers || [],
      projectManager: initialData?.projectManager || "",
      technologies: initialData?.technologies || [],
      repository: initialData?.repository || "",
      website: initialData?.website || "",
      demoUrl: initialData?.demoUrl || "",
      notes: initialData?.notes || "",
      tags: initialData?.tags || [],
      attachments: initialData?.attachments || [],
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      gallery: initialData?.gallery || [],
      isFeatured: initialData?.isFeatured || false,
      relatedProjects: initialData?.relatedProjects || [],
      servicesProvided: Array.isArray(initialData?.servicesProvided) ? initialData.servicesProvided : [],
      testimonials: initialData?.testimonials || [],
      challenges: Array.isArray(initialData?.challenges) ? initialData.challenges : (initialData?.challenges ? [initialData.challenges as string] : []),
      milestones: (initialData?.milestones || []).map((m: any) => ({
        ...m,
        dueDate: formatDate(m.dueDate)
      })),
      outcomes: Array.isArray(initialData?.outcomes) ? initialData.outcomes : (initialData?.outcomes ? [initialData.outcomes as string] : []),
      solutions: initialData?.solutions || "",
    },
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large", { description: "Please upload an image under 5MB." });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          form.setValue("coverImage", base64);
          toast.success("Cover image uploaded successfully.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024);
      if (validFiles.length < files.length) {
        toast.error("Some images skipped", { description: "Files over 5MB are ignored." });
      }
      
      const currentGallery = form.getValues("gallery") || [];
      const newImages: string[] = [];
      let processed = 0;

      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          if (base64) {
            newImages.push(base64);
          }
          processed++;
          if (processed === validFiles.length) {
            form.setValue("gallery", [...currentGallery, ...newImages]);
            toast.success("Gallery images uploaded successfully.");
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data,
          projectName: data.name,
        });
        toast.success("Project updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Project created successfully");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form validation errors:", errors);
          toast.error("Form validation failed", { description: JSON.stringify(errors) });
        })} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Voryent CMS Replatform" {...field} />
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
                  <Input placeholder="voryent-cms-replatform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Internal Tool, Client Project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control as any}
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
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control as any}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the project goals and scope..." 
                  className="h-24 resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Technology, Healthcare" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="targetDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Completion Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* -------- RICH CONTENT -------- */}
        <Separator />
        
        <div className="space-y-6">
          <FormField
            control={form.control as any}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Overview</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a comprehensive project overview..." 
                    className="min-h-[150px] resize-y" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="challenges"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ArrayInput 
                    label="Key Challenges & Problems Faced" 
                    values={field.value || []} 
                    onChange={field.onChange} 
                    placeholder="e.g. Scaling infrastructure to support 100k concurrent users"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="solutions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solutions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain how you solved the challenges..." 
                    className="min-h-[150px] resize-y" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="outcomes"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ArrayInput 
                    label="Results / Key Outcomes" 
                    values={field.value || []} 
                    onChange={field.onChange} 
                    placeholder="e.g. Increased conversion rate by 40%"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* -------- MEDIA -------- */}
        <Separator />
        
        <div className="space-y-6">
          <FormField
            control={form.control as any}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Input {...field} placeholder="https://... or upload local image" />
                  </FormControl>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleCoverImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload Cover Image (Base64)
                  </Button>
                  {field.value && (
                    <div className="mt-2 relative aspect-[16/9] w-full max-w-sm rounded-md overflow-hidden border">
                      <img src={field.value} alt="Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="gallery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Gallery</FormLabel>
                <div className="space-y-2">
                  <input 
                    type="file" 
                    ref={galleryInputRef}
                    onChange={handleGalleryUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload Gallery Images (Base64)
                  </Button>
                  {field.value && field.value.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      {field.value.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="relative aspect-video rounded-md overflow-hidden border group">
                          <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newGallery = [...field.value];
                              newGallery.splice(idx, 1);
                              form.setValue("gallery", newGallery);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* -------- CATEGORIZATION & SERVICES -------- */}
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="servicesProvided"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ArrayInput 
                    label="Services Provided" 
                    values={field.value || []} 
                    onChange={field.onChange} 
                    placeholder="e.g. Full-Stack Development"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control as any}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ArrayInput 
                    label="Technologies & Tech Stack" 
                    values={field.value || []} 
                    onChange={field.onChange} 
                    placeholder="e.g. React, Node.js, Firebase"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* -------- URLS AND RELATIONS -------- */}
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control as any}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://demo.example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="repository"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub / Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control as any}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured Project</FormLabel>
                <p className="text-sm text-muted-foreground">Highlight on main home page</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control as any}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress: {field.value}%</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(val) => field.onChange(val[0])}
                  className="py-4"
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
            {isSubmitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
