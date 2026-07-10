import Image from "next/image"
import Link from "next/link"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { ArrowRight, Code2, Brain, Globe, Smartphone, Cloud, CheckCircle2 } from "lucide-react"

import { getAllContent } from "../../lib/content"

/* ──────────────────────────── DATA ──────────────────────────── */


const capabilities = [
  { icon: Code2, title: "Custom Software" },
  { icon: Brain, title: "AI Solutions" },
  { icon: Globe, title: "Web Applications" },
  { icon: Smartphone, title: "Mobile Apps" },
  { icon: Cloud, title: "Cloud Engineering" },
]

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function WorkPage() {
  const allProjects = getAllContent("projects")
  // Map content item to project format
  const projects = allProjects.map(p => ({
    title: p["title"] as string,
    category: p["category"] as string,
    summary: p["summary"] as string,
    technologies: p["technologies"] as string[] || [],
    imageSrc: p["coverImage"] as string || "",
    link: "/contact" // Still linking to contact for projects
  }))

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Selected work and digital products we&apos;ve built.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              This page showcases real projects, in-depth case studies, and engineering work delivered by Voryent Solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="#projects">View Case Studies</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── FEATURED WORK / PROJECT GRID ─── */}
      <Section id="projects" className="bg-muted/30">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project, i) => (
                <Card key={i} className="flex flex-col h-full border-border/50 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
                  <div className="relative aspect-[16/9] w-full bg-muted border-b border-border/50 overflow-hidden">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {project.summary}
                    </p>
                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="inline-flex items-center rounded-md bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button asChild variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform">
                      <Link href={project.link}>
                        Discuss a similar project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-4">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Our portfolio is growing.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
                We&apos;re currently preparing our first public case studies.
                Check back soon or reach out to discuss our experience directly.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* ─── DEVELOPMENT CAPABILITIES ─── */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Development Capabilities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Core competencies powering our digital products.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex flex-col items-center p-6 text-center rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <cap.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-foreground">{cap.title}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
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
        </Container>
      </Section>
    </>
  )
}
