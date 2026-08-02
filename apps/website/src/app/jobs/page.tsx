import type { Metadata } from "next";
import { Container, Section, Badge } from "@voryent/ui";
import { getCareersJobs } from "@/lib/firebase/services";
import { JobListClient } from "./job-list-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Open Positions | Voryent Solutions",
    description: "Explore our current job openings and find where you fit in. We are always looking for talented engineers and designers.",
    alternates: {
      canonical: "https://voryentsolutions.com/jobs",
    },
  };
}

export default async function JobsPage() {
  const dbJobsRaw = await getCareersJobs().catch(() => []);
  const dbJobs = dbJobsRaw ? JSON.parse(JSON.stringify(dbJobsRaw)) : [];

  const emptyState = {
    title: "No open positions at the moment.",
    description: "We don't have any specific roles open right now, but we are always looking for talented engineers and designers. We'd still love to hear from you."
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 border-b border-border/50 bg-muted/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium">
              Join Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Open Positions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our current openings across engineering, design, and product. Find where you fit in and apply today.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── JOB LISTINGS ─── */}
      <Section className="py-12 md:py-24">
        <Container>
          <JobListClient jobs={dbJobs} emptyState={emptyState} />
        </Container>
      </Section>
    </>
  );
}
