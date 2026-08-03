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
    <article className="selection:bg-primary/20 bg-background min-h-screen">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="border-border relative flex h-[60vh] items-end border-b pb-16 md:h-[70vh] md:pb-24 lg:h-[85vh]">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-muted absolute inset-0 flex items-center justify-center">
            {renderIcon(service.icon || "Code2", "w-32 h-32 text-primary/10")}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <Container className="relative z-10 w-full">
          <FadeIn>
            <div className="max-w-4xl text-white">
              <div className="mb-6 inline-flex items-center gap-2">
                <div className="bg-primary h-[2px] w-8" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                  Voryent Services
                </span>
              </div>
              <h1 className="mb-6 text-5xl font-black leading-[0.9] tracking-tighter md:text-7xl lg:text-8xl">
                {service.title}
              </h1>
              <p className="max-w-2xl text-xl font-medium leading-relaxed text-white/80 md:text-2xl">
                {service.tagline || service.description}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
           {/* ─── OVERVIEW (ZIGZAG LAYOUT) ─── */}
      <Section className="py-24 md:py-32 bg-background border-b border-border">
        <Container>
          <div className="flex flex-col gap-24 lg:gap-32">
            
            {/* Row 1: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <FadeIn className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8 leading-tight">
                  {service.tagline || "Resilient solutions for your thriving ecosystem"}
                </h2>
                <div className="flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed font-light">
                  {service.overview && service.overview.length > 0
                    ? service.overview.map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ))
                    : service.description
                        ?.split("\n")
                        .filter((p: string) => p.trim() !== "")
                        .map((paragraph: string, i: number) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                </div>
              </FadeIn>
              
              <FadeIn className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-none w-full bg-muted">
                  {(() => {
                    const overviewImages1: Record<string, string> = {
                      "ai-engineering-automation": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200", 
                      "custom-software-development": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200", 
                      "web-development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200", 
                      "mobile-app-development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200", 
                      "cloud-devops": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
                      "ui-ux-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
                      "data-analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", 
                      "cybersecurity": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
                      "blockchain-development": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200" 
                    };
                    const img = overviewImages1[service.id] || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200";
                    return (
                      <img src={img} alt="Overview" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                    );
                  })()}
                </div>
              </FadeIn>
            </div>

            {/* Row 2: Image Left, Text Right */}
            {service.highlights && service.highlights.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <FadeIn className="order-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-none w-full bg-muted">
                    {(() => {
                      const overviewImages2: Record<string, string> = {
                        "ai-engineering-automation": "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200", 
                        "custom-software-development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200", 
                        "web-development": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200", 
                        "mobile-app-development": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1200", 
                        "cloud-devops": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
                        "ui-ux-design": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1200",
                        "data-analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", 
                        "cybersecurity": "https://images.unsplash.com/photo-1510511459019-5d05af2bd263?auto=format&fit=crop&q=80&w=1200",
                        "blockchain-development": "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1200" 
                      };
                      const img = overviewImages2[service.id] || "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200";
                      return (
                        <img src={img} alt="Highlights" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                      );
                    })()}
                  </div>
                </FadeIn>

                <FadeIn className="order-2">
                  <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8 leading-tight">
                    Personalized customer experience at scale
                  </h2>
                  <div className="flex flex-col gap-4 text-muted-foreground text-lg leading-relaxed font-light">
                    {service.highlights.map((highlight: string, i: number) => {
                      const hasColon = highlight.includes(':');
                      const parts = hasColon ? highlight.split(':') : [highlight];
                      return (
                        <p key={i} className="mb-2">
                          {hasColon ? (
                            <>
                              <strong className="text-foreground font-medium">{parts[0]}:</strong>
                              {parts.slice(1).join(':')}
                            </>
                          ) : (
                            highlight
                          )}
                        </p>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>
            )}
            
          </div>
        </Container>
      </Section>

      {/* ─── CORE CAPABILITIES (IMAGE CARDS) ─── */}
      <Section className="bg-background py-24 md:py-32">
        <Container>
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-foreground text-4xl font-black tracking-tight md:text-5xl">
                Enterprise {service.title} Services
              </h2>
            </div>
          </FadeIn>

          {service.features && service.features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {service.features.map((feature: any, index: number) => {
                const imageMaps: Record<string, string[]> = {
                  "ai-engineering-automation": [
                    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1684369175836-3914a423e20e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=800"
                  ],
                  "custom-software-development": [
                    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1607799279861-4ddb65f375f1?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
                  ],
                  "web-development": [
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1627398248735-0ba62fc8ceb2?auto=format&fit=crop&q=80&w=800"
                  ],
                  "mobile-app-development": [
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1626887556067-1fa5a76e2c2f?auto=format&fit=crop&q=80&w=800"
                  ],
                  "cloud-devops": [
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504384764586-bb4cdc1705b0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
                  ],
                  "ui-ux-design": [
                    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1507238692062-5a042d001099?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800"
                  ],
                  "data-analytics": [
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
                  ],
                  "cybersecurity": [
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1510511459019-5d05af2bd263?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1614064641936-3899d939458ef?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800"
                  ],
                  "blockchain-development": [
                    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1621504450181-5c3b0f5bbf1e?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1625806335347-195c6f3ccf68?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800"
                  ]
                };
                
                const defaultImages = [
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                ];

                const bgImages = imageMaps[service.id] || defaultImages;
                const bgImage = bgImages[index % bgImages.length];

                return (
                  <FadeIn key={index} delay={index * 0.1} className="h-full">
                    <div className="group relative flex flex-col justify-between h-[450px] md:h-[500px] w-full overflow-hidden rounded-none p-8 bg-black">
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={bgImage} 
                          alt={feature.title} 
                          className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/90 transition-colors duration-500" />
                      </div>
                      
                      {/* Content Top */}
                      <div className="relative z-10 flex flex-col gap-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          {feature.title}
                        </h3>
                        {/* Description reveals on hover */}
                        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                          <div className="overflow-hidden">
                            <p className="text-white/90 text-sm md:text-base leading-relaxed pt-2">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content Bottom */}
                      <div className="relative z-10 w-full flex justify-end mt-auto">
                        <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 shadow-xl transition-transform hover:scale-105">
                          <Link href="/contact">Get in Touch</Link>
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <div className="border-border bg-background border p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Detailed capabilities are being updated.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── WHY CHOOSE US ─── */}
      <Section className="bg-background relative py-32 overflow-hidden border-t border-border/10">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <Container className="relative z-10">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-4xl font-black md:text-5xl tracking-tight">Why Choose Voryent for {service.title}?</h2>
            </div>
          </FadeIn>
          
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
             {/* Desktop Wavy Connecting Line */}
             <div className="hidden md:block absolute top-[48px] left-[12.5%] w-[75%] h-24 -translate-y-1/2 pointer-events-none z-0">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="url(#dashGradient)" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round">
                   <defs>
                     <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                       <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
                       <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                     </linearGradient>
                   </defs>
                   <path d="M 0,50 Q 16.66,100 33.33,50 T 66.66,50 T 100,50" className="text-primary/70" />
                </svg>
             </div>
             
             {(() => {
               const serviceSpecificPillars: Record<string, any[]> = {
                 "ai-engineering-automation": [
                   { title: "Advanced LLM Integration", description: "Harness the power of leading models like OpenAI, Claude, and Gemini securely within your ecosystem.", icon: "Brain" },
                   { title: "Data Privacy First", description: "Your proprietary data never leaves your control. We build RAG systems with strict enterprise-grade security.", icon: "ShieldCheck" },
                   { title: "Autonomous Agents", description: "Beyond simple chatbots. We engineer intelligent agents that act, reason, and execute complex workflows.", icon: "Cpu" },
                   { title: "Scalable Infrastructure", description: "Deploy resilient AI models using Docker, Kubernetes, and optimized vector databases for low-latency.", icon: "TrendingUp" }
                 ],
                 "custom-software-development": [
                   { title: "Domain-Driven Design", description: "We architect software that maps perfectly to your complex business logic and operational reality.", icon: "Layers" },
                   { title: "Agile Transparency", description: "Complete visibility into development sprints, ensuring the product evolves alongside your feedback.", icon: "Activity" },
                   { title: "Cloud-Native Scalability", description: "Built for the cloud from day one. Our microservices architecture scales effortlessly under load.", icon: "Cloud" },
                   { title: "Enterprise Security", description: "Rigorous vulnerability testing and secure coding practices protect your mission-critical applications.", icon: "ShieldCheck" }
                 ],
                 "web-development": [
                   { title: "SEO-Optimized Architecture", description: "Built with Server-Side Rendering (SSR) for lightning-fast load times and maximum search visibility.", icon: "Search" },
                   { title: "Responsive Fluidity", description: "Pixel-perfect implementations that look stunning and perform flawlessly on any device screen size.", icon: "MonitorSmartphone" },
                   { title: "Global CDN Delivery", description: "We utilize Edge computing and global CDNs to ensure your application loads instantly worldwide.", icon: "Globe" },
                   { title: "DDoS Protection", description: "Enterprise-grade web application firewalls (WAF) and security headers keep your web apps secure.", icon: "ShieldCheck" }
                 ],
                 "mobile-app-development": [
                   { title: "Native & Cross-Platform", description: "Expertise in both pure Native (Swift/Kotlin) and high-performance Cross-Platform (React Native/Flutter).", icon: "Smartphone" },
                   { title: "Battery & Memory Optimization", description: "We engineer apps that respect user device resources, eliminating battery drain and memory leaks.", icon: "BatteryCharging" },
                   { title: "Offline Capabilities", description: "Seamless offline-first architectures that allow users to interact with your app without internet access.", icon: "WifiOff" },
                   { title: "App Store Compliance", description: "We handle the rigorous security and privacy audits required for seamless App Store and Play Store approval.", icon: "ShieldCheck" }
                 ],
                 "cloud-devops": [
                   { title: "Zero-Downtime Deployments", description: "Continuous Integration and Deployment (CI/CD) pipelines that allow multiple releases a day seamlessly.", icon: "Rocket" },
                   { title: "Infrastructure as Code", description: "We use Terraform and CloudFormation to make your entire infrastructure reproducible and version-controlled.", icon: "Code2" },
                   { title: "Auto-Scaling Resilience", description: "Systems designed to automatically scale resources during traffic spikes and scale down to save costs.", icon: "TrendingUp" },
                   { title: "Compliance & Governance", description: "Enforcing SOC2, HIPAA, and GDPR compliance directly at the cloud infrastructure level.", icon: "ShieldCheck" }
                 ],
                 "cybersecurity": [
                   { title: "Zero Trust Architecture", description: "Never trust, always verify. We implement strict identity-based access controls across your network.", icon: "Lock" },
                   { title: "Proactive Threat Hunting", description: "We don't wait for alerts. Our systems actively hunt for anomalies and advanced persistent threats.", icon: "Search" },
                   { title: "24/7 Incident Response", description: "Rapid containment and eradication protocols ready to deploy the moment a security event is detected.", icon: "Activity" },
                   { title: "Regulatory Compliance", description: "Ensuring your systems meet strict industry mandates like PCI-DSS, HIPAA, SOC2, and GDPR.", icon: "FileText" }
                 ],
                 "data-analytics": [
                   { title: "Real-Time Processing", description: "Streaming data architectures that allow you to make critical business decisions on up-to-the-second data.", icon: "Zap" },
                   { title: "Data Lakehouse Design", description: "Combining the best of data lakes and warehouses for unstructured and structured data mastery.", icon: "Database" },
                   { title: "Predictive Intelligence", description: "Moving beyond historical reporting by utilizing machine learning to forecast future business trends.", icon: "Brain" },
                   { title: "Data Governance & Privacy", description: "Strict data lineage, anonymization, and access controls to ensure ethical and secure data handling.", icon: "ShieldCheck" }
                 ],
                 "ui-ux-design": [
                   { title: "User-Centric Research", description: "Data-driven design decisions based on actual user behavior, heatmaps, and psychological principles.", icon: "Users" },
                   { title: "Design Systems", description: "Creating robust, reusable component libraries that ensure visual consistency across your entire brand.", icon: "Layers" },
                   { title: "Accessibility (a11y) First", description: "Designs fully compliant with WCAG standards, ensuring your product is usable by everyone.", icon: "Eye" },
                   { title: "High-Fidelity Prototyping", description: "Interactive, clickable prototypes that feel like the real app before a single line of code is written.", icon: "PenTool" }
                 ]
               };
               
               const defaultPillars = [
                 { title: "Domain Expertise", description: `Deep industry knowledge applied to solve your unique ${service.title.toLowerCase()} challenges.`, icon: "Layers" },
                 { title: "Cutting-Edge Tech", description: `We utilize the latest frameworks to deliver high-performance, future-proof solutions.`, icon: "Zap" },
                 { title: "Scalability & Growth", description: `Architectures designed to grow seamlessly with your business, allowing for easy expansion.`, icon: "TrendingUp" },
                 { title: "Security & Integrity", description: `We prioritize data confidentiality by implementing robust security protocols and compliance audits.`, icon: "ShieldCheck" }
               ];

               const pillars = serviceSpecificPillars[service.id] || defaultPillars;
               
               return pillars.map((item, i) => (
                 <FadeIn key={i} delay={i * 0.1}>
                   <div className="flex flex-col items-center text-center px-4 relative z-10 group">
                     {/* Circular Glassmorphic Icon Box */}
                     <div className="w-24 h-24 rounded-full bg-background border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.08)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] group-hover:border-primary/50 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
                       <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       {renderIcon(item.icon, "w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-500")}
                     </div>
                     <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                     <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px] opacity-80">{item.description}</p>
                   </div>
                 </FadeIn>
               ));
             })()}
          </div>
        </Container>
      </Section>

      {/* ─── OUR PROCESS (INFINITY/TRACK LAYOUT) ─── */}
      {(service.developmentProcess || service.process) && (service.developmentProcess || service.process).length > 0 && (
        <Section className="bg-muted/5 border-t border-border py-24 md:py-32 overflow-hidden">
          <Container>
            <FadeIn>
              <div className="text-center mb-16 md:mb-32">
                <h2 className="text-4xl font-black md:text-5xl">Our {service.title} Process</h2>
              </div>
            </FadeIn>

            {(() => {
              const steps = service.developmentProcess || service.process || [];
              
              if (steps.length === 6) {
                return (
                  <div className="relative max-w-7xl mx-auto hidden lg:flex items-center justify-center h-[650px] my-12">
                    {/* The Gradient Stadium Track */}
                    <div className="absolute inset-x-[220px] xl:inset-x-[280px] top-1/2 -translate-y-1/2 h-[280px]">
                      <FadeIn delay={0.2} className="w-full h-full relative">
                        <div className="w-full h-full rounded-[140px] bg-gradient-to-r from-primary via-blue-500 to-cyan-400 p-[20px] shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                          {/* Inner cutout to make it look like a hollow track */}
                          <div className="w-full h-full rounded-[120px] bg-background border-[4px] border-primary/10 backdrop-blur-md" />
                        </div>
                        
                        {/* The Nodes placed precisely on the track bounds */}
                        {steps.map((step: any, index: number) => {
                          let positionClasses = "";
                          let textClasses = "";
                          
                          if (index === 0) {
                            positionClasses = "top-[10px] left-[75%] -translate-x-1/2 -translate-y-1/2";
                            textClasses = "bottom-full mb-6 left-1/2 -translate-x-1/2 text-center w-60 xl:w-72";
                          } else if (index === 1) {
                            positionClasses = "top-[140px] right-[10px] translate-x-1/2 -translate-y-1/2";
                            textClasses = "left-full ml-5 xl:ml-8 top-1/2 -translate-y-1/2 w-48 xl:w-60";
                          } else if (index === 2) {
                            positionClasses = "bottom-[10px] left-[75%] -translate-x-1/2 translate-y-1/2";
                            textClasses = "top-full mt-6 left-1/2 -translate-x-1/2 text-center w-60 xl:w-72";
                          } else if (index === 3) {
                            positionClasses = "bottom-[10px] left-[25%] -translate-x-1/2 translate-y-1/2";
                            textClasses = "top-full mt-6 left-1/2 -translate-x-1/2 text-center w-60 xl:w-72";
                          } else if (index === 4) {
                            positionClasses = "top-[140px] left-[10px] -translate-x-1/2 -translate-y-1/2";
                            textClasses = "right-full mr-5 xl:mr-8 top-1/2 -translate-y-1/2 text-right w-48 xl:w-60";
                          } else if (index === 5) {
                            positionClasses = "top-[10px] left-[25%] -translate-x-1/2 -translate-y-1/2";
                            textClasses = "bottom-full mb-6 left-1/2 -translate-x-1/2 text-center w-60 xl:w-72";
                          }

                          return (
                            <div key={index} className={`absolute ${positionClasses} z-10`}>
                              <FadeIn delay={0.4 + index * 0.1} className="relative flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold border-[4px] border-background shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
                                  {index + 1}
                                </div>
                                <div className={`absolute ${textClasses} pointer-events-none`}>
                                  <h4 className="font-bold text-lg xl:text-xl mb-3 text-foreground">{step.title}</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed drop-shadow-sm">{step.description}</p>
                                </div>
                              </FadeIn>
                            </div>
                          );
                        })}
                      </FadeIn>
                    </div>
                  </div>
                );
              }

              return (
                <div className="lg:hidden relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent max-w-3xl mx-auto">
                  {steps.map((step: any, index: number) => (
                    <FadeIn key={index} delay={index * 0.1} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 relative">
                        {index + 1}
                      </div>
                      {/* Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-2xl bg-background border border-border shadow-sm">
                        <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              );
            })()}
            
            {/* Display Vertical Timeline for Mobile (or for anything that's not exactly 6 steps on Desktop) */}
            <div className="hidden lg:block">
              {(() => {
                const steps = service.developmentProcess || service.process || [];
                if (steps.length === 6) return null; // handled by track layout
                
                return (
                  <div className="relative space-y-12 before:absolute before:inset-0 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent max-w-4xl mx-auto">
                    {steps.map((step: any, index: number) => (
                      <FadeIn key={index} delay={index * 0.1} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-background bg-primary text-primary-foreground text-lg font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 relative">
                          {index + 1}
                        </div>
                        <div className="w-[calc(50%-4rem)] p-8 rounded-2xl bg-background border border-border shadow-sm">
                          <h4 className="font-bold text-2xl mb-3">{step.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                );
              })()}
            </div>
            
            <div className="mt-20 text-center">
              <Button asChild className="rounded-full px-8 py-6 text-lg font-bold">
                <Link href="/contact">Create Scalable {service.title} Solutions</Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── TECH STACK ─── */}
      {service.technologies && service.technologies.length > 0 && (
        <Section className="bg-muted/5 border-border border-b py-24">
          <Container>
            <FadeIn>
              <div className="mb-16 text-center">
                <h2 className="text-foreground mb-4 text-4xl font-black tracking-tighter md:text-5xl">
                  Our Tech Stack
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Equipped with the latest tools, our teams deliver impactful solutions designed to
                  grow your business.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {service.technologies.map((tech: string, index: number) => {
                  const getDeviconUrl = (t: string) => {
                    const key = t.toLowerCase();
                    const devicons: Record<string, string> = {
                      "node.js": "nodejs/nodejs-original",
                      typescript: "typescript/typescript-original",
                      python: "python/python-original",
                      go: "go/go-original",
                      java: "java/java-original",
                      "c#": "csharp/csharp-original",
                      ".net core": "dotnetcore/dotnetcore-original",
                      "asp.net core": "dotnetcore/dotnetcore-original",
                      react: "react/react-original",
                      "react native": "react/react-original",
                      "next.js": "nextjs/nextjs-original",
                      postgresql: "postgresql/postgresql-original",
                      mongodb: "mongodb/mongodb-original",
                      redis: "redis/redis-original",
                      docker: "docker/docker-original",
                      kubernetes: "kubernetes/kubernetes-plain",
                      aws: "amazonwebservices/amazonwebservices-original-wordmark",
                      "amazon web services (aws)": "amazonwebservices/amazonwebservices-original-wordmark",
                      azure: "azure/azure-original",
                      "microsoft azure": "azure/azure-original",
                      "google cloud": "googlecloud/googlecloud-original",
                      "google cloud platform": "googlecloud/googlecloud-original",
                      graphql: "graphql/graphql-plain",
                      flutter: "flutter/flutter-original",
                      dart: "dart/dart-original",
                      swift: "swift/swift-original",
                      kotlin: "kotlin/kotlin-original",
                      android: "android/android-original",
                      apple: "apple/apple-original",
                      ios: "apple/apple-original",
                      tensorflow: "tensorflow/tensorflow-original",
                      pytorch: "pytorch/pytorch-original",
                      mysql: "mysql/mysql-original",
                      sqlite: "sqlite/sqlite-original",
                      firebase: "firebase/firebase-plain",
                      nginx: "nginx/nginx-original",
                      linux: "linux/linux-original",
                      ubuntu: "ubuntu/ubuntu-original",
                      cloudflare: "cloudflare/cloudflare-original",
                      prometheus: "prometheus/prometheus-original",
                      grafana: "grafana/grafana-original",
                      "elk stack": "elasticsearch/elasticsearch-original",
                      jenkins: "jenkins/jenkins-original",
                      "gitlab ci/cd": "gitlab/gitlab-original",
                      terraform: "terraform/terraform-original",
                      ansible: "ansible/ansible-original",
                      pandas: "pandas/pandas-original",
                      numpy: "numpy/numpy-original",
                      "apache spark": "apachespark/apachespark-original",
                      dbt: "dbt/dbt-original",
                      fastapi: "fastapi/fastapi-original",
                      supabase: "supabase/supabase-original",
                      figma: "figma/figma-original",
                      "adobe xd": "xd/xd-plain",
                      sketch: "sketch/sketch-original",
                      webflow: "webflow/webflow-original",
                      storybook: "storybook/storybook-original",
                    };
                    
                    const simpleicons: Record<string, string> = {
                      openai: "openai",
                      "anthropic claude": "anthropic",
                      "google gemini": "googlegemini",
                      llama: "meta",
                      langchain: "langchain",
                      langgraph: "langchain",
                      crewai: "robotframework", 
                      autogen: "robotframework",
                      "hugging face": "huggingface",
                      pinecone: "pinecone",
                      weaviate: "weaviate",
                      chromadb: "chroma",
                      "github actions": "githubactions",
                      "rest api": "insomnia",
                      framer: "framer",
                      miro: "miro",
                      invision: "invision",
                      lottie: "lottiefiles",
                      zeplin: "zeplin",
                      "azure devops": "azuredevops",
                      netlify: "netlify",
                      vercel: "vercel",
                      opentelemetry: "opentelemetry",
                      "microsoft power bi": "powerbi",
                      "microsoft fabric": "microsoft",
                      "power query": "powerpages",
                      "sql server": "microsoftsqlserver",
                      "azure data factory": "microsoftazure",
                      "apache airflow": "apacheairflow",
                      "looker studio": "looker",
                      tableau: "tableau",
                      excel: "microsoftexcel",
                      microservices: "kubernetes",
                    };

                    if (devicons[key]) {
                      return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicons[key]}.svg`;
                    }
                    if (simpleicons[key]) {
                      return `https://cdn.simpleicons.org/${simpleicons[key]}`;
                    }
                    
                    const slug = key.replace(/[^a-z0-9]/g, '');
                    return `https://cdn.simpleicons.org/${slug}`;
                  };

                  const iconUrl = getDeviconUrl(tech);

                  return (
                    <div
                      key={index}
                      className="group flex aspect-square flex-col items-center justify-center rounded-md border border-black/10 bg-white p-6 transition-all duration-300 hover:shadow-lg"
                    >
                      {iconUrl ? (
                        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
                          <img
                            src={iconUrl}
                            alt={tech}
                            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                          <span className="text-center text-[11px] font-bold leading-tight text-black">
                            {tech}
                          </span>
                        </div>
                      ) : (
                        <span className="text-center text-sm font-bold text-black">{tech}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* ─── RELATED SERVICES ─── */}
      {relatedServices.length > 0 && (
        <Section className="bg-background border-border border-t py-24">
          <Container>
            <FadeIn>
              <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <h2 className="text-foreground mb-4 text-4xl font-black tracking-tighter md:text-5xl">
                    Related Services
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Explore other areas of our expertise.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-border shrink-0 rounded-none"
                >
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((related: any, index: number) => {
                const fallbackImages = [
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
                ];
                const imgUrl = related.imageUrl || fallbackImages[index % fallbackImages.length];

                return (
                  <StaggerItem
                    key={related.slug}
                    className="border-border/40 group relative flex min-h-[400px] flex-col justify-end overflow-hidden border bg-black"
                  >
                    <img
                      src={imgUrl}
                      alt={related.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    <div className="relative z-10 flex h-full translate-y-8 transform flex-col justify-end p-8 transition-transform duration-500 group-hover:translate-y-0">
                      <div className="bg-primary mb-4 h-1 w-8 origin-left scale-x-0 transform transition-transform delay-100 duration-500 group-hover:scale-x-100" />
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        {related.title}
                      </h3>

                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mb-6 line-clamp-2 text-base leading-relaxed text-white/70 opacity-0 transition-opacity delay-200 duration-500 group-hover:opacity-100">
                            {related.shortDescription ||
                              related.description ||
                              `Explore our ${related.title.toLowerCase()} solutions.`}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto border-t border-white/20 pt-4 opacity-0 transition-opacity delay-300 duration-500 group-hover:opacity-100">
                        <Button
                          asChild
                          size="default"
                          className="hover:bg-primary h-12 w-full rounded-none bg-white text-[10px] font-bold uppercase tracking-widest text-black hover:text-white"
                        >
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
              <div className="flex flex-col items-center justify-between gap-12 py-24 md:py-32 lg:flex-row">
                <div className="max-w-2xl">
                  <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl">
                    Ready to execute?
                  </h2>
                  <p className="text-background/70 text-xl font-medium">
                    Let's discuss how our technical expertise can accelerate your business growth.
                  </p>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-4 sm:flex-row lg:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 rounded-none px-10 text-xs font-bold uppercase tracking-widest"
                  >
                    <Link href="/contact">Let's work Together</Link>
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
