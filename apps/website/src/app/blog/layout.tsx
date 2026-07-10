import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Blog & Insights",
  description: "Explore the latest engineering insights, technology trends, and company updates from Voryent Solutions.",
  canonicalUrl: "https://voryentsolutions.com/blog"
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
