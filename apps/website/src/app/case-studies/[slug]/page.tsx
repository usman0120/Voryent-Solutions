import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, Button, Card, CardContent } from "@voryent/ui";
import { ArrowRight, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { getCaseStudyBySlug, getCaseStudiesFromDb } from "@/lib/firebase/services";
import { JsonLd } from "../../../components/json-ld";

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const allCaseStudies = await getCaseStudiesFromDb();
  const relatedProjects = allCaseStudies.filter((s) => s.slug !== slug).slice(0, 3);

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy?.title || "",
    image: ["https://voryentsolutions.com" + (caseStudy?.imageSrc || "")],
    description: caseStudy.heroSubheadline,
    creator: {
      "@type": "Organization",
      name: "Voryent Solutions",
    },
  };

  return (
    <>
      <JsonLd data={caseStudyJsonLd} />
      {/* ─── HERO ─── */}
      <Section className="border-border/50 relative overflow-hidden border-b pb-16 pt-24 md:pb-24 md:pt-32">
        <div
          className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-b via-transparent to-transparent"
          aria-hidden="true"
        />
        <Container>
          <div className="max-w-4xl">
            <div className="text-muted-foreground mb-6 flex items-center gap-2 text-sm">
              <Link href="/case-studies" className="hover:text-primary transition-colors">
                Case Studies
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{caseStudy.title}</span>
            </div>

            <h1 className="text-foreground mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {caseStudy.heroHeadline}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed md:text-xl">
              {caseStudy.heroSubheadline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm font-medium">
              <div className="bg-secondary/50 text-secondary-foreground rounded-full px-3 py-1">
                {caseStudy.industry}
              </div>
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1">
                {caseStudy.projectType}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── OVERVIEW ─── */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Col - Overview Text */}
            <div className="space-y-8 lg:col-span-7">
              <div>
                <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight">Overview</h2>
                <div className="space-y-4">
                  {(caseStudy.overview || []).map((paragraph: string, i: number) => (
                    <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Challenge */}
              <div className="pt-8">
                <h2 className="text-foreground mb-6 text-2xl font-bold tracking-tight">
                  The Challenge
                </h2>
                <div className="space-y-4">
                  {(caseStudy.challenge || []).map((paragraph: string, i: number) => (
                    <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {(caseStudy.challengeList || []).length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {(caseStudy.challengeList || []).map((item: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Solution */}
              <div className="pt-8">
                <h2 className="text-foreground mb-6 text-2xl font-bold tracking-tight">
                  Our Solution
                </h2>
                <div className="space-y-4">
                  {(caseStudy.solution || []).map((paragraph: string, i: number) => (
                    <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {(caseStudy.solutionList || []).length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {(caseStudy.solutionList || []).map((item: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
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
                <div className="border-border/50 bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-xl border shadow-xl">
                  <Image
                    src={
                      caseStudy.imageSrc ||
                      caseStudy.coverImage ||
                      "/Assets/Illustrations/AI Illustration.webp"
                    }
                    alt={caseStudy.title || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="border-border/50 bg-card rounded-xl border p-8 shadow-sm">
                  <h3 className="text-foreground mb-6 flex items-center gap-2 text-lg font-bold">
                    <Layers className="text-primary h-5 w-5" />
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(caseStudy.technologies || []).map((tech: string) => (
                      <span
                        key={tech}
                        className="bg-secondary/50 text-secondary-foreground inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium"
                      >
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
      <Section className="bg-muted/30 py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              Development Process
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              How we brought this project from concept to production.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {(caseStudy.processSteps || []).map((step: any, index: number) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  {/* Desktop layout: alternating or left-aligned. We will use a clean left-aligned list with large numbers. */}
                  <div className="items-start gap-6 md:flex">
                    <div className="bg-background border-border/50 text-primary hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-2xl font-bold shadow-sm md:flex">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-foreground mb-2 flex items-center gap-3 text-xl font-bold">
                        <span className="text-primary md:hidden">0{index + 1}.</span>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
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
      {(caseStudy.results || []).length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-foreground mb-8 text-3xl font-bold tracking-tight">
                Outcomes & Results
              </h2>
              <div className="space-y-6">
                {(caseStudy.results || []).map((res: string, i: number) => (
                  <div key={i} className="border-border/50 bg-card rounded-xl border p-6 shadow-sm">
                    <p className="text-foreground text-lg leading-relaxed">{res}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── RELATED PROJECTS ─── */}
      {relatedProjects.length > 0 && (
        <Section className="border-border/50 bg-muted/10 border-t py-16 md:py-24">
          <Container>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-foreground text-3xl font-bold tracking-tight">
                  More Case Studies
                </h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  Explore other projects engineered by Voryent Solutions.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/case-studies">View All Projects</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/case-studies/${project.slug}`}
                  className="bg-card hover:border-primary/30 group relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="bg-muted border-border/50 relative aspect-video w-full overflow-hidden border-b">
                    <Image
                      src={
                        project.imageSrc ||
                        project.coverImage ||
                        "/Assets/Illustrations/AI Illustration.webp"
                      }
                      alt={project.title || ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <div className="text-primary mb-2 text-xs font-semibold uppercase tracking-wider">
                      {project.industry}
                    </div>
                    <h3 className="text-foreground mb-2 text-lg font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-auto line-clamp-2 text-sm">
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
      <Section className="bg-muted/10 pb-24 pt-12">
        <Container>
          <div className="bg-primary relative overflow-hidden rounded-3xl px-8 py-20 text-center shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-primary-foreground mb-6 whitespace-pre-line text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {caseStudy.ctaText}
              </h2>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Let&apos;s Talk</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground h-12 bg-transparent px-8 text-base"
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
