export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getHomepageData, getServices, getIndustries, getFeaturedProjects } from "@/lib/firebase/services";
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
  Star,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import * as Icons from "lucide-react";

const renderIcon = (iconName: string, className: string = "") => {
  const Icon = (Icons as any)[iconName] || Icons.Code2;
  return <Icon className={className} />;
};

/* ──────────────────────────── DATA ──────────────────────────── */

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
];

const processSteps = [
  {
    step: "01",
    icon: Lightbulb,
    title: "Discover",
    description:
      "Deep-dive sessions to understand your business goals, target audience, and technical constraints before mapping out a strategy.",
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
];

const industries = [
  { icon: Building2, name: "Enterprise", href: "/industries" },
  { icon: HeartPulse, name: "Healthcare", href: "/industries" },
  { icon: GraduationCap, name: "Education", href: "/industries" },
  { icon: ShoppingCart, name: "E-Commerce", href: "/industries" },
  { icon: Landmark, name: "Finance", href: "/industries" },
  { icon: Factory, name: "Manufacturing", href: "/industries" },
];

const fallbackFeaturedProjects = [
  {
    title: "Medicare Plus Management System",
    type: "Custom Software & AI Solutions",
    description:
      "A comprehensive hospital management system integrating AI-powered intelligent medicine auto-suggestions and operational workflow optimizations.",
    technologies: ["React", "PostgreSQL", "Python (AI)", "Docker"],
    coverImage: "/Assets/Illustrations/Medicare Plus Illustration.png",
    slug: "medicare-plus",
  },
  {
    title: "Boss Restaurant POS",
    type: "Custom Software & POS",
    description:
      "A robust Point of Sale and internal management system developed specifically for fast-paced hospitality workflows.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    coverImage: "/Assets/Illustrations/Boss Restaurant Illustration.png",
    slug: "boss-restaurant",
  },
];

const testimonials = [
  {
    quote:
      "The hospital management system built by Voryent completely transformed our daily operations. The AI medicine suggestions and seamless integrations across the pharmacy, labs, and administration have drastically reduced wait times. They are true engineering partners.",
    name: "Dr. Sarah Jenkins",
    role: "Head of Operations",
    company: "Medicare Plus",
  },
  {
    quote:
      "Voryent Solutions understands real-world problems. The POS system they built for us handles our fast-paced restaurant environment perfectly. Our staff loves it, and our kitchen synchronization has never been better. We are incredibly happy with their work.",
    name: "Michael Boss",
    role: "Owner & Founder",
    company: "Boss Restaurant",
  },
];

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function HomePage() {
  const [homepageData, dbServices, dbIndustries, dbFeaturedProjects] = await Promise.all([
    getHomepageData().catch(() => null),
    getServices().catch(() => []),
    getIndustries().catch(() => []),
    getFeaturedProjects().catch(() => []),
  ]);

  // Only display featured services on the homepage
  const displayServices = dbServices
    .filter((s: any) => s.featured)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((s: any) => ({
      title: s.title,
      description: s.tagline || s.shortDescription || s.description,
      href: `/services/${s.slug}`,
      iconName: s.icon || "Code2",
    }));

  const displayIndustries =
    dbIndustries.length > 0
      ? dbIndustries
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((i: any) => ({
            name: i.title || i.name,
            href: `/industries/${i.slug}`,
            iconName: i.primaryIcon || i.icon || "Building2",
            imageUrl: i.imageUrl
          }))
      : [];

  const sections = homepageData?.["sections"] || [];
  const blocks = homepageData?.["contentBlocks"] || {};

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
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="from-primary/5 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
            <FadeIn className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Copy */}
              <div className="max-w-xl">
                <h1 className="text-foreground text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                  {getSection("hero").title ||
                    blocks?.hero?.title ||
                    "Engineering the Future of Digital Products"}
                </h1>
                <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                  {getSection("hero").description ||
                    blocks?.hero?.description ||
                    "Voryent Solutions partners with ambitious teams to architect, build, and scale software that drives real business outcomes — from cloud infrastructure to intelligent interfaces."}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/Assets/Illustrations/Homepage Hero Illustration.jpg"
                  alt="Digital product engineering — abstract illustration representing cloud architecture, data flows, and modern software development"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── SERVICES PREVIEW ─── */}
      {isEnabled("services-preview") && (
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {getSection("services-preview").title ||
                  blocks?.servicesPreview?.title ||
                  "What We Do"}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {getSection("services-preview").description ||
                  blocks?.servicesPreview?.description ||
                  "End-to-end engineering services designed to take your product from concept to scale."}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayServices.slice(0, 6).map((service: any, index: number) => (
                <FadeIn delay={0.1 * index} key={service.title}>
                  <Link
                    href={service.href}
                    aria-label={`Learn more about ${service.title}`}
                    className="bg-card hover:border-primary/40 focus-visible:ring-ring group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2"
                  >
                    {service.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-grow flex-col p-8">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                        {renderIcon(service.iconName, "h-6 w-6")}
                      </div>
                      <h3 className="text-foreground mb-3 text-xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground flex-grow leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      <span className="text-primary mt-6 inline-flex translate-y-1 items-center font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY VORYENT ─── */}
      {isEnabled("why-choose-us") && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
              <div>
                <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  {getSection("why-choose-us").title || blocks?.whyVoryent?.title || "Why Voryent"}
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg text-lg leading-relaxed">
                  {getSection("why-choose-us").description ||
                    blocks?.whyVoryent?.description ||
                    "We combine deep engineering discipline with genuine partnership to deliver outcomes that matter — not just features."}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {(blocks?.whyVoryent?.items || whyVoryent).map((item: any) => (
                  <div key={item.title} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                      <h3 className="text-foreground font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground pl-7 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── PROCESS ─── */}
      {isEnabled("process") && (
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {getSection("process").title || blocks?.process?.title || "How We Work"}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {getSection("process").description ||
                  blocks?.process?.description ||
                  "A proven, repeatable process that minimises risk and maximises velocity at every stage."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {(blocks?.process?.items || processSteps).map((item: any, index: number) => {
                const IconComp =
                  item.icon === "Lightbulb"
                    ? Lightbulb
                    : item.icon === "Search"
                      ? Search
                      : item.icon === "Rocket"
                        ? Rocket
                        : item.icon === "Headphones"
                          ? Headphones
                          : Code2;
                return (
                  <FadeIn delay={0.1 * index} key={item.step || index} className="relative text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-primary mb-3 text-xs font-bold uppercase tracking-widest">
                        Step {item.step}
                      </span>
                      <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <h3 className="text-foreground text-lg font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── INDUSTRIES ─── */}
      {isEnabled("industries") && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {getSection("industries").title || "Industries We Serve"}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {getSection("industries").description ||
                  "Domain expertise across verticals that demand reliability, compliance, and scale."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayIndustries.map((industry: any, index: number) => (
                <FadeIn delay={0.05 * index} key={industry.name}>
                  <Link
                    href={industry.href}
                    className="bg-card hover:border-primary/40 focus-visible:ring-ring group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2"
                  >
                    {industry.imageUrl ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={industry.imageUrl}
                          alt={industry.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                          <div className="bg-white/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-md">
                            {renderIcon(industry.iconName, "h-6 w-6 text-white")}
                          </div>
                          <span className="text-lg font-bold">{industry.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 p-8 text-center">
                        {renderIcon(industry.iconName, "h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors")}
                        <span className="text-foreground text-lg font-medium">{industry.name}</span>
                      </div>
                    )}
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED WORK ─── */}
      {isEnabled("featured-work") && (
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {getSection("featured-work").title ||
                  blocks?.featuredWork?.title ||
                  "Featured Work"}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {getSection("featured-work").description ||
                  blocks?.featuredWork?.description ||
                  "A selection of projects that showcase our engineering craft."}
              </p>
            </div>

            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {dbFeaturedProjects.length > 0 ? (
                dbFeaturedProjects.map((project: any, index: number) => (
                  <FadeIn delay={0.1 * index} key={project.id || index}>
                    <div className="bg-card hover:border-primary/40 group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                      <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden border-b">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.coverImage || project.attachments?.[0]?.url || "https://placehold.co/800x450/EEE/31343C"}
                          alt={project.title || project.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            ⭐ Featured
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-grow flex-col p-8 md:p-10">
                        <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
                          {project.type || project.category || "Project"}
                        </div>
                        <h3 className="text-foreground mb-4 text-2xl font-bold leading-tight md:text-3xl line-clamp-1">
                          {project.title || project.name}
                        </h3>
                        <p className="text-muted-foreground mb-8 flex-grow text-sm leading-relaxed line-clamp-3">
                          {project.description || project.summary}
                        </p>
                        <div className="mb-8 flex flex-wrap gap-2">
                          {(project.technologies || []).slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-[10px] uppercase tracking-wider font-semibold text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-muted text-muted-foreground text-[10px] rounded-full">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/work/${project.slug}`}
                          aria-label={`View Project: ${project.title || project.name}`}
                          className="text-primary inline-flex items-center text-sm font-bold opacity-90 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
                        >
                          View Project <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))
              ) : (
                <div className="col-span-full py-12 text-center border rounded-2xl bg-card">
                  <p className="text-muted-foreground">More projects coming soon.</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <Link
                href="/work"
                className="border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
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
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {getSection("testimonials")?.title ||
                  blocks?.testimonials?.title ||
                  "Client Outcomes"}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {getSection("testimonials")?.description ||
                  blocks?.testimonials?.description ||
                  "Don't just take our word for it. Hear from the partners we've built with."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {(blocks?.testimonials?.items || testimonials).map((testimonial: any, i: number) => (
                <div
                  key={i}
                  className="bg-card relative flex flex-col justify-between rounded-2xl border p-8 shadow-sm md:p-10"
                >
                  <div>
                    <Quote className="text-primary/20 mb-6 h-10 w-10" />
                    <div className="mb-6 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="fill-primary text-primary h-5 w-5" />
                      ))}
                    </div>
                    <p className="text-foreground mb-8 text-lg font-medium leading-relaxed md:text-xl">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="text-foreground font-bold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role}, {testimonial.company}
                    </div>
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
            <div className="bg-primary relative overflow-hidden rounded-2xl px-8 py-16 text-center md:px-16 md:py-20">
              {/* Subtle gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
                aria-hidden="true"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  {getSection("cta").title ||
                    blocks?.cta?.title ||
                    "Ready to Build Something Exceptional?"}
                </h2>
                <p className="text-primary-foreground/80 mt-4 text-lg leading-relaxed">
                  {getSection("cta").description ||
                    blocks?.cta?.description ||
                    "Let's discuss your next project. No sales pitch — just a genuine conversation about what you're trying to achieve and how we can help."}
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="bg-background text-foreground hover:bg-background/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
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
  );
}
