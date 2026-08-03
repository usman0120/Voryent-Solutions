import Link from "next/link"
import { getIndustries } from "@/lib/firebase/services"
import { Container, Section, Button } from "@voryent/ui"
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  Brain, 
  Building2, 
  Mail,
  FileCode2,
  Database,
  Cloud,
  LayoutTemplate,
  Server,
  Atom,
  Terminal
} from "lucide-react"
import * as LucideIcons from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

const defaultTechnologies = [
  "Next.js", "React", "TypeScript", "Node.js", "Supabase", 
  "Tailwind CSS", "PostgreSQL", "Clerk", "Resend", "Vercel"
]

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

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function IndustriesPage() {
  const dbIndustries = await getIndustries().catch(() => []);
  const activeIndustries = dbIndustries.filter((i: any) => i.status === "Published" || !i.status);

  // Extract all unique technologies from industries
  const allTechnologies = activeIndustries.flatMap((i: any) => i.technologies || []);
  const uniqueTechnologies = Array.from(new Set(allTechnologies));
  const displayTechnologies = uniqueTechnologies.length > 0 ? uniqueTechnologies : defaultTechnologies;

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative min-h-[80vh] flex items-end pb-24 pt-48 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Structural Background" 
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
            <span className="mb-6 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Global Industries
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Engineering for<br />every sector.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl leading-relaxed">
              We bring deep technical expertise and domain-specific knowledge to help organizations across all sectors modernize, scale, and innovate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
                <Link href="/contact">Discuss Your Industry</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── INDUSTRIES LARGE SPLIT LAYOUT ─── */}
      <Section className="py-32 bg-background border-b border-border/60 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
        
        <Container className="relative z-10">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-3xl">
              <div className="h-1 w-20 bg-primary mb-8" />
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">Sectors We Serve</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We deliver targeted expertise and robust software architectures across high-growth and established markets. Explore our specialized industry solutions below.
              </p>
            </div>
          </div>
          
          {activeIndustries.length > 0 ? (
            <div className="space-y-16 lg:space-y-24">
              {activeIndustries.map((industry: any, idx: number) => {
                const IconComponent = (LucideIcons as any)[industry.icon || "Building2"] || Building2;
                const isEven = idx % 2 === 0;
                
                return (
                  <div key={industry.slug} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-muted/5 border border-border/60 group overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl`}>
                    
                    {/* Image Side */}
                    <div className="lg:w-1/2 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted border-b lg:border-b-0 lg:border-r border-border/60">
                      { (industry.coverImage || industry.imageUrl) ? (
                        <img 
                          src={industry.coverImage || industry.imageUrl} 
                          alt={industry.title} 
                          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/30">
                          <IconComponent className="h-24 w-24 text-muted-foreground/20" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 p-10 lg:p-16 xl:p-24 flex flex-col justify-center bg-background relative">
                      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transition-opacity duration-500 group-hover:opacity-10 group-hover:text-primary">
                        <IconComponent className="h-32 w-32" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                           <div className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary">
                             <IconComponent className="h-4 w-4" />
                           </div>
                           {industry.title} Sector
                        </div>
                        
                        <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-foreground group-hover:text-primary transition-colors">
                          {industry.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-lg leading-relaxed mb-10 flex-grow">
                          {industry.description}
                        </p>
                        
                        <Button asChild className="w-fit rounded-none h-14 px-8 text-xs font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-colors">
                          <Link href={`/industries/${industry.slug}`}>
                            Explore Solutions <ArrowRight className="ml-3 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32 text-muted-foreground border border-border/60 bg-muted/5">
              <Building2 className="h-16 w-16 mx-auto mb-6 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">No industries found</p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── TECHNOLOGY EXPERTISE (WITH ICONS) ─── */}
      <Section className="py-24 bg-muted/5 border-b border-border/60">
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">Our Tech Stack</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We leverage an elite, modern technology stack to ensure massive performance, strict type safety, and rapid developer velocity across all industries.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {displayTechnologies.map((tech: string, idx: number) => {
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
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ─── HOW WE HELP (3-COLUMN STRUCTURAL) ─── */}
      <Section className="py-32 bg-background border-b border-border/60">
        <Container>
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-3xl">
              <div className="h-1 w-20 bg-primary mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">How We Help</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our core engineering approach solves fundamental business challenges regardless of your sector.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-start bg-muted/5 border border-border/60 p-10 lg:p-12 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-background border border-border/60 flex items-center justify-center text-foreground mb-8">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Digital Transformation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We modernize legacy systems and transition organizations to agile, cloud-native architectures. By eliminating technical debt, we enable your team to move faster and respond instantly to market demands.
              </p>
            </div>

            <div className="flex flex-col items-start bg-muted/5 border border-border/60 p-10 lg:p-12 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-background border border-border/60 flex items-center justify-center text-foreground mb-8">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Automation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We identify operational bottlenecks and engineer robust automated workflows. From supply chain logistics to internal HR processes, we build software that reduces human error and cuts operational costs.
              </p>
            </div>

            <div className="flex flex-col items-start bg-muted/5 border border-border/60 p-10 lg:p-12 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-background border border-border/60 flex items-center justify-center text-foreground mb-8">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">AI Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement intelligent machine learning models and LLMs specifically tuned to your domain data. This unlocks predictive analytics, automated customer support, and completely new revenue streams.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <Container className="relative z-10">
          <div className="border border-border/60 bg-muted/5 p-12 lg:p-24 text-center max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 border border-border/60 bg-background flex items-center justify-center text-foreground mb-10">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-8">
              Ready to transform your industry?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Let's build something exceptional together. Contact us today to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-colors">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest border-border/60 bg-background hover:bg-muted/50 transition-colors">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
