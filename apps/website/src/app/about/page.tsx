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
                {blocks?.hero?.title ||
                  "Building modern digital products with engineering excellence and long-term partnerships."}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                {blocks?.hero?.description ||
                  "We are a dedicated team of engineers, designers, and strategists. We build scalable, high-performance software solutions for ambitious organizations who demand robust architectures, intelligent AI workflows, and flawless user experiences."}
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
                {blocks?.whoWeAre?.title || "Who We Are"}
              </h2>
              <div className="text-muted-foreground mt-6 space-y-6 text-lg leading-relaxed">
                {(
                  blocks?.whoWeAre?.paragraphs || [
                    "Voryent Solutions exists to bridge the gap between complex business challenges and elegant technical solutions. In a rapidly evolving digital landscape, organizations need more than just code—they need reliable architectures that can scale seamlessly from day one.",
                    "We focus on modern engineering practices, clean architecture, and AI-first workflows. Our approach isn't just about delivering a project; it's about forming long-term partnerships where we deeply understand your business domain and continuously add value.",
                    "We don't build black boxes. We prioritize transparency, rigorous testing, and maintainable codebases so that your team is always empowered and your infrastructure is always secure.",
                  ]
                ).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              {(
                blocks?.whoWeAre?.pillars || [
                  {
                    icon: "Code2",
                    title: "Engineering First",
                    description:
                      "Rigorous code reviews, comprehensive testing, and scalable cloud-native architectures are our standard, not an afterthought.",
                  },
                  {
                    icon: "Briefcase",
                    title: "Business Focused",
                    description:
                      "We align technical decisions directly with your business KPIs to ensure measurable ROI and sustainable growth.",
                  },
                  {
                    icon: "Bot",
                    title: "AI Powered",
                    description:
                      "Integrating intelligent automation and data pipelines to give you a decisive competitive advantage in your market.",
                  },
                ]
              ).map((pillar: any, i: number) => {
                const IconComp =
                  pillar.icon === "Briefcase" ? Briefcase : pillar.icon === "Bot" ? Bot : Code2;
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

      {/* ─── MISSION & VISION ─── */}
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
              {blocks?.coreValues?.title || "Core Values"}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {blocks?.coreValues?.description ||
                "The fundamental principles that guide our decisions, shape our culture, and define how we build."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(
              blocks?.coreValues?.items || [
                {
                  icon: "Award",
                  title: "Quality",
                  desc: "We never compromise on the integrity of our code or the polish of our interfaces.",
                },
                {
                  icon: "Eye",
                  title: "Transparency",
                  desc: "Honest communication, clear timelines, and open collaboration at every step.",
                },
                {
                  icon: "Lightbulb",
                  title: "Innovation",
                  desc: "Continuously adopting proven modern paradigms to deliver better solutions, faster.",
                },
                {
                  icon: "ShieldCheck",
                  title: "Reliability",
                  desc: "Building systems you can depend on, backed by responsive and accountable support.",
                },
                {
                  icon: "Layers",
                  title: "Scalability",
                  desc: "Architecting for the future so you never have to throw away code as you grow.",
                },
                {
                  icon: "Lock",
                  title: "Security",
                  desc: "Security-by-design principles baked into every component and deployment.",
                },
              ]
            ).map((value: any, i: number) => {
              const IconComp =
                value.icon === "Eye"
                  ? Eye
                  : value.icon === "Lightbulb"
                    ? Lightbulb
                    : value.icon === "ShieldCheck"
                      ? ShieldCheck
                      : value.icon === "Layers"
                        ? Layers
                        : value.icon === "Lock"
                          ? Lock
                          : Award;
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
              {blocks?.processSteps?.title || "Our Process"}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {blocks?.processSteps?.description ||
                "A systematic, transparent approach from the first conversation to continuous deployment."}
            </p>
          </div>

          <div className="relative">
            {/* Timeline track for desktop */}
            <div
              className="bg-border absolute left-0 top-1/2 z-0 hidden h-0.5 w-full -translate-y-1/2 lg:block"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
              {(
                blocks?.processSteps?.items || [
                  { icon: "Search", title: "Discover" },
                  { icon: "PenTool", title: "Plan" },
                  { icon: "Eye", title: "Design" },
                  { icon: "Code2", title: "Develop" },
                  { icon: "Rocket", title: "Deploy" },
                  { icon: "LifeBuoy", title: "Support" },
                ]
              ).map((step: any, i: number) => {
                const IconComp =
                  step.icon === "PenTool"
                    ? PenTool
                    : step.icon === "Eye"
                      ? Eye
                      : step.icon === "Code2"
                        ? Code2
                        : step.icon === "Rocket"
                          ? Rocket
                          : step.icon === "LifeBuoy"
                            ? LifeBuoy
                            : Search;
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
              {blocks?.whyChooseVoryent?.title || "Why Choose Voryent"}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {blocks?.whyChooseVoryent?.description ||
                "What sets us apart in delivering exceptional digital products."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(
              blocks?.whyChooseVoryent?.items || [
                {
                  icon: "Layers",
                  title: "Modern Stack",
                  desc: "We use the latest tools that are proven in production to ensure high performance and maintainability.",
                },
                {
                  icon: "Zap",
                  title: "Fast Delivery",
                  desc: "Agile methodologies and CI/CD pipelines enable rapid iterations and faster time-to-market.",
                },
                {
                  icon: "Server",
                  title: "Scalable Architecture",
                  desc: "Systems designed to handle growing user bases and expanding data demands effortlessly.",
                },
                {
                  icon: "Cpu",
                  title: "AI-Enhanced Development",
                  desc: "Leveraging AI internally to accelerate development and writing AI integrations for your products.",
                },
                {
                  icon: "Code2",
                  title: "Clean Code",
                  desc: "Strict typing, modularity, and comprehensive documentation ensure code is easily understandable.",
                },
                {
                  icon: "Clock",
                  title: "Long-Term Support",
                  desc: "We don't just build and leave; we provide ongoing maintenance, updates, and strategic guidance.",
                },
              ]
            ).map((reason: any, i: number) => {
              const IconComp =
                reason.icon === "Zap"
                  ? Zap
                  : reason.icon === "Server"
                    ? Server
                    : reason.icon === "Cpu"
                      ? Cpu
                      : reason.icon === "Code2"
                        ? Code2
                        : reason.icon === "Clock"
                          ? Clock
                          : Layers;
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

      {/* ─── OUR TEAM ─── */}
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

      {/* ─── OUR INVESTORS ─── */}
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
