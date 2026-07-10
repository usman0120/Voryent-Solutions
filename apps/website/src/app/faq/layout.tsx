import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions",
  description: "Find answers to the most common questions about our services, process, pricing, and support.",
  canonicalUrl: "https://voryentsolutions.com/faq"
})

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
