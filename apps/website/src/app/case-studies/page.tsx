import Image from "next/image"
import Link from "next/link"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { ArrowRight, Code2 } from "lucide-react"
import { getCaseStudies } from "../../lib/caseStudies"

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies()

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              In-Depth Project Stories
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore how we solve complex business challenges with scalable architecture, intelligent design, and rigorous engineering.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── CASE STUDY GRID ─── */}
      <Section className="bg-muted/30 pb-24 pt-16">
        <Container>
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {caseStudies.map((study) => (
                <Card key={study.slug} className="flex flex-col h-full border-border/50 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative aspect-[16/9] w-full bg-muted border-b border-border/50 overflow-hidden">
                    <Image
                      src={study.imageSrc}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {study.industry}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                        {study.projectType}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {study.outcomeSummary}
                    </p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {study.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="inline-flex items-center rounded-md border border-border/50 bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 4 && (
                        <span className="inline-flex items-center rounded-md border border-border/50 bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          +{study.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    <Button asChild variant="default" className="w-fit">
                      <Link href={`/case-studies/${study.slug}`}>
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-4">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Case studies coming soon
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
                We&apos;re currently preparing our first public case studies.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                Ready to solve your toughest engineering challenges?
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
