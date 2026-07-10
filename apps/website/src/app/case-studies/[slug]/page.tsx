import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { ArrowRight, CheckCircle2, ChevronRight, Layers } from "lucide-react"
import { getCaseStudyBySlug, getCaseStudies } from "../../../lib/caseStudies"
import { JsonLd } from "../../../components/json-ld"

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const allCaseStudies = getCaseStudies()
  const relatedProjects = allCaseStudies
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": caseStudy.title,
    "image": [
      "https://voryentsolutions.com" + caseStudy.imageSrc
    ],
    "description": caseStudy.heroSubheadline,
    "creator": {
        "@type": "Organization",
        "name": "Voryent Solutions",
    }
  }

  return (
    <>
      <JsonLd data={caseStudyJsonLd} />
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{caseStudy.title}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {caseStudy.heroHeadline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {caseStudy.heroSubheadline}
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center text-sm font-medium">
              <div className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                {caseStudy.industry}
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                {caseStudy.projectType}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── OVERVIEW ─── */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Col - Overview Text */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Overview</h2>
                <div className="space-y-4">
                  {caseStudy.overview.map((paragraph, i) => (
                    <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Challenge */}
              <div className="pt-8">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">The Challenge</h2>
                <div className="space-y-4">
                  {caseStudy.challenge.map((paragraph, i) => (
                    <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {caseStudy.challengeList.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {caseStudy.challengeList.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Solution */}
              <div className="pt-8">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Our Solution</h2>
                <div className="space-y-4">
                  {caseStudy.solution.map((paragraph, i) => (
                    <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {caseStudy.solutionList.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {caseStudy.solutionList.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Right Col - Sticky Sidebar / Image */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-8">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-xl border border-border/50 bg-muted">
                  <Image
                    src={caseStudy.imageSrc}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech) => (
                      <span key={tech} className="inline-flex items-center rounded-md bg-secondary/50 px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS ─── */}
      <Section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Development Process</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              How we brought this project from concept to production.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {caseStudy.processSteps.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  {/* Desktop layout: alternating or left-aligned. We will use a clean left-aligned list with large numbers. */}
                  <div className="md:flex gap-6 items-start">
                    <div className="hidden md:flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-background border border-border/50 text-2xl font-bold text-primary shadow-sm">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-3">
                        <span className="md:hidden text-primary">0{index + 1}.</span>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RESULTS ─── */}
      {caseStudy.results.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Outcomes & Results</h2>
              <div className="space-y-6">
                {caseStudy.results.map((res, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border/50 bg-card shadow-sm">
                    <p className="text-lg text-foreground leading-relaxed">
                      {res}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── RELATED PROJECTS ─── */}
      {relatedProjects.length > 0 && (
        <Section className="py-16 md:py-24 border-t border-border/50 bg-muted/10">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">More Case Studies</h2>
                <p className="mt-2 text-muted-foreground text-lg">Explore other projects engineered by Voryent Solutions.</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/case-studies">View All Projects</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/case-studies/${project.slug}`} className="group relative rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col">
                  <div className="relative aspect-video w-full bg-muted border-b border-border/50 overflow-hidden">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                      {project.industry}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                      {project.outcomeSummary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12 bg-muted/10">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight whitespace-pre-line">
                {caseStudy.ctaText}
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Let&apos;s Talk</Link>
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
