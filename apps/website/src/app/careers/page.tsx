import type { Metadata } from "next";
import { getSocialSettings } from "@/lib/firebase/services";
import { SocialIcons } from "@/components/layout/site-footer";
import Link from "next/link";
import Image from "next/image";
import { Container, Section, Button } from "@voryent/ui";
import {
  ArrowRight,
  MoveRight,
  CheckCircle2,
  Instagram,
  Linkedin,
  Twitter,
  Users,
  FileText,
  Search,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Careers | Voryent Solutions",
    description:
      "Take your career to the next level at Voryent Solutions. We are a people-first community that grows stronger together.",
    alternates: {
      canonical: "https://voryentsolutions.com/careers",
    },
  };
}

export default async function CareersPage() {
  const social = await getSocialSettings().catch(() => null);

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <Section className="relative flex h-[80vh] min-h-[600px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
            alt="Corporate professional"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="max-w-2xl text-white">
            <span className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/80">
              Careers
            </span>
            <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Take your <br /> career to the <br /> next level
            </h1>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-white px-8 font-semibold text-black hover:bg-white/90"
            >
              <Link href="/jobs">EXPLORE JOBS</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── WE ARE FROM THE PEOPLE ─── */}
      <Section className="bg-background overflow-hidden py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                We are from the people
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are a team of passionate engineers and free-thinkers — with a purpose to thrive
                in our value-driven culture and make a real and lasting difference to the
                organization and their careers.
              </p>
            </div>

            <div className="relative h-[400px] w-full md:h-[600px]">
              {/* Using a collage image approach or tilted grid simulation for simplicity in Next.js */}
              <div className="absolute right-[-10%] top-1/2 flex h-[120%] w-[120%] -translate-y-1/2 rotate-12 flex-wrap items-center justify-center gap-4 opacity-80">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                ].map((src, i) => (
                  <div
                    key={i}
                    className={`relative h-[150px] w-[150px] overflow-hidden shadow-xl grayscale transition-all duration-500 hover:grayscale-0 md:h-[200px] md:w-[200px] ${i % 2 === 0 ? "translate-y-12" : ""}`}
                  >
                    <Image src={src} alt="Team member" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CAREER TRACKS ─── */}
      <Section className="bg-background border-border/40 border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-muted-foreground mb-4 block text-xs font-semibold uppercase tracking-[0.1em]">
              Career Tracks
            </span>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Techies, innovators, developers, and free-thinkers... you've come to the right place.
              Whether you're an experienced professional or a recent graduate, working with Voryent
              will give you opportunities to excel and achieve the global recognition that you
              deserve!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Graduates",
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Experienced Professionals",
                image:
                  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
              },
              {
                title: "Internship/MTO",
                image:
                  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
              },
            ].map((track, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative mb-4 h-[300px] w-full overflow-hidden md:h-[400px]">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-foreground group-hover:text-primary text-center text-lg font-medium transition-colors">
                  {track.title}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── STATS ─── */}
      <Section className="bg-primary text-primary-foreground relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10 text-center">
          <h2 className="mb-20 text-3xl font-medium tracking-tight md:text-5xl">
            Our people, our success
          </h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {[
              { value: "10+", label: "Global Employee Count" },
              { value: "500+", label: "Strong social media community" },
              { value: "15+", label: "Total training sessions" },
              { value: "10+", label: "Total participants" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-2 text-4xl font-light md:text-6xl">{stat.value}</div>
                <div className="bg-primary-foreground/50 mb-4 h-0.5 w-12" />
                <div className="text-primary-foreground/80 text-xs font-medium uppercase tracking-wider md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CULTURE & BENEFITS ─── */}
      <Section className="bg-background py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-foreground/90 text-xl font-medium leading-relaxed md:text-2xl">
                We strive to create an exceptional environment for our employees, where they can
                fully indulge their creative side and thoroughly enjoy every moment of their
                experience.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  title: "Working at Voryent",
                  desc: "Voryent is a great place to start your working life and we offer our people the opportunity to feel good by doing good in their everyday work. Our supportive and inclusive environment enables you to learn, develop and be your best in the role that best suits you.",
                },
                {
                  title: "Trainees",
                  desc: "We offer a range of graduate and internship opportunities around the world that will expose you to real business challenges and allow your energy and fresh thinking to have a real impact.",
                },
                {
                  title: "Diversity & inclusion",
                  desc: "Voryent practices a value driven culture that promotes diversity and inclusion. We're working to create a fairer, more socially inclusive world - in our community at work.",
                },
                {
                  title: "Benefits",
                  desc: "Voryent offers employee benefits that strive to attract and retain top talent. We also realize that as a global company, this can vary greatly from country to country, and we have tailored our benefit programs to meet the specific needs of employees in the markets of our offices.",
                },
              ].map((item, i) => (
                <div key={i} className="border-border/40 border-b pb-12 last:border-0 last:pb-0">
                  <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed md:text-base">
                    {item.desc}
                  </p>
                  <Link
                    href="#open-roles"
                    className="text-primary hover:text-primary/80 inline-flex items-center text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Explore More <MoveRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── HIRING PROCESS ─── */}
      <Section className="bg-muted/20 py-24 md:py-32">
        <Container>
          <div className="mb-16">
            <span className="text-muted-foreground mb-4 block text-xs font-semibold uppercase tracking-[0.1em]">
              Our Hiring Process
            </span>
            <h2 className="text-foreground text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              As simple as it could be
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "APPLY",
                icon: <FileText className="h-8 w-8 stroke-1" />,
                desc: "Please browse through the job openings and submit your application for positions that match your skillset.",
              },
              {
                num: "02",
                title: "REVIEW",
                icon: <Search className="h-8 w-8 stroke-1" />,
                desc: "Our recruiters will review your application and match you with the best-fit opportunity.",
              },
              {
                num: "03",
                title: "INTERVIEWS",
                icon: <Users className="h-8 w-8 stroke-1" />,
                desc: "Our interviewing process is competency-based, designed to identify individuals thrive.",
              },
              {
                num: "04",
                title: "ONBOARDING",
                icon: <CheckCircle2 className="h-8 w-8 stroke-1" />,
                desc: "Our onboarding process will refine and prepare you for your professional journey with Voryent Solutions.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-background border-border/30 flex flex-col items-center rounded-[40px] border p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-primary mb-6">{step.icon}</div>
                <div className="text-foreground mb-4 text-4xl font-light">{step.num}</div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── COMMUNITY GALLERY ─── */}
      <Section className="bg-background py-24 md:py-32">
        <Container>
          <div className="mb-12">
            <span className="text-muted-foreground mb-4 block text-xs font-semibold uppercase tracking-[0.1em]">
              People at Voryent
            </span>
            <h2 className="text-foreground mb-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Join our community
            </h2>
            <div className="text-muted-foreground flex flex-col items-start gap-4 text-sm sm:flex-row sm:items-center">
              <span>Follow us to know #PeopleAtVoryent</span>
              {social && <SocialIcons social={social} />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=600&fit=crop",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=600&fit=crop",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop",
            ].map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={img}
                  alt="Community"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CAREER GROWTH CARDS ─── */}
      <Section className="bg-muted/10 border-border/40 border-t py-24 md:py-32">
        <Container>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-5xl">
              Your Growth, Our Priority
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Voryent, we provide a clear and rewarding path to help you achieve your
              professional aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Associate Software Engineer",
                img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
              },
              {
                title: "Software Engineer",
                img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Senior Software Engineer",
                desc: "Lead by expertise and technical mastery.",
                img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
              },
              {
                title: "Associate Team Lead",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2069&auto=format&fit=crop",
              },
            ].map((role, i) => (
              <div key={i} className="group relative h-[450px] overflow-hidden rounded-3xl">
                <Image
                  src={role.img}
                  alt={role.title}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-0 top-0 w-full p-8 text-white">
                  <h3 className="mb-2 text-2xl font-bold leading-tight">{role.title}</h3>
                  {role.desc && <p className="text-sm text-white/80">{role.desc}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-full px-10 text-lg font-semibold"
            >
              <Link href="/jobs">Explore Opportunities</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="bg-background py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-5xl">
              How can we help you?
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Are you ready to push boundaries and explore new frontiers of innovation?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 h-12 rounded-none px-8 font-semibold"
            >
              <Link href="/contact">LET'S WORK TOGETHER</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
