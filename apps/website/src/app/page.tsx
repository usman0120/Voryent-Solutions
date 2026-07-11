import Image from "next/image"
import Link from "next/link"
import { getHomepageData, getServices, getIndustries } from "@/lib/firebase/services"
import {
  Code2,
  Cloud,
  Brain,
  Palette,
  Server,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Search,
  Rocket,
  Headphones,
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Landmark,
  Factory,
  Briefcase,
  FolderOpen,
  Quote,
  Star
} from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

const services = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Scalable, maintainable applications built with modern frameworks, clean architecture, and rigorous testing.",
    href: "/services/custom-software",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Cloud-native infrastructure on AWS, Azure, and GCP — designed for resilience, security, and cost efficiency.",
    href: "/services/cloud-engineering",
  },
  {
    icon: Brain,
    title: "Data & AI",
    description:
      "Machine learning pipelines, data engineering, and intelligent automation that turn raw data into business value.",
    href: "/services/ai-solutions",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Research-driven interfaces that delight users and drive measurable conversion through pixel-perfect execution.",
    href: "/services/ui-ux",
  },
  {
    icon: Server,
    title: "DevOps & SRE",
    description:
      "CI/CD pipelines, infrastructure as code, and site reliability engineering for zero-downtime deployments.",
    href: "/services/cloud-engineering",
  },
]

const whyVoryent = [
  {
    title: "Engineering Excellence",
    description:
      "Every line of code is reviewed, tested, and optimized. We don't ship until it's production-ready.",
  },
  {
    title: "Transparent Partnership",
    description:
      "No black boxes. You own your code, your data, and your roadmap. We work alongside your team, not around them.",
  },
  {
    title: "Scalable From Day One",
    description:
      "Our architectures are designed to grow with you — from MVP to millions of users without re-platforming.",
  },
  {
    title: "Security First",
    description:
      "OWASP best practices, encrypted at rest and in transit, with continuous vulnerability scanning baked into every pipeline.",
  },
]

const process = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Discover",
    description:
      "We listen deeply, audit your existing systems, and map business objectives to technical requirements.",
  },
  {
    step: "02",
    icon: Search,
    title: "Design",
    description:
      "Architecture blueprints, wireframes, and prototypes — validated with your stakeholders before a single line of code is written.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Deliver",
    description:
      "Agile sprints with weekly demos, automated testing, and production-grade deployments at every milestone.",
  },
  {
    step: "04",
    icon: Headphones,
    title: "Support",
    description:
      "Post-launch monitoring, performance tuning, and 24/7 incident response to keep your systems running flawlessly.",
  },
]

const industries = [
  { icon: Building2, name: "Enterprise", href: "/industries" },
  { icon: HeartPulse, name: "Healthcare", href: "/industries" },
  { icon: GraduationCap, name: "Education", href: "/industries" },
  { icon: ShoppingCart, name: "E-Commerce", href: "/industries" },
  { icon: Landmark, name: "Finance", href: "/industries" },
  { icon: Factory, name: "Manufacturing", href: "/industries" },
]

const featuredProjects = [
  {
    title: "Medicare Plus Management System",
    category: "Custom Software & AI Solutions",
    summary: "A comprehensive hospital management system integrating AI-powered intelligent medicine auto-suggestions and operational workflow optimizations.",
    technologies: ["React", "PostgreSQL", "Python (AI)", "Docker"],
    imageSrc: "/Assets/Illustrations/Medicare Plus Illustration.png",
    link: "/work",
  },
  {
    title: "Boss Restaurant POS",
    category: "Custom Software & POS",
    summary: "A robust Point of Sale and internal management system developed specifically for fast-paced hospitality workflows.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    imageSrc: "/Assets/Illustrations/Boss Restaurant Illustration.png",
    link: "/work",
  }
]

