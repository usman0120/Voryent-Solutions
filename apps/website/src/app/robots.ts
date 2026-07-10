import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const url = process.env["NEXT_PUBLIC_APP_URL"] || "https://voryentsolutions.com"
  
  // Example logic: if we have a VERCEL_ENV environment variable, use it. Otherwise, default to NODE_ENV.
  const isProduction = 
    process.env["NEXT_PUBLIC_VERCEL_ENV"] === "production" || 
    process.env["NODE_ENV"] === "production"

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: !isProduction ? "/" : undefined,
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
