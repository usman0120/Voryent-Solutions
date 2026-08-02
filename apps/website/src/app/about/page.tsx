import Image from "next/image";
import Link from "next/link";
import { Container, Section, Button } from "@voryent/ui";
import { getAboutData, getEmployees, getInvestors } from "@/lib/firebase/services";

export default async function AboutPage() {
  const [aboutData, employees, investors] = await Promise.all([
    getAboutData().catch(() => null),
    getEmployees().catch(() => []),
    getInvestors().catch(() => []),
  ]);
  const blocks = aboutData?.["contentBlocks"] || {};

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
            alt="Business Handshake"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10 w-full pb-20 pt-32">
          <div className="max-w-4xl text-white">
            <span className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/80">
              About Us
            </span>
            <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Engineering Intelligent Software That Drives Business Growth
            </h1>
            <p className="mb-12 mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              At Voryent Solutions, we transform ambitious ideas into intelligent digital products.
              We specialise in AI-powered applications, enterprise software, and scalable digital
              solutions that help organisations innovate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-none bg-white px-10 text-sm font-bold uppercase tracking-widest text-black hover:bg-white/90"
              >
                <Link href="/contact">Let's Talk</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-none border-white/30 bg-transparent px-10 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <Section className="bg-background border-border/40 border-b py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Who We Are
              </span>
              <h2 className="text-foreground mb-8 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                A purpose-driven team of engineers and innovators.
              </h2>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                <p>
                  Voryent Solutions is a modern software engineering and artificial intelligence
                  company dedicated to building innovative digital solutions for businesses
                  worldwide. We combine technical excellence with strategic thinking to create
                  software that not only solves today's challenges but also prepares organisations
                  for tomorrow's opportunities.{" "}
                </p>
                <p>
                  Our team specialises in designing and developing custom software, AI-powered
                  systems, enterprise platforms, SaaS products, cloud-native applications, websites,
                  mobile apps, and intelligent automation solutions. Every project is built with
                  scalability, security, performance, and exceptional user experience at its
                  core.{" "}
                </p>
                <p>
                  We believe technology should simplify complexity, accelerate growth, and create
                  lasting value. Whether partnering with startups, small businesses, or large
                  enterprises, our goal remains the same: deliver reliable, future-ready software
                  that empowers our clients to stay ahead in a rapidly evolving digital landscape.
                </p>
              </div>
              <div className="border-border/50 mt-12 grid grid-cols-2 gap-8 border-t pt-8">
                <div>
                  <div className="text-foreground mb-2 text-4xl font-light">10+</div>
                  <div className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    Successful Projects
                  </div>
                </div>
                <div>
                  <div className="text-foreground mb-2 text-4xl font-light">10+</div>
                  <div className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    Global Partners
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-none">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team"
                  fill
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
              <div className="bg-muted border-border absolute -bottom-10 -left-10 hidden aspect-square w-2/3 border p-2 shadow-xl md:block">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                    alt="Office"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── MISSION & VISION ─── */}
      <section className="border-border/40 grid min-h-[600px] grid-cols-1 border-b md:grid-cols-2">
        {/* Mission */}
        <div className="bg-foreground text-background group relative flex flex-col justify-center overflow-hidden p-12 md:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-20" />
          <div className="relative z-10 max-w-xl">
            <span className="text-background/60 mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              01 / Our Mission
            </span>
            <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {blocks?.missionVision?.mission ||
                "To empower organizations with robust, modern digital products that solve complex problems, driving sustainable business growth."}
            </h2>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-muted group relative flex flex-col justify-center overflow-hidden p-12 md:p-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-20 dark:mix-blend-overlay" />
          <div className="relative z-10 max-w-xl">
            <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              02 / Our Vision
            </span>
            <h2 className="text-foreground mb-8 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {blocks?.missionVision?.vision ||
                "To be the trusted technology partner of choice, recognized for building resilient, AI-enhanced architectures that define the future."}
            </h2>
          </div>
        </div>
      </section>

      {/* ─── COMPANY PROFILE (SPEC SHEET) ─── */}
      {blocks?.companyProfile?.fields?.length > 0 && (
        <Section className="bg-background border-border/40 border-b py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                  Details
                </span>
                <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                  {blocks.companyProfile.title || "Company Profile"}
                </h2>
                <p className="text-muted-foreground mt-6 max-w-sm text-lg">
                  The foundational details that define who we are and how we operate.
                </p>
              </div>
              <div className="md:col-span-8">
                <div className="border-border/60 border-t">
                  {blocks.companyProfile.fields.map((field: any, i: number) => (
                    <div
                      key={i}
                      className="border-border/60 group flex flex-col border-b py-6 transition-all duration-300 hover:pl-4 sm:flex-row"
                    >
                      <div className="text-muted-foreground mb-2 w-full pt-1 text-xs font-bold uppercase tracking-widest sm:mb-0 sm:w-1/3">
                        {field.label}
                      </div>
                      <div className="text-foreground w-full text-lg font-medium sm:w-2/3">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── HISTORY / MILESTONES ─── */}
      <Section className="bg-muted/20 border-border/40 border-b py-24 md:py-32">
        <Container>
          <div className="mb-20 max-w-2xl">
            <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              Our Journey
            </span>
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              Milestones & History
            </h2>
          </div>

          <div className="before:via-border/60 relative space-y-16 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:to-transparent md:before:mx-auto md:before:translate-x-0">
            {[
              {
                year: "2023",
                title: "The Beginning",
                desc: "Voryent Solutions was founded in Sialkot, Pakistan with a mission to deliver world-class software engineering services.",
              },
              {
                year: "2024",
                title: "Expanding Capabilities",
                desc: "Integrated AI-driven solutions into our core offerings and expanded our team to include specialized talent.",
              },
              {
                year: "2025",
                title: "Global Reach",
                desc: "Partnered with enterprise clients across multiple continents, establishing ourselves as a reliable technology partner.",
              },
              {
                year: "2026",
                title: "Looking Forward",
                desc: "Continuing our growth trajectory, focusing on next-generation architectures and empowering businesses at scale.",
              },
            ].map((milestone, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
              >
                {/* Timeline dot */}
                <div className="border-muted/20 bg-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-none border-4 shadow transition-transform duration-300 group-hover:scale-110 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />

                {/* Content */}
                <div className="bg-background border-border/50 group-hover:border-primary/50 w-[calc(100%-4rem)] rounded-none border p-8 shadow-sm transition-colors md:w-[calc(50%-4rem)]">
                  <div className="text-primary mb-2 text-2xl font-bold">{milestone.year}</div>
                  <h3 className="text-foreground mb-3 text-xl font-bold">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CORE VALUES ─── */}
      <Section className="bg-background border-border/40 border-b py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="h-fit lg:sticky lg:top-32 lg:col-span-5">
              <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Our Principles
              </span>
              <h2 className="text-foreground mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                Values that drive us forward.
              </h2>
              <div className="border-border relative hidden aspect-[3/4] w-full overflow-hidden rounded-none border shadow-md lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Values"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-border/60 border-t">
                {[
                  {
                    title: "Innovation",
                    desc: "We embrace emerging technologies and continuously seek smarter ways to solve complex business challenges.",
                  },
                  {
                    title: "Integrity",
                    desc: "We build lasting relationships through honesty, transparency, accountability, and ethical business practices.",
                  },
                  {
                    title: "Excellence",
                    desc: "We pursue the highest standards of quality in engineering, design, communication, and customer experience.",
                  },
                  {
                    title: "Customer Success",
                    desc: "Our clients' success is our greatest achievement, and every solution is designed to help them grow.",
                  },
                  {
                    title: "Continuous Improvement",
                    desc: "We continuously learn, adapt, and evolve to stay at the forefront of technology and innovation.",
                  },
                ].map((value, i) => (
                  <div
                    key={i}
                    className="border-border/60 group flex flex-col gap-6 border-b py-12 transition-all duration-300 hover:pl-8 md:flex-row md:gap-10"
                  >
                    <div className="text-muted-foreground/30 group-hover:text-primary pt-1 text-3xl font-light transition-colors">
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="text-foreground mb-4 text-2xl font-bold">{value.title}</h3>
                      <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS / HOW WE DELIVER ─── */}
      <Section className="bg-muted/20 border-border/40 border-b py-24 md:py-32">
        <Container>
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
              Our Approach
            </span>
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              How We Deliver Success
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Discovery & Strategy",
                desc: "Understanding your business goals and technical requirements.",
              },
              {
                title: "Planning & Design",
                desc: "Architecting the solution and designing the user experience.",
              },
              { title: "Development", desc: "Engineering the product using modern technologies." },
              { title: "Testing & QA", desc: "Rigorous quality assurance to ensure reliability." },
              { title: "Deployment", desc: "Seamless launch into production environments." },
              {
                title: "Support & Growth",
                desc: "Continuous monitoring, maintenance, and iteration.",
              },
            ].map((step: any, i: number) => (
              <div
                key={i}
                className="bg-background border-border/50 hover:border-primary group border p-10 transition-colors"
              >
                <div className="text-primary mb-6 text-lg font-bold">0{i + 1} //</div>
                <h3 className="text-foreground group-hover:text-primary mb-4 text-2xl font-bold leading-tight transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── GLOBAL PRESENCE / HQ ─── */}
      <Section className="bg-foreground text-background py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-background/60 mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Global Presence
              </span>
              <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Rooted in Pakistan.
                <br />
                Building for the world.
              </h2>
              <p className="text-background/80 mb-10 max-w-lg text-lg leading-relaxed">
                Our headquarters and primary engineering hub are based in Sialkot, Pakistan. From
                here, we collaborate with partners globally, delivering world-class software
                solutions. As we look to the future, we are poised to expand our physical presence
                to better serve our international clients.
              </p>
              <div className="border-background/20 bg-background/5 inline-block border p-8">
                <h3 className="text-primary mb-2 text-xs font-bold uppercase tracking-widest">
                  Headquarters
                </h3>
                <p className="text-background text-xl font-medium">Sialkot, Pakistan</p>
              </div>
            </div>
            <div className="relative aspect-square w-full opacity-60">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                alt="Global"
                fill
                className="object-cover mix-blend-luminosity"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── LEADERSHIP & TEAM ─── */}
      {employees.length > 0 && (
        <Section className="bg-background border-border/40 border-t py-24 md:py-32">
          <Container>
            <div className="mb-20 max-w-3xl">
              <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Our People
              </span>
              <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Meet the minds behind Voryent.
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                A collective of passionate engineers, designers, and strategists.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
              {employees.map((emp: any, i: number) => (
                <div key={emp.id || i} className="group cursor-pointer">
                  <div className="bg-muted border-border/50 relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-none border">
                    <Image
                      src={
                        emp.image ||
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={emp.firstName}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="text-foreground mb-1 text-xl font-bold">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest">
                    {emp.position}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── INVESTORS ─── */}
      {investors.length > 0 && (
        <Section className="bg-muted/20 border-border/40 border-t py-24 md:py-32">
          <Container>
            <div className="mb-16">
              <span className="text-muted-foreground mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Partners
              </span>
              <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                Backed By
              </h2>
            </div>
            <div className="bg-border/40 border-border/40 grid grid-cols-2 gap-px border md:grid-cols-4">
              {investors.map((inv: any, i: number) => (
                <div
                  key={inv.id || i}
                  className="bg-background hover:bg-muted/30 flex flex-col items-center justify-center p-12 text-center transition-colors"
                >
                  <h3 className="text-foreground mb-2 text-xl font-bold">{inv.name}</h3>
                  {inv.organization && (
                    <p className="text-muted-foreground mb-4 text-sm">{inv.organization}</p>
                  )}
                  <span className="text-primary border-primary/20 border px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {inv.type}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="bg-background border-border/40 border-t py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-foreground mb-10 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Ready to start your next project?
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 h-14 rounded-none px-10 text-sm font-bold uppercase tracking-widest"
              >
                <Link href="/contact">Let's Work Together</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
