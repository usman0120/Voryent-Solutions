import { getAllContent, getContentBySlug } from "./content"

export interface CaseStudy {
  slug: string
  title: string
  category: string
  industry: string
  projectType: string
  technologies: string[]
  outcomeSummary: string
  heroHeadline: string
  heroSubheadline: string
  overview: string[]
  challenge: string[]
  challengeList: string[]
  solution: string[]
  solutionList: string[]
  processSteps: { title: string; description: string }[]
  keyFeatures: string[]
  results: string[]
  ctaText: string
  imageSrc: string
}

export const getCaseStudies = (): CaseStudy[] => {
  const content = getAllContent("case-studies")
  return content.map(c => {
    let contentBody = {}
    try {
      contentBody = JSON.parse(c.content)
    } catch (e) {}

    return {
      slug: c.slug,
      title: c["title"],
      category: c["category"],
      industry: c["industry"],
      projectType: c["projectType"],
      technologies: c["technologies"] || [],
      outcomeSummary: c["outcomeSummary"],
      heroHeadline: c["heroHeadline"],
      heroSubheadline: c["heroSubheadline"],
      ctaText: c["ctaText"],
      imageSrc: c["coverImage"],
      ...contentBody
    } as CaseStudy
  })
}

export const getCaseStudyBySlug = (slug: string): CaseStudy | null => {
  const c = getContentBySlug("case-studies", slug)
  if (!c) return null
  let contentBody = {}
  try {
    contentBody = JSON.parse(c.content)
  } catch (e) {}

  return {
    slug: c.slug,
    title: c["title"],
    category: c["category"],
    industry: c["industry"],
    projectType: c["projectType"],
    technologies: c["technologies"] || [],
    outcomeSummary: c["outcomeSummary"],
    heroHeadline: c["heroHeadline"],
    heroSubheadline: c["heroSubheadline"],
    ctaText: c["ctaText"],
    imageSrc: c["coverImage"],
    ...contentBody
  } as CaseStudy
}
