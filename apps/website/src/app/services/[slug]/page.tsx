export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/firebase/services";
import { Container, Section, Button, Card, CardContent } from "@voryent/ui";
import {
  ArrowRight,
  Code2,
  Terminal,
  Cloud,
  Brain,
  Smartphone,
  Palette,
} from "lucide-react";
import * as Icons from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const renderIcon = (iconName: string, className: string = "") => {
  const Icon = (Icons as any)[iconName] || Icons.Code2;
  return <Icon className={className} />;
};

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);
  
  if (!service) {
    notFound();
  }

  const allServices = await getServices().catch(() => []);
  const relatedServices = allServices
    .filter((s: any) => s.slug !== resolvedParams.slug)
    .slice(0, 3);

  return (
    <article className="pt-24 pb-16 min-h-screen selection:bg-primary/20">
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-muted/30 pb-20 pt-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {renderIcon(service.icon || "Code2", "w-4 h-4")}
                  <span>Voryent Services</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                  {service.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {service.tagline || service.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="rounded-full px-8" asChild>
                    <Link href="/contact">Start a Project</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                    {renderIcon(service.icon || "Code2", "w-32 h-32 text-primary/40")}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Main Content Area: Overview & Features */}
      <Section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Sticky Overview */}
            <div className="lg:col-span-4">
              <FadeIn className="sticky top-32 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
                  <div className="h-1 w-12 bg-primary rounded-full mb-6"></div>
                  
                  {service.overview && service.overview.length > 0 ? (
                    <div className="space-y-4">
                      {service.overview.map((paragraph: string, i: number) => (
                        <p key={i} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>

                {service.technologies && service.technologies.length > 0 && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold mb-4">Technologies We Use</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Right Column: Features Grid */}
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Key Features</h2>
                  <p className="text-muted-foreground text-lg">What you get when partnering with us.</p>
                </div>
              </FadeIn>

              {service.features && service.features.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature: any, index: number) => (
                    <FadeIn key={index} delay={index * 0.1}>
                      <div className="bg-card border border-border p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-primary/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500 pointer-events-none text-primary">
                           {renderIcon(feature.icon || "CheckCircle2", "w-24 h-24")}
                        </div>
                        
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative z-10">
                          {renderIcon(feature.icon || "CheckCircle2", "w-6 h-6")}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed relative z-10">
                          {feature.description}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="p-8 border rounded-xl bg-muted/50 text-center">
                  <p className="text-muted-foreground">No features listed for this service yet.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <Section className="py-20 bg-muted/30">
          <Container>
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Approach</h2>
                <p className="text-lg text-muted-foreground">A proven methodology to deliver reliable results on time and within budget.</p>
              </div>
            </FadeIn>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {service.process
                  .sort((a: any, b: any) => (a.step || 0) - (b.step || 0))
                  .map((step: any, index: number) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {renderIcon(step.icon || "Code2", "w-4 h-4")}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-6 rounded-2xl shadow-sm group-hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-primary/80 uppercase tracking-wider">Step {step.step || index + 1}</span>
                          <h4 className="font-bold text-lg text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section className="py-20">
          <Container>
            <FadeIn>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-foreground">Explore Other Services</h2>
                <Button variant="ghost" asChild className="hidden sm:flex">
                  <Link href="/services">
                    View All <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((related: any, index: number) => (
                <FadeIn key={related.slug} delay={index * 0.1}>
                  <Link href={`/services/${related.slug}`} className="block group h-full">
                    <Card className="h-full border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-foreground mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {renderIcon(related.icon || "Code2", "w-6 h-6")}
                        </div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">{related.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{related.tagline || related.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild className="w-full">
                <Link href="/services">
                  View All Services <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="pb-10 pt-10">
        <Container>
          <FadeIn>
            <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                  Ready to transform your ideas into reality?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Let's discuss how our technical expertise can accelerate your business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="px-8" asChild>
                    <Link href="/contact">Schedule a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </article>
  );
}
