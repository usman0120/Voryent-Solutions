import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, Button, Badge } from "@voryent/ui";
import { ArrowLeft, Calendar, ExternalLink, Globe, Github, AlertTriangle, Lightbulb, TrendingUp, CheckCircle2 } from "lucide-react";
import { getProjectBySlug } from "@/lib/firebase/services";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const coverImage = project.coverImage || project.attachments?.[0]?.url || "https://placehold.co/1200x600/EEE/31343C";

  return (
    <>
      <Section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
        <Container>
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <Link
              href="/work"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                {project.type || project.category || "Project"}
              </Badge>
              {project.industry && (
                <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
                  {project.industry}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              {project.name || project.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto md:mx-0">
              {project.description || project.summary}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12 bg-muted/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-16">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-muted border border-border/50 shadow-xl">
                <Image
                  src={coverImage}
                  alt={project.name || project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
                
                {/* Overview */}
                <div className="bg-card rounded-3xl p-8 md:p-10 shadow-md">
                  <h2 className="text-3xl font-bold tracking-tight mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 text-sm">01</span>
                    Project Overview
                  </h2>
                  {project.content ? (
                    <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: project.content }} />
                  ) : (
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">{project.notes || project.description}</p>
                  )}
                </div>

                {/* Challenges */}
                {project.challenges && (
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mr-4" />
                      Challenges & Problems
                    </h2>
                    {Array.isArray(project.challenges) ? (
                      <div className="grid gap-4">
                        {project.challenges.map((challenge: any, i: number) => (
                          <div key={i} className="flex items-start bg-amber-500/5 rounded-3xl p-6 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mr-4 mt-1">
                              {i + 1}
                            </div>
                            <p className="text-muted-foreground m-0 text-lg leading-relaxed">
                              {typeof challenge === 'string' ? challenge : JSON.stringify(challenge)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-amber-500/5 rounded-3xl p-8 text-muted-foreground leading-relaxed text-lg shadow-sm" dangerouslySetInnerHTML={{ __html: typeof project.challenges === 'string' ? project.challenges : JSON.stringify(project.challenges) }} />
                    )}
                  </div>
                )}

                {/* Solutions */}
                {project.solutions && (
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center">
                      <Lightbulb className="w-8 h-8 text-primary mr-4" />
                      Our Solutions
                    </h2>
                    {Array.isArray(project.solutions) ? (
                      <div className="grid gap-4">
                        {project.solutions.map((solution: any, i: number) => (
                          <div key={i} className="flex items-start bg-primary/5 rounded-3xl p-6 shadow-sm">
                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-1" />
                            <p className="text-muted-foreground m-0 text-lg leading-relaxed">
                              {typeof solution === 'string' ? solution : JSON.stringify(solution)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-primary/5 rounded-3xl p-8 text-muted-foreground leading-relaxed text-lg whitespace-pre-line shadow-sm">
                        {typeof project.solutions === 'string' ? project.solutions : JSON.stringify(project.solutions)}
                      </div>
                    )}
                  </div>
                )}

                {/* Outcomes */}
                {project.outcomes && (
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center">
                      <TrendingUp className="w-8 h-8 text-emerald-500 mr-4" />
                      Results & Key Outcomes
                    </h2>
                    {Array.isArray(project.outcomes) ? (
                      <div className="grid gap-4">
                        {project.outcomes.map((outcome: any, i: number) => (
                          <div key={i} className="flex items-start bg-emerald-500/5 rounded-3xl p-6 shadow-sm">
                            <TrendingUp className="w-6 h-6 text-emerald-500 shrink-0 mr-4 mt-1" />
                            <p className="text-muted-foreground font-medium m-0 text-lg leading-snug">
                              {typeof outcome === 'string' ? outcome : JSON.stringify(outcome)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-emerald-500/5 rounded-3xl p-8 text-muted-foreground leading-relaxed text-lg shadow-sm" dangerouslySetInnerHTML={{ __html: typeof project.outcomes === 'string' ? project.outcomes : JSON.stringify(project.outcomes) }} />
                    )}
                  </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="not-prose mt-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">Project Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.gallery.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
                          <img src={img} alt={`${project.name} gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials */}
                {project.testimonials && project.testimonials.length > 0 && (
                  <div className="not-prose mt-16 bg-gradient-to-br from-muted to-muted/50 rounded-3xl p-10 shadow-lg">
                    <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground text-center">Client Testimonial</h2>
                    <div className="space-y-8">
                      {project.testimonials.map((t: any, idx: number) => (
                         <figure key={idx} className="flex flex-col items-center text-center">
                          <svg className="w-12 h-12 text-primary/40 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                          <blockquote className="text-xl md:text-2xl italic text-foreground mb-8 max-w-2xl font-medium leading-relaxed">
                            "{t.quote}"
                          </blockquote>
                          <figcaption className="font-semibold text-foreground text-lg">
                            {t.author}
                            {t.role && <span className="block text-sm font-normal text-muted-foreground mt-2 uppercase tracking-wider">{t.role}</span>}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Sidebar Column - Scrollable container removed */}
            <div className="lg:col-span-1 space-y-8">
                
                <div className="rounded-3xl bg-card p-8 shadow-xl">
                  <h3 className="font-bold text-xl mb-8">Project Details</h3>
                  
                  <dl className="space-y-6 text-sm">
                    {project.client && (
                      <div>
                        <dt className="text-muted-foreground mb-2 flex items-center font-medium">
                          <Globe className="mr-2 h-4 w-4" /> Client
                        </dt>
                        <dd className="font-semibold text-foreground text-base">{project.client}</dd>
                      </div>
                    )}
                    
                    {project.completedDate && (
                      <div>
                        <dt className="text-muted-foreground mb-2 flex items-center font-medium">
                          <Calendar className="mr-2 h-4 w-4" /> Delivered
                        </dt>
                        <dd className="font-semibold text-foreground text-base">
                          {new Date(project.completedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </dd>
                      </div>
                    )}

                    {project.servicesProvided && project.servicesProvided.length > 0 && (
                      <div className="pt-4 border-t border-muted">
                        <dt className="text-muted-foreground mb-3 font-medium">Services</dt>
                        <dd>
                          <div className="flex flex-wrap gap-2">
                            {project.servicesProvided.map((service: any) => (
                              <Badge key={typeof service === 'string' ? service : JSON.stringify(service)} variant="secondary" className="font-medium bg-muted hover:bg-muted/80 py-1.5 px-3">
                                {typeof service === 'string' ? service : JSON.stringify(service)}
                              </Badge>
                            ))}
                          </div>
                        </dd>
                      </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="pt-4 mt-4 border-t border-muted">
                        <dt className="text-muted-foreground mb-3 font-medium">Tech Stack</dt>
                        <dd>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech: any) => (
                              <Badge key={typeof tech === 'string' ? tech : JSON.stringify(tech)} variant="outline" className="font-medium py-1.5 px-3 text-primary border-primary/20">
                                {typeof tech === 'string' ? tech : JSON.stringify(tech)}
                              </Badge>
                            ))}
                          </div>
                        </dd>
                      </div>
                    )}

                    <div className="pt-8 mt-8 border-t border-muted space-y-4">
                      {project.demoUrl && (
                        <Button asChild className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.website && (
                        <Button asChild className="w-full h-12" variant="outline">
                          <a href={project.website} target="_blank" rel="noopener noreferrer">
                            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.repository && (
                        <Button asChild className="w-full h-12 bg-card border hover:bg-muted transition-colors text-foreground">
                          <a href={project.repository} target="_blank" rel="noopener noreferrer">
                            View Repository <Github className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </dl>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-600 px-8 py-10 text-center text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-2xl mb-4">Start your project</h3>
                    <p className="text-white/90 mb-8 text-base">
                      Let's discuss how we can build something impactful for your business.
                    </p>
                    <Button asChild variant="secondary" className="w-full h-12 text-primary font-bold shadow-lg hover:-translate-y-1 transition-transform">
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>

            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
