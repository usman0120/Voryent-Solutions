"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Section, Button } from "@voryent/ui";
import { ArrowRight, Github, ExternalLink, Code2, Rocket, Brain, AppWindow, Smartphone, Cloud } from 'lucide-react';

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  slug: string;
}

const capabilities = [
  { icon: Code2, title: "Custom Software", desc: "Tailored enterprise solutions built for scale and performance." },
  { icon: Brain, title: "AI Solutions", desc: "Intelligent systems, data pipelines, and machine learning models." },
  { icon: AppWindow, title: "Web Applications", desc: "Modern, responsive, and high-performance web platforms." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile experiences for iOS and Android." },
  { icon: Cloud, title: "Cloud Engineering", desc: "Resilient cloud infrastructure and automated DevOps pipelines." },
];

export function WorkClientPage({ initialProjects }: { initialProjects: Project[] }) {
  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/20 tracking-wider uppercase"
            >
              Our Portfolio
            </motion.span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              Selected work and digital products we've built.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              This page showcases real projects, in-depth case studies, and engineering work delivered by Voryent Solutions.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg transition-all hover:-translate-y-1">
                <a href="#projects">View Case Studies</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base hover:-translate-y-1 transition-transform bg-background text-foreground hover:bg-muted">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ─── PROJECTS GRID ─── */}
      <Section id="projects" className="bg-muted/20 py-20 relative">
        <Container>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {initialProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={scale}
                className="h-full"
              >
                <div className="group h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                    )}

                    {/* Quick view button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <Button asChild variant="secondary" className="shadow-xl">
                        <Link href={`/work/${project.slug}`}>
                          View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 flex-1 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.techStack?.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-[10px] uppercase tracking-wider font-semibold text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack && project.techStack.length > 4 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-[10px] uppercase tracking-wider font-semibold rounded-full">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                      {project.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" /> Code
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-md"
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" /> Demo
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <Link href={`/work/${project.slug}`}>
                          Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {initialProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-20 bg-card rounded-3xl border shadow-sm mt-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                <Rocket className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Our portfolio is growing.
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                We're currently preparing our first public case studies. Check back soon or reach out to discuss our experience directly.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white">
                <Link href="/contact">
                  Discuss Your Project
                </Link>
              </Button>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* ─── DEVELOPMENT CAPABILITIES ─── */}
      <Section className="py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Development Capabilities
            </h2>
            <p className="text-lg text-muted-foreground">
              Core competencies powering our digital products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors shadow-sm group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <cap.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
            
            {/* CTA Card in the grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4">Need something else?</h3>
              <p className="text-white/80 mb-6">Our expertise extends beyond these core areas. Let's talk about your specific requirements.</p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/services">Explore All Services</Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="p-10 md:p-16 bg-card border rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Ready to build something amazing?
                </h3>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                  Let's collaborate to build an innovative and impactful digital solution for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="h-14 px-8 text-base bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    <Link href="/contact">
                      Start a Project <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base hover:-translate-y-1 transition-transform bg-background text-foreground hover:bg-muted">
                    <a href={initialProjects.length > 0 && initialProjects[0]?.githubUrl ? initialProjects[0]?.githubUrl : 'https://github.com/'} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" /> View GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
