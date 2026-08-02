import Image from "next/image";
import Link from "next/link";
import { Container, Section, Button } from "@voryent/ui";
import { ArrowRight, Code2 } from "lucide-react";
import { getCaseStudiesFromDb } from "@/lib/firebase/services";
import { CaseStudyCard } from "./case-study-card";

export default async function CaseStudiesPage() {
  const caseStudiesRaw = await getCaseStudiesFromDb();
  // Sanitize data to remove Firestore Timestamp objects before passing to client components
  const caseStudies = JSON.parse(JSON.stringify(caseStudiesRaw));

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pb-16 pt-24 text-center md:pb-24 md:pt-32">
        <div
          className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-b via-transparent to-transparent"
          aria-hidden="true"
        />
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-foreground text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              In-Depth Project Stories
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed md:text-xl">
              Explore how we solve complex business challenges with scalable architecture,
              intelligent design, and rigorous engineering.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── CASE STUDY GRID ─── */}
      <Section className="bg-muted/30 pb-24 pt-16">
        <Container>
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study: any, index: number) => (
                <CaseStudyCard key={study.id || study.slug || index} study={study} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/20 flex flex-col items-center justify-center rounded-xl border border-dashed p-16 text-center">
              <div className="bg-muted/50 text-muted-foreground mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">Case studies coming soon</h3>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
                We&apos;re currently preparing our first public case studies.
              </p>
            </div>
          )}
        </Container>
      </Section>

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
                Ready to solve your toughest engineering challenges?
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
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
