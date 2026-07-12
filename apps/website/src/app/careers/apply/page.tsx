import type { Metadata } from "next";
import { Container, Section } from "@voryent/ui";
import { ApplicationForm } from "../[slug]/application-form";

export const metadata: Metadata = {
  title: "Submit General Application | Voryent Solutions",
  description: "Don't see a perfect fit? Submit a general application and we'll keep you in mind for future roles.",
};

export default function GeneralApplicationPage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 bg-muted/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              General Application
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't see a specific role that fits your background? We are always on the lookout for exceptional talent. Submit your resume and we'll reach out if a relevant opportunity opens up.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <ApplicationForm jobId="general" jobTitle="General Application" />
          </div>
        </Container>
      </Section>
    </>
  );
}
