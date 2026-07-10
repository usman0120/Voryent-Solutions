import Link from "next/link"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { 
  ArrowRight, 
  BookOpen, 
  DownloadCloud, 
  FileText, 
  Layers, 
  Map, 
  Wrench, 
  HelpCircle,
  FileBox,
  Compass
} from "lucide-react"

import { getAllContent } from "../../lib/content"
import type { LucideIcon } from "lucide-react"

export default async function ResourcesPage() {
  const content = getAllContent("resources")

  const categories = [
    { title: "Articles", icon: BookOpen, description: "Deep dives into engineering practices and tech trends.", link: "/blog" },
    { title: "Guides", icon: Map, description: "Step-by-step tutorials on digital transformation.", link: "#guides" },
    { title: "Downloads", icon: DownloadCloud, description: "E-books, whitepapers, and valuable assets.", link: "#downloads" },
    { title: "Checklists", icon: FileText, description: "Actionable lists for planning and deploying software.", link: "#downloads" },
    { title: "Templates", icon: Layers, description: "Starter kits and architectural boilerplates.", link: "#tools" },
    { title: "Documentation", icon: FileBox, description: "Technical docs for our open-source tools.", link: "#tools" },
  ]

  const guidesContent = content.filter(c => c["type"] === "guide").sort((a, b) => (a["order"] as number) - (b["order"] as number))
  const faqsContent = content.filter(c => c["type"] === "faq").sort((a, b) => (a["order"] as number) - (b["order"] as number))

  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Compass,
    HelpCircle,
  }

  const guides = guidesContent.map(g => ({
    title: g["title"] as string,
    description: g["summary"] as string,
    link: g["link"] as string,
    icon: iconMap[g["icon"] as string] || Map
  }))

  const faqs = faqsContent.map(f => ({
    question: f["question"] as string,
    answer: f.content as string,
  }))

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Knowledge Base
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Everything useful in one place. Explore our curated collection of articles, guides, templates, and digital tools.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── RESOURCE CATEGORIES ─── */}
      <Section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Explore by Category</h2>
            <p className="mt-4 text-muted-foreground text-lg">Find exactly what you need to accelerate your next project.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.link} className="group block h-full">
                <Card className="h-full border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30 bg-background">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── DOWNLOADS ─── */}
      <Section id="downloads" className="py-16 md:py-24 border-t border-border/50">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <DownloadCloud className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Downloads & Checklists</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 p-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-4">
              <FileBox className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Resources coming soon
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Our engineering team is currently crafting extensive checklists, templates, and whitepapers. Check back shortly.
            </p>
            <Button variant="outline" disabled>
              Notify Me When Available
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── GUIDES ─── */}
      <Section id="guides" className="py-16 md:py-24 bg-muted/30 border-y border-border/50">
        <Container>
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Map className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Essential Guides</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, i) => (
              <Card key={i} className="flex flex-col h-full border-border/50 shadow-sm hover:border-primary/30 transition-all bg-background">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/50 text-secondary-foreground mb-6">
                    <guide.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow mb-6">
                    {guide.description}
                  </p>
                  <Button asChild variant="ghost" className="w-fit p-0 hover:bg-transparent text-primary hover:text-primary/80">
                    <Link href={guide.link} className="flex items-center">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── TOOLS ─── */}
      <Section id="tools" className="py-16 md:py-24">
        <Container>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Open Tools & Utilities</h2>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 p-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-4">
              <Wrench className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tools coming soon
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              We are working on open-sourcing several internal CLI utilities and design systems.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── FAQ PREVIEW ─── */}
      <Section className="py-16 md:py-24 bg-muted/30 border-t border-border/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Everything you need to know about our knowledge base and resources.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact">Ask a Different Question</Link>
              </Button>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12 bg-muted/30">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Contact our team directly and we'll point you in the right direction or build a custom solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