const testimonials = [
  {
    quote: "The hospital management system built by Voryent completely transformed our daily operations. The AI medicine suggestions and seamless integrations across the pharmacy, labs, and administration have drastically reduced wait times. They are true engineering partners.",
    name: "Dr. Sarah Jenkins",
    role: "Head of Operations",
    company: "Medicare Plus",
  },
  {
    quote: "Voryent Solutions understands real-world problems. The POS system they built for us handles our fast-paced restaurant environment perfectly. Our staff loves it, and our kitchen synchronization has never been better. We are incredibly happy with their work.",
    name: "Michael Boss",
    role: "Owner & Founder",
    company: "Boss Restaurant",
  }
]

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function HomePage() {
  const [homepageData, dbServices, dbIndustries] = await Promise.all([
    getHomepageData().catch(() => null),
    getServices().catch(() => []),
    getIndustries().catch(() => []),
  ]);

  // Use dynamic data if available, otherwise fallback to static
  const displayServices = dbServices.length > 0 
    ? dbServices.map((s: any) => ({ title: s.title, description: s.shortDescription || s.description, href: `/services/${s.slug}`, icon: Code2 }))
    : services;
    
  const displayIndustries = dbIndustries.length > 0
    ? dbIndustries.map((i: any) => ({ name: i.name, href: `/industries#${i.slug}`, icon: Building2 }))
    : industries;

  const sections = homepageData?.["sections"] || [];
  const isEnabled = (id: string) => {
    const s = sections.find((s: any) => s.id === id);
    return s ? s.enabled !== false : true; // Default to true if not found in CMS
  };
  const getSection = (id: string) => sections.find((s: any) => s.id === id) || {};

  return (
    <>
      {/* ─── HERO ─── */}
      {isEnabled("hero") && (
      <section className="relative overflow-hidden pt-16">
        {/* Subtle gradient backdrop */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {getSection("hero").title || "Engineering the Future of Digital Products"}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {getSection("hero").description || "Voryent Solutions partners with ambitious teams to architect, build, and scale software that drives real business outcomes — from cloud infrastructure to intelligent interfaces."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Let&apos;s Talk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/Assets/Illustrations/Homepage Hero Illustration.jpg"
                alt="Digital product engineering — abstract illustration representing cloud architecture, data flows, and modern software development"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ─── SERVICES PREVIEW ─── */}
      {isEnabled("services-preview") && (
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {getSection("services-preview").title || "What We Do"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {getSection("services-preview").description || "End-to-end engineering services designed to take your product from concept to scale."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.slice(0, 6).map((service: any) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Learn more
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── WHY VORYENT ─── */}
      {isEnabled("why-choose-us") && (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {getSection("why-choose-us").title || "Why Voryent"}
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-lg">
                {getSection("why-choose-us").description || "We combine deep engineering discipline with genuine partnership to deliver outcomes that matter — not just features."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyVoryent.map((item) => (
                <div key={item.title} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ─── PROCESS ─── */}
      {isEnabled("process") && (
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {getSection("process").title || "How We Work"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {getSection("process").description || "A proven, repeatable process that minimises risk and maximises velocity at every stage."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                    Step {item.step}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── INDUSTRIES ─── */}
      {isEnabled("industries") && (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {getSection("industries").title || "Industries We Serve"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {getSection("industries").description || "Domain expertise across verticals that demand reliability, compliance, and scale."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {displayIndustries.map((industry: any) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:shadow-md hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <industry.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {industry.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── FEATURED WORK ─── */}
      {isEnabled("featured-work") && (
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {getSection("featured-work").title || "Featured Work"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {getSection("featured-work").description || "A selection of projects that showcase our engineering craft."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {featuredProjects.map((project, i) => (
              <div key={i} className="group relative rounded-xl border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 flex flex-col">
                <div className="relative aspect-[16/9] w-full bg-muted border-b overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {project.summary}
                  </p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="inline-flex items-center rounded-md bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-sm font-medium text-primary opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                  >
                    View Project <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View All Work
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ─── TESTIMONIALS ─── */}
      {isEnabled("testimonials") && (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {getSection("testimonials")?.title || "Client Outcomes"}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {getSection("testimonials")?.description || "Don't just take our word for it. Hear from the partners we've built with."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="relative rounded-2xl border bg-card p-8 md:p-10 shadow-sm flex flex-col justify-between">
                <div>
                  <Quote className="h-10 w-10 text-primary/20 mb-6" />
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── CTA BANNER ─── */}
      {isEnabled("cta") && (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-primary px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden">
            {/* Subtle gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
                {getSection("cta").title || "Ready to Build Something Exceptional?"}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                {getSection("cta").description || "Let's discuss your next project. No sales pitch — just a genuine conversation about what you're trying to achieve and how we can help."}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Let&apos;s Talk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  )
}