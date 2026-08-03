import type { Metadata } from "next"
import Link from "next/link"
import { 
  Container, 
  Section, 
  Button
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
      <Section className="relative min-h-[70vh] flex items-end pb-24 pt-48 overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" 
            alt="Server Infrastructure" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-4xl border-l-4 border-primary pl-6">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Voryent Security
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
              Security by Design.
            </h1>
            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed">
              We take security seriously. Our commitment to protecting your data starts from the first line of code and extends through our entire infrastructure.
            </p>
            <Button asChild size="lg" className="rounded-none h-14 px-8 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
              <Link href="#contact">Report Vulnerability</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY PRINCIPLES ─── */}
      <Section className="bg-background border-b border-border/60">
        <Container>
          <div className="mb-16 border-b border-border/60 pb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">Security Principles</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              The fundamental practices that guide how we build software and manage infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/60">
            {[
              { icon: FileCode2, title: "Secure Development", desc: "Security is baked into our SDLC. We perform code reviews, static analysis, and dependency scanning continuously." },
              { icon: Key, title: "Principle of Least Privilege", desc: "Access rights and permissions are restricted to only what is strictly required to perform a specific task." },
              { icon: Lock, title: "Encryption", desc: "We utilize modern encryption protocols for data at rest and data in transit across all our systems." },
              { icon: RefreshCcw, title: "Regular Updates", desc: "We proactively patch and update our dependencies, frameworks, and infrastructure to mitigate known vulnerabilities." },
              { icon: ShieldCheck, title: "Access Control", desc: "Strict authentication, including multi-factor authentication (MFA), is required for all administrative access." },
              { icon: EyeOff, title: "Privacy by Design", desc: "We collect only the data we need and ensure privacy controls are integrated into the architecture of our products." },
            ].map((principle, i) => (
              <div key={i} className="bg-background p-10 group hover:bg-muted/5 transition-colors flex flex-col">
                <div className="w-12 h-12 border border-border/60 bg-muted/30 flex items-center justify-center text-foreground mb-8 group-hover:text-primary transition-colors">
                  <principle.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-4">{principle.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{principle.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── INFRASTRUCTURE OVERVIEW ─── */}
      <Section className="py-24 bg-muted/5 border-b border-border/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <div className="w-16 h-16 border border-border/60 bg-background flex items-center justify-center text-foreground mb-6">
                <Server className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">Infrastructure Overview</h2>
              <p className="text-muted-foreground">Architected for resilience and compliance.</p>
            </div>
            <div className="lg:col-span-8 prose prose-gray dark:prose-invert max-w-none text-muted-foreground prose-p:text-lg prose-p:leading-relaxed">
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
      <Section className="py-24 bg-background border-b border-border/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <div className="w-16 h-16 border border-border/60 bg-muted/30 flex items-center justify-center text-foreground mb-6">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">Data Protection</h2>
              <p className="text-muted-foreground">Encryption at every layer.</p>
            </div>
            <div className="lg:col-span-8 prose prose-gray dark:prose-invert max-w-none text-muted-foreground prose-p:text-lg prose-p:leading-relaxed">
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
      <Section className="py-24 bg-muted/5 border-b border-border/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <div className="w-16 h-16 border border-border/60 bg-background flex items-center justify-center text-foreground mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-foreground mb-4">Responsible Disclosure</h2>
              <p className="text-muted-foreground">Collaborating with the security community.</p>
            </div>
            <div className="lg:col-span-8 prose prose-gray dark:prose-invert max-w-none text-muted-foreground prose-p:text-lg prose-p:leading-relaxed">
              <p>
                We believe in the value of the security community and encourage responsible reporting of any security vulnerabilities found in our systems. If you believe you have discovered a vulnerability, please let us know immediately.
              </p>
              <ul className="mt-8 space-y-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none bg-primary" />
                  <span>Please provide detailed reports with reproducible steps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none bg-primary" />
                  <span>Do not exploit the vulnerability beyond what is necessary to confirm its existence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none bg-primary" />
                  <span>Avoid privacy violations, destruction of data, and interruption or degradation of our service.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-none bg-primary" />
                  <span>Give us a reasonable amount of time to resolve the issue before making it public.</span>
                </li>
              </ul>
              <p className="mt-8">
                Please submit your findings to our security team using the contact information below. We will acknowledge your report and keep you updated on our progress.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── SECURITY CONTACT CTA ─── */}
      <Section id="contact" className="py-32 bg-background relative overflow-hidden">
        {/* Abstract structural dots */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <Container className="relative z-10">
          <div className="border border-border/60 bg-muted/5 p-12 lg:p-24 text-center max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 border border-border/60 bg-background flex items-center justify-center text-foreground mb-8">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
              Contact Security Team
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              If you have security concerns, questions about our practices, or need to report a vulnerability, please reach out to us directly.
            </p>
            <Button asChild size="lg" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-colors">
              <a href="mailto:security@voryentsolutions.com">
                Email security@voryentsolutions.com
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
