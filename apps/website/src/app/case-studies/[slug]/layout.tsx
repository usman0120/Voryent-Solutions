import type { Metadata } from "next"
import { constructMetadata } from "../../../lib/utils"
import { getCaseStudyBySlug } from "../../../lib/caseStudies"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The case study you are looking for could not be found.",
    })
  }

  return constructMetadata({
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.outcomeSummary,
    canonicalUrl: `https://voryentsolutions.com/case-studies/${slug}`,
    image: `https://voryentsolutions.com${caseStudy.imageSrc}`,
  })
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
