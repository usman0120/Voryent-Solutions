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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      
      {/* ─── PERSONAL INFO ─── */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">First Name <span className="text-destructive">*</span></label>
            <input
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-xs text-destructive absolute -bottom-5">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Last Name <span className="text-destructive">*</span></label>
            <input
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-xs text-destructive absolute -bottom-5">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Email <span className="text-destructive">*</span></label>
            <input
              type="email"
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-destructive absolute -bottom-5">{errors.email.message}</p>}
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Phone <span className="text-destructive">*</span></label>
            <input
              placeholder="+1 (555) 000-0000"
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-destructive absolute -bottom-5">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2 relative pt-4">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Address <span className="text-destructive">*</span></label>
          <input
            placeholder="City, State, Country"
            className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
            {...register("address")}
          />
          {errors.address && <p className="text-xs text-destructive absolute -bottom-5">{errors.address.message}</p>}
        </div>
      </section>

      {/* ─── LINKS ─── */}
      <section className="space-y-6 pt-8 border-t border-border/40">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Online Presence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">LinkedIn Profile</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
              {...register("linkedIn")}
            />
            {errors.linkedIn && <p className="text-xs text-destructive absolute -bottom-5">{errors.linkedIn.message}</p>}
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">GitHub Profile</label>
            <input
              type="url"
              placeholder="https://github.com/username"
              className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
              {...register("github")}
            />
            {errors.github && <p className="text-xs text-destructive absolute -bottom-5">{errors.github.message}</p>}
          </div>
        </div>
      </section>

      {/* ─── PROFILE: EDUCATION ─── */}
      <section className="space-y-6 pt-8 border-t border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">Education</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ school: "" })} className="rounded-full px-4 border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </div>

        {eduFields.map((field, index) => (
          <div key={field.id} className="p-6 sm:p-8 rounded-2xl bg-background border border-border/60 shadow-sm relative space-y-6 group">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeEdu(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">School / University <span className="text-destructive">*</span></label>
              <input
                className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                {...register(`education.${index}.school` as const)}
              />
              {errors?.education?.[index]?.school && (
                <p className="text-xs text-destructive mt-1">{errors.education[index]?.school?.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Field of study</label>
                <input
                  className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                  {...register(`education.${index}.fieldOfStudy` as const)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Degree</label>
                <input
                  className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                  {...register(`education.${index}.degree` as const)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Start Date</label>
                <input
                  placeholder="MM/YYYY"
                  className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
                  {...register(`education.${index}.startDate` as const)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">End Date</label>
                <input
                  placeholder="MM/YYYY"
                  className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
                  {...register(`education.${index}.endDate` as const)}
                />
              </div>
            </div>
          </div>
        ))}
        {eduFields.length === 0 && (
          <p className="text-sm text-muted-foreground/70 italic px-4 py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">Optional: Add your educational background.</p>
        )}
      </section>

      {/* ─── PROFILE: EXPERIENCE ─── */}
      <section className="space-y-6 pt-8 border-t border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">Experience</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: "", current: false })} className="rounded-full px-4 border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>

        {expFields.map((field, index) => {
          const isCurrent = watch(`experience.${index}.current` as const);
          return (
            <div key={field.id} className="p-6 sm:p-8 rounded-2xl bg-background border border-border/60 shadow-sm relative space-y-6 group">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeExp(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Job Title <span className="text-destructive">*</span></label>
                <input
                  className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                  {...register(`experience.${index}.title` as const)}
                />
                {errors?.experience?.[index]?.title && (
                  <p className="text-xs text-destructive mt-1">{errors.experience[index]?.title?.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Company</label>
                  <input
                    className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                    {...register(`experience.${index}.company` as const)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Industry</label>
                  <input
                    className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium"
                    {...register(`experience.${index}.industry` as const)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Start Date</label>
                  <input
                    placeholder="MM/YYYY"
                    className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50"
                    {...register(`experience.${index}.startDate` as const)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">End Date</label>
                  <input
                    placeholder={isCurrent ? "Present" : "MM/YYYY"}
                    disabled={isCurrent}
                    className="w-full h-14 px-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium placeholder:text-muted-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    {...register(`experience.${index}.endDate` as const)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg w-fit">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  {...register(`experience.${index}.current` as const)}
                  className="w-5 h-5 rounded border-muted-foreground/30 text-primary focus:ring-primary transition-colors cursor-pointer"
                />
                <label htmlFor={`current-${index}`} className="text-sm font-medium cursor-pointer">I currently work here</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Summary</label>
                <textarea
                  rows={4}
                  className="w-full p-4 rounded-xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium resize-y"
                  {...register(`experience.${index}.summary` as const)}
                />
              </div>
            </div>
          );
        })}
        {expFields.length === 0 && (
          <p className="text-sm text-muted-foreground/70 italic px-4 py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">Optional: Add your work history.</p>
        )}
      </section>

      {/* ─── RESUME & COVER LETTER ─── */}
      <section className="space-y-8 pt-8 border-t border-border/40">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Documents</h3>
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Resume / CV <span className="text-destructive">*</span></label>
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${isDragging ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-border/60 hover:border-primary/50 hover:bg-muted/10'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {resumeName ? (
              <div className="flex flex-col items-center gap-4 text-primary">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <span className="font-semibold text-lg block">{resumeName}</span>
                  <span className="text-sm text-muted-foreground mt-1 block">Click or drag to replace</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm">PDF, DOC, DOCX (Max {MAX_FILE_SIZE / (1024*1024)} MB)</p>
                </div>
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
          {fileError && <p className="text-sm font-medium text-destructive mt-2 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive" /> {fileError}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Cover Letter <span className="text-muted-foreground/60 normal-case font-normal">(Optional)</span></label>
          <textarea
            rows={6}
            placeholder="Introduce yourself and tell us why you are a great fit..."
            className="w-full p-5 rounded-2xl border-0 bg-muted/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base font-medium resize-y placeholder:text-muted-foreground/50"
            {...register("coverLetter")}
          />
        </div>
      </section>

      {errorMsg && (
        <div className="p-5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">!</div>
          {errorMsg}
        </div>
      )}

      <div className="pt-6 border-t border-border/40">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-lg font-semibold rounded-xl">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Application...
            </span>
          ) : "Submit Application"}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          By submitting this application, you agree to our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a> and <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>.
        </p>
      </div>
    </form>
  );
}
