import type { MetadataRoute } from "next"
import { getAllContent } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com"

  const routes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/work",
    "/case-studies",
    "/blog",
    "/resources",
    "/faq",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/security",
    "/search"
  ].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const caseStudies = getAllContent("case-studies").map((cs) => ({
    url: `${url}/case-studies/${cs.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const blogs = getAllContent("blog").map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...routes, ...caseStudies, ...blogs]
}
