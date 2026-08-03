export const dynamic = "force-dynamic";

import Link from "next/link";
import { getServices, getFaqs } from "@/lib/firebase/services";
import { Container, Section, Button } from "@voryent/ui";
import { FaqComponent } from "@voryent/ui";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import Image from "next/image";

// Helper to render dynamic icons
const renderIcon = (iconName: string, className: string = "") => {
  const Icon = (Icons as any)[iconName] || Icons.Code2;
  return <Icon className={className} />;
};

export default async function ServicesPage() {
  const [dbServices, dbFaqs] = await Promise.all([
    getServices().catch(() => []),
    getFaqs().catch(() => [])
  ]);

  // Sort services by order
  const displayServices = [...dbServices].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 bg-black overflow-hidden border-b border-border">
        {/* Subtle animated grid background overlaying the image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
        
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
            alt="Services Hero"
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <FadeIn>
            <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
              <span className="mb-6 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                Core Capabilities
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                Architecting the<br />digital future.
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl leading-relaxed">
                From custom software and robust APIs to intelligent AI solutions and scalable cloud infrastructure, 
                we provide end-to-end technical expertise to accelerate your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── TECHNOLOGY ALLIANCES ─── */}
      <Section className="py-24 bg-muted/10 border-b border-border overflow-hidden">
        <Container>
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
                Built on strong technology alliances
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We collaborate with leading technology providers to deliver modern, scalable solutions that help 
                enterprises accelerate transformation, improve performance, and create lasting business value.
              </p>
            </FadeIn>
          </div>
        </Container>
        
        {/* Marquee Slider */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-12 items-center py-4 pl-12 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 md:gap-24 items-center shrink-0">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg" alt="Microsoft" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original-wordmark.svg" alt="Google Cloud" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" alt="React" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" alt="Node.js" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" alt="Docker" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg" alt="Kubernetes" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="Python" className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SERVICES GRID ─── */}
      <Section className="py-24 bg-muted/5">
        <Container>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayServices.map((service: any, index: number) => {
              // Fallback image if one isn't provided
              const fallbackImages = [
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
              ];
              const imgUrl = service.imageUrl || fallbackImages[index % fallbackImages.length];

              return (
                <StaggerItem key={service.slug} className="group relative flex flex-col justify-end overflow-hidden min-h-[450px] lg:min-h-[500px] bg-black border border-border/40">
                  <img 
                    src={imgUrl} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                    <div className="w-10 h-1 bg-primary mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                    <h3 className="text-3xl font-bold tracking-tight mb-4 text-white">
                      {service.title}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-white/70 text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                          {service.shortDescription || service.description || `Enterprise-grade ${service.title.toLowerCase()} tailored to your technical needs.`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <Button asChild size="lg" className="rounded-none w-full bg-white text-black hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-xs h-14">
                        <Link href={`/services/${service.slug}`}>Explore Details</Link>
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── DEVELOPMENT PROCESS ─── */}
      <Section className="py-24 border-t border-border">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">How We Work</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                A systematic, transparent approach from the first conversation to continuous deployment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
              {[
                { title: "Discover", desc: "We analyze your business goals, technical constraints, and target audience to form a solid foundation." },
                { title: "Plan", desc: "Developing a comprehensive architectural blueprint, technology stack selection, and project timeline." },
                { title: "Design", desc: "Crafting intuitive user experiences and high-fidelity interfaces that align with your brand." },
                { title: "Develop", desc: "Writing clean, scalable, and secure code using agile methodologies and rigorous testing." },
                { title: "Deploy", desc: "Seamless launch with zero downtime, utilizing robust CI/CD pipelines and cloud infrastructure." },
                { title: "Support", desc: "Continuous monitoring, performance optimization, and scalable enhancements as you grow." },
              ].map((step, i) => (
                <div key={i} className="p-10 border-b md:border-r border-border group hover:bg-muted/30 transition-colors">
                  <span className="text-6xl font-black text-muted/30 group-hover:text-primary/20 transition-colors block mb-6">
                    0{i+1}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── FAQ PREVIEW ─── */}
      {dbFaqs && dbFaqs.length > 0 && (
        <Section className="py-24 bg-muted/10 border-t border-border">
          <Container>
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold tracking-tighter text-foreground">Questions?</h2>
                </div>
                <FaqComponent items={dbFaqs.slice(0, 5).map((f: any) => ({ question: f.question, answer: f.answer }))} />
                <div className="mt-12 flex justify-center">
                  <Button asChild size="lg" className="rounded-none font-bold uppercase tracking-widest text-xs h-14 px-8">
                    <Link href="/contact">Ask Us Anything</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
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
                    Ready to build something exceptional?
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                  <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest text-xs h-16 px-10">
                    <Link href="/contact">Start a Project</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>
      </Section>
    </>
  );
}
