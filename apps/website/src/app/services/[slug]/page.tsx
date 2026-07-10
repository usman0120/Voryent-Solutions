import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, Section, Button, Card, CardContent, FaqComponent } from "@voryent/ui"
import { 
  ArrowRight, Search, PenTool, Eye, Code2, Rocket, LifeBuoy,
  CheckCircle2, Cpu, Layers, ShieldCheck, Zap, TrendingUp, Award,
  Terminal, Cloud, Brain, Smartphone, Palette, Database, Server,
  LineChart, Users, Lock, GitBranch, Settings, Layout, Puzzle,
  BarChart, Target, BellRing, Lightbulb
} from "lucide-react"

/* ──────────────────────────── DATA ──────────────────────────── */

type ServiceData = {
  title: string
  subtitle: string
  overviewText: string
  imageSrc: string
  benefits: { icon: any; title: string; desc: string }[]
  processSteps: { icon: any; title: string; desc: string }[]
  technologies: string[]
  deliverablesList: string[]
  faqs: { question: string; answer: string }[]
  related: { icon: any; title: string; slug: string; desc: string }[]
}

const serviceDatabase: Record<string, ServiceData> = {
  "custom-software": {
    title: "Custom Software Development",
    subtitle: "Bespoke applications designed specifically for your unique business logic and operational needs.",
    overviewText: "Off-the-shelf software rarely fits a growing enterprise perfectly. We build custom software solutions from the ground up to match your exact workflows, integrate seamlessly with your existing systems, and scale infinitely as your business demands.",
    imageSrc: "/Assets/Illustrations/Custom Software Illustration.png",
    benefits: [
      { icon: Zap, title: "High Performance", desc: "Optimized for speed and efficiency at scale." },
      { icon: ShieldCheck, title: "Secure by Design", desc: "Enterprise-grade security baked into every layer." },
      { icon: Layers, title: "Seamless Integration", desc: "Connects flawlessly with your existing APIs and tools." },
      { icon: TrendingUp, title: "Scalable Architecture", desc: "Built to handle future growth without rewriting." },
      { icon: Award, title: "Reliability", desc: "High availability and robust error handling." },
      { icon: Cpu, title: "Modern Stack", desc: "Leveraging the latest proven technologies." },
    ],
    processSteps: [
      { icon: Target, title: "Requirements Gathering", desc: "Deep dive into your business logic." },
      { icon: Layers, title: "System Architecture", desc: "Designing the data models and infra." },
      { icon: Code2, title: "Iterative Development", desc: "Agile sprints with weekly demos." },
      { icon: ShieldCheck, title: "QA & Automation", desc: "Extensive unit and E2E testing." },
      { icon: Rocket, title: "Phased Rollout", desc: "Zero-downtime deployment." },
      { icon: LifeBuoy, title: "SLA Support", desc: "Dedicated ongoing maintenance." },
    ],
    technologies: [".NET Core", "Java Spring", "Go", "PostgreSQL", "RabbitMQ", "Redis", "Docker", "Kubernetes"],
    deliverablesList: [
      "Comprehensive System Architecture Document",
      "Fully Documented Source Code",
      "Automated CI/CD Pipelines",
      "Test Coverage Reports",
      "User and Admin Manuals",
      "Disaster Recovery Plan"
    ],
    faqs: [
      { question: "How do you handle IP rights?", answer: "Upon final payment, all intellectual property, source code, and assets are 100% transferred to your organization." },
      { question: "Can you integrate with our legacy ERP?", answer: "Yes. We frequently build middleware layers and APIs to modernize access to legacy databases and ERP systems." },
    ],
    related: [
      { icon: Cloud, title: "Cloud Engineering", slug: "cloud-engineering", desc: "Deploy your custom software on resilient cloud infrastructure." },
      { icon: Brain, title: "AI Solutions", slug: "ai-solutions", desc: "Supercharge your custom software with intelligent automation." },
      { icon: Terminal, title: "Web Development", slug: "web-development", desc: "Web-based frontends for your custom systems." },
    ]
  },
  "ai-solutions": {
    title: "AI & Machine Learning Solutions",
    subtitle: "Intelligent automation, predictive analytics, and custom LLM integrations to give you a competitive edge.",
    overviewText: "Artificial Intelligence is no longer just a buzzword; it's a fundamental business driver. We help organizations identify high-value AI use cases, from automating customer support with custom Language Models to building predictive data pipelines that forecast market trends.",
    imageSrc: "/Assets/Illustrations/AI Illustration.jpg",
    benefits: [
      { icon: Brain, title: "Cognitive Automation", desc: "Automate complex, cognitive tasks reliably." },
      { icon: BarChart, title: "Predictive Insights", desc: "Turn raw data into actionable forecasts." },
      { icon: Database, title: "Data Privacy", desc: "On-premise or private cloud model deployments." },
      { icon: Settings, title: "Custom Fine-tuning", desc: "Models trained specifically on your proprietary data." },
      { icon: Zap, title: "Real-time Processing", desc: "Low-latency inference for live applications." },
      { icon: TrendingUp, title: "Scalable Inference", desc: "Autoscaling GPU clusters for variable workloads." },
    ],
    processSteps: [
      { icon: Search, title: "Data Audit", desc: "Assessing data quality and volume." },
      { icon: Puzzle, title: "Model Selection", desc: "Choosing the right architecture." },
      { icon: Database, title: "Data Engineering", desc: "Cleaning and formatting pipelines." },
      { icon: Brain, title: "Training & Fine-tuning", desc: "Optimizing the model's performance." },
      { icon: Rocket, title: "Inference Deployment", desc: "Exposing the model via secure APIs." },
      { icon: LineChart, title: "Monitoring", desc: "Tracking model drift and accuracy." },
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "OpenAI API", "Hugging Face", "Pinecone", "LangChain", "CUDA"],
    deliverablesList: [
      "AI Feasibility Study",
      "Cleaned Training Datasets",
      "Trained Model Weights",
      "Inference API Endpoints",
      "Performance Benchmarks",
      "Model Drift Monitoring Dashboard"
    ],
    faqs: [
      { question: "Is our data used to train public models?", answer: "No. We implement strict data boundaries, utilizing private instances or enterprise APIs to ensure your data is never used to train public foundational models." },
      { question: "Do we need a massive dataset to start?", answer: "Not always. With techniques like Few-Shot learning and Retrieval-Augmented Generation (RAG), we can build powerful AI tools using relatively small amounts of your proprietary data." },
    ],
    related: [
      { icon: Database, title: "API Development", slug: "api-development", desc: "Expose your AI models through secure endpoints." },
      { icon: Cloud, title: "Cloud Engineering", slug: "cloud-engineering", desc: "Host scalable GPU instances." },
      { icon: Code2, title: "Custom Software", slug: "custom-software", desc: "Build internal tools powered by AI." },
    ]
  },
  "web-development": {
    title: "Modern Web Development",
    subtitle: "High-performance, scalable web applications built with modern frameworks and clean architecture.",
    overviewText: "Your web application is often the primary touchpoint for your users. We engineer blazing-fast, highly accessible, and SEO-optimized web platforms that handle heavy traffic effortlessly while providing an app-like experience in the browser.",
    imageSrc: "/Assets/Illustrations/Web Development Illustration.png",
    benefits: [
      { icon: Zap, title: "Lightning Fast", desc: "Optimized Core Web Vitals for better UX and SEO." },
      { icon: Smartphone, title: "Responsive Everywhere", desc: "Flawless rendering on every device size." },
      { icon: Eye, title: "Accessible", desc: "WCAG compliant for inclusive user experiences." },
      { icon: ShieldCheck, title: "Secure Frontends", desc: "Protection against XSS, CSRF, and injections." },
      { icon: Search, title: "SEO Optimized", desc: "Server-side rendering for perfect indexing." },
      { icon: Layout, title: "Component Driven", desc: "Reusable UI systems for faster feature shipping." },
    ],
    processSteps: [
      { icon: Search, title: "UX Research", desc: "Understanding user journeys." },
      { icon: Layout, title: "Wireframing", desc: "Mapping the interface structure." },
      { icon: Palette, title: "High-Fidelity UI", desc: "Pixel-perfect visual design." },
      { icon: Code2, title: "Frontend Engineering", desc: "Building responsive components." },
      { icon: Terminal, title: "API Integration", desc: "Connecting to backend services." },
      { icon: Rocket, title: "Edge Deployment", desc: "Global CDN distribution." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "tRPC", "GraphQL", "Vercel"],
    deliverablesList: [
      "Interactive Prototypes",
      "Production-ready Frontend Code",
      "Component Storybook/Library",
      "Lighthouse Performance Report",
      "Accessibility Audit",
      "Analytics Integration"
    ],
    faqs: [
      { question: "Do you build headless commerce sites?", answer: "Yes, we specialize in headless architectures integrating Next.js with platforms like Shopify Plus, BigCommerce, or Swell." },
      { question: "How do you handle SEO for JavaScript apps?", answer: "We primarily use Next.js, which offers Server-Side Rendering (SSR) and Static Site Generation (SSG), ensuring all content is perfectly crawlable by search engines." },
    ],
    related: [
      { icon: Palette, title: "UI/UX Design", slug: "ui-ux", desc: "Design systems for your web apps." },
      { icon: Terminal, title: "API Development", slug: "api-development", desc: "Backend services for your frontend." },
      { icon: Smartphone, title: "Mobile Apps", slug: "mobile-apps", desc: "Extend your web app to native mobile." },
    ]
  },
  "mobile-apps": {
    title: "Mobile App Development",
    subtitle: "Native and cross-platform mobile experiences that delight users and drive engagement.",
    overviewText: "In a mobile-first world, your app needs to be fast, intuitive, and reliable even offline. We build high-performance mobile applications for iOS and Android that leverage native device capabilities while maintaining manageable codebases.",
    imageSrc: "/Assets/Illustrations/Mobile Apps Illustration.png",
    benefits: [
      { icon: Smartphone, title: "Native Feel", desc: "Smooth animations and native gestures." },
      { icon: Cloud, title: "Offline Capabilities", desc: "Robust local caching and sync logic." },
      { icon: Zap, title: "Battery Optimized", desc: "Efficient background processing." },
      { icon: ShieldCheck, title: "App Store Compliant", desc: "Strict adherence to Apple/Google guidelines." },
      { icon: BellRing, title: "Push Notifications", desc: "Targeted, reliable engagement campaigns." },
      { icon: Cpu, title: "Hardware Access", desc: "Deep integration with camera, GPS, and biometrics." },
    ],
    processSteps: [
      { icon: Eye, title: "Mobile UX Design", desc: "Touch-optimized interface planning." },
      { icon: Layers, title: "Prototyping", desc: "Clickable on-device previews." },
      { icon: Code2, title: "App Development", desc: "Writing efficient, native-feeling code." },
      { icon: Server, title: "Backend Sync", desc: "Connecting to real-time databases." },
      { icon: ShieldCheck, title: "Beta Testing", desc: "TestFlight and Google Play Console drops." },
      { icon: Rocket, title: "Store Submission", desc: "Navigating the review process." },
    ],
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "SQLite", "Redux", "RevenueCat"],
    deliverablesList: [
      "iOS App Store Binary",
      "Android Play Store Binary",
      "App Store Listing Assets",
      "Push Notification Infrastructure",
      "Mobile Analytics Dashboard",
      "Source Code & Certificates"
    ],
    faqs: [
      { question: "Do you build Native or Cross-Platform?", answer: "We generally recommend React Native for 90% of business apps to share a single codebase. However, for highly graphics-intensive or hardware-specific apps, we build fully native in Swift and Kotlin." },
      { question: "Will you help us get approved in the App Store?", answer: "Yes. We handle the entire submission process, including metadata, compliance checks, and responding to reviewer inquiries." },
    ],
    related: [
      { icon: Terminal, title: "API Development", slug: "api-development", desc: "Mobile-optimized APIs." },
      { icon: Palette, title: "UI/UX Design", slug: "ui-ux", desc: "Touch-first design systems." },
      { icon: Cloud, title: "Cloud Engineering", slug: "cloud-engineering", desc: "Backend infrastructure for mobile." },
    ]
  },
  "cloud-engineering": {
    title: "Cloud Engineering & DevOps",
    subtitle: "Resilient cloud-native infrastructure on AWS, Azure, or GCP optimized for security and cost.",
    overviewText: "Infrastructure should be invisible, resilient, and automatically scalable. We design and implement cloud-native architectures that ensure zero downtime, strict security compliance, and highly optimized operational costs through infrastructure-as-code.",
    imageSrc: "/Assets/Illustrations/Cloud Engineering Illustration.png",
    benefits: [
      { icon: Server, title: "High Availability", desc: "Multi-region redundancies for 99.99% uptime." },
      { icon: TrendingUp, title: "Auto-scaling", desc: "Infrastructure that grows with traffic spikes." },
      { icon: Lock, title: "Strict Security", desc: "IAM roles, VPCs, and encrypted data at rest." },
      { icon: BarChart, title: "Cost Optimization", desc: "Eliminating idle resources to reduce cloud bills." },
      { icon: GitBranch, title: "Infrastructure as Code", desc: "Version-controlled, reproducible environments." },
      { icon: Rocket, title: "CI/CD Pipelines", desc: "Automated testing and deployment flows." },
    ],
    processSteps: [
      { icon: Search, title: "Infra Audit", desc: "Reviewing existing cloud setups." },
      { icon: Layers, title: "Architecture Design", desc: "Planning VPCs, clusters, and databases." },
      { icon: Code2, title: "Terraform Scripting", desc: "Writing IaC configurations." },
      { icon: GitBranch, title: "Pipeline Setup", desc: "Building GitHub Actions / GitLab CI." },
      { icon: ShieldCheck, title: "Security Review", desc: "Penetration testing and IAM lockdown." },
      { icon: LineChart, title: "Monitoring", desc: "Setting up Datadog / CloudWatch alerts." },
    ],
    technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Datadog", "Nginx", "Linux"],
    deliverablesList: [
      "Terraform Codebase",
      "Cloud Architecture Diagrams",
      "CI/CD Pipeline Configurations",
      "Disaster Recovery Playbook",
      "Security Audit Report",
      "Cost Optimization Analysis"
    ],
    faqs: [
      { question: "Which cloud provider do you recommend?", answer: "We are cloud-agnostic. We typically recommend AWS for broad enterprise needs, GCP for heavy data/AI workloads, and Vercel for frontend-heavy Next.js applications." },
      { question: "Can you help lower our current AWS bill?", answer: "Absolutely. Our cloud audits frequently identify oversized instances, unused storage, and unoptimized architectures that can save thousands of dollars monthly." },
    ],
    related: [
      { icon: Terminal, title: "API Development", slug: "api-development", desc: "Deploy your APIs on our infra." },
      { icon: Code2, title: "Custom Software", slug: "custom-software", desc: "Cloud-native application builds." },
      { icon: Brain, title: "AI Solutions", slug: "ai-solutions", desc: "High-compute GPU infrastructure." },
    ]
  },
  "ui-ux": {
    title: "UI/UX Design",
    subtitle: "Research-driven interfaces and user experiences that convert visitors into loyal customers.",
    overviewText: "Great software isn't just about code; it's about how users feel when interacting with it. We design intuitive, accessible, and beautiful interfaces backed by user research and behavioral psychology to maximize engagement and conversion rates.",
    imageSrc: "/Assets/Illustrations/UI UX Illustration.png",
    benefits: [
      { icon: Users, title: "User-Centric", desc: "Designed for actual user workflows, not just aesthetics." },
      { icon: Target, title: "Conversion Focused", desc: "Optimized user journeys to drive business goals." },
      { icon: Layout, title: "Design Systems", desc: "Scalable component libraries for consistent branding." },
      { icon: Eye, title: "Accessibility Standard", desc: "Inclusive design compliant with WCAG 2.1 AA." },
      { icon: Smartphone, title: "Responsive Flows", desc: "Interfaces that adapt gracefully to any screen." },
      { icon: Zap, title: "Rapid Prototyping", desc: "Testable interactive mockups before writing code." },
    ],
    processSteps: [
      { icon: Search, title: "User Research", desc: "Interviews and competitor analysis." },
      { icon: GitBranch, title: "Information Architecture", desc: "Mapping navigation and hierarchies." },
      { icon: Layout, title: "Wireframing", desc: "Low-fidelity structural layouts." },
      { icon: Palette, title: "Visual Design", desc: "Applying brand identity and aesthetics." },
      { icon: Smartphone, title: "Interactive Prototyping", desc: "Creating clickable Figma flows." },
      { icon: Users, title: "User Testing", desc: "Validating designs with real users." },
    ],
    technologies: ["Figma", "Framer", "Adobe CC", "Miro", "Storybook", "Tailwind UI", "Radix", "Zeplin"],
    deliverablesList: [
      "User Personas & Journey Maps",
      "Interactive Figma Prototypes",
      "Comprehensive Design System",
      "High-fidelity UI Mockups",
      "Iconography & Asset Libraries",
      "Developer Handoff Specifications"
    ],
    faqs: [
      { question: "Do you design for both web and mobile?", answer: "Yes, our design team specializes in responsive web interfaces as well as platform-specific (iOS Human Interface Guidelines and Android Material Design) mobile apps." },
      { question: "How do you hand off designs to developers?", answer: "We use Figma to provide pixel-perfect developer handoffs, complete with CSS specifications, exported assets, and a fully documented Design System." },
    ],
    related: [
      { icon: Terminal, title: "Web Development", slug: "web-development", desc: "Bring designs to life in the browser." },
      { icon: Smartphone, title: "Mobile Apps", slug: "mobile-apps", desc: "Native implementations of your UX." },
      { icon: Lightbulb, title: "Consulting", slug: "consulting", desc: "Product strategy and discovery." },
    ]
  },
  "api-development": {
    title: "API & Backend Development",
    subtitle: "Robust, secure, and well-documented APIs that connect your systems and empower integrations.",
    overviewText: "APIs are the nervous system of modern digital businesses. We engineer highly performant, scalable REST and GraphQL APIs that serve as the secure backbone for your web apps, mobile apps, and third-party integrations.",
    imageSrc: "/Assets/Illustrations/API Development Illustration.png",
    benefits: [
      { icon: Zap, title: "High Throughput", desc: "Optimized endpoints capable of millions of requests." },
      { icon: ShieldCheck, title: "Strict Security", desc: "OAuth 2.0, JWT, and rate limiting standard." },
      { icon: Code2, title: "Developer Friendly", desc: "Comprehensive Swagger/OpenAPI documentation." },
      { icon: Database, title: "Optimized Queries", desc: "Efficient database interactions to reduce latency." },
      { icon: Layers, title: "Microservices", desc: "Decoupled architectures for independent scaling." },
      { icon: Puzzle, title: "Third-party Integrations", desc: "Connecting Stripe, Twilio, Salesforce, and more." },
    ],
    processSteps: [
      { icon: Layers, title: "Data Modeling", desc: "Structuring database schemas." },
      { icon: Code2, title: "API Design", desc: "RESTful or GraphQL contract definition." },
      { icon: Terminal, title: "Core Development", desc: "Writing the business logic." },
      { icon: ShieldCheck, title: "Security & Auth", desc: "Implementing roles and permissions." },
      { icon: CheckCircle2, title: "Load Testing", desc: "Simulating high-traffic scenarios." },
      { icon: Rocket, title: "Deployment", desc: "Releasing to production environments." },
    ],
    technologies: ["Node.js", "TypeScript", "Go", "GraphQL", "PostgreSQL", "Redis", "Prisma", "Swagger"],
    deliverablesList: [
      "REST/GraphQL API Source Code",
      "Interactive API Documentation (Swagger)",
      "Database Schema Definitions",
      "Postman Collection",
      "Authentication & Authorization Layer",
      "Load Testing Benchmark Reports"
    ],
    faqs: [
      { question: "REST or GraphQL?", answer: "It depends on the use case. We recommend GraphQL for complex frontend applications requiring flexible data fetching, and REST for server-to-server or public integrations." },
      { question: "How do you ensure our API isn't abused?", answer: "We implement multi-layered security including JWT authentication, strict CORS policies, IP rate limiting, and anomaly detection logging." },
    ],
    related: [
      { icon: Cloud, title: "Cloud Engineering", slug: "cloud-engineering", desc: "Host your APIs securely." },
      { icon: Terminal, title: "Web Development", slug: "web-development", desc: "Frontend clients for your API." },
      { icon: Smartphone, title: "Mobile Apps", slug: "mobile-apps", desc: "Mobile clients for your API." },
    ]
  },
  "consulting": {
    title: "Technical Consulting",
    subtitle: "Strategic technical guidance to align your IT roadmap with your long-term business objectives.",
    overviewText: "Making the wrong technical decision early can cost millions later. Our consulting services provide you with fractional CTO-level expertise to audit existing systems, design scalable architectures, and establish engineering best practices for your internal teams.",
    imageSrc: "/Assets/Illustrations/Consulting Illustration.png",
    benefits: [
      { icon: Target, title: "Strategic Alignment", desc: "Bridging the gap between business goals and tech." },
      { icon: ShieldCheck, title: "Risk Mitigation", desc: "Identifying architectural flaws before they fail." },
      { icon: BarChart, title: "Process Optimization", desc: "Streamlining developer workflows and CI/CD." },
      { icon: Layers, title: "Vendor Assessment", desc: "Unbiased evaluation of third-party tools." },
      { icon: Users, title: "Team Mentorship", desc: "Leveling up your internal engineering staff." },
      { icon: Lightbulb, title: "Innovation Roadmap", desc: "Planning for AI and emerging tech adoption." },
    ],
    processSteps: [
      { icon: Search, title: "Deep Dive Audit", desc: "Reviewing code, architecture, and processes." },
      { icon: Users, title: "Stakeholder Interviews", desc: "Understanding pain points." },
      { icon: BarChart, title: "Gap Analysis", desc: "Where you are vs. where you need to be." },
      { icon: PenTool, title: "Strategy Formulation", desc: "Drafting the technical roadmap." },
      { icon: Target, title: "Execution Planning", desc: "Creating actionable milestones." },
      { icon: LifeBuoy, title: "Ongoing Advisory", desc: "Monthly fractional CTO check-ins." },
    ],
    technologies: ["System Design", "Agile Methodology", "CI/CD Workflows", "Security Audits", "Code Reviews", "Cloud Architecture"],
    deliverablesList: [
      "Comprehensive Code Audit Report",
      "Future-state Architecture Diagrams",
      "Technology Radar & Recommendations",
      "Security & Compliance Assessment",
      "Team Structure & Hiring Plan",
      "12-Month Technical Roadmap"
    ],
    faqs: [
      { question: "Do you only advise, or can you also build?", answer: "Both. While our consulting engagements focus on strategy and architecture, our engineering teams are fully equipped to execute the roadmaps we design." },
      { question: "What is a Fractional CTO?", answer: "A Fractional CTO provides executive-level technical leadership on a part-time basis, giving you high-tier expertise without the cost of a full-time executive hire." },
    ],
    related: [
      { icon: Code2, title: "Custom Software", slug: "custom-software", desc: "Execute on the proposed roadmap." },
      { icon: Cloud, title: "Cloud Engineering", slug: "cloud-engineering", desc: "Fix infrastructure bottlenecks." },
      { icon: Brain, title: "AI Solutions", slug: "ai-solutions", desc: "Consulting on AI implementation." },
    ]
  }
}



