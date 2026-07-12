import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/firebase/services";
import { ApplicationForm } from "./application-form";
import { Container, Section } from "@voryent/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Apply for Job",
};

export default async function ApplyPage({ params }: { params: Promise<{ jobSlug: string }> }) {
  const resolvedParams = await params;
  const job = (await getJobBySlug(resolvedParams.jobSlug)) as any;

  if (!job) {
    notFound();
  }

  return (
    <div className="pt-24 pb-12">
      <Section className="bg-background">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Link 
              href="/careers" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>
            <div className="mb-8 border-b pb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Apply for {job.title}</h1>
              <p className="text-muted-foreground">
                {job.department} &bull; {job.location} &bull; {job.type}
              </p>
            </div>
            
            <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
              <ApplicationForm jobSlug={resolvedParams.jobSlug} jobTitle={job.title} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
