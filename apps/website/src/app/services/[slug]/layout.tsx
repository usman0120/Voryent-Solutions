import type { Metadata } from "next"
import { constructMetadata } from "../../../lib/utils"

// A simple mock fetch to simulate getting service metadata
const getServiceMetadata = (slug: string) => {
  const titles: Record<string, string> = {
    "custom-software": "Custom Software Development",
    "ai-solutions": "AI Solutions",
    "web-development": "Web Development",
    "mobile-apps": "Mobile Apps",
    "cloud-engineering": "Cloud Engineering",
    "ui-ux": "UI/UX Design",
    "api-development": "API Development",
    "consulting": "Consulting",
  }
  
  return {
    title: titles[slug] || "Service",
    description: `Discover how our ${titles[slug]?.toLowerCase() || "service"} can help your business grow.`
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const meta = getServiceMetadata(slug)
  
  return constructMetadata({
    title: meta.title,
    description: meta.description,
    canonicalUrl: `https://voryentsolutions.com/services/${slug}`
  })
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
