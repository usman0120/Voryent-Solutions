import { pagesService } from "./pages.service";

const defaultPages = [
  {
    title: "Homepage",
    slug: "homepage",
    type: "landing",
    contentBlocks: {
      hero: {
        title: "Engineering the Future of Digital Products",
        description:
          "Voryent Solutions partners with ambitious teams to architect, build, and scale software that drives real business outcomes — from cloud infrastructure to intelligent interfaces.",
      },
      servicesPreview: {
        title: "What We Do",
        description:
          "End-to-end engineering services designed to take your product from concept to scale.",
      },
      whyVoryent: {
        title: "Why Voryent",
        description:
          "We combine deep engineering discipline with genuine partnership to deliver outcomes that matter — not just features.",
        items: [
          {
            title: "Engineering Excellence",
            description:
              "Every line of code is reviewed, tested, and optimized. We don't ship until it's production-ready.",
          },
          {
            title: "Transparent Partnership",
            description:
              "No black boxes. You own your code, your data, and your roadmap. We work alongside your team, not around them.",
          },
          {
            title: "Scalable From Day One",
            description:
              "Our architectures are designed to grow with you — from MVP to millions of users without re-platforming.",
          },
          {
            title: "Security First",
            description:
              "OWASP best practices, encrypted at rest and in transit, with continuous vulnerability scanning baked into every pipeline.",
          },
        ],
      },
      process: {
        title: "How We Work",
        description:
          "A proven, repeatable process that minimises risk and maximises velocity at every stage.",
        items: [
          {
            step: "01",
            icon: "Lightbulb",
            title: "Discover",
            description:
              "We listen deeply, audit your existing systems, and map business objectives to technical requirements.",
          },
          {
            step: "02",
            icon: "Search",
            title: "Design",
            description:
              "Architecture blueprints, wireframes, and prototypes — validated with your stakeholders before a single line of code is written.",
          },
          {
            step: "03",
            icon: "Rocket",
            title: "Deliver",
            description:
              "Agile sprints with weekly demos, automated testing, and production-grade deployments at every milestone.",
          },
          {
            step: "04",
            icon: "Headphones",
            title: "Support",
            description:
              "Post-launch monitoring, performance tuning, and 24/7 incident response to keep your systems running flawlessly.",
          },
        ],
      },
      featuredWork: {
        title: "Featured Work",
        description: "A selection of projects that showcase our engineering craft.",
        items: [
          {
            title: "Medicare Plus Management System",
            category: "Custom Software & AI Solutions",
            summary:
              "A comprehensive hospital management system integrating AI-powered intelligent medicine auto-suggestions and operational workflow optimizations.",
            technologies: ["React", "PostgreSQL", "Python (AI)", "Docker"],
            imageSrc: "/Assets/Illustrations/Medicare Plus Illustration.webp",
            link: "/work",
          },
          {
            title: "Boss Restaurant POS",
            category: "Custom Software & POS",
            summary:
              "A robust Point of Sale and internal management system developed specifically for fast-paced hospitality workflows.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
            imageSrc: "/Assets/Illustrations/Boss Restaurant Illustration.webp",
            link: "/work",
          },
        ],
      },
      testimonials: {
        title: "Client Outcomes",
        description: "Don't just take our word for it. Hear from the partners we've built with.",
        items: [
          {
            quote:
              "The hospital management system built by Voryent completely transformed our daily operations. The AI medicine suggestions and seamless integrations across the pharmacy, labs, and administration have drastically reduced wait times. They are true engineering partners.",
            name: "Dr. Sarah Jenkins",
            role: "Head of Operations",
            company: "Medicare Plus",
          },
          {
            quote:
              "Voryent Solutions understands real-world problems. The POS system they built for us handles our fast-paced restaurant environment perfectly. Our staff loves it, and our kitchen synchronization has never been better. We are incredibly happy with their work.",
            name: "Michael Boss",
            role: "Owner & Founder",
            company: "Boss Restaurant",
          },
        ],
      },
      cta: {
        title: "Ready to Build Something Exceptional?",
        description:
          "Let's discuss your next project. No sales pitch — just a genuine conversation about what you're trying to achieve and how we can help.",
      },
    },
  },
  {
    title: "About Us",
    slug: "about",
    type: "standard",
    contentBlocks: {
      hero: {
        title:
          "Building modern digital products with engineering excellence and long-term partnerships.",
        description:
          "We are a dedicated team of engineers, designers, and strategists. We build scalable, high-performance software solutions for ambitious organizations who demand robust architectures, intelligent AI workflows, and flawless user experiences.",
      },
      whoWeAre: {
        title: "Who We Are",
        paragraphs: [
          "Voryent Solutions exists to bridge the gap between complex business challenges and elegant technical solutions. In a rapidly evolving digital landscape, organizations need more than just code—they need reliable architectures that can scale seamlessly from day one.",
          "We focus on modern engineering practices, clean architecture, and AI-first workflows. Our approach isn't just about delivering a project; it's about forming long-term partnerships where we deeply understand your business domain and continuously add value.",
          "We don't build black boxes. We prioritize transparency, rigorous testing, and maintainable codebases so that your team is always empowered and your infrastructure is always secure.",
        ],
        pillars: [
          {
            icon: "Code2",
            title: "Engineering First",
            description:
              "Rigorous code reviews, comprehensive testing, and scalable cloud-native architectures are our standard, not an afterthought.",
          },
          {
            icon: "Briefcase",
            title: "Business Focused",
            description:
              "We align technical decisions directly with your business KPIs to ensure measurable ROI and sustainable growth.",
          },
          {
            icon: "Bot",
            title: "AI Powered",
            description:
              "Integrating intelligent automation and data pipelines to give you a decisive competitive advantage in your market.",
          },
        ],
      },
      missionVision: {
        mission:
          "To empower organizations with robust, modern digital products that solve complex problems, driving sustainable business growth through relentless engineering excellence and uncompromising quality.",
        vision:
          "To be the trusted technology partner of choice for ambitious companies globally, recognized for building resilient, AI-enhanced architectures that define the next generation of software.",
      },
      coreValues: {
        title: "Core Values",
        description:
          "The fundamental principles that guide our decisions, shape our culture, and define how we build.",
        items: [
          {
            icon: "Award",
            title: "Quality",
            desc: "We never compromise on the integrity of our code or the polish of our interfaces.",
          },
          {
            icon: "Eye",
            title: "Transparency",
            desc: "Honest communication, clear timelines, and open collaboration at every step.",
          },
          {
            icon: "Lightbulb",
            title: "Innovation",
            desc: "Continuously adopting proven modern paradigms to deliver better solutions, faster.",
          },
          {
            icon: "ShieldCheck",
            title: "Reliability",
            desc: "Building systems you can depend on, backed by responsive and accountable support.",
          },
          {
            icon: "Layers",
            title: "Scalability",
            desc: "Architecting for the future so you never have to throw away code as you grow.",
          },
          {
            icon: "Lock",
            title: "Security",
            desc: "Security-by-design principles baked into every component and deployment.",
          },
        ],
      },
      processSteps: {
        title: "Our Process",
        description:
          "A systematic, transparent approach from the first conversation to continuous deployment.",
        items: [
          { icon: "Search", title: "Discover" },
          { icon: "PenTool", title: "Plan" },
          { icon: "Eye", title: "Design" },
          { icon: "Code2", title: "Develop" },
          { icon: "Rocket", title: "Deploy" },
          { icon: "LifeBuoy", title: "Support" },
        ],
      },
      whyChooseVoryent: {
        title: "Why Choose Voryent",
        description: "What sets us apart in delivering exceptional digital products.",
        items: [
          {
            icon: "Layers",
            title: "Modern Stack",
            desc: "We use the latest tools that are proven in production to ensure high performance and maintainability.",
          },
          {
            icon: "Zap",
            title: "Fast Delivery",
            desc: "Agile methodologies and CI/CD pipelines enable rapid iterations and faster time-to-market.",
          },
          {
            icon: "Server",
            title: "Scalable Architecture",
            desc: "Systems designed to handle growing user bases and expanding data demands effortlessly.",
          },
          {
            icon: "Cpu",
            title: "AI-Enhanced Development",
            desc: "Leveraging AI internally to accelerate development and writing AI integrations for your products.",
          },
          {
            icon: "Code2",
            title: "Clean Code",
            desc: "Strict typing, modularity, and comprehensive documentation ensure code is easily understandable.",
          },
          {
            icon: "Clock",
            title: "Long-Term Support",
            desc: "We don't just build and leave; we provide ongoing maintenance, updates, and strategic guidance.",
          },
        ],
      },
    },
  },
];

export async function seedDefaultPages() {
  const existingPages = await pagesService.getAll();
  const existingSlugs = existingPages.map((p) => p.slug);

  const toSeed = defaultPages.filter((p) => !existingSlugs.includes(p.slug));

  if (toSeed.length === 0) return 0;

  for (const page of toSeed) {
    await pagesService.set(page.slug, page as any);
  }

  return toSeed.length;
}
