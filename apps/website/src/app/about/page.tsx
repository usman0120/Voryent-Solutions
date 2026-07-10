import Image from "next/image"
import Link from "next/link"
import { Container, Section, Button, Badge, Card, CardContent, CardHeader, CardTitle } from "@voryent/ui"
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
  Cpu
} from "lucide-react"

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium">
                About Voryent
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Building modern digital products with engineering excellence and long-term partnerships.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We are a dedicated team of engineers, designers, and strategists. 
                We build scalable, high-performance software solutions for ambitious organizations 
                who demand robust architectures, intelligent AI workflows, and flawless user experiences.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/contact">
                    Let&apos;s Talk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="/services">
                    View Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl lg:ml-auto bg-muted">
              <Image
                src="/Assets/Illustrations/AI Illustration.jpg"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Who We Are
              </h2>
              <div className="mt-6 space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Voryent Solutions exists to bridge the gap between complex business challenges and elegant technical solutions. 
                  In a rapidly evolving digital landscape, organizations need more than just code—they need reliable architectures that can scale seamlessly from day one.
                </p>
                <p>
                  We focus on modern engineering practices, clean architecture, and AI-first workflows. 
                  Our approach isn&apos;t just about delivering a project; it&apos;s about forming long-term partnerships 
                  where we deeply understand your business domain and continuously add value.
                </p>
                <p>
                  We don&apos;t build black boxes. We prioritize transparency, rigorous testing, and maintainable codebases 
                  so that your team is always empowered and your infrastructure is always secure.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary flex-shrink-0">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Engineering First</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Rigorous code reviews, comprehensive testing, and scalable cloud-native architectures are our standard, not an afterthought.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary flex-shrink-0">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Business Focused</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      We align technical decisions directly with your business KPIs to ensure measurable ROI and sustainable growth.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary flex-shrink-0">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">AI Powered</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Integrating intelligent automation and data pipelines to give you a decisive competitive advantage in your market.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── MISSION & VISION ─── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="p-8 md:p-12 flex flex-col h-full justify-center">
                <Target className="h-12 w-12 mb-6 opacity-90" />
                <h2 className="text-2xl font-bold tracking-tight mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed opacity-90">
                  To empower organizations with robust, modern digital products that solve complex problems, driving sustainable business growth through relentless engineering excellence and uncompromising quality.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-lg border-border">
              <CardContent className="p-8 md:p-12 flex flex-col h-full justify-center">
                <Eye className="h-12 w-12 mb-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be the trusted technology partner of choice for ambitious companies globally, recognized for building resilient, AI-enhanced architectures that define the next generation of software.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ─── CORE VALUES ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The fundamental principles that guide our decisions, shape our culture, and define how we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Quality", desc: "We never compromise on the integrity of our code or the polish of our interfaces." },
              { icon: Eye, title: "Transparency", desc: "Honest communication, clear timelines, and open collaboration at every step." },
              { icon: Lightbulb, title: "Innovation", desc: "Continuously adopting proven modern paradigms to deliver better solutions, faster." },
              { icon: ShieldCheck, title: "Reliability", desc: "Building systems you can depend on, backed by responsive and accountable support." },
              { icon: Layers, title: "Scalability", desc: "Architecting for the future so you never have to throw away code as you grow." },
              { icon: Lock, title: "Security", desc: "Security-by-design principles baked into every component and deployment." },
            ].map((value, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Our Process</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A systematic, transparent approach from the first conversation to continuous deployment.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline track for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {[
                { icon: Search, title: "Discover" },
                { icon: PenTool, title: "Plan" },
                { icon: Eye, title: "Design" },
                { icon: Code2, title: "Develop" },
                { icon: Rocket, title: "Deploy" },
                { icon: LifeBuoy, title: "Support" },
              ].map((step, i) => (
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

      {/* ─── TECHNOLOGIES ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Technologies</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We leverage an elite, modern technology stack to ensure performance, type safety, and developer velocity.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js", "React", "TypeScript", "Node.js", "Supabase", 
              "Tailwind CSS", "PostgreSQL", "Clerk", "Resend", "Vercel"
            ].map((tech) => (
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

      {/* ─── WHY CHOOSE VORYENT ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Why Choose Voryent</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What sets us apart in delivering exceptional digital products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Modern Stack", desc: "We use the latest tools that are proven in production to ensure high performance and maintainability." },
              { icon: Zap, title: "Fast Delivery", desc: "Agile methodologies and CI/CD pipelines enable rapid iterations and faster time-to-market." },
              { icon: Server, title: "Scalable Architecture", desc: "Systems designed to handle growing user bases and expanding data demands effortlessly." },
              { icon: Cpu, title: "AI-Enhanced Development", desc: "Leveraging AI internally to accelerate development and writing AI integrations for your products." },
              { icon: Code2, title: "Clean Code", desc: "Strict typing, modularity, and comprehensive documentation ensure code is easily understandable." },
              { icon: Clock, title: "Long-Term Support", desc: "We don't just build and leave; we provide ongoing maintenance, updates, and strategic guidance." },
            ].map((reason, i) => (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <reason.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </CardContent>
              </Card>
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
