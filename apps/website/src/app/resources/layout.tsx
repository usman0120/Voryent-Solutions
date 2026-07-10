import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Resources & Downloads",
  description: "Explore everything useful in one place: articles, guides, templates, and digital downloads engineered by Voryent Solutions.",
  canonicalUrl: "https://voryentsolutions.com/resources"
})

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
