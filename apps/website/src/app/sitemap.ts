import type { MetadataRoute } from "next"
import { 
  getServices, 
  getIndustries, 
  getBlogPosts, 
  getResources,
  getCareersJobs
} from "@/lib/firebase/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/blog",
    "/resources",
    "/faq",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/security",
  ].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const [services, industries, blogPosts, resources, jobs] = await Promise.all([
      getServices(),
      getIndustries(),
      getBlogPosts(),
      getResources(),
      getCareersJobs()
    ]);

    const serviceUrls = services.map((s: any) => ({
      url: `${url}/services/${s.slug || s.id}`,
      lastModified: s.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const industryUrls = industries.map((i: any) => ({
      url: `${url}/industries/${i.slug || i.id}`,
      lastModified: i.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const blogUrls = blogPosts.map((post: any) => ({
      url: `${url}/blog/${post.slug || post.id}`,
      lastModified: post.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const resourceUrls = resources.map((r: any) => ({
      url: `${url}/resources/${r.slug || r.id}`,
      lastModified: r.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const jobUrls = jobs.map((j: any) => ({
      url: `${url}/careers/${j.slug || j.id}`,
      lastModified: j.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...serviceUrls, ...industryUrls, ...blogUrls, ...resourceUrls, ...jobUrls];
  } catch (error) {
    console.error("Failed to generate sitemap from Firestore:", error);
    return staticRoutes;
  }
}
