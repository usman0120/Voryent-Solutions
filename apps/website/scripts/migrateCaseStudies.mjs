import fs from 'fs';
import path from 'path';

const caseStudies = {
  "medicare-plus-hospital-management-system": {
    slug: "medicare-plus-hospital-management-system",
    title: "Medicare Plus Hospital Management System",
    category: "Healthcare Technology",
    industry: "Healthcare",
    projectType: "Client Project",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Database", "AI Integration"],
    outcomeSummary: "Designed and developed a comprehensive hospital management platform that streamlines operations across multiple departments while incorporating AI-assisted workflows for healthcare professionals.",
    heroHeadline: "Medicare Plus Hospital Management System",
    heroSubheadline: "A modern, AI-enhanced healthcare platform built to simplify hospital operations, improve coordination, and support medical professionals with intelligent assistance.",
    overview: [
      "Healthcare organizations manage thousands of daily activities involving patients, doctors, appointments, billing, laboratories, pharmacies, and administrative departments. Managing these operations through disconnected systems often leads to inefficiencies, duplicated work, and communication challenges.",
      "Voryent Solutions developed Medicare Plus, an integrated Hospital Management System designed to centralize hospital operations into a single secure platform while introducing AI-powered features that assist medical staff in routine workflows."
    ],
    challenge: [
      "Modern hospitals require multiple departments to work together efficiently while maintaining accurate medical records and delivering timely patient care.",
      "The project needed to address challenges such as:"
    ],
    challengeList: [
      "Managing patient records across departments",
      "Coordinating appointments and consultations",
      "Handling pharmacy workflows",
      "Organizing laboratory requests and reports",
      "Managing financial and accounting operations",
      "Providing role-based access for different staff members",
      "Reducing repetitive administrative work",
      "Introducing AI capabilities without disrupting existing workflows"
    ],
    solution: [
      "Medicare Plus was designed as a centralized management platform where each department operates through a dedicated interface while sharing information securely across the system.",
      "The platform includes role-specific dashboards and workflows for:",
    ],
    solutionList: [
      "Patients",
      "Doctors",
      "Receptionists",
      "Administrators",
      "Accountants",
      "Laboratory Staff",
      "Pharmacy Staff",
      "Additional operational roles"
    ],
    processSteps: [
      {
        title: "Discovery",
        description: "Understanding hospital workflows, identifying departmental requirements, and defining user roles and permissions."
      },
      {
        title: "System Architecture",
        description: "Designed a modular architecture allowing each department to operate independently while remaining connected through a unified database."
      },
      {
        title: "User Experience",
        description: "Focused on creating clean dashboards that reduce complexity and enable staff to complete tasks efficiently."
      },
      {
        title: "AI Integration",
        description: "Integrated AI-powered assistance to support healthcare professionals with contextual suggestions and productivity enhancements while maintaining human decision-making."
      },
      {
        title: "Testing",
        description: "The platform underwent functional testing across multiple user roles to verify permissions, workflows, and overall usability."
      }
    ],
    keyFeatures: [
      "Electronic Patient Records",
      "Appointment Management",
      "Doctor Dashboard",
      "Reception Management",
      "Laboratory Module",
      "Pharmacy Management",
      "Billing & Accounting",
      "Admin Dashboard",
      "Role-Based Authentication",
      "AI Medicine Suggestions",
      "AI Workflow Assistance",
      "Secure User Permissions",
      "Responsive Interface"
    ],
    results: [
      "The completed platform provides a unified environment for hospital staff to manage operational workflows from a centralized system.",
      "The project demonstrates expertise in: Enterprise software development, Healthcare workflows, Role-based systems, AI-assisted applications, and Scalable architecture.",
      "No operational or performance metrics are published, as they are client-specific."
    ],
    ctaText: "Looking to modernize healthcare operations with secure, AI-powered software?\nLet's build your next healthcare solution.",
    imageSrc: "/Assets/Illustrations/Medicare Plus Illustration.png"
  },
  "boss-restaurant-management-system": {
    slug: "boss-restaurant-management-system",
    title: "Boss Restaurant Management System",
    category: "Restaurant Technology",
    industry: "Hospitality",
    projectType: "Client Project",
    technologies: ["React", "TypeScript", "Node.js", "POS System"],
    outcomeSummary: "Developed a modern restaurant management platform that simplifies order processing, billing, kitchen coordination, and day-to-day restaurant operations.",
    heroHeadline: "Boss Restaurant Management System",
    heroSubheadline: "A modern POS and restaurant management platform designed around real-world restaurant operations.",
    overview: [
      "Restaurants operate in fast-paced environments where efficient communication between staff is essential.",
      "Boss Restaurant Management System was developed to provide restaurant owners and staff with an integrated platform for handling daily operations through a streamlined Point of Sale (POS) system.",
      "The project emphasizes usability, speed, and operational efficiency while reflecting real-world restaurant workflows."
    ],
    challenge: [
      "Restaurant staff often rely on disconnected tools or manual processes for order management, billing, inventory tracking, and reporting.",
      "The system needed to support multiple operational roles while maintaining an intuitive user experience during busy service hours."
    ],
    challengeList: [],
    solution: [
      "Voryent Solutions developed a centralized restaurant management platform featuring a modern POS interface and dedicated workflows for restaurant staff.",
      "The system enables users to manage:"
    ],
    solutionList: [
      "Customer orders",
      "Billing and payments",
      "Kitchen coordination",
      "Menu management",
      "Inventory tracking",
      "Staff operations",
      "Daily reporting"
    ],
    processSteps: [
      {
        title: "Business Analysis",
        description: "Studied common restaurant workflows and operational requirements."
      },
      {
        title: "User Experience Design",
        description: "Focused on reducing the number of steps required to complete frequent tasks, allowing staff to work efficiently during peak hours."
      },
      {
        title: "POS Development",
        description: "Built a responsive Point of Sale interface optimized for speed, accuracy, and ease of use."
      },
      {
        title: "Testing",
        description: "Validated workflows across different operational scenarios to ensure reliability during day-to-day restaurant activities."
      }
    ],
    keyFeatures: [
      "Modern POS Interface",
      "Order Management",
      "Menu Management",
      "Billing",
      "Customer Management",
      "Inventory Tracking",
      "Staff Management",
      "Sales Reporting",
      "Secure Authentication",
      "Responsive Design"
    ],
    results: [
      "The project delivers a centralized platform that supports restaurant operations through an intuitive interface and structured workflows.",
      "It highlights Voryent Solutions' experience in developing business management software tailored to industry-specific requirements.",
      "No operational metrics are displayed because they are not publicly available."
    ],
    ctaText: "Need custom software for restaurants, retail, or hospitality?\nVoryent Solutions builds scalable business management systems tailored to real-world operations.",
    imageSrc: "/Assets/Illustrations/Boss Restaurant Illustration.png"
  },
  "programmersos-ai-learning-platform": {
    slug: "programmersos-ai-learning-platform",
    title: "ProgrammersOS — AI Learning Workspace",
    category: "Developer Education",
    industry: "Developer Education",
    projectType: "Concept Project",
    technologies: ["React", "TypeScript", "AI APIs", "Node.js (Planned)"],
    outcomeSummary: "Concept and architecture for an AI-powered developer workspace combining learning resources, coding practice, and project organization.",
    heroHeadline: "ProgrammersOS — AI Learning Workspace",
    heroSubheadline: "An integrated product concept designed to bring learning, coding, project management, and AI assistance into a unified workspace for developers.",
    overview: [
      "ProgrammersOS is a product concept designed to bring learning, coding, project management, and AI assistance into a unified workspace for developers."
    ],
    challenge: [
      "Developers often rely on multiple disconnected tools for learning, coding, documentation, and progress tracking, leading to context switching and reduced productivity."
    ],
    challengeList: [],
    solution: [
      "The concept envisions a centralized platform featuring:"
    ],
    solutionList: [
      "AI learning assistant",
      "Technology roadmaps",
      "Coding workspace",
      "Collections and bookmarks",
      "Problem-solving tracker",
      "File management",
      "AI-assisted code evaluation",
      "Progress dashboard"
    ],
    processSteps: [
      {
        title: "User Research",
        description: "Identified core pain points in modern developer learning and context switching."
      },
      {
        title: "Feature Planning",
        description: "Mapped out essential tools needed within a unified workspace."
      },
      {
        title: "Information Architecture",
        description: "Designed structural flow of workspaces, collections, and AI features."
      },
      {
        title: "UI/UX Concept Design",
        description: "Created high-fidelity designs emphasizing a distraction-free dark mode environment."
      },
      {
        title: "Technical Architecture Planning",
        description: "Defined the future tech stack utilizing React, Node, and AI APIs."
      }
    ],
    keyFeatures: [],
    results: [
      "This is currently a concept and planning project. Development is intended to validate the architecture and user experience before public release.",
      "No production metrics are available."
    ],
    ctaText: "Interested in AI-powered developer platforms? Let's discuss your product vision.",
    imageSrc: "/Assets/Illustrations/ProgrammersOS Illustration.png"
  },
  "quizverse-learning-platform": {
    slug: "quizverse-learning-platform",
    title: "QuizVerse — Modern Learning & Quiz Platform",
    category: "Education Technology (EdTech)",
    industry: "Education Technology",
    projectType: "Personal Product",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase"],
    outcomeSummary: "A responsive quiz platform designed to make learning engaging through categorized quizzes, progress tracking, and a clean modern interface.",
    heroHeadline: "QuizVerse",
    heroSubheadline: "Building an interactive learning platform that makes knowledge accessible through modern web technologies.",
    overview: [
      "QuizVerse was created to provide students with an enjoyable way to practice and improve their knowledge across multiple subjects.",
      "The objective was to combine an intuitive user experience with scalable frontend architecture while keeping the platform lightweight and responsive.",
      "The project focuses on usability, performance, and future scalability."
    ],
    challenge: [
      "Most educational quiz websites suffer from several common issues:",
      "The challenge was to design a modern platform that could grow into a comprehensive learning ecosystem."
    ],
    challengeList: [
      "Outdated interfaces",
      "Poor mobile responsiveness",
      "Limited subject organization",
      "Slow navigation",
      "Difficult content management"
    ],
    solution: [
      "The solution involved building a responsive frontend using modern web technologies.",
      "Key features include:"
    ],
    solutionList: [
      "Responsive UI",
      "Multiple quiz categories",
      "Clean navigation",
      "Reusable component architecture",
      "Future-ready Firebase integration",
      "Scalable folder structure",
      "Modern animations"
    ],
    processSteps: [
      {
        title: "Research",
        description: "Studied existing quiz platforms, identified usability issues, and planned a scalable architecture."
      },
      {
        title: "UI Design",
        description: "Focused on clean layouts, accessibility-focused components, and mobile-first design."
      },
      {
        title: "Development",
        description: "Engineered using React, TypeScript, Tailwind CSS, and Vite."
      },
      {
        title: "Testing",
        description: "Performed responsive testing, component testing, and performance optimization."
      }
    ],
    keyFeatures: [],
    results: [
      "The project successfully demonstrates responsive web development, modern frontend architecture, component-based development, scalable project organization, and strong user experience principles.",
      "(No performance metrics are displayed because no production analytics have been collected.)"
    ],
    ctaText: "Interested in building a modern educational platform?\nLet's discuss your project.",
    imageSrc: "/Assets/Illustrations/QuizVerse Illustration.png"
  },
  "mytoolbox-productivity-platform": {
    slug: "mytoolbox-productivity-platform",
    title: "MyToolBox — All-in-One Productivity Platform",
    category: "Productivity Software",
    industry: "Productivity Software",
    projectType: "Personal Product",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    outcomeSummary: "Designed a scalable web platform intended to provide dozens of productivity tools through a unified user experience.",
    heroHeadline: "MyToolBox — All-in-One Productivity Platform",
    heroSubheadline: "A web platform designed to bring commonly used online tools into one organized workspace.",
    overview: [
      "MyToolBox is a web platform designed to bring commonly used online tools into one organized workspace.",
      "Instead of navigating multiple websites, users can access essential productivity utilities from a single interface."
    ],
    challenge: [
      "Many online tools have inconsistent interfaces, display excessive advertisements, require switching between multiple websites, and lack responsive design."
    ],
    challengeList: [],
    solution: [
      "A modular application architecture was planned to support categories including:"
    ],
    solutionList: [
      "Document tools",
      "Image tools",
      "Media tools",
      "Resume tools",
      "Calculators",
      "Productivity utilities",
      "AI-powered tools"
    ],
    processSteps: [
      {
        title: "Planning",
        description: "Mapped out the scope and utility categories."
      },
      {
        title: "Information Architecture",
        description: "Designed the folder structure and routing patterns for a multi-tool platform."
      },
      {
        title: "Component Design",
        description: "Built modular React components meant to be reused across varying tools."
      },
      {
        title: "Frontend Development",
        description: "Executed the foundation using modern tools like Vite and Tailwind."
      },
      {
        title: "Performance Optimization",
        description: "Ensured rapid load times and crisp client-side interactivity."
      }
    ],
    keyFeatures: [],
    results: [
      "The project establishes a scalable foundation capable of supporting many independent tools while maintaining a consistent user experience.",
      "No public usage metrics are currently available."
    ],
    ctaText: "Need a custom productivity platform?\nVoryent Solutions can help.",
    imageSrc: "/Assets/Illustrations/MyToolBox Illustration.png"
  }
};

const outputDir = path.join(process.cwd(), 'content', 'case-studies');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const [slug, data] of Object.entries(caseStudies)) {
  const frontmatter = `---
slug: "${data.slug}"
title: "${data.title}"
category: "${data.category}"
industry: "${data.industry}"
projectType: "${data.projectType}"
technologies: ${JSON.stringify(data.technologies)}
outcomeSummary: "${data.outcomeSummary}"
heroHeadline: "${data.heroHeadline}"
heroSubheadline: "${data.heroSubheadline}"
coverImage: "${data.imageSrc}"
ctaText: ${JSON.stringify(data.ctaText)}
seo:
  title: "${data.title} - Case Study | Voryent Solutions"
  description: "${data.outcomeSummary}"
publishedAt: "2026-07-09"
---

${JSON.stringify({
  overview: data.overview,
  challenge: data.challenge,
  challengeList: data.challengeList,
  solution: data.solution,
  solutionList: data.solutionList,
  processSteps: data.processSteps,
  keyFeatures: data.keyFeatures,
  results: data.results
}, null, 2)}
`;

  fs.writeFileSync(path.join(outputDir, slug + '.md'), frontmatter);
}
console.log('Case studies migrated!');
