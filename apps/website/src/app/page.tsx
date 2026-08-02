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
    href: `/insights/${b.slug}`,
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
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
              alt="Enterprise Tech Office"
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
            <FadeIn className="max-w-3xl">
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {getSection("hero").title || blocks?.hero?.title || "Building at the Speed of AI"}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-zinc-300">
                {getSection("hero").description ||
                  blocks?.hero?.description ||
                  "Voryent Solutions partners with ambitious enterprises to architect, build, and scale software that drives real business outcomes — from cloud infrastructure to intelligent interfaces."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-all hover:scale-105"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/20 px-8 py-4 text-base font-medium text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Explore Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── COMPANY STATS ─── */}
      <section className="bg-muted/30 border-border/40 border-y py-12">
        <div className="container mx-auto px-4">
          <div className="divide-border/40 grid grid-cols-2 gap-8 divide-x md:grid-cols-4">
            {companyStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <FadeIn
                  key={idx}
                  delay={0.1 * idx}
                  className="flex flex-col items-center justify-center px-4 text-center"
                >
                  <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-1 text-3xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICES (Transform Your Business) ─── */}
      {isEnabled("services-preview") && (
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
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
                    className="group relative flex h-[420px] w-full flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 z-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                        {renderIcon(service.iconName, "h-6 w-6 text-white")}
                      </div>
                      <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                      <p className="mb-6 line-clamp-3 text-sm text-zinc-300">
                        {service.description}
                      </p>
                      <div className="text-primary-foreground inline-flex items-center text-sm font-semibold group-hover:text-white">
                        Learn more{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="text-primary hover:text-primary/80 inline-flex items-center font-semibold transition-colors"
              >
                View all our services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY VORYENT ─── */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              Why Voryent Solutions?
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              We combine deep engineering discipline with genuine partnership to deliver outcomes
              that matter — not just features.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyVoryent.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="bg-card border-border/40 group flex h-full flex-col rounded-3xl border p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-foreground mb-3 text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ─── */}
      <section className="border-border/40 bg-background relative overflow-hidden border-y py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              How We Work
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              A proven, repeatable process that minimises risk and maximises velocity at every
              stage.
            </p>
          </FadeIn>

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Connecting Line for Desktop */}
            <div className="bg-border/50 absolute left-[12%] right-[12%] top-[45px] -z-10 hidden h-[2px] lg:block" />

            {howWeWork.map((step, idx) => {
              const Icon = step.icon;
              return (
                <FadeIn key={idx} delay={0.1 * idx} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-background border-border/40 relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm">
                      <span className="text-primary/10 absolute -right-4 -top-4 text-6xl font-black">
                        {step.step}
                      </span>
                      <Icon className="text-primary relative z-10 h-10 w-10" />
                    </div>
                    <h3 className="text-foreground mb-4 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED INSIGHTS ─── */}
      {displayBlogs.length > 0 && (
        <section className="bg-muted/30 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Featured Insights
                </h2>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  Latest thoughts, case studies, and engineering practices from our team.
                </p>
              </div>
              <Link
                href="/insights"
                className="text-primary hover:text-primary/80 inline-flex items-center font-semibold transition-colors"
              >
                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {displayBlogs.map((blog: any, index: number) => (
                <FadeIn delay={0.1 * index} key={blog.title}>
                  <Link href={blog.href} className="group block">
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-primary mb-3 text-xs font-bold uppercase tracking-wider">
                      {blog.date}
                    </p>
                    <h3 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold leading-snug transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-base leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── INDUSTRIES ─── */}
      {isEnabled("industries") && (
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FadeIn className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {getSection("industries").title || "Industries We Serve"}
                </h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {getSection("industries").description ||
                    "We deliver domain-specific expertise across major verticals, ensuring your technological solutions comply with industry standards while pushing the boundaries of innovation."}
                </p>
                <div className="space-y-4">
                  {displayIndustries.slice(0, 4).map((ind: any) => (
                    <div key={ind.name} className="flex items-center gap-4">
                      <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
                      <span className="text-foreground text-lg font-semibold">{ind.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <Link
                    href="/industries"
                    className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg border px-8 py-3 text-sm font-semibold shadow-sm transition-all"
                  >
                    Explore Industries
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {displayIndustries.slice(0, 4).map((industry: any, index: number) => (
                    <Link
                      key={industry.name}
                      href={industry.href}
                      className={`group relative overflow-hidden rounded-2xl shadow-sm ${
                        index === 1 || index === 2 ? "mt-0 sm:mt-12" : ""
                      }`}
                    >
                      <div className="aspect-[4/5] w-full">
                        {industry.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={industry.imageUrl}
                            alt={industry.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="bg-muted h-full w-full" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                            {renderIcon(industry.iconName, "h-5 w-5 text-white")}
                          </div>
                          <span className="block text-xl font-bold">{industry.name}</span>
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

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Don&apos;t just take our word for it. Here is what our partners have to say about
              working with Voryent Solutions.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="h-full">
                <div className="bg-card border-border/40 relative flex h-full flex-col rounded-3xl border p-8 shadow-sm md:p-10">
                  <Quote className="text-primary/20 absolute right-8 top-8 h-16 w-16" />
                  <div className="mb-6 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-primary h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-8 flex-1 text-lg leading-relaxed md:text-xl">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-foreground font-bold">{testimonial.author}</div>
                      <div className="text-muted-foreground text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAREERS ─── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Team collaborating in office"
            fill
            className="object-cover"
          />
          <div className="bg-primary/90 absolute inset-0 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeIn className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Where careers take shape
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/90">
              Join a team of passionate engineers, designers, and strategists. We are always looking
              for exceptional talent to help us build the future of enterprise software.
            </p>
            <Link
              href="/careers"
              className="text-primary inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-bold shadow-lg transition-transform hover:scale-105"
            >
              View Open Roles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT FORM / CTA ─── */}
      <section className="bg-background relative py-20 md:py-32" id="contact-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
                Let&apos;s build what&apos;s next, together.
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                Whether you need a full enterprise system or a dedicated engineering team, drop us a
                line.
              </p>
            </div>

            <div className="bg-card border-border/40 rounded-3xl border p-4 shadow-xl md:p-8">
              <QuickMessageForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
