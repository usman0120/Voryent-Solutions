import Link from "next/link"
import { getIndustries } from "@/lib/firebase/services"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { 
  ArrowRight, 
  HeartPulse, 
  GraduationCap, 
  Landmark, 
  ShoppingBag, 
  Factory, 
  Building2, 
  Truck, 
  Rocket, 
  Cloud, 
  Briefcase,
  Layers,
  Zap,
  Brain
} from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "HIPAA-compliant platforms, telemedicine infrastructure, and patient data management systems designed for modern medical providers.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Scalable e-learning portals, student management systems, and interactive educational tools that power the future of learning.",
  },
  {
    icon: Landmark,
    title: "Finance",
    description: "Highly secure fintech applications, real-time trading dashboards, and blockchain-integrated platforms built for absolute reliability.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "Headless commerce architectures, inventory management systems, and high-conversion storefronts designed to scale.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "IoT integrations, supply chain visibility tools, and resource planning software to optimize your production lines.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property management platforms, virtual tour integrations, and CRM tools built specifically for real estate professionals.",
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Real-time fleet tracking, predictive maintenance systems, and automated routing software for modern supply chains.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "Rapid MVP development, scalable architectures, and agile engineering designed to help founders iterate and find product-market fit.",
  },
  {
    icon: Cloud,
    title: "SaaS",
    description: "Multi-tenant architectures, subscription billing integrations, and robust APIs to power your software-as-a-service product.",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    description: "Complex system migrations, legacy software modernization, and internal workflow automation for large-scale organizations.",
  },
]

const technologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Supabase", 
  "Tailwind CSS", "PostgreSQL", "Clerk", "Resend", "Vercel"
]

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function IndustriesPage() {
  let dbIndustries = await getIndustries().catch(() => []);

  const displayIndustries = dbIndustries.length > 0
    ? dbIndustries.map((i: any) => ({ title: i.name, description: i.description, slug: i.slug, icon: Building2 }))
    : industries;

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Engineering solutions for every industry.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              We bring deep technical expertise and domain-specific knowledge to help organizations across all sectors modernize, scale, and innovate.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact">Discuss Your Industry</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── INDUSTRIES GRID ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayIndustries.map((industry: any) => (
              <Card key={industry.title} className="flex flex-col h-full border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary/20">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3" id={industry.slug}>{industry.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {industry.description}
                  </p>
                  <Button asChild variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform">
                    <Link href="/contact">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── HOW WE HELP (3-COLUMN) ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">How We Help</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our engineering approach solves core business challenges regardless of your sector.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start text-left p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Digital Transformation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We modernize legacy systems and transition organizations to agile, cloud-native architectures. By eliminating technical debt, we enable your team to move faster and respond instantly to market demands.
              </p>
            </div>

            <div className="flex flex-col items-start text-left p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Automation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We identify operational bottlenecks and engineer robust automated workflows. From supply chain logistics to internal HR processes, we build software that reduces human error and cuts operational costs.
              </p>
            </div>

            <div className="flex flex-col items-start text-left p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement intelligent machine learning models and LLMs specifically tuned to your domain data. This unlocks predictive analytics, automated customer support, and completely new revenue streams.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── TECHNOLOGY EXPERTISE ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Technology Expertise</h2>
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
