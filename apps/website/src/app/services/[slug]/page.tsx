export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/firebase/services";
import { Container, Section, Button } from "@voryent/ui";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";

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
    <article className="min-h-screen selection:bg-primary/20 bg-background">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[85vh] flex items-end pb-16 md:pb-24 border-b border-border">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            {renderIcon(service.icon || "Code2", "w-32 h-32 text-primary/10")}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        
        <Container className="relative z-10 w-full">
          <FadeIn>
            <div className="max-w-4xl text-white">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="uppercase tracking-widest text-sm font-bold text-white/80">Voryent Services</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl leading-relaxed">
                {service.tagline || service.description}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── ARCHITECTURAL OVERVIEW ─── */}
      <Section className="py-24 md:py-32 bg-background border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Column */}
            <div className="lg:col-span-5">
              <FadeIn className="sticky top-32">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-8">
                  Overview
                </h2>
                <div className="w-16 h-1 bg-primary mb-10" />
                
                {service.technologies && service.technologies.length > 0 && (
                  <div className="pt-10 border-t border-border">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Core Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-muted/50 border border-border/50 text-foreground text-sm font-bold rounded-none">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="prose prose-lg dark:prose-invert prose-p:leading-relaxed prose-p:text-muted-foreground">
                  {service.overview && service.overview.length > 0 ? (
                    service.overview.map((paragraph: string, i: number) => (
                      <p key={i} className={i === 0 ? "text-2xl md:text-3xl text-foreground font-medium leading-snug mb-10" : "mb-6"}>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    service.description?.split('\\n').filter((p: string) => p.trim() !== '').map((paragraph: string, i: number) => (
                      <p key={i} className={i === 0 ? "text-2xl md:text-3xl text-foreground font-medium leading-snug mb-10" : "mb-6"}>
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
                
                {service.highlights && service.highlights.length > 0 && (
                  <div className="mt-16 p-8 md:p-12 bg-muted/30 border border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-8">Key Highlights</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.highlights.map((highlight: string, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-muted-foreground font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── TABULAR FEATURES GRID ─── */}
      <Section className="py-24 bg-muted/5 border-b border-border">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">Core Capabilities</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">What you get when partnering with us.</p>
            </div>
          </FadeIn>

          {service.features && service.features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
              {service.features.map((feature: any, index: number) => (
                <FadeIn key={index} delay={index * 0.1} className="border-b border-r border-border p-10 md:p-14 group hover:bg-background transition-colors">
                  <div className="mb-8 text-primary transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 origin-left">
                    {renderIcon(feature.icon || "CheckCircle2", "w-10 h-10")}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-border bg-background text-center">
              <p className="text-muted-foreground text-lg">Detailed capabilities are being updated.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── PROCESS GRID ─── */}
      {service.process && service.process.length > 0 && (
        <Section className="py-24 bg-foreground text-background">
          <Container>
            <FadeIn>
              <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Methodology</h2>
                <div className="w-16 h-1 bg-primary" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
              {service.process
                .sort((a: any, b: any) => (a.step || 0) - (b.step || 0))
                .map((step: any, index: number) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="relative group">
                    <div className="absolute -top-12 -left-4 text-8xl font-black text-background/10 group-hover:text-primary/20 transition-colors pointer-events-none z-0">
                      0{step.step || index + 1}
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-2xl text-background mb-4 flex items-center gap-3">
                        {step.title}
                      </h4>
                      <p className="text-background/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── RELATED SERVICES ─── */}
      {relatedServices.length > 0 && (
        <Section className="py-24 bg-background border-t border-border">
          <Container>
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Related Services</h2>
                  <p className="text-lg text-muted-foreground">Explore other areas of our expertise.</p>
                </div>
                <Button variant="outline" size="lg" asChild className="rounded-none border-border shrink-0">
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </FadeIn>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((related: any, index: number) => {
                const fallbackImages = [
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                ];
                const imgUrl = related.imageUrl || fallbackImages[index % fallbackImages.length];

                return (
                  <StaggerItem key={related.slug} className="group relative flex flex-col justify-end overflow-hidden min-h-[400px] bg-black border border-border/40">
                    <img 
                      src={imgUrl} 
                      alt={related.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 p-8 flex flex-col h-full justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                      <div className="w-8 h-1 bg-primary mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">
                        {related.title}
                      </h3>
                      
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-white/70 text-base leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2">
                            {related.shortDescription || related.description || `Explore our ${related.title.toLowerCase()} solutions.`}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        <Button asChild size="default" className="rounded-none w-full bg-white text-black hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] h-12">
                          <Link href={`/services/${related.slug}`}>Learn More</Link>
                        </Button>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="py-0">
        <div className="bg-foreground text-background">
          <Container>
            <FadeIn>
              <div className="py-24 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">
                    Ready to execute?
                  </h2>
                  <p className="text-xl text-background/70 font-medium">
                    Let's discuss how our technical expertise can accelerate your business growth.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                  <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest text-xs h-16 px-10">
                    <Link href="/contact">Schedule a Consultation</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>
      </Section>
    </article>
  );
}
