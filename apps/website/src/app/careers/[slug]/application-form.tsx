"use client";

import { useState, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@voryent/ui";
import { Plus, Trash2, UploadCloud, FileText } from "lucide-react";

// User requested 1MB or 2MB limit. We'll use 2MB.
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const applicationFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  
  education: z.array(z.object({
    school: z.string().min(1, "School is required"),
    fieldOfStudy: z.string().optional(),
    degree: z.string().optional(),
    startDate: z.string().optional(), // MM/YYYY
    endDate: z.string().optional(), // MM/YYYY
  })).optional(),
  
  experience: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().optional(),
    industry: z.string().optional(),
    summary: z.string().optional(),
    startDate: z.string().optional(), // MM/YYYY
    endDate: z.string().optional(), // MM/YYYY
    current: z.boolean().default(false),
  })).optional(),
  
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
  
  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      github: "",
      education: [],
      experience: [],
      coverLetter: "",
    },
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experience",
  });

  const processFile = (file: File) => {
    setFileError("");
    
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds 2 MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`);
      return;
    }

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

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    }
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

      const { submitJobApplication } = await import("@/lib/firebase/services");
      await submitJobApplication(appData);

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
      <div className="border border-green-500/30 bg-green-500/5 rounded-xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Application Submitted Successfully!</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Thank you for applying. Our hiring team will review your application shortly.
        </p>
        <Button onClick={() => setSubmitSuccess(false)} variant="outline">
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      
      {/* ─── PERSONAL INFO ─── */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">First Name <span className="text-destructive">*</span></label>
            <input
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
            <input
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email <span className="text-destructive">*</span></label>
            <input
              type="email"
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Phone <span className="text-destructive">*</span></label>
            <input
              placeholder="+92 300 1234567"
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            <p className="text-xs text-muted-foreground">The hiring team may use this number to contact you.</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Address <span className="text-destructive">*</span></label>
          <input
            placeholder="Sialkot, Pakistan"
            className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            {...register("address")}
          />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
          <p className="text-xs text-muted-foreground">Include your city, region, and country.</p>
        </div>
      </section>

      {/* ─── LINKS ─── */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">Links (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">LinkedIn Profile</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("linkedIn")}
            />
            {errors.linkedIn && <p className="text-xs text-destructive">{errors.linkedIn.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">GitHub Profile</label>
            <input
              type="url"
              placeholder="https://github.com/yourusername"
              className="w-full h-11 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("github")}
            />
            {errors.github && <p className="text-xs text-destructive">{errors.github.message}</p>}
          </div>
        </div>
      </section>

      {/* ─── PROFILE: EDUCATION ─── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xl font-bold">Education (Optional)</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ school: "" })}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>

        {eduFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg bg-muted/20 relative space-y-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              onClick={() => removeEdu(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium">School <span className="text-destructive">*</span></label>
              <input
                className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                {...register(`education.${index}.school` as const)}
              />
              {errors?.education?.[index]?.school && (
                <p className="text-xs text-destructive">{errors.education[index]?.school?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Field of study</label>
                <input
                  className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`education.${index}.fieldOfStudy` as const)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Degree</label>
                <input
                  className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`education.${index}.degree` as const)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Start Date (MM/YYYY)</label>
                <input
                  placeholder="08/2018"
                  className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`education.${index}.startDate` as const)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">End Date (MM/YYYY)</label>
                <input
                  placeholder="05/2022"
                  className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`education.${index}.endDate` as const)}
                />
              </div>
            </div>
          </div>
        ))}
        {eduFields.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No education added.</p>
        )}
      </section>

      {/* ─── PROFILE: EXPERIENCE ─── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-xl font-bold">Experience (Optional)</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: "", current: false })}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>

        {expFields.map((field, index) => {
          const isCurrent = watch(`experience.${index}.current` as const);
          return (
            <div key={field.id} className="p-4 border rounded-lg bg-muted/20 relative space-y-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeExp(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium">Title <span className="text-destructive">*</span></label>
                <input
                  className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`experience.${index}.title` as const)}
                />
                {errors?.experience?.[index]?.title && (
                  <p className="text-xs text-destructive">{errors.experience[index]?.title?.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Company</label>
                  <input
                    className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    {...register(`experience.${index}.company` as const)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Industry</label>
                  <input
                    className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    {...register(`experience.${index}.industry` as const)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Start Date (MM/YYYY)</label>
                  <input
                    placeholder="01/2021"
                    className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    {...register(`experience.${index}.startDate` as const)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">End Date (MM/YYYY)</label>
                  <input
                    placeholder={isCurrent ? "Present" : "12/2023"}
                    disabled={isCurrent}
                    className="w-full h-10 px-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    {...register(`experience.${index}.endDate` as const)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  {...register(`experience.${index}.current` as const)}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                <label htmlFor={`current-${index}`} className="text-sm">I currently work here</label>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Summary</label>
                <textarea
                  rows={3}
                  className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  {...register(`experience.${index}.summary` as const)}
                />
              </div>
            </div>
          );
        })}
        {expFields.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No experience added.</p>
        )}
      </section>

      {/* ─── RESUME & COVER LETTER ─── */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">Documents</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Resume / CV <span className="text-destructive">*</span></label>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/20'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {resumeName ? (
              <div className="flex flex-col items-center gap-2 text-primary">
                <FileText className="h-8 w-8" />
                <span className="font-medium">{resumeName}</span>
                <span className="text-xs text-muted-foreground">Click or drag to replace</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="h-8 w-8 mb-2" />
                <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-xs">PDF, DOC, DOCX (Max {MAX_FILE_SIZE / (1024*1024)} MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) processFile(e.target.files[0]);
              }}
            />
          </div>
          {fileError && <p className="text-sm text-destructive mt-1">{fileError}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Cover Letter (Optional)</label>
          <textarea
            rows={5}
            placeholder="Introduce yourself and tell us why you are a great fit..."
            className="w-full p-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            {...register("coverLetter")}
          />
        </div>
      </section>

      {errorMsg && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 text-base">
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>
    </form>
  );
}
