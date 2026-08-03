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

      {/* ─── TABULAR FEATURES GRID ─── */}
      <Section className="bg-muted/5 border-border border-b py-24">
        <Container>
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-foreground mb-6 text-4xl font-black tracking-tighter md:text-5xl">
                Core Capabilities
              </h2>
              <p className="text-muted-foreground max-w-2xl text-xl">
                What you get when partnering with us.
              </p>
            </div>
          </FadeIn>

          {service.features && service.features.length > 0 ? (
            <div className="border-border grid grid-cols-1 border-l border-t md:grid-cols-2">
              {service.features.map((feature: any, index: number) => (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  className="border-border hover:bg-background group border-b border-r p-10 transition-colors md:p-14"
                >
                  <div className="text-primary mb-8 origin-left transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                    {renderIcon(feature.icon || "CheckCircle2", "w-10 h-10")}
                  </div>
                  <h3 className="text-foreground mb-4 text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </FadeIn>
              ))}
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

      {/* ─── PROCESS GRID ─── */}
      {service.process && service.process.length > 0 && (
        <Section className="bg-foreground text-background py-24">
          <Container>
            <FadeIn>
              <div className="mb-20">
                <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
                  Methodology
                </h2>
                <div className="bg-primary h-1 w-16" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {service.process
                .sort((a: any, b: any) => (a.step || 0) - (b.step || 0))
                .map((step: any, index: number) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <div className="group relative">
                      <div className="text-background/10 group-hover:text-primary/20 pointer-events-none absolute -left-4 -top-12 z-0 text-8xl font-black transition-colors">
                        0{step.step || index + 1}
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-background mb-4 flex items-center gap-3 text-2xl font-bold">
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
