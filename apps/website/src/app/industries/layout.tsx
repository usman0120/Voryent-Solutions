import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Industries We Serve",
  description: "Discover how Voryent Solutions drives digital transformation across healthcare, finance, retail, manufacturing, and more with scalable engineering and AI.",
  canonicalUrl: "https://voryentsolutions.com/industries"
})

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
