import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Button } from "@voryent/ui";
import {
  ShieldCheck,
  Lock,
  Key,
  RefreshCcw,
  EyeOff,
  FileCode2,
  Server,
  Database,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security | Voryent Solutions",
  description:
    "Learn about our commitment to security, our principles, and how we protect your data.",
  alternates: {
    canonical: "https://voryentsolutions.com/security",
  },
};

export default function SecurityPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative flex min-h-[70vh] items-end overflow-hidden bg-black pb-24 pt-48 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
            alt="Server Infrastructure"
            className="h-full w-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="border-primary max-w-4xl border-l-4 pl-6">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Voryent Security
            </span>
            <h1 className="mb-8 text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-8xl">
              Security by Design.
            </h1>
            <p className="mb-10 max-w-2xl text-xl font-medium leading-relaxed text-white/80">
              We take security seriously. Our commitment to protecting your data starts from the
              first line of code and extends through our entire infrastructure.
            </p>
            <Button
              asChild
              size="lg"
              className="hover:bg-primary h-14 rounded-none bg-white px-8 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:text-white"
            >
              <Link href="#contact">Report Vulnerability</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY PRINCIPLES ─── */}
      <Section className="bg-background border-border/60 border-b">
        <Container>
          <div className="border-border/60 mb-16 border-b pb-8">
            <h2 className="text-foreground text-4xl font-bold tracking-tighter md:text-5xl">
              Security Principles
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
              The fundamental practices that guide how we build software and manage infrastructure.
            </p>
          </div>

          <div className="bg-border/60 border-border/60 grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileCode2,
                title: "Secure Development",
                desc: "Security is baked into our SDLC. We perform code reviews, static analysis, and dependency scanning continuously.",
              },
              {
                icon: Key,
                title: "Principle of Least Privilege",
                desc: "Access rights and permissions are restricted to only what is strictly required to perform a specific task.",
              },
              {
                icon: Lock,
                title: "Encryption",
                desc: "We utilize modern encryption protocols for data at rest and data in transit across all our systems.",
              },
              {
                icon: RefreshCcw,
                title: "Regular Updates",
                desc: "We proactively patch and update our dependencies, frameworks, and infrastructure to mitigate known vulnerabilities.",
              },
              {
                icon: ShieldCheck,
                title: "Access Control",
                desc: "Strict authentication, including multi-factor authentication (MFA), is required for all administrative access.",
              },
              {
                icon: EyeOff,
                title: "Privacy by Design",
                desc: "We collect only the data we need and ensure privacy controls are integrated into the architecture of our products.",
              },
            ].map((principle, i) => (
              <div
                key={i}
                className="bg-background hover:bg-muted/5 group flex flex-col p-10 transition-colors"
              >
                <div className="border-border/60 bg-muted/30 text-foreground group-hover:text-primary mb-8 flex h-12 w-12 items-center justify-center border transition-colors">
                  <principle.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-4 text-xl font-bold tracking-tight">{principle.title}</h3>
                <p className="text-muted-foreground flex-grow text-sm leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── INFRASTRUCTURE OVERVIEW ─── */}
      <Section className="bg-muted/5 border-border/60 border-b py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="sticky top-24 lg:col-span-4">
              <div className="border-border/60 bg-background text-foreground mb-6 flex h-16 w-16 items-center justify-center border">
                <Server className="h-6 w-6" />
              </div>
              <h2 className="text-foreground mb-4 text-4xl font-bold tracking-tighter">
                Infrastructure Overview
              </h2>
              <p className="text-muted-foreground">Architected for resilience and compliance.</p>
            </div>
            <div className="prose prose-gray dark:prose-invert text-muted-foreground prose-p:text-lg prose-p:leading-relaxed max-w-none lg:col-span-8">
              <p>
                Our applications are hosted on industry-leading cloud providers like AWS and Vercel,
                which provide world-class physical and network security. We deploy our
                infrastructure using Infrastructure as Code (IaC) to ensure consistency,
                auditability, and rapid recovery.
              </p>
              <p>
                We do not maintain our own physical servers, leveraging the robust compliance and
                security frameworks of our cloud partners to protect the underlying hardware and
                network layers.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── DATA PROTECTION ─── */}
      <Section className="bg-background border-border/60 border-b py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="sticky top-24 lg:col-span-4">
              <div className="border-border/60 bg-muted/30 text-foreground mb-6 flex h-16 w-16 items-center justify-center border">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-foreground mb-4 text-4xl font-bold tracking-tighter">
                Data Protection
              </h2>
              <p className="text-muted-foreground">Encryption at every layer.</p>
            </div>
            <div className="prose prose-gray dark:prose-invert text-muted-foreground prose-p:text-lg prose-p:leading-relaxed max-w-none lg:col-span-8">
              <p>
                Protecting your data is our highest priority. All data transmitted between clients
                and our servers is encrypted using TLS 1.2 or higher. Data stored at rest in our
                databases and object storage is encrypted using industry-standard AES-256
                encryption.
              </p>
              <p>
                We employ automated backup systems and redundancy strategies to prevent data loss
                and ensure rapid recovery in the event of an incident. Backups are encrypted and
                stored in isolated environments.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RESPONSIBLE DISCLOSURE ─── */}
      <Section className="bg-muted/5 border-border/60 border-b py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="sticky top-24 lg:col-span-4">
              <div className="border-border/60 bg-background text-foreground mb-6 flex h-16 w-16 items-center justify-center border">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-foreground mb-4 text-4xl font-bold tracking-tighter">
                Responsible Disclosure
              </h2>
              <p className="text-muted-foreground">Collaborating with the security community.</p>
            </div>
            <div className="prose prose-gray dark:prose-invert text-muted-foreground prose-p:text-lg prose-p:leading-relaxed max-w-none lg:col-span-8">
              <p>
                We believe in the value of the security community and encourage responsible
                reporting of any security vulnerabilities found in our systems. If you believe you
                have discovered a vulnerability, please let us know immediately.
              </p>
              <ul className="mt-8 list-none space-y-4 pl-0">
                <li className="flex items-start gap-3">
                  <div className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none" />
                  <span>Please provide detailed reports with reproducible steps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none" />
                  <span>
                    Do not exploit the vulnerability beyond what is necessary to confirm its
                    existence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none" />
                  <span>
                    Avoid privacy violations, destruction of data, and interruption or degradation
                    of our service.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none" />
                  <span>
                    Give us a reasonable amount of time to resolve the issue before making it
                    public.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Please submit your findings to our security team using the contact information
                below. We will acknowledge your report and keep you updated on our progress.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY CONTACT CTA ─── */}
      <Section id="contact" className="bg-background relative overflow-hidden py-32">
        {/* Abstract structural dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <Container className="relative z-10">
          <div className="border-border/60 bg-muted/5 mx-auto flex max-w-4xl flex-col items-center border p-12 text-center lg:p-24">
            <div className="border-border/60 bg-background text-foreground mb-8 flex h-16 w-16 items-center justify-center border">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tighter md:text-5xl">
              Contact Security Team
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
              If you have security concerns, questions about our practices, or need to report a
              vulnerability, please reach out to us directly.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-primary h-16 rounded-none px-10 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <a href="mailto:contact@voryentsolutions.com">Email contact@voryentsolutions.com</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
