"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@voryent/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@voryent/ui";
import { Input, Button, Textarea } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";
import { SlugField } from "@/components/admin/cms/slug-field";
import { StatusSelector } from "@/components/admin/cms/status-selector";
import { caseStudySchema, type CaseStudyFormValues } from "@/lib/admin/validations/case-study.schema";
import { useCreateCaseStudy, useUpdateCaseStudy } from "@/lib/admin/react-query/case-studies.hooks";
import { type CaseStudy } from "@/lib/admin/services/case-studies.service";
import LZString from "lz-string";

interface CaseStudyDialogProps {
  initialData?: CaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CaseStudyDialog({ initialData, open, onOpenChange }: CaseStudyDialogProps) {
  const createMutation = useCreateCaseStudy();
  const updateMutation = useUpdateCaseStudy();
  const [fileError, setFileError] = useState<string>("");

  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      industry: initialData?.industry || "",
      coverImage: initialData?.coverImage || "",
      status: initialData?.status || "Draft",
      featured: initialData?.featured || false,
      downloadLink: initialData?.downloadLink || "",
      fileBase64: initialData?.fileBase64 || "",
      fileName: initialData?.fileName || "",
      fileType: initialData?.fileType || "",
    },
  });

  const onSubmit = async (values: CaseStudyFormValues) => {
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({ id: initialData.id, data: values });
      } else {
        await createMutation.mutateAsync(values);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    if (!file) return;

    if (file.size > 700 * 1024) { // Warning around 700KB before base64 overhead
      setFileError("File size is large. Firestore document limit is 1MB. This might fail to save.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      const compressed = LZString.compressToBase64(base64String);
      form.setValue("fileBase64", compressed);
      form.setValue("fileName", file.name);
      form.setValue("fileType", file.type);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Case Study" : "Create Case Study"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Case Study Title" {...field} />
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Card summary)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Short description..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
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
                </div>
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
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <Input placeholder="https://... or upload local image" {...field} />
                        </FormControl>
                        <input 
                          type="file" 
                          id="case-study-cover-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;
                                if (base64) {
                                  form.setValue("coverImage", base64);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => document.getElementById("case-study-cover-upload")?.click()}
                        >
                          Upload Image (Base64)
                        </Button>
                        {field.value && (
                          <div className="mt-2 relative aspect-[16/9] w-full rounded-md overflow-hidden border">
                            <img src={field.value} alt="Cover Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium">Download Asset</h4>
                  <FormField
                    control={form.control}
                    name="downloadLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External Link (e.g. Google Drive)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground font-medium">OR</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Upload PDF (Converted to Base64)
                    </label>
                    <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                    {form.watch("fileName") && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Current file: {form.watch("fileName")}
                      </p>
                    )}
                    {fileError && <p className="text-sm text-amber-500 mt-1">{fileError}</p>}
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Case Study"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
