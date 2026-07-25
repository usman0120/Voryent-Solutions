export const dynamic = "force-dynamic";

import Link from "next/link";
import { getServices, getFaqs } from "@/lib/firebase/services";
import { Container, Section, Button } from "@voryent/ui";
import { FaqComponent } from "@voryent/ui";
import { 
  ArrowRight, 
  Search, 
  PenTool, 
  Eye, 
  Code2, 
  Rocket, 
  LifeBuoy
} from "lucide-react";
import * as Icons from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
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
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Engineering services built for modern businesses.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                From custom software and robust APIs to intelligent AI solutions and scalable cloud infrastructure, 
                we provide end-to-end technical expertise to accelerate your growth.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/contact">Start Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── SERVICES GRID ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service: any, index: number) => (
              <FadeIn key={service.slug} delay={index * 0.1}>
                <div className="group flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                        {renderIcon(service.icon, "w-16 h-16 text-primary/40")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="w-14 h-14 rounded-xl bg-background shadow-md flex items-center justify-center text-primary absolute -top-7 right-8 border border-border">
                      {renderIcon(service.icon, "h-6 w-6")}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-3 mt-2">{service.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {service.tagline || service.description || service.shortDescription}
                    </p>
                    
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.technologies.slice(0, 3).map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            +{service.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <Button asChild variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform mt-auto">
                      <Link href={`/services/${service.slug}`}>
                        Explore Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── DEVELOPMENT PROCESS ─── */}
      <Section>
        <Container>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">How We Bring Your Vision to Life</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A systematic, transparent approach from the first conversation to continuous deployment.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline track for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
                {[
                  { icon: Search, title: "Discover" },
                  { icon: PenTool, title: "Plan" },
                  { icon: Eye, title: "Design" },
                  { icon: Code2, title: "Develop" },
                  { icon: Rocket, title: "Deploy" },
                  { icon: LifeBuoy, title: "Support" },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center group bg-background lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none shadow-sm lg:shadow-none border border-border lg:border-none">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm relative z-10">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">Step 0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── FAQ PREVIEW ─── */}
      {dbFaqs && dbFaqs.length > 0 && (
        <Section className="bg-muted/30">
          <Container>
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Common questions about working with us.
                </p>
              </div>
              
              <FaqComponent items={dbFaqs.slice(0, 5).map((f: any) => ({ question: f.question, answer: f.answer }))} />
              
              <div className="mt-10 text-center">
                <Button asChild variant="link" className="text-primary text-base">
                  <Link href="/faq">
                    View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-24">
        <Container>
          <FadeIn>
            <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                  Let&apos;s build something exceptional together.
                </h2>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                    <Link href="/contact">Start a Project</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
