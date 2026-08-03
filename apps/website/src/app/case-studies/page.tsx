import Link from "next/link";
import { Container, Section, Button } from "@voryent/ui";
import { ArrowRight, Code2, Shield, Zap, Target } from "lucide-react";
import { getCaseStudiesFromDb } from "@/lib/firebase/services";
import { CaseStudyCard } from "./case-study-card";

export default async function CaseStudiesPage() {
  const caseStudiesRaw = await getCaseStudiesFromDb();
  // Sanitize data to remove Firestore Timestamp objects before passing to client components
  const caseStudies = JSON.parse(JSON.stringify(caseStudiesRaw));

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative flex min-h-[70vh] items-end overflow-hidden bg-black pb-24 pt-48 text-white">
        {/* Structural / Abstract Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Structural Abstract"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="max-w-5xl">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Case Studies
            </span>
            <h1 className="mb-8 text-5xl font-bold leading-[1.0] tracking-tighter text-white sm:text-6xl lg:text-8xl">
              Examples of client
              <br />
              success, powered by us.
            </h1>
            <p className="border-primary max-w-3xl border-l-4 pl-6 text-xl leading-relaxed text-white/80 md:text-2xl">
              Explore some of the transformative journeys of Voryent's global clients. From legacy
              modernization to building next-generation AI platforms.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── METRICS / BY THE NUMBERS ─── */}
      <Section className="border-border/60 bg-background border-b">
        <div className="divide-border/60 grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="bg-muted/5 group flex flex-col items-center p-12 text-center lg:p-16">
            <div className="text-foreground group-hover:text-primary mb-4 text-6xl font-bold tracking-tighter transition-colors lg:text-8xl">
              10+
            </div>
            <div className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">
              Enterprise Projects Delivered
            </div>
          </div>
          <div className="bg-muted/5 group flex flex-col items-center p-12 text-center lg:p-16">
            <div className="text-foreground group-hover:text-primary mb-4 text-6xl font-bold tracking-tighter transition-colors lg:text-8xl">
              10
            </div>
            <div className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">
              Countries Deployed
            </div>
          </div>
          <div className="bg-muted/5 group flex flex-col items-center p-12 text-center lg:p-16">
            <div className="text-foreground group-hover:text-primary mb-4 text-6xl font-bold tracking-tighter transition-colors lg:text-8xl">
              99%
            </div>
            <div className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">
              Client Retention Rate
            </div>
          </div>
        </div>
      </Section>

      {/* ─── OUR APPROACH ─── */}
      <Section className="bg-background border-border/60 border-b py-32">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-primary mb-4 block text-[10px] font-bold uppercase tracking-[0.2em]">
                The Voryent Methodology
              </span>
              <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                Engineering excellence at scale.
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                We don't just write code. We architect solutions that solve fundamental business
                challenges. Every case study below represents a partnership where we integrated
                deeply with our clients' teams to deliver robust, scalable, and secure software.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-muted border-border/60 mt-1 h-fit border p-2">
                    <Shield className="text-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-bold">Enterprise Security</h4>
                    <p className="text-muted-foreground text-sm">
                      Rigorous compliance and security standards baked into every deployment
                      pipeline.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-muted border-border/60 mt-1 h-fit border p-2">
                    <Zap className="text-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-bold">High Performance</h4>
                    <p className="text-muted-foreground text-sm">
                      Optimized architectures designed to handle millions of requests with
                      sub-second latency.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-muted border-border/60 mt-1 h-fit border p-2">
                    <Target className="text-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-bold">Business Alignment</h4>
                    <p className="text-muted-foreground text-sm">
                      Technology decisions driven by your specific business objectives and growth
                      targets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted border-border/60 relative aspect-square w-full overflow-hidden border">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
                alt="Engineering Methodology"
                className="h-full w-full object-cover opacity-80 grayscale"
              />
              <div className="border-background absolute inset-0 border-[20px] mix-blend-overlay"></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CASE STUDY GRID ─── */}
      <Section className="bg-muted/5 py-32">
        <Container>
          <div className="border-border/60 mb-16 flex flex-col items-end justify-between gap-6 border-b pb-8 md:flex-row">
            <div>
              <h2 className="text-foreground text-4xl font-bold tracking-tighter md:text-5xl">
                Featured Work
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-lg">
                In-depth technical breakdowns of our most transformative projects.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-border/60 bg-background h-12 rounded-none text-xs font-bold uppercase tracking-widest"
            >
              Filter by Industry
            </Button>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study: any, index: number) => (
                <CaseStudyCard key={study.id || study.slug || index} study={study} index={index} />
              ))}
            </div>
          ) : (
            <div className="border-border/60 bg-background flex flex-col items-center justify-center border p-24 text-center">
              <div className="text-muted-foreground border-border/60 bg-muted/30 mb-6 flex h-16 w-16 items-center justify-center border">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Case studies coming soon</h3>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                We're currently preparing our first public case studies showcasing our engineering
                capabilities.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── BOTTOM CTA ─── */}
      <Section className="bg-background border-border/60 relative overflow-hidden border-t py-32">
        {/* Abstract pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="text-primary mb-6 block text-[10px] font-bold uppercase tracking-[0.2em]">
              Ready to Transform?
            </span>
            <h2 className="text-foreground mb-8 text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
              How can we help you?
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl text-xl">
              Are you ready to pivot, lean-out or scale-up your business with relentless innovation
              and enterprise-grade software?
            </p>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-primary h-16 rounded-none px-10 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <Link href="/contact">Let's Talk Business</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/60 hover:bg-muted/50 bg-background h-16 rounded-none px-10 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
