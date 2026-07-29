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
import { ArrowRight,
  Code2,
  Briefcase,
  Bot,
  Target,
  Eye,
  Award,
  Lock,
  Zap,
  ShieldCheck,
  Lightbulb,
  Search,
  PenTool,
  Server,
  Rocket,
  LifeBuoy,
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
  Users} from "lucide-react";

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
      <Section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
        <div
          className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-b via-transparent to-transparent"
          aria-hidden="true"
        />
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                About Voryent
              </Badge>
              <h1 className="text-foreground text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Engineering Intelligent Software That Drives Business Growth
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                At Voryent Solutions, we transform ambitious ideas into intelligent digital products. We specialise in AI-powered applications, enterprise software, SaaS platforms, web solutions, mobile applications, cloud infrastructure, and business automation that help organisations innovate, scale, and succeed in an increasingly digital world.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/contact">
                    Let&apos;s Talk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
            <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl md:aspect-[4/3] lg:ml-auto">
              <Image
                src="/Assets/Illustrations/AI Illustration.webp"
                alt="AI and Data Architecture Illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WHO WE ARE ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Who We Are
              </h2>
              <div className="text-muted-foreground mt-6 space-y-6 text-lg leading-relaxed">
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
            <div className="grid gap-6">
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
                  <Card key={i} className="shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="bg-primary/10 text-primary flex-shrink-0 rounded-lg p-3">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-lg font-semibold">{pillar.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── COMPANY PROFILE (DYNAMIC) ─── */}
      {blocks?.companyProfile?.fields?.length > 0 && (
        <Section className="border-y border-border">
          <Container>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  {blocks.companyProfile.title || "Company Profile"}
                </h2>
                <div className="mt-6 w-20 h-1 bg-primary rounded-full"></div>
              </div>
              <div className="lg:col-span-8">
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="divide-y divide-border">
                    {blocks.companyProfile.fields.map((field: any, i: number) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center py-4 px-6 hover:bg-muted/50 transition-colors">
                        <div className="sm:w-1/3 text-sm font-semibold text-foreground mb-1 sm:mb-0 pr-4">
                          {field.label}
                        </div>
                        <div className="sm:w-2/3 text-sm text-muted-foreground">
                          {field.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── MISSION & VISION (DYNAMIC) ─── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="flex h-full flex-col justify-center p-8 md:p-12">
                <Target className="mb-6 h-12 w-12 opacity-90" />
                <h2 className="mb-4 text-2xl font-bold tracking-tight">Our Mission</h2>
                <p className="text-lg leading-relaxed opacity-90">
                  {blocks?.missionVision?.mission ||
                    "To empower organizations with robust, modern digital products that solve complex problems, driving sustainable business growth through relentless engineering excellence and uncompromising quality."}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="flex h-full flex-col justify-center p-8 md:p-12">
                <Eye className="text-primary mb-6 h-12 w-12" />
                <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight">
                  Our Vision
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {blocks?.missionVision?.vision ||
                    "To be the trusted technology partner of choice for ambitious companies globally, recognized for building resilient, AI-enhanced architectures that define the next generation of software."}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ─── CORE VALUES ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
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
                <Card key={i} className="shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section>
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              How We Deliver Success
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Our structured development process ensures every project is delivered efficiently, transparently, and with exceptional quality.
            </p>
          </div>

          <div className="relative">
            {/* Timeline track for desktop */}
            <div
              className="bg-border absolute left-0 top-1/2 z-0 hidden h-0.5 w-full -translate-y-1/2 lg:block"
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
                    <div className="bg-background border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-sm transition-colors">
                      <IconComp className="h-7 w-7" />
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">{step.title}</h3>
                    <span className="text-muted-foreground mt-1 text-xs font-medium uppercase tracking-wider">
                      Step 0{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WHY CHOOSE VORYENT ─── */}
      <Section>
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
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
                <Card key={i} className="border-border/50 shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <IconComp className="text-primary mb-4 h-8 w-8" />
                    <h3 className="text-foreground mb-2 text-lg font-semibold">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── OUR LEADERSHIP (DYNAMIC) ─── */}
      {blocks?.leadership?.members?.length > 0 && (
        <Section className="bg-background pt-16">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-4xl font-extrabold tracking-tight">
                {blocks.leadership.title || "Our Leadership"}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {blocks.leadership.members.map((member: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <div className="relative mb-6 h-80 w-full overflow-hidden rounded-lg">
                    <Image
                      src={member.image || "/Assets/Illustrations/AI Illustration.webp"}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-foreground text-2xl font-bold">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-base">
                    {member.title}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
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
        <Section className="bg-muted/10">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                Meet the Team
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                The talented engineers, designers, and strategists behind Voryent Solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {employees.map((emp: any, i: number) => (
                <Card
                  key={emp.id || i}
                  className="border-border/50 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="bg-muted border-primary/20 text-primary relative mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 text-2xl font-bold">
                      {emp.firstName?.[0]}
                      {emp.lastName?.[0]}
                    </div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {emp.firstName} {emp.lastName}
                    </h3>
                    <p className="text-primary mb-2 mt-1 text-sm font-medium">{emp.position}</p>
                    {emp.department && (
                      <Badge variant="secondary" className="text-xs">
                        {emp.department}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── OUR INVESTORS (DYNAMIC) ─── */}
      {investors.length > 0 && (
        <Section className="bg-muted/5">
          <Container>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
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
                  className="bg-card border-border/50 w-full rounded-xl border p-6 text-center shadow-sm transition-shadow hover:shadow-md sm:w-[250px]"
                >
                  <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="text-foreground text-lg font-semibold">{inv.name}</h3>
                  {inv.organization && (
                    <p className="text-muted-foreground mt-1 text-sm">{inv.organization}</p>
                  )}
                  <Badge variant="outline" className="mt-3">
                    {inv.type} Investor
                  </Badge>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
          <div className="bg-primary relative overflow-hidden rounded-3xl px-8 py-20 text-center shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-primary-foreground mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Let&apos;s build something exceptional together.
              </h2>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-12 bg-transparent px-8 text-base"
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
