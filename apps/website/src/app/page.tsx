export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getHomepageData, getServices, getIndustries, getBlogPosts } from "@/lib/firebase/services";
import {
  Code2,
  ArrowRight,
  Building2,
  CheckCircle2,
  Users,
  Globe2,
  Briefcase,
  Trophy,
  Quote,
  Star,
  ShieldCheck,
  Zap,
  Handshake,
  Rocket,
  Search,
  PenTool,
  Code,
  LifeBuoy,
  Database,
  Cloud,
  Cpu,
  Layout,
  GitBranch,
  Lock,
  Workflow,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import * as Icons from "lucide-react";
import { QuickMessageForm } from "@/app/contact/contact-client";

const renderIcon = (iconName: string, className: string = "") => {
  const Icon = (Icons as any)[iconName] || Icons.Code2;
  return <Icon className={className} />;
};

/* ──────────────────────────── DATA ──────────────────────────── */

const testimonials = [
  {
    quote:
      "The hospital management system built by Voryent completely transformed our daily operations. The AI medicine suggestions and seamless integrations across the pharmacy, labs, and administration have drastically reduced wait times. They are true engineering partners.",
    author: "Dr. Sarah Jenkins",
    title: "Head of Operations, Medicare Plus",
    rating: 5,
  },
  {
    quote:
      "Voryent Solutions understands real-world problems. The POS system they built for us handles our fast-paced restaurant environment perfectly. Our staff loves it, and our kitchen synchronization has never been better. We are incredibly happy with their work.",
    author: "Boss",
    title: "Owner & Founder, Boss Restaurant",
    rating: 5,
  },
];

const companyStats = [
  { label: "Talented Experts", value: "10+", icon: Users },
  { label: "Global Clients", value: "10+", icon: Globe2 },
  { label: "Years Experience", value: "1+", icon: Briefcase },
  { label: "Industry Awards", value: "10+", icon: Trophy },
];

const whyVoryent = [
  {
    title: "Engineering Excellence",
    description:
      "Every line of code is reviewed, tested, and optimized. We don't ship until it's production-ready.",
    icon: Zap,
  },
  {
    title: "Transparent Partnership",
    description:
      "No black boxes. You own your code, your data, and your roadmap. We work alongside your team, not around them.",
    icon: Handshake,
  },
  {
    title: "Scalable From Day One",
    description:
      "Our architectures are designed to grow with you — from MVP to millions of users without re-platforming.",
    icon: Rocket,
  },
  {
    title: "Security First",
    description:
      "OWASP best practices, encrypted at rest and in transit, with continuous vulnerability scanning baked into every pipeline.",
    icon: ShieldCheck,
  },
];

const howWeWork = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "Deep-dive sessions to understand your business goals, target audience, and technical constraints before mapping out a strategy.",
    icon: Search,
  },
  {
    step: "02",
    title: "Architecture & Design",
    description:
      "Architecture blueprints, wireframes, and prototypes — validated with your stakeholders before a single line of code is written.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Agile Engineering",
    description:
      "Iterative sprints with weekly demos, automated testing, and production-grade deployments at every milestone.",
    icon: Code,
  },
  {
    step: "04",
    title: "Support & Maintenance",
    description:
      "Post-launch monitoring, performance tuning, and incident response to keep your systems running flawlessly at scale.",
    icon: LifeBuoy,
  },
];

const engineeringStandards = [
  {
    title: "Agile Methodologies",
    description:
      "Iterative, sprint-based delivery ensuring constant alignment with business goals and rapid adaptation to change.",
    icon: Workflow,
  },
  {
    title: "CI/CD Pipelines",
    description:
      "Automated testing and deployment pipelines that guarantee zero-downtime releases and high code quality.",
    icon: GitBranch,
  },
  {
    title: "Enterprise Security",
    description:
      "SOC2 compliance practices, data encryption at rest/transit, and regular vulnerability scanning.",
    icon: Lock,
  },
  {
    title: "Cloud-Native Architecture",
    description:
      "Microservices and serverless paradigms designed for infinite horizontal scalability and resilience.",
    icon: Cloud,
  },
];

const techStack = [
  { name: "React / Next.js", icon: Layout },
  { name: "Node.js / Python", icon: Code2 },
  { name: "AWS / Google Cloud", icon: Cloud },
  { name: "PostgreSQL / MongoDB", icon: Database },
  { name: "AI / LLMs", icon: Cpu },
];

