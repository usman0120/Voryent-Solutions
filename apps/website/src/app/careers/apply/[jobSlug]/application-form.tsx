"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Textarea, Label } from "@voryent/ui";
import { toast } from "sonner";
import { submitJobApplication, uploadResume } from "@/lib/firebase/services";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function ApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload resume
      const resumeUrl = await uploadResume(resumeFile);
      
      // 2. Submit application
      await submitJobApplication({
        ...data,
        jobSlug,
        jobTitle,
        resumeUrl,
      });

      toast.success("Application submitted successfully! We will be in touch soon.");
      reset();
      setResumeFile(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" placeholder="John Doe" {...register("fullName")} />
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="resume">Resume (PDF, DOCX) *</Label>
          <Input 
            id="resume" 
            type="file" 
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
          <Input id="linkedIn" type="url" placeholder="https://linkedin.com/in/johndoe" {...register("linkedIn")} />
          {errors.linkedIn && <p className="text-sm text-destructive">{errors.linkedIn.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio / GitHub</Label>
          <Input id="portfolio" type="url" placeholder="https://github.com/johndoe" {...register("portfolio")} />
          {errors.portfolio && <p className="text-sm text-destructive">{errors.portfolio.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter / Note</Label>
        <Textarea 
          id="coverLetter" 
          placeholder="Tell us why you are a great fit for this role..." 
          className="min-h-[120px]"
          {...register("coverLetter")} 
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>
    </form>
  );
}
