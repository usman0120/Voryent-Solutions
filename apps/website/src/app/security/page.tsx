import type { Metadata } from "next"
import Link from "next/link"
import { 
  Container, 
  Section, 
  Button, 
  Badge, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@voryent/ui"
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
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Security | Voryent Solutions",
  description: "Learn about our commitment to security, our principles, and how we protect your data.",
  alternates: {
    canonical: "https://voryentsolutions.com/security",
  },
}

export default function SecurityPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium">
              Voryent Security
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Security by Design.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We take security seriously. Our commitment to protecting your data starts from the first line of code and extends through our entire infrastructure.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY PRINCIPLES ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Security Principles</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The fundamental practices that guide how we build software and manage infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileCode2, title: "Secure Development", desc: "Security is baked into our SDLC. We perform code reviews, static analysis, and dependency scanning continuously." },
              { icon: Key, title: "Principle of Least Privilege", desc: "Access rights and permissions are restricted to only what is strictly required to perform a specific task." },
              { icon: Lock, title: "Encryption", desc: "We utilize modern encryption protocols for data at rest and data in transit across all our systems." },
              { icon: RefreshCcw, title: "Regular Updates", desc: "We proactively patch and update our dependencies, frameworks, and infrastructure to mitigate known vulnerabilities." },
              { icon: ShieldCheck, title: "Access Control", desc: "Strict authentication, including multi-factor authentication (MFA), is required for all administrative access." },
              { icon: EyeOff, title: "Privacy by Design", desc: "We collect only the data we need and ensure privacy controls are integrated into the architecture of our products." },
            ].map((principle, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <principle.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{principle.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── INFRASTRUCTURE OVERVIEW ─── */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Server className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Infrastructure Overview</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Our applications are hosted on industry-leading cloud providers like AWS and Vercel, which provide world-class physical and network security. We deploy our infrastructure using Infrastructure as Code (IaC) to ensure consistency, auditability, and rapid recovery.
              </p>
              <p>
                We do not maintain our own physical servers, leveraging the robust compliance and security frameworks of our cloud partners to protect the underlying hardware and network layers.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── DATA PROTECTION ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Data Protection</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground">
              <p>
                Protecting your data is our highest priority. All data transmitted between clients and our servers is encrypted using TLS 1.2 or higher. Data stored at rest in our databases and object storage is encrypted using industry-standard AES-256 encryption.
              </p>
              <p>
                We employ automated backup systems and redundancy strategies to prevent data loss and ensure rapid recovery in the event of an incident. Backups are encrypted and stored in isolated environments.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RESPONSIBLE DISCLOSURE ─── */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Responsible Disclosure</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground">
              <p>
                We believe in the value of the security community and encourage responsible reporting of any security vulnerabilities found in our systems. If you believe you have discovered a vulnerability, please let us know immediately.
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Please provide detailed reports with reproducible steps.</li>
                <li>Do not exploit the vulnerability beyond what is necessary to confirm its existence.</li>
                <li>Avoid privacy violations, destruction of data, and interruption or degradation of our service.</li>
                <li>Give us a reasonable amount of time to resolve the issue before making it public.</li>
              </ul>
              <p className="mt-6">
                Please submit your findings to our security team using the contact information below. We will acknowledge your report and keep you updated on our progress.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY CONTACT CTA ─── */}
      <Section className="pb-24">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Mail className="h-12 w-12 text-primary-foreground mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground mb-4">
                Contact our Security Team
              </h2>
              <p className="text-primary-foreground/90 mb-8">
                If you have security concerns, questions about our practices, or need to report a vulnerability, please reach out to us directly.
              </p>
              <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                <a href="mailto:security@voryentsolutions.com">
                  Email security@voryentsolutions.com
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
