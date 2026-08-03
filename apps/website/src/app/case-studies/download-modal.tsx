"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@voryent/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@voryent/ui";
import { Input, Button } from "@voryent/ui";
import { caseStudyLeadSchema, type CaseStudyLeadFormValues } from "@/lib/admin/validations/case-study-lead.schema";
import { submitCaseStudyDownload } from "@/lib/firebase/services";
import { useToast } from "@/hooks/use-toast";
import LZString from "lz-string";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseStudyTitle: string;
  caseStudyId: string;
  downloadLink?: string;
  fileBase64?: string;
  fileName?: string;
  fileType?: string;
}

export function DownloadModal({
  open,
  onOpenChange,
  caseStudyTitle,
  caseStudyId,
  downloadLink,
  fileBase64,
  fileName,
  fileType,
}: DownloadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CaseStudyLeadFormValues>({
    resolver: zodResolver(caseStudyLeadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      location: "",
      caseStudyId,
      caseStudyTitle,
    },
  });

  const onSubmit = async (values: CaseStudyLeadFormValues) => {
    setIsSubmitting(true);
    try {
      await submitCaseStudyDownload(values);
      
      // Trigger download
      if (downloadLink) {
        window.open(downloadLink, "_blank");
      } else if (fileBase64) {
        // fileBase64 is expected to be a compressed base64 string if uploaded via the admin panel
        const decompressed = LZString.decompressFromBase64(fileBase64);
        const dataUrl = decompressed || fileBase64; // Fallback in case it wasn't compressed
        
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = fileName || `${caseStudyTitle}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast({
          title: "Download Unavailable",
          description: "No file or link is attached to this case study.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Download Started",
        description: "Thank you for your interest!",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none border-border/60 bg-background p-8">
        <DialogHeader className="mb-6 space-y-2">
          <DialogTitle className="text-xl font-bold uppercase tracking-widest">Download Case Study</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please fill out this form to download "{caseStudyTitle}".
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Work Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="john@company.com" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Company *</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Inc." {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Director" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 8900" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, NY" {...field} className="rounded-none border-border/60 h-12 bg-muted/10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full rounded-none h-14 text-xs font-bold uppercase tracking-widest mt-4" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Download Now"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
