import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Badge, FaqComponent } from "@voryent/ui";
import { ChevronRight, MapPin, Clock, Calendar, Briefcase, Sparkles } from "lucide-react";
import { getJobBySlug } from "@/lib/firebase/services";
import { JobDetailClient } from "./job-detail-client";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const job: any = await getJobBySlug(resolvedParams.slug).catch(() => null);
  
  if (!job) {
    return {
      title: "Job Not Found | Voryent Solutions",
    };
  }

  return {
    title: `${job.title} | Careers | Voryent Solutions`,
    description: job.description?.substring(0, 160).replace(/<[^>]*>/g, "") || `Apply for the ${job.title} role at Voryent Solutions.`,
    alternates: {
      canonical: `https://voryentsolutions.com/careers/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = await params;
  const jobRaw = await getJobBySlug(resolvedParams.slug).catch(() => null);

  const job = jobRaw ? JSON.parse(JSON.stringify(jobRaw)) : null;

  if (!job) {
    notFound();
  }

  const faqItems = [
    {
      question: "Do you offer remote work?",
      answer: "Yes, we are a remote-first company. We hire talented engineers from all over the world and provide flexible working hours to accommodate different time zones."
    },
    {
      question: "What tech stack do you use?",
      answer: "We primarily work with React, Next.js, Node.js, TypeScript, PostgreSQL, and various cloud platforms like AWS and Vercel."
    }
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Office"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
        </div>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 text-sm text-background/70 mb-8 uppercase tracking-widest font-semibold">
              <Link href="/jobs" className="hover:text-background transition-colors">Jobs</Link>
              <ChevronRight className="h-4 w-4" />
              <span>{job.department}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary" className="bg-background text-foreground hover:bg-background/90 text-sm font-medium px-4 py-1.5 rounded-full">
                {job.workMode}
              </Badge>
              {job.featured && (
                <Badge className="bg-amber-500 text-white flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Sparkles className="h-4 w-4" /> Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-background/90 pt-6 border-t border-background/20">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-background/60" />
                <span className="text-base">{job.employmentType}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-background/60" />
                <span className="text-base">{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-background/60">$</span>
                  <span className="text-base">{job.salary} ({job.currency})</span>
                </div>
              )}
              {job.closingDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-background/60" />
                  <span className="text-base">Closes: {job.closingDate}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── DETAILS & FORM ─── */}
      <Section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <JobDetailClient job={job} />
          </div>
        </Container>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="py-24 bg-muted/20 border-t border-border/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-4 block">Help Center</span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What to expect when applying at Voryent Solutions.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FaqComponent items={faqItems} />
          </div>
        </Container>
      </Section>
    </>
  );
}
