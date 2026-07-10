import type { Metadata } from "next"
import { constructMetadata } from "../../../lib/utils"
import { getPostBySlug } from "../../../lib/blog"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return constructMetadata({
      title: "Article Not Found",
      description: "The article you are looking for could not be found.",
    })
  }

  return constructMetadata({
    title: `${post.title} | Blog`,
    description: post.excerpt,
    canonicalUrl: `https://voryentsolutions.com/blog/${slug}`,
    image: `https://voryentsolutions.com${post.imageSrc}`,
  })
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
