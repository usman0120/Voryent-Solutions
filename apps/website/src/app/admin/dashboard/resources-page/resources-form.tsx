"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resourcesPageSchema, ResourcesPageFormValues } from "@/lib/admin/validations/resources.schema";
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
import { Separator } from "@voryent/ui";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";

interface ResourcesFormProps {
  initialData?: any;
}

export function ResourcesForm({ initialData }: ResourcesFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateMutation = useUpdatePage();

  const defaultData: ResourcesPageFormValues = {
    contentBlocks: {
      hero: {
        title: initialData?.contentBlocks?.hero?.title || "",
        description: initialData?.contentBlocks?.hero?.description || "",
      },
      categories: {
        title: initialData?.contentBlocks?.categories?.title || "",
        description: initialData?.contentBlocks?.categories?.description || "",
        items: initialData?.contentBlocks?.categories?.items || [],
      },
      downloads: {
        title: initialData?.contentBlocks?.downloads?.title || "",
        emptyStateTitle: initialData?.contentBlocks?.downloads?.emptyStateTitle || "",
        emptyStateDescription: initialData?.contentBlocks?.downloads?.emptyStateDescription || "",
        items: initialData?.contentBlocks?.downloads?.items || [],
      },
      guides: {
        title: initialData?.contentBlocks?.guides?.title || "",
        description: initialData?.contentBlocks?.guides?.description || "",
      },
      tools: {
        title: initialData?.contentBlocks?.tools?.title || "",
        emptyStateTitle: initialData?.contentBlocks?.tools?.emptyStateTitle || "",
        emptyStateDescription: initialData?.contentBlocks?.tools?.emptyStateDescription || "",
        items: initialData?.contentBlocks?.tools?.items || [],
      },
      faqs: {
        title: initialData?.contentBlocks?.faqs?.title || "",
        description: initialData?.contentBlocks?.faqs?.description || "",
      },
      cta: {
        title: initialData?.contentBlocks?.cta?.title || "",
        description: initialData?.contentBlocks?.cta?.description || "",
        primaryButtonText: initialData?.contentBlocks?.cta?.primaryButtonText || "",
        primaryButtonLink: initialData?.contentBlocks?.cta?.primaryButtonLink || "",
        secondaryButtonText: initialData?.contentBlocks?.cta?.secondaryButtonText || "",
        secondaryButtonLink: initialData?.contentBlocks?.cta?.secondaryButtonLink || "",
      },
    },
  };

  const form = useForm<ResourcesPageFormValues>({
    resolver: zodResolver(resourcesPageSchema),
    defaultValues: defaultData,
  });

  const { fields: categoryItems, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "contentBlocks.categories.items" as never,
  });

  const { fields: downloadItems, append: appendDownload, remove: removeDownload } = useFieldArray({
    control: form.control,
    name: "contentBlocks.downloads.items" as never,
  });

  const { fields: toolItems, append: appendTool, remove: removeTool } = useFieldArray({
    control: form.control,
    name: "contentBlocks.tools.items" as never,
  });

  async function onSubmit(data: ResourcesPageFormValues) {
    setIsSubmitting(true);
    try {
      await updateMutation.mutateAsync({
        id: "resources", // The document ID is 'resources' in 'pages' collection
        data: {
          contentBlocks: data.contentBlocks,
        },
      });
      toast.success("Resources page content updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save resources page content");
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
                    <Input placeholder="e.g. Knowledge Base" {...field} />
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
                    <Textarea className="min-h-[100px]" placeholder="e.g. Everything useful in one place..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* CATEGORIES SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.categories.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Explore by Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.categories.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Find exactly what you need..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Category Items</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendCategory({ icon: "BookOpen", title: "", description: "", link: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeCategory(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.categories.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. BookOpen, Map" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.categories.items.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Category title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.categories.items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-[80px]" placeholder="Category description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.categories.items.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. /blog or #downloads" {...field} />
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

        {/* DOWNLOADS SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Downloads & Checklists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="contentBlocks.downloads.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Downloads & Checklists" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.downloads.emptyStateTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empty State Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Resources coming soon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.downloads.emptyStateDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empty State Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Our engineering team is currently crafting..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Download Items</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendDownload({ icon: "FileBox", title: "", description: "", link: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Download
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {downloadItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeDownload(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.downloads.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. FileBox" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.downloads.items.${index}.title`}
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
                        name={`contentBlocks.downloads.items.${index}.description`}
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
                      <FormField
                        control={form.control}
                        name={`contentBlocks.downloads.items.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Download Link</FormLabel>
                            <FormControl>
                              <Input placeholder="URL to download" {...field} />
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

        {/* GUIDES SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Essential Guides</CardTitle>
            <p className="text-sm text-muted-foreground">Note: Guide items are pulled dynamically from the "Guides" collection.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contentBlocks.guides.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Essential Guides" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* TOOLS SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Open Tools & Utilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="contentBlocks.tools.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Open Tools & Utilities" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.tools.emptyStateTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empty State Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Tools coming soon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.tools.emptyStateDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empty State Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. We are working on open-sourcing..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Tool Items</h4>
                <Button type="button" variant="outline" size="sm" onClick={() => appendTool({ icon: "Wrench", title: "", description: "", link: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Tool
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {toolItems.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive h-8 w-8" onClick={() => removeTool(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-8">
                      <FormField
                        control={form.control}
                        name={`contentBlocks.tools.items.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Wrench" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contentBlocks.tools.items.${index}.title`}
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
                        name={`contentBlocks.tools.items.${index}.description`}
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
                      <FormField
                        control={form.control}
                        name={`contentBlocks.tools.items.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input placeholder="URL" {...field} />
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

        {/* FAQS SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>FAQs Section</CardTitle>
            <p className="text-sm text-muted-foreground">Note: FAQ items are pulled dynamically from the "FAQs" collection.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contentBlocks.faqs.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frequently Asked Questions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentBlocks.faqs.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[80px]" placeholder="e.g. Everything you need to know..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* CTA SECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action (CTA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contentBlocks.cta.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Can't find what you're looking for?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentBlocks.cta.description"
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
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contentBlocks.cta.primaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Button Text</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Get in Touch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.cta.primaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Button Link</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. /contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.cta.secondaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Button Text</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. View Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentBlocks.cta.secondaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Button Link</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. /services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 sticky bottom-6 bg-background/80 backdrop-blur p-4 rounded-lg border shadow-lg z-10">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Resources Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
