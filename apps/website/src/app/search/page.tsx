import type { Metadata } from "next"
import { SearchClient } from "./search-client"
import type { SearchItem } from "./search-client"
import { getServices, getBlogPosts, getFaqs, getResources, getCaseStudiesFromDb } from "@/lib/firebase/services"

export const metadata: Metadata = {
  title: "Search | Voryent Solutions",
  description: "Search across Voryent Solutions services, articles, resources, and FAQs.",
  alternates: {
    canonical: "https://voryentsolutions.com/search",
  },
}

export default async function SearchPage() {
  const searchItems: SearchItem[] = []

  try {
    // Fetch all required data in parallel
    const [services, blogs, faqs, resources, caseStudies] = await Promise.all([
      getServices().catch(() => []),
      getBlogPosts().catch(() => []),
      getFaqs().catch(() => []),
      getResources().catch(() => []),
      getCaseStudiesFromDb().catch(() => [])
    ])

    // 1. Map FAQs
    faqs.forEach((faq: any) => {
      searchItems.push({
        id: `faq-${faq.id}`,
        type: "FAQ",
        title: faq.question || faq.title || "FAQ",
        description: faq.answer || faq.summary || "",
        url: `/about#faq`,
        tags: faq.category ? [faq.category] : [],
      })
    })

    // 2. Map Blogs
    blogs.forEach((blog: any) => {
      searchItems.push({
        id: `blog-${blog.id}`,
        type: "Blog",
        title: blog.title || blog.slug,
        description: blog.summary || blog.excerpt || "",
        url: `/blog/${blog.slug}`,
        tags: blog.tags || [],
      })
    })

    // 3. Map Resources
    resources.forEach((res: any) => {
      searchItems.push({
        id: `res-${res.id}`,
        type: "Resource",
        title: res.title || res.slug,
        description: res.summary || res.description || "",
        url: `/resources`,
        tags: res.category ? [res.category] : [],
      })
    })

    // 4. Map Services
    services.forEach((srv: any) => {
      searchItems.push({
        id: `srv-${srv.id}`,
        type: "Service",
        title: srv.title || srv.slug,
        description: srv.shortDescription || srv.description || "",
        url: `/services/${srv.slug}`,
        tags: srv.category ? [srv.category] : [],
      })
    })

    // 5. Map Case Studies
    caseStudies.forEach((cs: any) => {
      searchItems.push({
        id: `cs-${cs.id}`,
        type: "Case Study" as any, 
        title: cs.title || cs.slug,
        description: cs.outcomeSummary || cs.heroHeadline || "",
        url: `/case-studies/${cs.slug}`,
        tags: cs.industry ? [cs.industry] : [],
      })
    })

  } catch (error) {
    console.error("Error fetching search data:", error)
  }

  return <SearchClient initialData={searchItems} />
}
