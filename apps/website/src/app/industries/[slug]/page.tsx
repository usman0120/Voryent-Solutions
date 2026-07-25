import { notFound } from "next/navigation";
import { getIndustries } from "@/lib/firebase/services";
import { Container, Section, Button, Card, CardContent } from "@voryent/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const industries = await getIndustries().catch(() => []);
  const industry = industries.find((i: any) => i.slug === slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.title} | Voryent Solutions`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industries = await getIndustries().catch(() => []);
  const industry = industries.find((i: any) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const IconComponent = (LucideIcons as any)[industry.icon || "Building2"] || LucideIcons.Building2;

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {industry.coverImage && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={industry.coverImage} alt={industry.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          </div>
        )}
        {!industry.coverImage && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        )}
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
              <IconComponent className="mr-2 h-4 w-4" />
              Industry Expertise
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {industry.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              {industry.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact">Discuss Your Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link href="#overview">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── OVERVIEW ─── */}
      {industry.overview && (
        <Section id="overview" className="border-t border-border/50">
          <Container>
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <h2 className="text-3xl font-bold mb-6">Industry Overview</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {industry.overview}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CHALLENGES & EXPERTISE ─── */}
      {((industry.challenges && industry.challenges.length > 0) || (industry.expertise && industry.expertise.length > 0)) && (
        <Section className="bg-muted/30 border-y border-border/50">
          <Container>
            <div className="grid md:grid-cols-2 gap-16">
              {industry.challenges && industry.challenges.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Key Challenges</h2>
                  <div className="space-y-8">
                    {industry.challenges.map((challenge: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                            <span className="font-bold text-sm">{idx + 1}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {industry.expertise && industry.expertise.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Our Expertise</h2>
                  <div className="space-y-8">
                    {industry.expertise.map((exp: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── OFFERINGS ─── */}
      {industry.offerings && industry.offerings.length > 0 && (
        <Section>
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Our Offerings</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tailored solutions designed specifically for the {industry.title.toLowerCase()} sector.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.offerings.map((offering: any, idx: number) => {
                const OfferingIcon = (LucideIcons as any)[offering.icon || "Box"] || LucideIcons.Box;
                return (
                  <Card key={idx} className="bg-muted/30 border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-background border border-primary/20 flex items-center justify-center text-primary mb-6">
                        <OfferingIcon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{offering.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {offering.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── HOW WE HELP ─── */}
      {industry.howWeHelp && industry.howWeHelp.length > 0 && (
        <Section className="bg-primary text-primary-foreground overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">How We Can Help You</h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  We partner with you to solve complex problems and drive measurable results.
                </p>
                <div className="space-y-6">
                  {industry.howWeHelp.map((help: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <LucideIcons.ArrowRight className="h-5 w-5 text-primary-foreground/60" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{help.title}</h3>
                        <p className="text-primary-foreground/80">{help.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block relative">
                {industry.coverImage ? (
                  <div className="aspect-square rounded-3xl overflow-hidden border border-primary-foreground/20 shadow-2xl relative">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={industry.coverImage} alt={industry.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center">
                    <IconComponent className="h-48 w-48 text-primary-foreground/10" />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── PROCESS / STEPS ─── */}
      {industry.steps && industry.steps.length > 0 && (
        <Section>
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Our Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A proven methodology tailored for {industry.title}.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border md:left-1/2 md:-ml-[0.5px]" />
              <div className="space-y-12">
                {industry.steps.map((step: any, idx: number) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2" />
                    <div className="absolute left-0 md:left-1/2 flex h-14 w-14 -translate-x-0 md:-translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground font-bold z-10 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className={`md:w-1/2 pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <h3 className="text-2xl font-bold mb-3 mt-3 md:mt-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── TECHNOLOGIES ─── */}
      {industry.technologies && industry.technologies.length > 0 && (
        <Section className="bg-muted/30 border-y border-border/50">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Technology Expertise</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We leverage an elite, modern technology stack for {industry.title} solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {industry.technologies.map((tech: string, idx: number) => (
                <div 
                  key={idx} 
                  className="px-6 py-3 rounded-full bg-background border border-border shadow-sm text-foreground font-medium flex items-center gap-2 hover:border-primary/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary/80" />
                  {tech}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── RELATED CASE STUDIES ─── */}
      {industry.relatedCaseStudies && industry.relatedCaseStudies.length > 0 && industry.relatedCaseStudies.some((u: string) => u.trim() !== "") && (
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Related Work</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how we've helped other organizations in the {industry.title} sector.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {industry.relatedCaseStudies.filter((url: string) => url.trim() !== "").map((url: string, idx: number) => (
                <Button key={idx} asChild variant="outline" className="h-auto py-4 px-6">
                  <Link href={url}>
                    View Case Study {idx + 1} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                Ready to transform your {industry.title.toLowerCase()} business?
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
