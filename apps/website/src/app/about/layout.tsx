import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "About",
  description: "Learn about Voryent Solutions, our mission, vision, and the core values that drive our engineering excellence.",
  canonicalUrl: "https://voryentsolutions.com/about"
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
