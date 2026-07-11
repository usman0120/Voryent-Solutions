import { PenTool, Search, Briefcase, MessageSquare, Image as ImageIcon, FileText, BarChart, Code } from "lucide-react";

export const aiToolsConfig = [
  {
    id: "blog-generator",
    name: "Blog Generator",
    description: "Generate complete, SEO-optimized blog posts from a topic or keywords.",
    icon: PenTool,
    category: "Content",
    systemPrompt: "You are an expert content marketer for Voryent Solutions. Generate a high-quality blog post about the given topic. Include a catchy title, introduction, well-structured body paragraphs with headings, and a conclusion.",
  },
  {
    id: "seo-assistant",
    name: "SEO Assistant",
    description: "Analyze content and generate meta titles, descriptions, and keyword suggestions.",
    icon: Search,
    category: "Marketing",
    systemPrompt: "You are an SEO expert. Given the following content or topic, generate a meta title (max 60 chars), meta description (max 160 chars), and a list of 5-10 targeted keywords.",
  },
  {
    id: "job-desc-writer",
    name: "Job Description Writer",
    description: "Create engaging and accurate job postings for the Careers module.",
    icon: Briefcase,
    category: "HR",
    systemPrompt: "You are a technical recruiter. Write a compelling job description for the given role. Include 'About the Role', 'Key Responsibilities', 'Requirements', and 'What We Offer'. Format in markdown.",
  },
  {
    id: "social-media-post",
    name: "Social Media Posts",
    description: "Generate variations of social media posts (LinkedIn, X, Facebook) from a central message.",
    icon: MessageSquare,
    category: "Marketing",
    systemPrompt: "You are a social media manager. Given a central message or article link, generate 3 varied posts suitable for LinkedIn (professional, detailed) and X/Twitter (short, punchy, with hashtags).",
  },
  {
    id: "proposal-generator",
    name: "Proposal Generator",
    description: "Draft professional business proposals or project scopes for clients.",
    icon: FileText,
    category: "Operations",
    systemPrompt: "You are a B2B sales expert. Draft a professional business proposal for the given project details. Include Executive Summary, Scope of Work, Timeline Estimate, and Investment Summary sections.",
  },
];