const fallbackServiceImages = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
];

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function HomePage() {
  const [homepageData, dbServices, dbIndustries, dbBlogs] = await Promise.all([
    getHomepageData().catch(() => null),
    getServices().catch(() => []),
    getIndustries().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const displayServices = dbServices
    .filter((s: any) => s.featured)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((s: any, idx: number) => ({
      title: s.title,
      description: s.tagline || s.shortDescription || s.description,
      href: `/services/${s.slug}`,
      iconName: s.icon || "Code2",
      imageUrl: s.imageUrl || fallbackServiceImages[idx % fallbackServiceImages.length],
    }));

  const displayIndustries =
    dbIndustries.length > 0
      ? dbIndustries
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((i: any) => ({
            name: i.title || i.name,
            href: `/industries/${i.slug}`,
            iconName: i.primaryIcon || i.icon || "Building2",
            imageUrl: i.imageUrl,
          }))
      : [];

  const displayBlogs = dbBlogs.slice(0, 3).map((b: any) => ({
    title: b.title,
    excerpt: b.excerpt || b.content?.substring(0, 100) + "...",
    href: `/blog/${b.slug}`,
    imageUrl:
      b.coverImage ||
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
    date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : "Recent",
  }));

  const sections = homepageData?.["sections"] || [];
  const blocks = homepageData?.["contentBlocks"] || {};

  const isEnabled = (id: string) => {
    const s = sections.find((s: any) => s.id === id);
    return s ? s.enabled !== false : true;
  };
  const getSection = (id: string) => sections.find((s: any) => s.id === id) || {};

  return (
    <>
      {/* ─── HERO ─── */}
      {isEnabled("hero") && (
        <section className="relative flex min-h-[95vh] items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-black">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
              alt="Enterprise Tech Office"
              fill
              className="object-cover opacity-40 grayscale"
              priority
            />
            {/* Grid overlay for tech feel */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <div className="container relative z-10 mx-auto mt-16 px-4 py-20 md:px-6 lg:px-8">
            <span className="text-primary mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              Empowering the Future
            </span>
            <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {getSection("hero").title || blocks?.hero?.title || "Building at the Speed of AI"}
            </h1>
            <p className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-zinc-400">
              {getSection("hero").description ||
                blocks?.hero?.description ||
                "Voryent Solutions partners with ambitious enterprises to architect, build, and scale software that drives real business outcomes — from cloud infrastructure to intelligent interfaces."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-none bg-white px-8 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-white/90"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center justify-center rounded-none border border-white/20 bg-transparent px-8 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── COMPANY STATS ─── */}
      <section className="bg-background border-border/40 relative z-20 border-b">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="divide-border/40 border-border/40 grid grid-cols-2 divide-x border-x md:grid-cols-4">
            {companyStats.map((stat, idx) => {
              return (
                <FadeIn
                  key={idx}
                  delay={0.1 * idx}
                  className="group flex flex-col items-center justify-center px-4 py-16 text-center"
                >
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-4xl font-light tracking-tight transition-colors lg:text-5xl">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICES (Transform Your Business) - Keeping Original Layout but Sharp ─── */}
      {isEnabled("services-preview") && (
        <section className="bg-muted/10 border-border/40 border-b py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
                Our Capabilities
              </span>
              <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Transform Your Business
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                End-to-end engineering services designed to take your enterprise from legacy systems
                to cutting-edge AI and cloud architectures.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayServices.slice(0, 4).map((service: any, index: number) => (
                <FadeIn delay={0.1 * index} key={service.title} className="h-full">
                  <Link
                    href={service.href}
                    className="border-border/60 group relative flex h-[420px] w-full flex-col overflow-hidden rounded-none border bg-black transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-none border border-white/20 bg-white/10 backdrop-blur-sm">
                        {renderIcon(service.iconName, "h-5 w-5 text-white")}
                      </div>
                      <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                      <p className="mb-6 line-clamp-3 text-sm text-zinc-300">
                        {service.description}
                      </p>
                      <div className="text-primary inline-flex items-center text-xs font-bold uppercase tracking-widest">
                        Learn more{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/services"
                className="border-foreground text-foreground hover:border-primary hover:text-primary inline-flex h-12 items-center justify-center rounded-none border-b-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                View all our services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY VORYENT (Staggered Typography Design) ─── */}
      <section className="bg-foreground text-background py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-20">
            <span className="text-background/60 mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
              The Difference
            </span>
            <h2 className="text-background max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Why Voryent Solutions?
            </h2>
            <p className="text-background/80 mt-6 max-w-xl text-lg leading-relaxed">
              We combine deep engineering discipline with genuine partnership to deliver outcomes
              that matter — not just features.
            </p>
          </FadeIn>

          <div className="bg-background/20 border-background/20 grid grid-cols-1 gap-px border md:grid-cols-2">
            {whyVoryent.map((feature, idx) => {
              return (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="bg-foreground hover:bg-background hover:text-foreground border-border/40 group relative flex h-full flex-col overflow-hidden p-10 transition-colors lg:p-14">
                    <div className="text-background/5 group-hover:text-foreground/5 absolute -bottom-4 -right-4 select-none text-[120px] font-bold leading-none transition-colors">
                      0{idx + 1}
                    </div>
                    <h3 className="text-background group-hover:text-foreground relative z-10 mb-4 text-2xl font-bold transition-colors lg:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="text-background/70 group-hover:text-muted-foreground relative z-10 max-w-sm leading-relaxed transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK & INTEGRATIONS (NEW SECTION) ─── */}
      <section className="bg-muted/10 border-border/40 border-b py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
                Built on strong technology alliances
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We collaborate with leading technology providers to deliver modern, scalable solutions that help 
                enterprises accelerate transformation, improve performance, and create lasting business value.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Marquee Slider */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-12 items-center py-4 pl-12 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg" alt="Microsoft" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original-wordmark.svg" alt="Google Cloud" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" alt="React" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" alt="Docker" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg" alt="Kubernetes" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="Python" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK (Timeline Design) ─── */}
      <section className="bg-background border-border/40 relative overflow-hidden border-b py-24 md:py-32">
        <div className="text-muted/30 pointer-events-none absolute -left-[10%] top-[10%] z-0 select-none text-[400px] font-bold leading-none">
          W
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-20 max-w-3xl">
            <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
              Methodology
            </span>
            <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              How We Work
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              A proven, repeatable process that minimises risk and maximises velocity at every
              stage.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-12">
            {howWeWork.map((step, idx) => {
              return (
                <FadeIn
                  key={idx}
                  delay={0.1 * idx}
                  className="border-border/60 group border-t pt-12"
                >
                  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground/30 group-hover:text-primary text-5xl font-light transition-colors">
                        {step.step}
                      </span>
                    </div>
                    <div className="md:col-span-10 lg:col-span-8">
                      <h3 className="text-foreground mb-4 text-3xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ENGINEERING STANDARDS (NEW SECTION) ─── */}
      <section className="bg-muted/10 border-border/40 border-b py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-16">
            <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
              The Core
            </span>
            <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Engineering Standards
            </h2>
          </FadeIn>

          <div className="bg-border/40 border-border/40 grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-4">
            {engineeringStandards.map((std, idx) => {
              const Icon = std.icon;
              return (
                <FadeIn
                  key={idx}
                  delay={0.1 * idx}
                  className="bg-background hover:bg-muted/20 flex h-full flex-col p-10 transition-colors"
                >
                  <Icon className="text-primary mb-8 h-8 w-8" />
                  <h3 className="text-foreground mb-4 text-xl font-bold">{std.title}</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">{std.description}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES (Keeping Original Layout but Sharp) ─── */}
      {isEnabled("industries") && (
        <section className="bg-background border-border/40 border-b py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
                  Verticals
                </span>
                <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {getSection("industries").title || "Industries We Serve"}
                </h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {getSection("industries").description ||
                    "We deliver domain-specific expertise across major verticals, ensuring your technological solutions comply with industry standards while pushing the boundaries of innovation."}
                </p>
                <div className="space-y-4">
                  {displayIndustries.slice(0, 4).map((ind: any) => (
                    <div key={ind.name} className="flex items-center gap-4">
                      <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                      <span className="text-foreground text-lg font-bold tracking-tight">
                        {ind.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link
                    href="/industries"
                    className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-14 items-center justify-center rounded-none px-8 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Explore Industries
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-border/40 border-border/40 grid grid-cols-2 gap-px border">
                  {displayIndustries.slice(0, 4).map((industry: any, index: number) => (
                    <Link
                      key={industry.name}
                      href={industry.href}
                      className="bg-background group relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-8"
                    >
                      <div className="absolute inset-0 z-0">
                        {industry.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={industry.imageUrl}
                            alt={industry.name}
                            className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="bg-muted h-full w-full opacity-20 transition-opacity group-hover:opacity-100" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-500" />
                      </div>
                      <div className="relative z-10 text-white transition-colors duration-500">
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-none border border-white/20 bg-white/10 backdrop-blur-sm">
                          {renderIcon(industry.iconName, "h-5 w-5 text-white")}
                        </div>
                        <span className="block text-2xl font-bold">{industry.name}</span>
                        <div className="text-primary mt-4 -translate-y-4 text-xs font-bold uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          Explore Sector <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── FEATURED INSIGHTS ─── */}
      {displayBlogs.length > 0 && (
        <section className="bg-muted/10 border-border/40 border-b py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
                  Knowledge Base
                </span>
                <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Featured Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="text-foreground hover:text-primary border-foreground hover:border-primary inline-flex items-center border-b-2 pb-1 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                View all articles
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {displayBlogs.map((blog: any, index: number) => (
                <FadeIn delay={0.1 * index} key={blog.title}>
                  <Link
                    href={blog.href}
                    className="hover:border-border/60 group -m-4 flex h-full flex-col rounded-none border border-transparent p-4 transition-colors"
                  >
                    <div className="bg-muted relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <p className="text-primary mb-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                      {blog.date}
                    </p>
                    <h3 className="text-foreground mb-4 text-2xl font-bold leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                      {blog.excerpt}
                    </p>
                    <div className="text-foreground mt-auto inline-flex items-center text-xs font-bold uppercase tracking-widest">
                      Read Article{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS (Typography Split Layout) ─── */}
      <section className="bg-background border-border/40 border-b py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mb-20 max-w-2xl">
            <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
              Client Success
            </span>
            <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Trusted by Industry Leaders
            </h2>
          </FadeIn>

          <div className="bg-border/40 border-border/40 grid grid-cols-1 gap-px border">
            {testimonials.map((testimonial, idx) => (
              <FadeIn
                key={idx}
                delay={0.1 * idx}
                className="bg-background flex flex-col md:flex-row"
              >
                <div className="flex flex-1 flex-col justify-center p-10 md:p-16">
                  <div className="text-primary mb-8 flex gap-2">
                    <Quote className="h-10 w-10 opacity-30" />
                  </div>
                  <blockquote className="text-foreground max-w-3xl text-xl font-medium leading-relaxed md:text-2xl">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>
                <div className="bg-muted/20 border-border/40 flex shrink-0 flex-col justify-center border-t p-10 md:w-80 md:border-l md:border-t-0 md:p-16">
                  <div className="text-foreground mb-2 text-xl font-bold">{testimonial.author}</div>
                  <div className="text-muted-foreground text-xs font-bold uppercase leading-snug tracking-widest">
                    {testimonial.title}
                  </div>
                  <div className="mt-8 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-primary h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREERS CTA ─── */}
      <section className="relative overflow-hidden py-32 md:py-48">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Team collaborating in office"
            fill
            className="object-cover grayscale"
          />
          <div className="bg-foreground absolute inset-0 opacity-90 mix-blend-multiply" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeIn className="mx-auto max-w-4xl border border-white/20 bg-black/40 p-12 backdrop-blur-md md:p-20">
            <span className="text-primary mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              Join The Team
            </span>
            <h2 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Where careers take shape
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              Join a team of passionate engineers, designers, and strategists. We are always looking
              for exceptional talent to help us build the future of enterprise software.
            </p>
            <Link
              href="/careers"
              className="inline-flex h-14 items-center justify-center rounded-none bg-white px-10 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white/90"
            >
              View Open Roles
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT FORM / CTA ─── */}
      <section
        className="bg-background border-border/40 border-t py-24 md:py-32"
        id="contact-section"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
            <div className="lg:sticky lg:top-32 lg:col-span-5">
              <span className="text-muted-foreground mb-4 block text-xs font-bold uppercase tracking-[0.2em]">
                Let's Talk
              </span>
              <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Let&apos;s build what&apos;s next, together.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need a full enterprise system or a dedicated engineering team, drop us a
                line and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-border/60 border p-2">
                <QuickMessageForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
