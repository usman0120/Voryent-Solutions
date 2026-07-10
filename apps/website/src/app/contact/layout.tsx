import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description: "Get in touch with Voryent Solutions. Tell us about your project and we'll respond within 1–2 business days with an initial assessment.",
  canonicalUrl: "https://voryentsolutions.com/contact"
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