export const generateStaticParams = async () => {
  return Object.keys(serviceDatabase).map((slug) => ({ slug }))
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!serviceDatabase[slug]) {
    notFound()
  }

  const data = serviceDatabase[slug]

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/40 bg-muted/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {data.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Start Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── OVERVIEW ─── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.overviewText}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl bg-muted border border-border/50">
              <Image
                src={data.imageSrc}
                alt={`${data.title} Illustration`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── BENEFITS ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Core Benefits</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Why our approach delivers superior results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── PROCESS & DELIVERABLES ─── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Process Timeline */}
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">Implementation Process</h2>
              <div className="relative">
                {/* Timeline track */}
                <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10">
                  {data.processSteps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 px-2 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="lg:col-span-4">
              <Card className="bg-muted/30 border-none shadow-none h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">Key Deliverables</h3>
                  <ul className="space-y-4">
                    {data.deliverablesList.map((item, i) => (
                      <li key={i} className="flex items-start text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

          </div>
        </Container>
      </Section>

      {/* ─── TECHNOLOGIES ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Technology Stack</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.technologies.map((tech) => (
              <div 
                key={tech} 
                className="px-6 py-3 rounded-full bg-background border border-border shadow-sm text-foreground font-medium flex items-center gap-2 hover:border-primary/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary/80" />
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── RELATED SERVICES ─── */}
      <Section>
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Related Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.related.map((service, i) => (
              <Card key={i} className="flex flex-col h-full border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                    {service.desc}
                  </p>
                  <Button asChild variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
          </div>
          <FaqComponent items={data.faqs} />
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="pb-24">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6 leading-tight">
                Let&apos;s build something exceptional together.
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
