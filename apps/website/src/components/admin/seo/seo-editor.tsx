"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Textarea } from "@voryent/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { Switch } from "@/components/admin/ui/switch";

export function SeoEditor() {
  const { control, watch } = useFormContext();
  const title = watch("seo.title") || "";
  const description = watch("seo.description") || "";
  const ogImage = watch("seo.ogImage") || "";

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Meta</TabsTrigger>
          <TabsTrigger value="social">Social (OG/Twitter)</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <FormField
            control={control}
            name="seo.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input placeholder="Page Title | Voryent Solutions" {...field} />
                </FormControl>
                <FormDescription>
                  Keep under 60 characters for optimal display in search engines.
                  {title.length > 0 && <span className={title.length > 60 ? "text-destructive ml-2" : "ml-2"}>({title.length} chars)</span>}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="seo.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of the page content..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Aim for 150-160 characters.
                  {description.length > 0 && <span className={description.length > 160 ? "text-destructive ml-2" : "ml-2"}>({description.length} chars)</span>}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="seo.keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords (Comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="keyword1, keyword2, phrase 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 border rounded-md p-4 bg-muted/20">
            <h4 className="text-sm font-semibold mb-2">Google Search Preview</h4>
            <div className="space-y-1 max-w-[600px]">
              <div className="text-sm text-blue-800 dark:text-blue-400 break-all">
                https://voryentsolutions.com/example-url
              </div>
              <div className="text-xl text-blue-600 dark:text-blue-400 font-medium truncate">
                {title || "Page Title | Voryent Solutions"}
              </div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {description || "This is a preview of how this page might appear in Google search results."}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <FormField
            control={control}
            name="seo.ogImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open Graph Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>Recommended size: 1200 x 630 pixels</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {ogImage && (
            <div className="mt-4 border rounded-md p-4 bg-muted/20">
              <h4 className="text-sm font-semibold mb-2">Social Sharing Preview</h4>
              <div className="border rounded-md overflow-hidden max-w-[500px] bg-card">
                <div className="aspect-[1.91/1] w-full bg-muted">
                  <img src={ogImage} alt="Social preview" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://via.placeholder.com/1200x630?text=Invalid+Image+URL" }} />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground uppercase mb-1">voryentsolutions.com</div>
                  <div className="font-semibold truncate mb-1">{title || "Page Title"}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{description || "Page description..."}</div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <FormField
            control={control}
            name="seo.canonical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL</FormLabel>
                <FormControl>
                  <Input placeholder="Leave blank to use default page URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="seo.noIndex"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">No Index</FormLabel>
                    <FormDescription>Prevent search engines from indexing this page</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="seo.noFollow"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">No Follow</FormLabel>
                    <FormDescription>Prevent search engines from following links on this page</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="seo.schema"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom JSON-LD Schema (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="{ '@context': 'https://schema.org', '@type': 'Article', ... }" 
                    className="min-h-[200px] font-mono text-xs"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
