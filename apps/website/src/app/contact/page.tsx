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
} from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

const serviceOptions = [
  "Software Engineering",
  "Cloud Architecture",
  "Data & AI",
  "UI/UX Design",
  "DevOps & SRE",
  "Other",
]

const budgetOptions = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
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

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  service?: string
  message?: string
}

type FormStatus = "idle" | "submitting" | "success" | "error"

/* ──────────────────────────── CONTACT FORM ──────────────────────────── */

function ContactForm() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  })

  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<FormStatus>("idle")

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required."
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!formData.service) {
      newErrors.service = "Please select a service."
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required."
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please provide at least 20 characters."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear the error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    setStatus("submitting")

    // Simulate API call — replace with Resend integration later
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus("success")
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      })
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          Thank you for reaching out!
        </h3>
        <p className="mt-3 text-muted-foreground max-w-md leading-relaxed">
          We&apos;ve received your message and will get back to you within 1–2
          business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-xl border bg-card p-6 md:p-8 shadow-sm"
    >
      {status === "error" && (
        <div
          className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>
            Something went wrong. Please try again or email us directly at{" "}
            <a
              href="mailto:hello@voryentsolutions.com"
              className="font-medium underline"
            >
              hello@voryentsolutions.com
            </a>
          </p>
        </div>
      )}

      {/* Row: Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Your full name"
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 text-xs text-destructive"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Company{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Your company name"
          />
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="you@company.com"
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-xs text-destructive"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Phone{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Row: Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-service"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Service <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
              className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {errors.service && (
            <p
              id="service-error"
              className="mt-1.5 text-xs text-destructive"
              role="alert"
            >
              {errors.service}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-budget"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Budget{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          placeholder="Tell us about your project, goals, and timeline..."
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1.5 text-xs text-destructive"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}

/* ──────────────────────────── FAQ ACCORDION ITEM ──────────────────────────── */

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
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        {question}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={answerId}
        role="region"
        hidden={!open}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

/* ──────────────────────────── PAGE COMPONENT ──────────────────────────── */

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-16 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Have a project in mind? Tell us about it. We&apos;ll respond
              within 1–2 business days with an initial assessment and next
              steps.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact form — 3 columns */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar info — 2 columns */}
            <aside className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="rounded-xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Email
                      </p>
                      <a
                        href="mailto:hello@voryentsolutions.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        hello@voryentsolutions.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Phone
                      </p>
                      <a
                        href="tel:+15550000000"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +1 (555) 000-0000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Response Time
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1–2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Status */}
              <div className="rounded-xl border bg-card p-6 md:p-8 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Office Status
                </h2>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Remote-First, Global Team
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We work across time zones to provide responsive,
                      round-the-clock collaboration with your team.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Headquarters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pakistan &amp; worldwide
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── FAQ PREVIEW ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Quick answers to the questions we hear most often.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 md:p-8 shadow-sm">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Have a different question?{" "}
              <Link
                href="/faq"
                className="font-medium text-primary hover:underline"
              >
                View all FAQs
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-primary px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
                Prefer a Conversation?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Sometimes it&apos;s easier to talk it through. Schedule a
                no-obligation discovery call and let&apos;s explore how we can
                help.
              </p>
              <a
                href="mailto:hello@voryentsolutions.com"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Email Us Directly
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
