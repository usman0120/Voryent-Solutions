"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
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

const faqs = [
  {
    question: "How quickly can you start a new project?",
    answer:
      "Typically within 1–2 weeks after our initial discovery call. We prioritize understanding your requirements thoroughly before writing the first line of code.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "Both. We work with ambitious teams of all sizes — from seed-stage startups building their first MVP to Fortune 500 companies modernizing legacy systems.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack includes React, Next.js, Node.js, Python, Go, AWS, Azure, GCP, Kubernetes, and Terraform — but we choose the right tool for each project's unique needs.",
  },
  {
    question: "Can I see examples of your past work?",
    answer:
      "We're currently documenting our case studies. In the meantime, we'd be happy to walk you through relevant examples during a call.",
  },
];

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

function QuickMessageForm() {
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
        className="border-border/40 bg-card/40 flex flex-col items-center justify-center rounded-2xl border p-12 text-center backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 shadow-sm ring-1 ring-green-500/20">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-foreground text-2xl font-bold">Message Sent!</h3>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
          Thank you for contacting us. We have received your message and will respond as soon as
          possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          suppressHydrationWarning
          className="text-primary mt-8 inline-flex items-center text-sm font-medium transition-opacity hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border/40 bg-card space-y-6 rounded-2xl border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all md:p-8 dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
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
        <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-3 rounded-xl border p-4 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-foreground text-sm font-medium">
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
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-xs">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-foreground text-sm font-medium">
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
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-xs">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-foreground text-sm font-medium">
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
          className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex min-h-[140px] w-full resize-y rounded-xl border px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="text-destructive animate-in fade-in slide-in-from-top-1 text-xs">
            {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        suppressHydrationWarning
        className="bg-primary text-primary-foreground focus-visible:ring-primary/50 inline-flex w-full items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold shadow-md transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

function ProjectRequestForm() {
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

    // Strict 700KB limit for base64 safety in Firestore (which has a 1MB doc limit)
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

  if (status === "success") {
    return (
      <div
        className="border-border/40 bg-card/40 flex flex-col items-center justify-center rounded-2xl border p-12 text-center backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 shadow-sm ring-1 ring-green-500/20">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-foreground text-2xl font-bold">Partnership Request Submitted!</h3>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
          Our enterprise team will review your requirements and get back to you shortly to discuss
          next steps.
        </p>
        <button
          onClick={() => setStatus("idle")}
          suppressHydrationWarning
          className="text-primary mt-8 inline-flex items-center text-sm font-medium transition-opacity hover:opacity-80"
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
      className="border-border/40 bg-card space-y-8 rounded-2xl border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all md:p-10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
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
        <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-3 rounded-xl border p-4 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}

      {/* Grid for basic details */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="req-name" className="text-foreground text-sm font-medium">
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
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-email" className="text-foreground text-sm font-medium">
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
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-company" className="text-foreground text-sm font-medium">
            Company <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <input
            id="req-company"
            name="company"
            type="text"
            suppressHydrationWarning
            value={formData.company}
            onChange={handleChange}
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Company Name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="req-phone" className="text-foreground text-sm font-medium">
            Phone <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <input
            id="req-phone"
            name="phone"
            type="tel"
            suppressHydrationWarning
            value={formData.phone}
            onChange={handleChange}
            className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      <div className="border-border/40 my-8 border-t"></div>

      {/* Grid for project specifics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="req-type" className="text-foreground text-sm font-medium">
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
              className="border-input/60 bg-background/50 ring-offset-background focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full cursor-pointer appearance-none rounded-xl border px-4 py-2 pr-10 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>
          {errors.type && <p className="text-destructive text-xs">{errors.type}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-budget" className="text-foreground text-sm font-medium">
            Budget Range
          </label>
          <div className="relative">
            <select
              id="req-budget"
              name="budget"
              suppressHydrationWarning
              value={formData.budget}
              onChange={handleChange}
              className="border-input/60 bg-background/50 ring-offset-background focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full cursor-pointer appearance-none rounded-xl border px-4 py-2 pr-10 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="req-timeline" className="text-foreground text-sm font-medium">
            Timeline
          </label>
          <div className="relative">
            <select
              id="req-timeline"
              name="timeline"
              suppressHydrationWarning
              value={formData.timeline}
              onChange={handleChange}
              className="border-input/60 bg-background/50 ring-offset-background focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex h-11 w-full cursor-pointer appearance-none rounded-xl border px-4 py-2 pr-10 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <ChevronDown className="text-muted-foreground/70 pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="req-message" className="text-foreground text-sm font-medium">
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
          className="border-input/60 bg-background/50 ring-offset-background placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-input flex min-h-[160px] w-full resize-y rounded-xl border px-4 py-3 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe your project, goals, and requirements..."
        />
        {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label className="text-foreground text-sm font-medium">
          Attachments <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <div className="border-input/60 bg-background/50 hover:border-primary/50 hover:bg-primary/5 relative mt-2 flex justify-center rounded-xl border border-dashed px-6 py-10 transition-all">
          <div className="text-center">
            {file ? (
              <div className="flex flex-col items-center">
                <Paperclip className="text-primary mx-auto mb-3 h-10 w-10" />
                <p className="text-foreground text-sm font-medium">{file.name}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-destructive mt-4 flex items-center justify-center gap-1 text-xs font-medium hover:underline"
                >
                  <X className="h-3 w-3" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <Paperclip className="text-muted-foreground/50 mx-auto mb-3 h-10 w-10" />
                <div className="text-muted-foreground mt-2 flex justify-center text-sm leading-6">
                  <label
                    htmlFor="file-upload"
                    className="text-primary focus-within:ring-primary/50 hover:text-primary/80 relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2"
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
                  <p className="pl-1">or drag & drop files here</p>
                </div>
                <p className="text-muted-foreground/70 mt-2 text-xs leading-5">
                  Max 700KB per file • PDF, DOC, Images
                </p>
              </>
            )}
          </div>
        </div>
        {fileError && <p className="text-destructive mt-2 text-xs">{fileError}</p>}
      </div>

      <div className="border-border/40 my-8 border-t"></div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="nda"
              name="nda"
              type="checkbox"
              checked={formData.nda}
              onChange={handleChange}
              className="border-input text-primary focus:ring-primary/50 bg-background h-4 w-4 rounded"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="nda" className="text-foreground cursor-pointer font-medium">
              I require a Non-Disclosure Agreement (NDA) before discussing project details
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="border-input text-primary focus:ring-primary/50 bg-background h-4 w-4 rounded"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="terms" className="text-foreground cursor-pointer font-medium">
              I agree to the Terms of Service and Privacy Policy{" "}
              <span className="text-destructive">*</span>
            </label>
            {errors.terms && <p className="text-destructive mt-1 text-xs">{errors.terms}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        suppressHydrationWarning
        className="bg-primary text-primary-foreground focus-visible:ring-primary/50 inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold shadow-md transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Request...
          </>
        ) : (
          <>
            <ArrowRight className="mr-2 h-5 w-5" /> Submit Partnership Request
          </>
        )}
      </button>
    </form>
  );
}

export function ContactTabs() {
  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="bg-muted/50 mb-10 grid h-14 w-full grid-cols-2 rounded-2xl p-1.5">
        <TabsTrigger
          value="project"
          className="data-[state=active]:bg-background rounded-xl text-sm font-medium transition-all data-[state=active]:shadow-sm"
        >
          Project Partnership
        </TabsTrigger>
        <TabsTrigger
          value="message"
          className="data-[state=active]:bg-background rounded-xl text-sm font-medium transition-all data-[state=active]:shadow-sm"
        >
          Quick Message
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="project"
        className="animate-in fade-in-50 zoom-in-[0.98] mt-2 duration-500"
      >
        <ProjectRequestForm />
      </TabsContent>
      <TabsContent
        value="message"
        className="animate-in fade-in-50 zoom-in-[0.98] mt-2 duration-500"
      >
        <QuickMessageForm />
      </TabsContent>
    </Tabs>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  const answerId = React.useId();

  return (
    <div className="border-border/40 group border-b last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        suppressHydrationWarning
        className="text-foreground hover:text-primary focus-visible:ring-primary/50 -mx-2 flex w-full items-center justify-between rounded-lg px-2 py-5 text-left text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2"
      >
        {question}
        <ChevronDown
          className={`text-muted-foreground/70 group-hover:text-primary ml-4 h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={answerId}
        role="region"
        hidden={!open}
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-muted-foreground -mx-2 px-2 pb-5 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
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
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="from-primary/5 via-background to-background pointer-events-none absolute inset-0 bg-gradient-to-b"
          aria-hidden="true"
        />
        <div className="bg-primary/5 pointer-events-none absolute left-1/2 top-0 h-[500px] w-full max-w-screen-xl -translate-x-1/2 rounded-full opacity-50 blur-3xl" />

        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-foreground text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s Build Something{" "}
              <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                Great
              </span>{" "}
              Together
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              Ready to transform your business with intelligent software? Tell us about your goals,
              and we&apos;ll respond within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="relative z-10 pb-24 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact form — 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-primary/5 border-primary/20 mb-8 flex items-start gap-4 rounded-2xl border p-5 shadow-sm">
                <AlertCircle className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <h3 className="text-foreground mb-1 font-semibold">Have a quick question?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    You might find an instant answer in our{" "}
                    <Link
                      href="/faq"
                      className="text-primary font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
                    >
                      FAQ section
                    </Link>
                    . If you don't find what you're looking for, please feel free to fill out the
                    form below!
                  </p>
                </div>
              </div>
              <ContactTabs />
            </div>

            {/* Sidebar info — 2 columns */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:col-span-2">
              {/* Contact Information */}
              <div className="border-border/40 bg-card rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                <h2 className="text-foreground mb-6 text-xl font-bold">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-foreground mb-1 text-sm font-semibold">Email Us</p>
                      <a
                        href={`mailto:${contactSettings?.email || "contact@voryentsolutions.com"}`}
                        className="text-muted-foreground hover:text-primary block text-sm transition-colors"
                      >
                        {contactSettings?.email || "contact@voryentsolutions.com"}
                      </a>
                    </div>
                  </div>

                  {contactSettings?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground mb-1 text-sm font-semibold">Call Us</p>
                        <a
                          href={`tel:${contactSettings?.phone}`}
                          className="text-muted-foreground hover:text-primary block text-sm transition-colors"
                        >
                          {contactSettings?.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactSettings?.address && (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-foreground mb-1 text-sm font-semibold">Headquarters</p>
                        <p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
                          {contactSettings.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {socialSettings && (
                <div className="border-border/40 bg-card rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                  <h2 className="text-foreground mb-6 text-xl font-bold">Connect With Us</h2>
                  <div className="pt-2">
                    <SocialIcons social={socialSettings} />
                  </div>
                </div>
              )}

              {/* Office Status */}
              <div className="border-border/40 bg-card from-card to-primary/5 rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                <h2 className="text-foreground mb-6 text-xl font-bold">Global Operations</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Globe className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground mb-1 text-sm font-semibold">
                        Remote-First & Worldwide
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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

      {/* ─── FAQ PREVIEW ─── */}
      <section className="bg-muted/30 border-border/40 border-y py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-16 text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                Quick answers to the questions we hear most often from new partners.
              </p>
            </div>
            <div className="border-border/40 bg-card rounded-2xl border p-6 shadow-sm md:p-10">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                className="text-primary hover:text-primary/80 inline-flex items-center justify-center font-medium transition-colors"
              >
                View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-primary relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-2xl md:px-16 md:py-24">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-primary-foreground text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ready to accelerate your digital growth?
              </h2>
              <p className="text-primary-foreground/90 mt-6 text-lg leading-relaxed">
                Sometimes it&apos;s easier to talk it through. Send us an email and let's schedule a
                discovery call.
              </p>
              <a
                href="mailto:contact@voryentsolutions.com"
                className="bg-background text-foreground hover:bg-background/90 focus-visible:ring-ring mt-10 inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2"
              >
                Email Us Directly
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
