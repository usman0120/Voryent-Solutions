"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { compressImage } from "@/lib/image-utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mediaService, Media } from "@/lib/services/media.service";
import { Upload, Trash, Copy, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function MediaLibraryPage() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: () => mediaService.getAll(),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]; if (!file) continue;
        
        if (!file.type.startsWith("image/")) {
          toast({ title: "Only images are supported for now", variant: "destructive" });
          continue;
        }

        // Compress and resize
        const base64Data = await compressImage(file, 1024, 1024, 0.7);

        // Save to Firestore
        await mediaService.create({
          name: file.name,
          data: base64Data, // Store base64 directly
          type: file.type,
          mimeType: file.type,
          size: Math.round((base64Data.length * 3) / 4), // Approximate bytes from base64
          folder: "root",
        });
      }
      
      toast({ title: "Upload complete." });
      queryClient.invalidateQueries({ queryKey: ["media"] });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      try {
        await mediaService.delete(id);
        toast({ title: "Media deleted." });
        queryClient.invalidateQueries({ queryKey: ["media"] });
      } catch (err: any) {
        toast({ title: "Delete failed", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied to clipboard!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your website's images and files.</p>
        </div>
        
        <div className="relative">
          <Input 
            type="file" 
            multiple 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" /> 
            {isUploading ? "Uploading..." : "Upload Media"}
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-muted/20">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Files are currently resized, compressed, and stored directly in Firestore as base64 strings to avoid storage costs. Max size per document is 1MB.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading media...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden group relative bg-background">
              <div className="aspect-square bg-muted/30 flex items-center justify-center relative">
                {item.data.startsWith("data:image") || item.data.startsWith("http") ? (
                  <img src={item.data} alt={item.name} className="object-cover w-full h-full" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Button variant="secondary" size="sm" className="w-24" onClick={() => handleCopyUrl(item.data)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                  <Button variant="destructive" size="sm" className="w-24" onClick={() => handleDelete(item.id!)}>
                    <Trash className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
              <div className="p-2 truncate text-xs">
                <p className="font-medium truncate" title={item.name}>{item.name}</p>
                <p className="text-muted-foreground">
                  {Math.round(item.size / 1024)} KB
                </p>
              </div>
            </div>
          ))}
          {mediaItems.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">No media files found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
