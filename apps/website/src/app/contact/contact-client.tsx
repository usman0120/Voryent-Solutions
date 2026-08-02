"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Paperclip,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SocialIcons } from "@/components/layout/site-footer";
import { handleContactSubmission } from "@/app/actions/form-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";

/* ──────────────────────────── DATA ──────────────────────────── */

const serviceOptions = [
  "Software Engineering",
  "Cloud Architecture",
  "Data & AI",
  "UI/UX Design",
  "DevOps & SRE",
  "Other",
];

const projectTypes = [
  "AI Engineering & Automation (Primary Focus)",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud & DevOps",
  "Data & Analytics",
  "Maintenance & Support",
];

const budgetOptions = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
];

const timelineOptions = ["Immediately", "Within 1 Month", "1-3 Months", "3-6 Months", "Flexible"];

/* ──────────────────────────── FORM TYPES ──────────────────────────── */

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  terms?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ──────────────────────────── CONTACT FORM ──────────────────────────── */

export function QuickMessageForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [securityToken, setSecurityToken] = React.useState("");

  React.useEffect(() => {
    const timestamp = Date.now();
    const expectedHash = (timestamp * 7).toString(36);
    setSecurityToken(`${timestamp.toString(36)}_${expectedHash}`);
  }, []);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 20)
      newErrors.message = "Please provide at least 20 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const fData = new FormData(e.currentTarget);
      fData.append("security_token", securityToken);
      fData.append("formType", "contact");
      const result = await handleContactSubmission(fData);
      if (result.error) {
        setErrors((prev) => ({ ...prev, _form: result.error }) as any);
        setStatus("error");
        toast.error("Submission failed", { description: result.error });
        return;
      }
      setStatus("success");
      setFormData({ name: "", company: "", email: "", service: "", budget: "", message: "" });
      toast.success("Thank you for reaching out!", {
        description: "We've received your message and will get back to you soon.",
      });
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="bg-card border-border/60 flex flex-col items-center justify-center rounded-none border p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center bg-primary/10 text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-foreground text-3xl font-bold tracking-tight">Message Sent</h3>
        <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
          Thank you for contacting us. We have received your message and will respond as soon as
          possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          suppressHydrationWarning
          className="text-primary mt-8 inline-flex items-center text-xs font-bold tracking-widest uppercase hover:text-primary/80 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClasses =
    "bg-background border-border/60 hover:border-primary/50 focus-visible:border-primary flex w-full rounded-none border px-5 py-4 text-sm transition-colors focus-visible:outline-none placeholder:text-muted-foreground/50";
  const labelClasses = "text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2 block";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border-border/60 space-y-8 rounded-none border p-8 md:p-12"
    >
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="bot_field_website">Website</label>
        <input
          type="text"
          id="bot_field_website"
          name="bot_field_website"
          tabIndex={-1}
          autoComplete="off"
          suppressHydrationWarning
        />
      </div>
      {status === "error" && (
        <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-3 rounded-none border p-5 text-sm font-medium">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            suppressHydrationWarning
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-destructive mt-2 text-xs font-bold">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            suppressHydrationWarning
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-destructive mt-2 text-xs font-bold">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          suppressHydrationWarning
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} min-h-[160px] resize-y`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="text-destructive mt-2 text-xs font-bold">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        suppressHydrationWarning
        className="bg-primary text-primary-foreground focus-visible:ring-primary/50 inline-flex w-full items-center justify-center rounded-none px-8 py-5 text-sm uppercase tracking-widest font-bold transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          "SEND MESSAGE"
        )}
      </button>
    </form>
  );
}

export function ProjectRequestForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    type: "",
    budget: "",
    timeline: "",
    message: "",
    nda: false,
    terms: false,
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [securityToken, setSecurityToken] = React.useState("");

  React.useEffect(() => {
    const timestamp = Date.now();
    const expectedHash = (timestamp * 7).toString(36);
    setSecurityToken(`${timestamp.toString(36)}_${expectedHash}`);
  }, []);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!formData.type) newErrors.type = "Please select a project type.";
    if (!formData.message.trim()) newErrors.message = "Project description is required.";
    else if (formData.message.trim().length < 20)
      newErrors.message = "Please provide at least 20 characters.";
    if (!formData.terms)
      newErrors.terms = "You must agree to the Terms of Service and Privacy Policy.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 700 * 1024) {
      setFileError(
        "File is too large. Maximum size is 700KB (to ensure database compatibility). Please upload a smaller file.",
      );
      setFile(null);
    } else {
      setFileError("");
      setFile(selected);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const fData = new FormData(e.currentTarget);
      fData.append("security_token", securityToken);
      fData.append("formType", "project");

      if (file) {
        const base64 = await convertFileToBase64(file);
        fData.append("attachmentBase64", base64);
        fData.append("attachmentName", file.name);
        fData.append("attachmentMimeType", file.type);
      }

      const result = await handleContactSubmission(fData);
      if (result.error) {
        setErrors((prev) => ({ ...prev, _form: result.error }) as any);
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        type: "",
        budget: "",
        timeline: "",
        message: "",
        nda: false,
        terms: false,
      });
      setFile(null);
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "bg-background border-border/60 hover:border-primary/50 focus-visible:border-primary flex w-full appearance-none rounded-none border px-5 py-4 text-sm transition-colors focus-visible:outline-none placeholder:text-muted-foreground/50";
  const labelClasses = "text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2 block";

  if (status === "success") {
    return (
      <div
        className="bg-card border-border/60 flex flex-col items-center justify-center rounded-none border p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center bg-green-500/10 text-green-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-foreground text-3xl font-bold tracking-tight">
          Partnership Request Submitted
        </h3>
        <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
          Our enterprise team will review your requirements and get back to you shortly to discuss
          next steps.
        </p>
        <button
          onClick={() => setStatus("idle")}
          suppressHydrationWarning
          className="text-primary mt-8 inline-flex items-center text-xs font-bold uppercase tracking-widest hover:text-primary/80 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border-border/60 space-y-10 rounded-none border p-8 md:p-12"
    >
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="bot_field_website_project">Website</label>
        <input
          type="text"
          id="bot_field_website_project"
          name="bot_field_website"
          tabIndex={-1}
          autoComplete="off"
          suppressHydrationWarning
        />
      </div>

      {status === "error" && (
        <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-3 rounded-none border p-5 text-sm font-medium">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}

      {/* Grid for basic details */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="req-name" className={labelClasses}>
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="req-name"
            name="name"
            type="text"
            required
            suppressHydrationWarning
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-destructive mt-2 text-xs font-bold">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="req-email" className={labelClasses}>
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="req-email"
            name="email"
            type="email"
            required
            suppressHydrationWarning
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-destructive mt-2 text-xs font-bold">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="req-company" className={labelClasses}>
            Company <span className="text-muted-foreground/60 font-medium normal-case tracking-normal text-[10px] ml-1">(Optional)</span>
          </label>
          <input
            id="req-company"
            name="company"
            type="text"
            suppressHydrationWarning
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Company Name"
          />
        </div>
        <div>
          <label htmlFor="req-phone" className={labelClasses}>
            Phone <span className="text-muted-foreground/60 font-medium normal-case tracking-normal text-[10px] ml-1">(Optional)</span>
          </label>
          <input
            id="req-phone"
            name="phone"
            type="tel"
            suppressHydrationWarning
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      <div className="border-border/40 border-t" />

      {/* Grid for project specifics */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="req-type" className={labelClasses}>
            Type <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <select
              id="req-type"
              name="type"
              required
              suppressHydrationWarning
              value={formData.type}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="" disabled>
                Select Type
              </option>
              {projectTypes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2" />
          </div>
          {errors.type && (
            <p className="text-destructive mt-2 text-xs font-bold">{errors.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="req-budget" className={labelClasses}>
            Budget Range
          </label>
          <div className="relative">
            <select
              id="req-budget"
              name="budget"
              suppressHydrationWarning
              value={formData.budget}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="" disabled>
                Select Budget Range
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="req-timeline" className={labelClasses}>
            Timeline
          </label>
          <div className="relative">
            <select
              id="req-timeline"
              name="timeline"
              suppressHydrationWarning
              value={formData.timeline}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="" disabled>
                Select Timeline
              </option>
              {timelineOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="req-message" className={labelClasses}>
          Description <span className="text-destructive">*</span>
        </label>
        <textarea
          id="req-message"
          name="message"
          required
          suppressHydrationWarning
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} min-h-[200px] resize-y`}
          placeholder="Describe your project, goals, and requirements..."
        />
        {errors.message && (
          <p className="text-destructive mt-2 text-xs font-bold">{errors.message}</p>
        )}
      </div>

      {/* Attachments */}
      <div>
        <label className={labelClasses}>
          Attachments <span className="text-muted-foreground/60 font-medium normal-case tracking-normal text-[10px] ml-1">(Optional)</span>
        </label>
        <div className="bg-background hover:border-primary/50 border-border/60 relative mt-2 flex justify-center rounded-none border border-dashed px-6 py-12 transition-colors">
          <div className="text-center">
            {file ? (
              <div className="flex flex-col items-center">
                <Paperclip className="text-primary mx-auto mb-4 h-8 w-8" />
                <p className="text-foreground text-sm font-bold">{file.name}</p>
                <p className="text-muted-foreground mt-1 text-xs font-medium">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-destructive mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-destructive/80 transition-colors"
                >
                  <X className="h-4 w-4" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <Paperclip className="text-muted-foreground/40 mx-auto mb-4 h-8 w-8" />
                <div className="text-muted-foreground flex justify-center text-sm">
                  <label
                    htmlFor="file-upload"
                    className="text-primary focus-within:border-primary hover:text-primary/80 relative cursor-pointer font-bold transition-colors"
                  >
                    <span>Click to browse</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                  </label>
                  <p className="pl-1">or drag & drop here</p>
                </div>
                <p className="text-muted-foreground/60 mt-2 text-xs font-medium">
                  Max 700KB per file • PDF, DOC, Images
                </p>
              </>
            )}
          </div>
        </div>
        {fileError && <p className="text-destructive mt-3 text-xs font-bold">{fileError}</p>}
      </div>

      <div className="border-border/40 border-t" />

      {/* Checkboxes */}
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="nda"
              name="nda"
              type="checkbox"
              checked={formData.nda}
              onChange={handleChange}
              className="border-border bg-background text-primary focus:ring-primary/50 h-5 w-5 rounded-none"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="nda" className="text-foreground cursor-pointer font-medium">
              I require a Non-Disclosure Agreement (NDA) before discussing project details
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="border-border bg-background text-primary focus:ring-primary/50 h-5 w-5 rounded-none"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-foreground cursor-pointer font-medium">
              I agree to the Terms of Service and Privacy Policy{" "}
              <span className="text-destructive">*</span>
            </label>
            {errors.terms && (
              <p className="text-destructive mt-2 text-xs font-bold">{errors.terms}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        suppressHydrationWarning
        className="bg-primary text-primary-foreground focus-visible:ring-primary/50 inline-flex w-full items-center justify-center rounded-none px-8 py-5 text-sm uppercase tracking-widest font-bold transition-colors hover:bg-primary/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> SUBMITTING...
          </>
        ) : (
          "SUBMIT PARTNERSHIP REQUEST"
        )}
      </button>
    </form>
  );
}

