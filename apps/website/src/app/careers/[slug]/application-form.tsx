"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";

const MAX_FILE_SIZE = 800 * 1024; // 800 KB

const applicationFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").or(z.literal("")).optional(),
  github: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  portfolio: z.string().url("Invalid Portfolio URL").or(z.literal("")).optional(),
  website: z.string().url("Invalid Website URL").or(z.literal("")).optional(),
  availability: z.string().min(1, "Availability is required"),
  salaryExpectation: z.string().optional(),
  experienceYears: z.coerce.number().min(0, "Experience must be 0 or more").optional(),
  skills: z.string().optional(),
  education: z.string().optional(),
  coverLetter: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      linkedin: "",
      github: "",
      portfolio: "",
      website: "",
      availability: "Immediate",
      salaryExpectation: "",
      experienceYears: 0,
      skills: "",
      education: "",
      coverLetter: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    setResumeBase64(null);
    setResumeName(null);

    if (!file) return;

    // Check file format
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    // Check size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds the 800 KB limit. Your file is ${Math.round(file.size / 1024)} KB.`);
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      setResumeBase64(reader.result as string);
      setResumeName(file.name);
    };
    reader.onerror = () => {
      setFileError("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    setErrorMsg("");

    if (!resumeBase64) {
      setFileError("Resume file is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const appData = {
        ...values,
        jobId,
        jobTitle,
        resume: resumeBase64,
        resumeName,
        status: "Applied",
        notes: [],
        appliedAt: serverTimestamp(),
      };

      // Add application to Firestore
      await addDoc(collection(db, "applications"), appData);

      // Add to activityLogs
      await addDoc(collection(db, "activityLogs"), {
        action: "Application Submitted",
        details: `Candidate ${values.firstName} ${values.lastName} applied for "${jobTitle}".`,
        performedBy: "Candidate",
        timestamp: serverTimestamp(),
      });

      setSubmitSuccess(true);
      reset();
      setResumeBase64(null);
      setResumeName(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Application Submitted Successfully!</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Thank you for applying to Voryent Solutions. Our HR team has received your application and will review it shortly.
          </p>
          <Button onClick={() => setSubmitSuccess(false)} variant="outline">
            Apply Again / Submit Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Apply for this Position</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name *</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name *</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <input
                type="email"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("city")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Country</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("country")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("linkedin")}
              />
              {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("github")}
              />
              {errors.github && <p className="text-xs text-destructive">{errors.github.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Portfolio URL</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("portfolio")}
              />
              {errors.portfolio && <p className="text-xs text-destructive">{errors.portfolio.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Personal Website</label>
              <input
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("website")}
              />
              {errors.website && <p className="text-xs text-destructive">{errors.website.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Availability *</label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("availability")}
              >
                <option value="Immediate">Immediate</option>
                <option value="1 week notice">1 week notice</option>
                <option value="2 weeks notice">2 weeks notice</option>
                <option value="1 month notice">1 month notice</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Years of Experience</label>
              <input
                type="number"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("experienceYears")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Salary Expectation</label>
              <input
                placeholder="e.g. $120,000"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("salaryExpectation")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Skills (Comma-separated)</label>
            <input
              placeholder="React, Next.js, Node.js, TypeScript"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("skills")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Education / Degrees</label>
            <input
              placeholder="B.S. in Computer Science, University of X"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("education")}
            />
          </div>

          <div className="space-y-2 pt-4 border-t">
            <label className="text-sm font-medium text-foreground">Upload Resume (PDF, DOC, DOCX - max 800 KB) *</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              onChange={handleFileChange}
            />
            {fileError && <p className="text-xs text-destructive">{fileError}</p>}
            {resumeName && <p className="text-xs text-green-600">Attached: {resumeName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Cover Letter / Message</label>
            <textarea
              rows={4}
              placeholder="Tell us why you are interested in this position..."
              className="w-full p-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("coverLetter")}
            />
          </div>

          {errorMsg && <p className="text-sm text-destructive">{errorMsg}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
