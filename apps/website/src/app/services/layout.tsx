import type { Metadata } from "next"
import { constructMetadata } from "../../lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Services",
  description: "Explore our comprehensive software engineering services, from custom application development and AI solutions to cloud architecture and UI/UX design.",
  canonicalUrl: "https://voryentsolutions.com/services"
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
