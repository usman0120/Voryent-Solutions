import type { Metadata } from "next"
import { SearchClient } from "./search-client"
import type { SearchItem } from "./search-client"
import { getAllContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Search | Voryent Solutions",
  description: "Search across Voryent Solutions services, articles, resources, and FAQs.",
  alternates: {
    canonical: "https://voryentsolutions.com/search",
  },
}

export default function SearchPage() {
  // Fetch local content to pass to the client search component
  const searchItems: SearchItem[] = []

  // 1. Map FAQs
  const faqs = getAllContent("faq")
  faqs.forEach((faq) => {
    searchItems.push({
      id: `faq-${faq.slug}`,
      type: "FAQ",
      title: faq["question"] || faq["title"] || "FAQ",
      description: faq["answer"] || faq["summary"] || "",
      url: `/faq`,
      tags: faq["category"] ? [faq["category"]] : [],
    })
  })

  // 2. Map Blogs
  const blogs = getAllContent("blog")
  blogs.forEach((blog) => {
    searchItems.push({
      id: `blog-${blog.slug}`,
      type: "Blog",
      title: blog["title"] || blog.slug,
      description: blog["summary"] || blog["excerpt"] || "",
      url: `/blog/${blog.slug}`,
      tags: blog["tags"] || [],
    })
  })

  // 3. Map Resources
  const resources = getAllContent("resources")
  resources.forEach((res) => {
    searchItems.push({
      id: `res-${res.slug}`,
      type: "Resource",
      title: res["title"] || res.slug,
      description: res["summary"] || res["description"] || "",
      url: `/resources`,
      tags: res["category"] ? [res["category"]] : [],
    })
  })

  // 4. Map Services (Static for now since they are part of the homepage/hardcoded)
  const services: SearchItem[] = [
    {
      id: "srv-custom-software",
      type: "Service",
      title: "Custom Software Development",
      description: "We build scalable, robust software solutions tailored to your unique business requirements.",
      url: "/#services",
      tags: ["development", "software", "engineering"],
    },
    {
      id: "srv-cloud-architecture",
      type: "Service",
      title: "Cloud Architecture",
      description: "Design and implement secure, high-performance cloud infrastructure.",
      url: "/#services",
      tags: ["cloud", "aws", "infrastructure", "devops"],
    },
    {
      id: "srv-ui-ux",
      type: "Service",
      title: "UI/UX Design",
      description: "Create intuitive, beautiful user interfaces that drive engagement.",
      url: "/#services",
      tags: ["design", "ui", "ux", "interface"],
    },
    {
      id: "srv-ai-integration",
      type: "Service",
      title: "AI Integration",
      description: "Leverage artificial intelligence and machine learning to automate and innovate.",
      url: "/#services",
      tags: ["ai", "machine learning", "automation"],
    }
  ]
  
  searchItems.push(...services)

  return <SearchClient initialData={searchItems} />
}
