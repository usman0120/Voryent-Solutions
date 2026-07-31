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
      {/* ─── BREADCRUMBS & HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 border-b border-border/50 bg-muted/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{job.department}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                {job.workMode}
              </Badge>
              {job.featured && (
                <Badge className="bg-amber-500 text-white flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{job.employmentType}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">$</span>
                  <span>{job.salary} ({job.currency})</span>
                </div>
              )}
              {job.closingDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Closes: {job.closingDate}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── TABS & DETAILS ─── */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <JobDetailClient job={job} />
          </div>
        </Container>
      </Section>

      {/* ─── FAQ PREVIEW ─── */}
      <Section className="bg-muted/30 border-t border-border/50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">
              What to expect when applying at Voryent Solutions.
            </p>
          </div>
          <FaqComponent items={faqItems} />
        </Container>
      </Section>
    </>
  );
}
