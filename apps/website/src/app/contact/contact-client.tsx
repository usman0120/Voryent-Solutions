"use client"

import * as React from "react"
import Link from "next/link"
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
  X
} from "lucide-react"
import { toast } from "sonner"
import { SocialIcons } from "@/components/layout/site-footer"
import { handleContactSubmission } from "@/app/actions/form-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui"

/* ──────────────────────────── DATA ──────────────────────────── */

const serviceOptions = [
  "Software Engineering",
  "Cloud Architecture",
  "Data & AI",
  "UI/UX Design",
  "DevOps & SRE",
  "Other",
]

const projectTypes = [
  "AI Engineering & Automation (Primary Focus)",
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud & DevOps",
  "Data & Analytics",
  "Maintenance & Support"
]

const budgetOptions = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
]

const timelineOptions = [
  "Immediately",
  "Within 1 Month",
  "1-3 Months",
  "3-6 Months",
  "Flexible"
]

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
]

/* ──────────────────────────── FORM TYPES ──────────────────────────── */

interface FormErrors {
  name?: string
  email?: string
  type?: string
  message?: string
  terms?: string
}

type FormStatus = "idle" | "submitting" | "success" | "error"

/* ──────────────────────────── CONTACT FORM ──────────────────────────── */

function QuickMessageForm() {
  const [formData, setFormData] = React.useState({
    name: "", company: "", email: "", service: "", budget: "", message: ""
  })
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [securityToken, setSecurityToken] = React.useState("")

  React.useEffect(() => {
    const timestamp = Date.now()
    const expectedHash = (timestamp * 7).toString(36)
    setSecurityToken(`${timestamp.toString(36)}_${expectedHash}`)
  }, [])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.email.trim()) newErrors.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email."
    if (!formData.message.trim()) newErrors.message = "Message is required."
    else if (formData.message.trim().length < 20) newErrors.message = "Please provide at least 20 characters."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    try {
      const fData = new FormData(e.currentTarget)
      fData.append("security_token", securityToken)
      fData.append("formType", "contact")
      const result = await handleContactSubmission(fData)
      if (result.error) {
        setErrors((prev) => ({ ...prev, _form: result.error } as any))
        setStatus("error")
        toast.error("Submission failed", { description: result.error })
        return
      }
      setStatus("success")
      setFormData({ name: "", company: "", email: "", service: "", budget: "", message: "" })
      toast.success("Thank you for reaching out!", { description: "We've received your message and will get back to you soon." })
    } catch {
      setStatus("error")
      toast.error("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/40 p-12 text-center backdrop-blur-sm" role="status" aria-live="polite">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-6 shadow-sm ring-1 ring-green-500/20">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
        <p className="mt-3 text-muted-foreground max-w-md leading-relaxed text-sm">Thank you for contacting us. We have received your message and will respond as soon as possible.</p>
        <button onClick={() => setStatus("idle")} suppressHydrationWarning className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:opacity-80 transition-opacity">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-2xl border border-border/40 bg-card p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all">
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="bot_field_website">Website</label>
        <input type="text" id="bot_field_website" name="bot_field_website" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </div>
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
          <input id="contact-name" name="name" type="text" required suppressHydrationWarning value={formData.name} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="John Doe" />
          {errors.name && <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
          <input id="contact-email" name="email" type="email" required suppressHydrationWarning value={formData.email} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="john@example.com" />
          {errors.email && <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message <span className="text-destructive">*</span></label>
        <textarea id="contact-message" name="message" required suppressHydrationWarning rows={5} value={formData.message} onChange={handleChange} className="flex w-full rounded-xl border border-input/60 bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[140px] transition-all hover:border-input" placeholder="How can we help you?" />
        {errors.message && <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{errors.message}</p>}
      </div>
      <button type="submit" disabled={status === "submitting"} suppressHydrationWarning className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]">
        {status === "submitting" ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <><Mail className="mr-2 h-4 w-4" /> Send Message</>}
      </button>
    </form>
  )
}

function ProjectRequestForm() {
  const [formData, setFormData] = React.useState({
    name: "", email: "", company: "", phone: "", type: "", budget: "", timeline: "", message: "", nda: false, terms: false
  })
  const [file, setFile] = React.useState<File | null>(null)
  const [fileError, setFileError] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [securityToken, setSecurityToken] = React.useState("")

  React.useEffect(() => {
    const timestamp = Date.now()
    const expectedHash = (timestamp * 7).toString(36)
    setSecurityToken(`${timestamp.toString(36)}_${expectedHash}`)
  }, [])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Full Name is required."
    if (!formData.email.trim()) newErrors.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email."
    if (!formData.type) newErrors.type = "Please select a project type."
    if (!formData.message.trim()) newErrors.message = "Project description is required."
    else if (formData.message.trim().length < 20) newErrors.message = "Please provide at least 20 characters."
    if (!formData.terms) newErrors.terms = "You must agree to the Terms of Service and Privacy Policy."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    // Strict 700KB limit for base64 safety in Firestore (which has a 1MB doc limit)
    if (selected.size > 700 * 1024) {
      setFileError("File is too large. Maximum size is 700KB (to ensure database compatibility). Please upload a smaller file.");
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
      reader.onerror = error => reject(error);
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    try {
      const fData = new FormData(e.currentTarget)
      fData.append("security_token", securityToken)
      fData.append("formType", "project")
      
      if (file) {
        const base64 = await convertFileToBase64(file);
        fData.append("attachmentBase64", base64);
        fData.append("attachmentName", file.name);
        fData.append("attachmentMimeType", file.type);
      }

      const result = await handleContactSubmission(fData)
      if (result.error) {
        setErrors((prev) => ({ ...prev, _form: result.error } as any))
        setStatus("error")
        return
      }
      setStatus("success")
      setFormData({ name: "", email: "", company: "", phone: "", type: "", budget: "", timeline: "", message: "", nda: false, terms: false })
      setFile(null)
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/40 p-12 text-center backdrop-blur-sm" role="status" aria-live="polite">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-6 shadow-sm ring-1 ring-green-500/20">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Partnership Request Submitted!</h3>
        <p className="mt-3 text-muted-foreground max-w-md leading-relaxed text-sm">Our enterprise team will review your requirements and get back to you shortly to discuss next steps.</p>
        <button onClick={() => setStatus("idle")} suppressHydrationWarning className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:opacity-80 transition-opacity">
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 rounded-2xl border border-border/40 bg-card p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all">
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="bot_field_website_project">Website</label>
        <input type="text" id="bot_field_website_project" name="bot_field_website" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </div>
      
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{(errors as any)._form || "Something went wrong. Please try again."}</p>
        </div>
      )}

      {/* Grid for basic details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="req-name" className="text-sm font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
          <input id="req-name" name="name" type="text" required suppressHydrationWarning value={formData.name} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="John Doe" />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-email" className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
          <input id="req-email" name="email" type="email" required suppressHydrationWarning value={formData.email} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="john@example.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-company" className="text-sm font-medium text-foreground">Company <span className="text-muted-foreground font-normal">(Optional)</span></label>
          <input id="req-company" name="company" type="text" suppressHydrationWarning value={formData.company} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="Company Name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="req-phone" className="text-sm font-medium text-foreground">Phone <span className="text-muted-foreground font-normal">(Optional)</span></label>
          <input id="req-phone" name="phone" type="tel" suppressHydrationWarning value={formData.phone} onChange={handleChange} className="flex h-11 w-full rounded-xl border border-input/60 bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input" placeholder="+1 234 567 890" />
        </div>
      </div>

      <div className="border-t border-border/40 my-8"></div>

      {/* Grid for project specifics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="req-type" className="text-sm font-medium text-foreground">Type <span className="text-destructive">*</span></label>
          <div className="relative">
            <select id="req-type" name="type" required suppressHydrationWarning value={formData.type} onChange={handleChange} className="flex h-11 w-full appearance-none rounded-xl border border-input/60 bg-background/50 px-4 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input cursor-pointer">
              <option value="" disabled>Select Type</option>
              {projectTypes.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          </div>
          {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="req-budget" className="text-sm font-medium text-foreground">Budget Range</label>
          <div className="relative">
            <select id="req-budget" name="budget" suppressHydrationWarning value={formData.budget} onChange={handleChange} className="flex h-11 w-full appearance-none rounded-xl border border-input/60 bg-background/50 px-4 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input cursor-pointer">
              <option value="" disabled>Select Budget Range</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="req-timeline" className="text-sm font-medium text-foreground">Timeline</label>
          <div className="relative">
            <select id="req-timeline" name="timeline" suppressHydrationWarning value={formData.timeline} onChange={handleChange} className="flex h-11 w-full appearance-none rounded-xl border border-input/60 bg-background/50 px-4 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-input cursor-pointer">
              <option value="" disabled>Select Timeline</option>
              {timelineOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="req-message" className="text-sm font-medium text-foreground">Description <span className="text-destructive">*</span></label>
        <textarea id="req-message" name="message" required suppressHydrationWarning rows={5} value={formData.message} onChange={handleChange} className="flex w-full rounded-xl border border-input/60 bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[160px] transition-all hover:border-input" placeholder="Describe your project, goals, and requirements..." />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Attachments <span className="text-muted-foreground font-normal">(Optional)</span></label>
        <div className="relative mt-2 flex justify-center rounded-xl border border-dashed border-input/60 bg-background/50 px-6 py-10 transition-all hover:border-primary/50 hover:bg-primary/5">
          <div className="text-center">
            {file ? (
              <div className="flex flex-col items-center">
                <Paperclip className="mx-auto h-10 w-10 text-primary mb-3" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="mt-4 text-xs font-medium text-destructive hover:underline flex items-center justify-center gap-1"
                >
                  <X className="h-3 w-3" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <Paperclip className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
                <div className="mt-2 flex text-sm leading-6 text-muted-foreground justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 hover:text-primary/80"
                  >
                    <span>Click to browse</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                  </label>
                  <p className="pl-1">or drag & drop files here</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground/70 mt-2">Max 700KB per file • PDF, DOC, Images</p>
              </>
            )}
          </div>
        </div>
        {fileError && <p className="text-xs text-destructive mt-2">{fileError}</p>}
      </div>

      <div className="border-t border-border/40 my-8"></div>

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
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary/50 bg-background"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="nda" className="font-medium text-foreground cursor-pointer">
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
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary/50 bg-background"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="terms" className="font-medium text-foreground cursor-pointer">
              I agree to the Terms of Service and Privacy Policy <span className="text-destructive">*</span>
            </label>
            {errors.terms && <p className="text-xs text-destructive mt-1">{errors.terms}</p>}
          </div>
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} suppressHydrationWarning className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]">
        {status === "submitting" ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Request...</> : <><ArrowRight className="mr-2 h-5 w-5" /> Submit Partnership Request</>}
      </button>
    </form>
  )
}

export function ContactTabs() {
  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-10 h-14 p-1.5 rounded-2xl bg-muted/50">
        <TabsTrigger value="project" className="rounded-xl font-medium text-sm data-[state=active]:shadow-sm data-[state=active]:bg-background transition-all">Project Partnership</TabsTrigger>
        <TabsTrigger value="message" className="rounded-xl font-medium text-sm data-[state=active]:shadow-sm data-[state=active]:bg-background transition-all">Quick Message</TabsTrigger>
      </TabsList>
      <TabsContent value="project" className="animate-in fade-in-50 zoom-in-[0.98] duration-500 mt-2">
        <ProjectRequestForm />
      </TabsContent>
      <TabsContent value="message" className="animate-in fade-in-50 zoom-in-[0.98] duration-500 mt-2">
        <QuickMessageForm />
      </TabsContent>
    </Tabs>
  )
}

function FaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = React.useState(false)
  const answerId = React.useId()

  return (
    <div className="border-b border-border/40 last:border-0 group">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        suppressHydrationWarning
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 -mx-2"
      >
        {question}
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground/70 transition-transform duration-300 flex-shrink-0 ml-4 group-hover:text-primary ${
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
        <p className="pb-5 px-2 -mx-2 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Great</span> Together
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Ready to transform your business with intelligent software? Tell us about your goals, and we&apos;ll respond within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="pb-24 md:pb-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            
            {/* Contact form — 3 columns */}
            <div className="lg:col-span-3">
              <div className="mb-8 rounded-2xl bg-primary/5 border border-primary/20 p-5 flex items-start gap-4 shadow-sm">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Have a quick question?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You might find an instant answer in our <Link href="/faq" className="font-medium text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">FAQ section</Link>. 
                    If you don't find what you're looking for, please feel free to fill out the form below!
                  </p>
                </div>
              </div>
              <ContactTabs />
            </div>

            {/* Sidebar info — 2 columns */}
            <aside className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
              
              {/* Contact Information */}
              <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${contactSettings?.email || "hello@voryentsolutions.com"}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {contactSettings?.email || "hello@voryentsolutions.com"}
                      </a>
                    </div>
                  </div>
                  
                  {contactSettings?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Call Us
                        </p>
                        <a
                          href={`tel:${contactSettings?.phone}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                        >
                          {contactSettings?.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactSettings?.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Headquarters
                        </p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {contactSettings.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {socialSettings && (
                <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Connect With Us
                  </h2>
                  <div className="pt-2">
                    <SocialIcons social={socialSettings} />
                  </div>
                </div>
              )}

              {/* Office Status */}
              <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md bg-gradient-to-br from-card to-primary/5">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Global Operations
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Remote-First & Worldwide
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Our distributed team works across time zones to provide responsive, seamless collaboration wherever you are.
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
      <section className="py-20 md:py-32 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Quick answers to the questions we hear most often from new partners.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-10 shadow-sm">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center justify-center font-medium text-primary hover:text-primary/80 transition-colors"
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
          <div className="relative rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-24 text-center overflow-hidden shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground leading-tight">
                Ready to accelerate your digital growth?
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/90 leading-relaxed">
                Sometimes it&apos;s easier to talk it through. Send us an email and let's schedule a discovery call.
              </p>
              <a
                href="mailto:hello@voryentsolutions.com"
                className="mt-10 inline-flex items-center justify-center rounded-xl bg-background px-8 py-4 text-sm font-bold text-foreground shadow-lg transition-all hover:bg-background/90 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Email Us Directly
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
