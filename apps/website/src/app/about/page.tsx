import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@voryent/ui";
import { 
  ArrowRight,
  Code2,
  Briefcase,
  Target,
  Eye,
  Award,
  ShieldCheck,
  Lightbulb,
  Search,
  PenTool,
  Rocket,
  Layers,
  Clock,
  Cpu,
  Linkedin,
  Shield,
  TrendingUp,
  Handshake,
  HeartHandshake,
  RefreshCcw,
  Globe,
  Brain,
  Users
} from "lucide-react";
import { getAboutData, getEmployees, getInvestors } from "@/lib/firebase/services";

export default async function AboutPage() {
  const [aboutData, employees, investors] = await Promise.all([
    getAboutData().catch(() => null),
    getEmployees().catch(() => []),
    getInvestors().catch(() => []),
  ]);
  const blocks = aboutData?.["contentBlocks"] || {};
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
            alt="Business Handshake"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:px-6 lg:px-8">
          <div className="max-w-3xl rounded-3xl bg-black/40 p-8 md:p-12 backdrop-blur-md border border-white/10 shadow-2xl">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary border-none">
              About Us
            </Badge>
            <h1 className="text-white text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Engineering Intelligent Software That Drives Business Growth
            </h1>
            <p className="text-zinc-300 mt-6 text-lg leading-relaxed">
              At Voryent Solutions, we transform ambitious ideas into intelligent digital products. We specialise in AI-powered applications, enterprise software, SaaS platforms, web solutions, mobile applications, cloud infrastructure, and business automation that help organisations innovate, scale, and succeed in an increasingly digital world.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-bold">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                Who We Are
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-primary mb-8" />
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                <p>
                  Voryent Solutions is a modern software engineering and artificial intelligence company dedicated to building innovative digital solutions for businesses worldwide. We combine technical excellence with strategic thinking to create software that not only solves today's challenges but also prepares organisations for tomorrow's opportunities.
                </p>
                <p>
                  Our team specialises in designing and developing custom software, AI-powered systems, enterprise platforms, SaaS products, cloud-native applications, websites, mobile apps, and intelligent automation solutions. Every project is built with scalability, security, performance, and exceptional user experience at its core.
                </p>
                <p>
                  We believe technology should simplify complexity, accelerate growth, and create lasting value. Whether partnering with startups, small businesses, or large enterprises, our goal remains the same: deliver reliable, future-ready software that empowers our clients to stay ahead in a rapidly evolving digital landscape.
                </p>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                {
                  icon: Code2,
                  title: "Engineering Excellence",
                  description: "We build reliable, secure, scalable software using modern technologies, clean architecture, and industry best practices."
                },
                {
                  icon: Brain,
                  title: "AI-Driven Innovation",
                  description: "We integrate artificial intelligence into real business workflows to automate processes, improve decision-making, and unlock new opportunities."
                },
                {
                  icon: ShieldCheck,
                  title: "Quality & Security",
                  description: "Every solution undergoes rigorous testing and follows strong security standards to ensure dependable long-term performance."
                },
                {
                  icon: Users,
                  title: "Client Partnership",
                  description: "We work closely with every client, maintaining transparent communication and delivering solutions aligned with their business goals."
                }
              ].map((pillar: any, i: number) => {
                const IconComp = pillar.icon;
                return (
                  <div key={i} className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                      <div className="bg-primary/10 text-primary mb-4 inline-flex flex-shrink-0 rounded-xl p-3">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <h3 className="text-foreground mb-2 text-lg font-bold">{pillar.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                  </div>
                );
              })}
          </div>
        </Container>
      </Section>

      {/* ─── COMPANY PROFILE (DYNAMIC) ─── */}
      {blocks?.companyProfile?.fields?.length > 0 && (
        <Section className="bg-muted/20 border-y border-border/40">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {blocks.companyProfile.title || "Company Profile"}
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  A quick overview of who we are and our foundational details.
                </p>
              </div>
              
              <div className="bg-card overflow-hidden rounded-3xl border border-border/40 shadow-sm">
                <div className="divide-border/40 divide-y">
                  {blocks.companyProfile.fields.map((field: any, i: number) => (
                    <div key={i} className="group flex flex-col sm:flex-row sm:items-center px-6 py-5 transition-colors hover:bg-muted/50">
                      <div className="text-foreground sm:w-1/3 mb-1 pr-4 text-sm font-bold uppercase tracking-wider sm:mb-0">
                        {field.label}
                      </div>
                      <div className="text-muted-foreground sm:w-2/3 text-base">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── MISSION & VISION (DYNAMIC) ─── */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl p-10 shadow-lg md:p-14">
              <div className="absolute right-0 top-0 -mr-8 -mt-8 opacity-10">
                <Target className="h-48 w-48" />
              </div>
              <Target className="mb-6 h-12 w-12" />
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight">Our Mission</h2>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                {blocks?.missionVision?.mission ||
                  "To empower organizations with robust, modern digital products that solve complex problems, driving sustainable business growth through relentless engineering excellence and uncompromising quality."}
              </p>
            </div>
            
            <div className="bg-card border-border/50 relative overflow-hidden rounded-3xl border p-10 shadow-lg md:p-14">
              <div className="absolute right-0 top-0 -mr-8 -mt-8 opacity-5">
                <Eye className="h-48 w-48 text-foreground" />
              </div>
              <Eye className="text-primary mb-6 h-12 w-12" />
              <h2 className="text-foreground mb-4 text-3xl font-extrabold tracking-tight">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {blocks?.missionVision?.vision ||
                  "To be the trusted technology partner of choice for ambitious companies globally, recognized for building resilient, AI-enhanced architectures that define the next generation of software."}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CORE VALUES ─── */}
      <Section className="bg-gradient-to-b from-primary/5 to-background border-t border-border/40 py-20 md:py-32">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              We Believe in Providing Values.
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              These principles guide every decision we make, every product we build, and every partnership we create.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "We embrace emerging technologies and continuously seek smarter ways to solve complex business challenges.",
              },
              {
                icon: Handshake,
                title: "Integrity",
                desc: "We build lasting relationships through honesty, transparency, accountability, and ethical business practices.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We pursue the highest standards of quality in engineering, design, communication, and customer experience.",
              },
              {
                icon: HeartHandshake,
                title: "Customer Success",
                desc: "Our clients' success is our greatest achievement, and every solution is designed to help them grow.",
              },
              {
                icon: Rocket,
                title: "Continuous Improvement",
                desc: "We continuously learn, adapt, and evolve to stay at the forefront of technology and innovation.",
              },
              {
                icon: Globe,
                title: "Global Perspective",
                desc: "We build technology that serves businesses across industries, cultures, and international markets.",
              },
            ].map((value: any, i: number) => {
              const IconComp = value.icon;
              return (
                <div key={i} className="bg-muted/50 hover:bg-muted rounded-3xl p-8 transition-colors text-center border border-border/40">
                  <div className="mx-auto mb-6 flex items-center justify-center">
                    <IconComp className="text-foreground h-12 w-12 stroke-[1.5]" />
                  </div>
                  <h3 className="text-foreground mb-4 text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section className="bg-background py-20">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              How We Deliver Success
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Our structured development process ensures every project is delivered efficiently, transparently, and with exceptional quality.
            </p>
          </div>

          <div className="relative">
            {/* Timeline track for desktop */}
            <div
              className="bg-border/50 absolute left-0 top-1/2 z-0 hidden h-0.5 w-full -translate-y-1/2 lg:block"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
              {[
                { icon: Search, title: "Discovery & Strategy" },
                { icon: PenTool, title: "Planning & Design" },
                { icon: Code2, title: "Development" },
                { icon: ShieldCheck, title: "Testing & QA" },
                { icon: Rocket, title: "Deployment" },
                { icon: RefreshCcw, title: "Support & Growth" },
              ].map((step: any, i: number) => {
                const IconComp = step.icon;
                return (
                  <div key={i} className="group flex flex-col items-center text-center">
                    <div className="bg-background border-border/50 text-foreground group-hover:border-primary group-hover:text-primary mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-sm transition-all">
                      <IconComp className="h-8 w-8" />
                    </div>
                    <span className="text-primary mb-2 text-xs font-bold uppercase tracking-wider">
                      Step 0{i + 1}
                    </span>
                    <h3 className="text-foreground text-base font-semibold leading-tight">{step.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WHY CHOOSE VORYENT ─── */}
      <Section className="bg-muted/10 py-20 border-t border-border/40">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why Businesses Choose Voryent Solutions
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              We combine innovation, technical expertise, and a client-first approach to deliver software that creates long-term business value.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "Tailored Solutions",
                desc: "Every product is designed specifically for your business goals rather than relying on one-size-fits-all software.",
              },
              {
                icon: Brain,
                title: "AI Expertise",
                desc: "We integrate practical artificial intelligence that improves efficiency, productivity, and customer experiences.",
              },
              {
                icon: Cpu,
                title: "Modern Technology Stack",
                desc: "We use the latest frameworks, cloud platforms, and development tools to ensure long-term scalability.",
              },
              {
                icon: Clock,
                title: "Reliable Delivery",
                desc: "Clear communication, organised workflows, and realistic timelines keep every project moving forward.",
              },
              {
                icon: Shield,
                title: "Security First",
                desc: "Security, privacy, and compliance are considered from the first line of code through deployment.",
              },
              {
                icon: TrendingUp,
                title: "Long-Term Partnership",
                desc: "We support our clients beyond launch with maintenance, optimisation, and continuous innovation.",
              },
            ].map((reason: any, i: number) => {
              const IconComp = reason.icon;
              return (
                <div key={i} className="bg-card border-border/40 hover:-translate-y-1 rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="bg-primary/10 text-primary mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 text-xl font-bold">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── OUR LEADERSHIP (DYNAMIC) ─── */}
      {blocks?.leadership?.members?.length > 0 && (
        <Section className="bg-background py-20">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-4xl font-extrabold tracking-tight">
                {blocks.leadership.title || "Our Leadership"}
              </h2>
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-primary" />
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {blocks.leadership.members.map((member: any, i: number) => (
                <div key={i} className="group flex flex-col items-center text-center">
                  <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-full shadow-lg ring-4 ring-background transition-transform group-hover:scale-105">
                    <Image
                      src={member.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-foreground text-2xl font-bold">
                    {member.name}
                  </h3>
                  <p className="text-primary mt-1 text-sm font-semibold uppercase tracking-wider">
                    {member.title}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary mt-4 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── OUR TEAM (DYNAMIC) ─── */}
      {employees.length > 0 && (
        <Section className="bg-muted/30 border-y border-border/40 py-20">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet the Team
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                The talented engineers, designers, and strategists behind Voryent Solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {employees.map((emp: any, i: number) => (
                <div
                  key={emp.id || i}
                  className="bg-card border-border/40 group text-center rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="bg-muted border-primary/20 text-primary relative mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 text-2xl font-bold transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {emp.firstName?.[0]}
                    {emp.lastName?.[0]}
                  </div>
                  <h3 className="text-foreground text-lg font-bold">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-muted-foreground mb-3 mt-1 text-sm">{emp.position}</p>
                  {emp.department && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold border-none">
                      {emp.department}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── OUR INVESTORS (DYNAMIC) ─── */}
      {investors.length > 0 && (
        <Section className="bg-background py-20">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                Backed By
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                We are proud to be supported by visionary investors and strategic partners.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {investors.map((inv: any, i: number) => (
                <div
                  key={inv.id || i}
                  className="bg-card border-border/40 hover:-translate-y-1 w-full rounded-2xl border p-8 text-center shadow-sm transition-all hover:shadow-md sm:w-[280px]"
                >
                  <div className="bg-muted text-foreground mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                    <Briefcase className="h-7 w-7" />
                  </div>
                  <h3 className="text-foreground text-lg font-bold">{inv.name}</h3>
                  {inv.organization && (
                    <p className="text-muted-foreground mt-1 text-sm">{inv.organization}</p>
                  )}
                  <Badge variant="outline" className="mt-4 border-border text-foreground">
                    {inv.type} Investor
                  </Badge>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12">
        <Container>
          <div className="bg-foreground relative overflow-hidden rounded-[2.5rem] px-8 py-24 text-center shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-background mb-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Let&apos;s build something exceptional together.
              </h2>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-14 px-10 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-base font-bold border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
