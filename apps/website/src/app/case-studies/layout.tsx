import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Case Studies",
  description: "Long-form project stories and case studies engineered by Voryent Solutions.",
  canonicalUrl: "https://voryentsolutions.com/case-studies"
})

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
