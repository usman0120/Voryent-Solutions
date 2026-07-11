import type { MetadataRoute } from "next"
import { getSeoSettings } from "@/lib/firebase/services"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com"
  
  const isProduction = 
    process.env["NEXT_PUBLIC_VERCEL_ENV"] === "production" || 
    process.env["NODE_ENV"] === "production"

  let allowIndex = isProduction;
  
  try {
    const seoSettings = await getSeoSettings();
    if (seoSettings && seoSettings["robots"]) {
      allowIndex = seoSettings["robots"].includes("index") && isProduction;
    }
  } catch (error) {
    console.error("Failed to fetch SEO settings for robots.txt:", error);
  }

  return {
    rules: {
      userAgent: "*",
      allow: allowIndex ? "/" : undefined,
      disallow: !allowIndex ? "/" : undefined,
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
