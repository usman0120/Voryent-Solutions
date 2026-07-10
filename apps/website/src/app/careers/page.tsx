import type { Metadata } from "next"
import Link from "next/link"
import { 
  Container, 
  Section, 
  Button, 
  Badge, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  EmptyState,
  FaqComponent
} from "@voryent/ui"
import { 
  ArrowRight, 
  MapPin, 
  Code2, 
  BookOpen, 
  Heart, 
  Rocket, 
  Briefcase,
  FileText,
  Search,
  Users,
  Settings,
  Award,
  ThumbsUp
} from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Voryent Solutions",
  description: "Join Voryent Solutions. Build software that makes a difference. We value engineering excellence, learning, ownership, and collaboration.",
  alternates: {
    canonical: "https://voryentsolutions.com/careers",
  },
}

export default function CareersPage() {
  const faqItems = [
    {
      question: "Do you offer remote work?",
      answer: "Yes, we are a remote-first company. We hire talented engineers from all over the world and provide flexible working hours to accommodate different time zones."
    },
    {
      question: "What is the interview process like?",
      answer: "Our process typically includes an initial application review, a behavioral interview, a technical discussion (not a whiteboard test), an offer, and onboarding."
    },
    {
      question: "What tech stack do you use?",
      answer: "We primarily work with React, Next.js, Node.js, TypeScript, PostgreSQL, and various cloud platforms like AWS and Vercel. We also heavily utilize AI tools in our workflows."
    },
    {
      question: "Are there opportunities for career growth?",
      answer: "Absolutely. We prioritize internal mobility, continuous learning, and provide budgets for courses, certifications, and conferences."
    }
  ]

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium">
              Join the Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Build software that makes a difference.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Voryent, we value engineering excellence, continuous learning, extreme ownership, and seamless collaboration. Join us to build robust architectures and intelligent workflows for ambitious organizations.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <a href="#open-roles">
                  View Open Roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WHY WORK WITH VORYENT / BENEFITS ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Why Work With Voryent</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide the environment, tools, and culture you need to do your best work and grow your career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Remote-first", desc: "Work from wherever you are most productive. We care about your output and impact, not your location." },
              { icon: Code2, title: "Modern Tech Stack", desc: "Work with React, Next.js, Node, and the latest AI integrations on modern, scalable infrastructure." },
              { icon: BookOpen, title: "Learning & Growth", desc: "Dedicated budgets for courses, certifications, and attending industry conferences." },
              { icon: Heart, title: "Flexible Culture", desc: "We believe in a healthy work-life balance, asynchronous communication, and flexible hours." },
              { icon: Rocket, title: "Challenging Projects", desc: "Tackle complex engineering problems and deliver products that have real business impact." },
              { icon: Briefcase, title: "Long-term Career", desc: "We build long-term partnerships not only with our clients, but with our team members." },
            ].map((benefit, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── OPEN POSITIONS ─── */}
      <Section id="open-roles">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Open Positions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our current openings and find where you fit in.
            </p>
          </div>
          
          <EmptyState 
            title="No open positions at the moment."
            description="We don't have any specific roles open right now, but we are always looking for talented engineers and designers. We'd still love to hear from you."
            action={
              <Button asChild size="lg">
                <Link href="/contact">
                  Submit General Application
                </Link>
              </Button>
            }
          />
        </Container>
      </Section>

      {/* ─── HIRING PROCESS ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Our Hiring Process</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A transparent, respectful, and efficient process designed to let you show your true capabilities.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline track for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {[
                { icon: FileText, title: "Apply" },
                { icon: Search, title: "Review" },
                { icon: Users, title: "Interview" },
                { icon: Settings, title: "Technical Discussion" },
                { icon: Award, title: "Offer" },
                { icon: ThumbsUp, title: "Welcome" },
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

      {/* ─── FAQ PREVIEW ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Common questions about working at Voryent Solutions.
            </p>
          </div>
          
          <FaqComponent items={faqItems} />
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/faq">View All FAQs</Link>
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
                Ready to make an impact?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-10">
                Join our team and help us build scalable, high-performance software solutions for ambitious organizations.
              </p>
              <div className="mt-10 flex justify-center">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
