import { notFound } from "next/navigation";
import { getIndustries } from "@/lib/firebase/services";
import { Container, Section, Button } from "@voryent/ui";
import { ArrowRight, Mail } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
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
    description: industry.shortDescription,
  };
}

const offeringImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop", // Tech people working
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop", // Code on screen
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", // Server room
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop", // Data/Analytics
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Global AI
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"  // Team collaboration
];

const getTechLogo = (tech: string) => {
  const t = tech.toLowerCase();
  
  if (t.includes('react')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' };
  if (t.includes('next')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invertDark: true };
  if (t.includes('node') || t.includes('express')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' };
  if (t.includes('type')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' };
  if (t.includes('java') && !t.includes('script')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' };
  if (t.includes('python')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' };
  if (t.includes('aws') || t.includes('amazon')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', invertDark: true };
  if (t.includes('azure')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' };
  if (t.includes('google cloud') || t.includes('gcp')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' };
  if (t.includes('docker')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' };
  if (t.includes('kube') || t.includes('k8s')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' };
  if (t.includes('microsoft sql') || t.includes('ms sql') || t.includes('sql server')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' };
  if (t.includes('sql') && !t.includes('no') && !t.includes('microsoft')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' };
  if (t.includes('mongo')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' };
  if (t.includes('redis')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' };
  if (t.includes('graphql')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' };
  if (t.includes('asp.net') || t.includes('.net') || t.includes('c#')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' };
  
  if (t.includes('tail')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' };
  if (t.includes('css')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' };
  if (t.includes('html')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' };
  if (t.includes('vue')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' };
  if (t.includes('angul')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' };
  if (t.includes('svelte')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' };
  if (t.includes('fireb')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' };
  if (t.includes('supa')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' };
  if (t.includes('figma')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' };
  if (t.includes('git') && !t.includes('hub')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' };
  if (t.includes('github')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invertDark: true };
  if (t.includes('linux')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' };
  if (t.includes('apple') || t.includes('ios')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg', invertDark: true };
  if (t.includes('android')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' };
  if (t.includes('flutter')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' };
  if (t.includes('boot')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' };
  if (t.includes('laravel')) return { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' };
  
  if (t.includes('artificial') || t.includes('machine learning') || t.includes('ai')) return { lucide: 'Brain' };
  if (t.includes('internet of things') || t.includes('iot')) return { lucide: 'Cpu' };
  if (t.includes('cloud')) return { lucide: 'Cloud' };
  if (t.includes('api') || t.includes('rest')) return { lucide: 'Webhook' };
  if (t.includes('gps') || t.includes('location')) return { lucide: 'MapPin' };
  if (t.includes('power bi') || t.includes('analytics') || t.includes('data')) return { lucide: 'BarChart3' };
  if (t.includes('devops') || t.includes('ci/cd')) return { lucide: 'Infinity' };

  return { lucide: 'Code' };
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
      <Section className="relative min-h-[80vh] flex items-end pb-24 pt-48 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={industry.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"} 
            alt={industry.title} 
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
            <span className="mb-6 flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              <IconComponent className="h-4 w-4" /> Industry Expertise
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              {industry.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl leading-relaxed">
              {industry.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
                <Link href="/contact">Discuss Your Project</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── OVERVIEW (ARCHITECTURAL SPLIT) ─── */}
      {industry.fullOverview && (
        <Section id="overview" className="bg-background border-b border-border/40 py-24 lg:py-32 overflow-hidden">
          <Container>
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="lg:w-1/2 flex flex-col relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <FadeIn>
                  <span className="text-muted-foreground block mb-6 text-xs tracking-[0.3em] uppercase font-bold">01 — Overview</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-8 leading-[1.05]">
                    The Landscape.
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none text-foreground/80 prose-p:text-lg lg:prose-p:text-xl prose-p:leading-[1.7] prose-p:font-medium whitespace-pre-wrap">
                    {industry.fullOverview}
                  </div>
                </FadeIn>
              </div>
              <div className="lg:w-1/2 w-full relative">
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] lg:aspect-[4/5] relative overflow-hidden border border-border/40 shadow-sm">
                    <img 
                      src={industry.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"} 
                      alt="Overview" 
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-105 hover:grayscale-0" 
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CHALLENGES & EXPERTISE (STRUCTURAL GRID) ─── */}
      {((industry.challenges && industry.challenges.length > 0) || (industry.expertise && industry.expertise.length > 0)) && (
        <Section className="bg-background p-0 border-b border-border/40">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side: Challenges */}
            {industry.challenges && industry.challenges.length > 0 && (
              <div className="lg:w-1/2 p-10 lg:p-20 xl:p-32 flex flex-col relative">
                <span className="text-muted-foreground block mb-6 text-xs tracking-[0.3em] uppercase font-bold">02 — The Problem</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-foreground mb-16 leading-[0.95]">
                  Key<br/>Challenges.
                </h2>
                
                <StaggerContainer className="space-y-0 w-full">
                  {industry.challenges.map((challenge: any, idx: number) => (
                    <StaggerItem key={idx} className="group border-t border-border/40 py-10 flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
                      <div className="text-5xl font-black text-muted-foreground/20 font-mono tracking-tighter group-hover:text-primary transition-colors duration-500">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <p className="text-foreground/90 leading-[1.7] text-xl lg:text-2xl font-medium pt-2">
                        {typeof challenge === 'string' ? challenge : challenge.title || challenge.description}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <div className="mt-16 pt-10 border-t border-border/40">
                  <Button asChild size="lg" className="rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-colors">
                    <Link href="/contact">Consult With Us</Link>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Right Side: Expertise (Dark Panel) */}
            {industry.expertise && industry.expertise.length > 0 && (
              <div className="lg:w-1/2 bg-black text-white p-10 lg:p-20 xl:p-32 flex flex-col">
                <span className="text-white/50 block mb-6 text-xs tracking-[0.3em] uppercase font-bold">03 — The Solution</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white mb-16 leading-[0.95]">
                  Our<br/>Expertise.
                </h2>
                
                <StaggerContainer className="w-full">
                  {industry.expertise.map((exp: any, idx: number) => (
                    <StaggerItem key={idx} className="border-t border-white/10 py-8 flex gap-6 lg:gap-8 group">
                      <div className="mt-3">
                        <div className="w-1.5 h-1.5 bg-primary group-hover:scale-x-150 transition-transform duration-300" />
                      </div>
                      <p className="text-white/90 leading-[1.6] text-xl lg:text-2xl font-medium">
                        {typeof exp === 'string' ? exp : exp.title || exp.description}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <div className="mt-auto pt-16 border-t border-white/10 flex items-center justify-between">
                   <span className="text-sm font-bold uppercase tracking-widest text-white/50">Voryent Solutions</span>
                   <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            )}
            
          </div>
        </Section>
      )}

      {/* ─── PROCESS / STEPS (DARK HORIZONTAL) ─── */}
      {industry.steps && industry.steps.length > 0 && (
        <Section className="py-32 bg-black text-white relative overflow-hidden">
          {/* Glowing / Abstract background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute left-0 right-0 top-1/2 h-[600px] -translate-y-1/2 bg-primary/20 blur-[150px] rounded-full opacity-60 pointer-events-none" />
          </div>

          <Container className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                A proven process for success
              </h2>
              <p className="text-xl text-white/70">
                Our methodology ensures rigorous quality, rapid deployment, and measurable results tailored for {industry.title}.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {industry.steps.map((step: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="text-7xl md:text-8xl font-black text-white/10 mb-8 font-mono tracking-tighter relative">
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-transparent">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg max-w-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── PATTERNED QUOTE HIGHLIGHT ─── */}
      <Section className="py-32 bg-primary relative overflow-hidden text-primary-foreground border-y border-primary-foreground/10">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <Container className="relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-12">
              "We empower organizations to navigate complex technological shifts, turning digital disruption into sustainable competitive advantage."
            </h2>
            <div className="h-px w-32 bg-primary-foreground/30 mx-auto mb-12" />
            <p className="text-xl font-bold tracking-[0.3em] uppercase text-primary-foreground/80">
              Voryent Solutions
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── OFFERINGS (FULL BACKGROUND CARDS) ─── */}
      {industry.offerings && industry.offerings.length > 0 && (
        <Section className="py-32 bg-background border-b border-border/40">
          <Container>
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="max-w-3xl">
                <FadeIn>
                  <span className="text-muted-foreground block mb-6 text-xs tracking-[0.3em] uppercase font-bold">05 — Offerings</span>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[1.05]">Our Services.</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    Targeted technical solutions designed specifically for the {industry.title.toLowerCase()} sector.
                  </p>
                </FadeIn>
              </div>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {industry.offerings.map((offering: any, idx: number) => {
                const img = offeringImages[idx % offeringImages.length];
                const title = typeof offering === 'string' ? offering : offering.title;
                const desc = typeof offering !== 'string' && offering.description 
                  ? offering.description 
                  : `Empower your organization with enterprise-grade ${title.toLowerCase()}. We deliver scalable, secure, and modern solutions tailored specifically to your industry needs.`;

                return (
                  <StaggerItem key={idx} className="group relative flex flex-col justify-end overflow-hidden min-h-[450px] lg:min-h-[500px] bg-black border border-border/40">
                    <img 
                      src={img} 
                      alt={title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                      <div className="w-10 h-1 bg-primary mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <h3 className="text-3xl font-bold tracking-tight mb-4 text-white">
                        {title}
                      </h3>
                      
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-white/70 text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {desc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        <Button asChild size="lg" className="rounded-none w-full bg-white text-black hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-xs h-14">
                          <Link href="/contact">Get in Touch</Link>
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

      {/* ─── TECHNOLOGIES ─── */}
      {industry.technologies && industry.technologies.length > 0 && (
        <Section className="py-24 bg-muted/5 border-b border-border/60">
          <Container>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">Our Tech Stack</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We leverage an elite, modern technology stack to ensure massive performance and scalability for {industry.title} solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {industry.technologies.map((tech: string, idx: number) => {
                const logoInfo = getTechLogo(tech);
                return (
                  <div 
                    key={idx} 
                    className="aspect-[4/3] bg-background border border-border/50 shadow-sm rounded-xl flex flex-col items-center justify-center p-4 hover:shadow-md hover:border-primary/50 transition-all group"
                  >
                    {logoInfo.url ? (
                      <div className="relative w-12 h-12 mb-2">
                         <img 
                           src={logoInfo.url} 
                           alt={tech} 
                           className={`w-full h-full object-contain ${logoInfo.invertDark ? 'dark:invert' : ''} group-hover:scale-110 transition-transform duration-300`} 
                         />
                      </div>
                    ) : (
                      <div className="w-12 h-12 mb-2 bg-primary/5 text-primary border border-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                        {(() => {
                          const Icon = (LucideIcons as any)[logoInfo.lucide || 'Code'] || LucideIcons.Code;
                          return <Icon className="h-6 w-6" />;
                        })()}
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground text-center truncate w-full uppercase tracking-wider transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                )
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── RELATED CASE STUDIES ─── */}
      {industry.relatedCaseStudies && industry.relatedCaseStudies.length > 0 && industry.relatedCaseStudies.some((u: string) => u.trim() !== "") && (
        <Section className="py-32 bg-background border-b border-border/60">
          <Container>
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">Related Work</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                See how we've helped other organizations in the {industry.title} sector.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {industry.relatedCaseStudies.filter((url: string) => url.trim() !== "").map((url: string, idx: number) => (
                <Button key={idx} asChild variant="outline" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest border-border/60 bg-muted/5 hover:bg-muted/50 transition-colors">
                  <Link href={url}>
                    View Case Study {idx + 1} <ArrowRight className="ml-3 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <Container className="relative z-10">
          <div className="border border-border/60 bg-muted/5 p-12 lg:p-32 text-center max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-24 h-24 border border-border/60 bg-background flex items-center justify-center text-foreground mb-12">
              <IconComponent className="h-10 w-10" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-8">
              Ready to transform your {industry.title.toLowerCase()} business?
            </h2>
            <p className="text-xl text-muted-foreground mb-16 max-w-2xl leading-relaxed">
              Let's build something exceptional together. Contact us today to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-colors">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