export function ContactTabs() {
  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="bg-transparent border-b border-border/60 mb-12 grid h-14 w-full grid-cols-2 rounded-none p-0">
        <TabsTrigger
          value="project"
          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none text-sm font-bold uppercase tracking-widest transition-colors h-full"
        >
          Discuss Project
        </TabsTrigger>
        <TabsTrigger
          value="message"
          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none text-sm font-bold uppercase tracking-widest transition-colors h-full"
        >
          Quick Message
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="project"
        className="animate-in fade-in-50 duration-500 mt-0"
      >
        <ProjectRequestForm />
      </TabsContent>
      <TabsContent
        value="message"
        className="animate-in fade-in-50 duration-500 mt-0"
      >
        <QuickMessageForm />
      </TabsContent>
    </Tabs>
  );
}

/* ──────────────────────────── PAGE COMPONENT ──────────────────────────── */

interface ContactClientProps {
  socialSettings: any;
  contactSettings: any;
}

export default function ContactClient({ socialSettings, contactSettings }: ContactClientProps) {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            alt="Customer Support / Contact"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl text-white">
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block text-white/80">Contact Us</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              Ready to transform your business with intelligent software? Tell us about your goals,
              and we&apos;ll respond within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="bg-background relative z-10 py-24 md:py-32 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
            {/* Contact form — 7 columns */}
            <div className="lg:col-span-7">
              <ContactTabs />
            </div>

            {/* Sidebar info — 5 columns */}
            <aside className="space-y-8 lg:sticky lg:top-32 lg:col-span-5">
              {/* Contact Information */}
              <div className="border-border/60 bg-card rounded-none border p-8 md:p-10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">Reach Out</span>
                <h2 className="text-foreground mb-8 text-3xl font-bold tracking-tight">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-primary/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="pt-1">
                      <p className="text-foreground mb-1 text-sm font-bold uppercase tracking-widest">Email Us</p>
                      <a
                        href={`mailto:${contactSettings?.email || "contact@voryentsolutions.com"}`}
                        className="text-muted-foreground hover:text-primary block text-base font-medium transition-colors"
                      >
                        {contactSettings?.email || "contact@voryentsolutions.com"}
                      </a>
                    </div>
                  </div>

                  {contactSettings?.phone && (
                    <div className="flex items-start gap-5">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-primary/20">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="pt-1">
                        <p className="text-foreground mb-1 text-sm font-bold uppercase tracking-widest">Call Us</p>
                        <a
                          href={`tel:${contactSettings?.phone}`}
                          className="text-muted-foreground hover:text-primary block text-base font-medium transition-colors"
                        >
                          {contactSettings?.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactSettings?.address && (
                    <div className="flex items-start gap-5">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-primary/20">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="pt-1">
                        <p className="text-foreground mb-1 text-sm font-bold uppercase tracking-widest">Headquarters</p>
                        <p className="text-muted-foreground whitespace-pre-wrap text-base font-medium leading-relaxed">
                          {contactSettings.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {socialSettings && (
                <div className="border-border/60 bg-card rounded-none border p-8 md:p-10">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">Social</span>
                  <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight">Connect With Us</h2>
                  <div className="pt-2">
                    <SocialIcons social={socialSettings} />
                  </div>
                </div>
              )}

              {/* Office Status */}
              <div className="border-border/60 bg-muted/20 rounded-none border p-8 md:p-10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">Operations</span>
                <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight">Global Support</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-5">
                    <div className="bg-background text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-border/60">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div className="pt-1">
                      <p className="text-foreground mb-1 text-sm font-bold uppercase tracking-widest">
                        Remote-First
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        Our distributed team works across time zones to provide responsive, seamless
                        collaboration wherever you are.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
              Ready to accelerate your digital growth?
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed mb-10">
              Sometimes it&apos;s easier to talk it through. Send us an email and let&apos;s
              schedule a discovery call.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:contact@voryentsolutions.com"
                className="bg-foreground text-background inline-flex items-center justify-center rounded-none px-10 h-14 text-sm tracking-widest uppercase font-bold transition-colors hover:bg-foreground/90"
              >
                Email Us Directly
                <ArrowRight className="ml-3 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
