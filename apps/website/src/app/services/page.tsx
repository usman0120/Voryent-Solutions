import Link from "next/link"
import { getServices, getFaqs } from "@/lib/firebase/services"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { FaqComponent } from "@voryent/ui"
import { 
  ArrowRight, 
  Code2, 
  Cloud, 
  Brain, 
  Smartphone, 
  Palette, 
  Terminal, 
  Lightbulb, 
  Search, 
  PenTool, 
  Eye, 
  Rocket, 
  LifeBuoy
} from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

const services = [
  {
    icon: Code2,
    title: "Custom Software",
    slug: "custom-software",
    description: "Bespoke applications designed specifically for your unique business logic and operational needs.",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    slug: "ai-solutions",
    description: "Intelligent automation, predictive analytics, and custom LLM integrations to give you a competitive edge.",
  },
  {
    icon: Terminal,
    title: "Web Development",
    slug: "web-development",
    description: "High-performance, scalable web applications built with modern frameworks and clean architecture.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    slug: "mobile-apps",
    description: "Native and cross-platform mobile experiences that delight users and drive engagement.",
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    slug: "cloud-engineering",
    description: "Resilient cloud-native infrastructure on AWS, Azure, or GCP optimized for security and cost.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    slug: "ui-ux",
    description: "Research-driven interfaces and user experiences that convert visitors into loyal customers.",
  },
  {
    icon: Code2, 
    title: "API Development",
    slug: "api-development",
    description: "Robust, secure, and well-documented APIs that connect your systems and empower integrations.",
  },
  {
    icon: Lightbulb,
    title: "Consulting",
    slug: "consulting",
    description: "Strategic technical guidance to align your IT roadmap with your long-term business objectives.",
  },
]

const processSteps = [
  { icon: Search, title: "Discover" },
  { icon: PenTool, title: "Plan" },
  { icon: Eye, title: "Design" },
  { icon: Code2, title: "Develop" },
  { icon: Rocket, title: "Deploy" },
  { icon: LifeBuoy, title: "Support" },
]

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Supabase", 
  "Tailwind CSS", "PostgreSQL", "Clerk", "Resend", "Vercel"
]

const faqs = [
  {
    question: "How do you price your services?",
    answer: "We offer both fixed-price contracts for well-defined scopes and time-and-materials arrangements for agile, ongoing development. We'll recommend the best model during our discovery call."
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer: "Yes. We offer comprehensive SLAs and retainer packages to ensure your software remains secure, updated, and optimized long after the initial launch."
  },
  {
    question: "Will we own the source code?",
    answer: "Absolutely. Once the project is completed and paid in full, all intellectual property and source code are fully transferred to you."
  },
  {
    question: "Can you rescue an existing project?",
    answer: "Yes, we frequently take over legacy systems or stalled projects. We start with a thorough code and architecture audit before proposing a remediation plan."
  },
  {
    question: "How do you handle project management and communication?",
    answer: "We use agile methodologies with weekly sprints. You'll have a dedicated project manager, access to our issue tracking boards, and regular video check-ins to ensure complete transparency."
  }
]

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function ServicesPage() {
  const [dbServices, dbFaqs] = await Promise.all([
    getServices().catch(() => []),
    getFaqs().catch(() => [])
  ]);

  const displayServices = dbServices.length > 0
    ? dbServices.map((s: any) => ({
        title: s.title,
        description: s.shortDescription || s.description,
        slug: s.slug,
        icon: Code2
      }))
    : services;

  const displayFaqs = dbFaqs.length > 0
    ? dbFaqs.map((f: any) => ({ question: f.question, answer: f.answer }))
    : faqs;

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Software engineering services built for modern businesses.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              From custom software and robust APIs to intelligent AI solutions and scalable cloud infrastructure, 
              we provide end-to-end technical expertise to accelerate your growth.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact">Start Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── SERVICES GRID ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {displayServices.map((service: any) => (
              <Card key={service.slug} className="flex flex-col h-full border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{service.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {service.description}
                  </p>
                  <Button asChild variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── DEVELOPMENT PROCESS ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Our Development Process</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A systematic, transparent approach from the first conversation to continuous deployment.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline track for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                  <span className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">Step 0{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── TECHNOLOGY STACK ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Technology Stack</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We leverage an elite, modern technology stack to ensure performance, type safety, and developer velocity.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <div 
                key={tech} 
                className="px-6 py-3 rounded-full bg-background border border-border shadow-sm text-foreground font-medium flex items-center gap-2 hover:border-primary/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary/80" />
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── FAQ PREVIEW ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about working with us.
            </p>
          </div>
          
          <FaqComponent items={displayFaqs} />
          
          <div className="mt-10 text-center">
            <Button asChild variant="link" className="text-primary text-base">
              <Link href="/faq">
                View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                Let&apos;s build something exceptional together.
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
