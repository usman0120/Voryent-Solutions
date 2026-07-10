import fs from 'fs';
import path from 'path';

const faqs = [
  // General
  {
    category: "General",
    question: "What is Voryent Solutions?",
    answer: "Voryent Solutions is a modern software engineering and digital transformation agency. We specialize in building scalable web platforms, robust mobile applications, and integrating AI into business processes."
  },
  {
    category: "General",
    question: "Where are you located?",
    answer: "We are a remote-first company with engineers working globally. Our headquarters is digital, allowing us to source the best talent regardless of geography and serve clients worldwide."
  },
  {
    category: "General",
    question: "Do you work with startups or enterprise clients?",
    answer: "Both. We adapt our engineering processes to fit the scale of the client. For startups, we focus on rapid MVPs and time-to-market. For enterprises, we focus on robust architecture, security, and scalability."
  },

  // Services
  {
    category: "Services",
    question: "What technologies do you specialize in?",
    answer: "Our core stack revolves around Next.js, React, Node.js, and TypeScript for web. We use React Native and Flutter for mobile. On the cloud side, we heavily leverage AWS, Vercel, and GCP."
  },
  {
    category: "Services",
    question: "Do you provide AI integration services?",
    answer: "Yes. We integrate LLMs, computer vision, and custom machine learning pipelines into existing products to automate workflows and enhance user experiences."
  },
  {
    category: "Services",
    question: "Can you take over an existing project?",
    answer: "Yes, we frequently conduct codebase audits and take over projects that need rescue, refactoring, or scaling. We ensure smooth transitions by thoroughly analyzing your current architecture first."
  },

  // Process
  {
    category: "Process",
    question: "What does your development process look like?",
    answer: "We follow an agile, iterative approach. It begins with Discovery & Architecture, followed by continuous two-week sprints. We prioritize CI/CD pipelines so you can test new features as soon as they are built."
  },
  {
    category: "Process",
    question: "How long does a typical project take?",
    answer: "It depends heavily on scope. A simple MVP might take 6–8 weeks, whereas a comprehensive enterprise platform could take 6+ months. We provide detailed timelines during the discovery phase."
  },

  // Pricing
  {
    category: "Pricing",
    question: "How do you price your projects?",
    answer: "We offer both fixed-price contracts for well-scoped projects and time-and-materials (T&M) for projects that require flexibility and ongoing iteration."
  },
  {
    category: "Pricing",
    question: "Do you offer maintenance contracts?",
    answer: "Yes, post-launch we offer ongoing SLA-backed maintenance contracts to ensure your application remains secure, up-to-date, and optimized."
  },

  // Support
  {
    category: "Support",
    question: "How do we communicate during a project?",
    answer: "We set up shared Slack/Teams channels, use Jira/Linear for ticket tracking, and hold weekly progress syncs. You'll have direct access to the engineers working on your product."
  },
  {
    category: "Support",
    question: "What happens after the project is deployed?",
    answer: "We provide a 30-day warranty period for all new builds to fix any immediate bugs at no cost. After that, we transition into a dedicated support or maintenance retainer if desired."
  },

  // Security
  {
    category: "Security",
    question: "How do you handle data security?",
    answer: "Security is built into our SDLC. We follow OWASP guidelines, enforce encryption in transit and at rest, and implement rigorous access controls. We also assist with SOC2 or HIPAA compliance if required by your industry."
  },
];

const outputDir = path.join(process.cwd(), 'content', 'faq');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

faqs.forEach((faq, index) => {
  const slug = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const frontmatter = `---
category: "${faq.category}"
question: "${faq.question.replace(/"/g, '\\"')}"
order: ${index + 1}
---

${faq.answer}
`;

  fs.writeFileSync(path.join(outputDir, slug + '.md'), frontmatter);
});

console.log('FAQs migrated!');
