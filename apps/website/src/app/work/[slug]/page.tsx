import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, Button, Badge } from "@voryent/ui";
import { ArrowLeft, Calendar, ExternalLink, Globe } from "lucide-react";
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

  const coverImage = project.attachments?.[0]?.url || "/placeholder-image.jpg";

  return (
    <>
      <Section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
        <Container>
          <div className="max-w-4xl">
            <Link
              href="/work"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                {project.type}
              </Badge>
              {project.industry && (
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                  {project.industry}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {project.name}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted border border-border/50">
                <Image
                  src={coverImage}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Fallback rendering of project details since we don't have rich text HTML here */}
                <h3>Project Overview</h3>
                <p className="whitespace-pre-line">{project.notes || project.description}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <>
                    <h3>Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 not-prose">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Project Details</h3>
                
                <dl className="space-y-4 text-sm">
                  {project.client && (
                    <div>
                      <dt className="text-muted-foreground mb-1 flex items-center">
                        <Globe className="mr-2 h-4 w-4" /> Client
                      </dt>
                      <dd className="font-medium text-foreground">{project.client}</dd>
                    </div>
                  )}
                  
                  {project.completedDate && (
                    <div>
                      <dt className="text-muted-foreground mb-1 flex items-center">
                        <Calendar className="mr-2 h-4 w-4" /> Completed
                      </dt>
                      <dd className="font-medium text-foreground">
                        {new Date(project.completedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </dd>
                    </div>
                  )}

                  {project.website && (
                    <div className="pt-4 mt-4 border-t border-border/50">
                      <Button asChild className="w-full">
                        <a href={project.website} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </dl>
              </div>

              <div className="rounded-xl bg-primary px-6 py-8 text-center text-primary-foreground shadow-lg">
                <h3 className="font-bold text-xl mb-3">Ready to start?</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm">
                  Let's discuss how we can build something similar for your business.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
