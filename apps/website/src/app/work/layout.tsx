import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Work & Case Studies",
  description: "Explore selected projects, case studies, and digital products engineered by Voryent Solutions.",
  canonicalUrl: "https://voryentsolutions.com/work"
})

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
