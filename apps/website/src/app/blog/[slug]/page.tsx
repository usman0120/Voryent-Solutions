import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { ChevronRight, Calendar, Clock, User, List } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { getPostBySlug, getAllPosts } from "../../../lib/blog"
import { JsonLd } from "../../../components/json-ld"
// Helper to extract headings from markdown content for TOC
function extractHeadings(content: string) {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    if (match[1] && match[2]) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
      headings.push({ id, text, level })
    }
  }
  return headings
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  // If not enough related by category, just get latest
  if (relatedPosts.length === 0) {
    relatedPosts.push(...allPosts.filter((p) => p.slug !== slug).slice(0, 3))
  }

  const headings = extractHeadings(post.content)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      "https://voryentsolutions.com" + post.imageSrc
     ],
    "datePublished": new Date().toISOString(), // Fallback if no specific date
    "author": [{
        "@type": "Person",
        "name": post.author || "Voryent Solutions",
      }]
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50 bg-muted/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{post.category}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-foreground">{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── IMAGE ─── */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="relative aspect-[21/9] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted">
          <Image
            src={post.imageSrc}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </div>

      {/* ─── ARTICLE ─── */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Left Col - Table of Contents */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Table of Contents
                </h4>
                <ul className="space-y-3 border-l-2 border-border/50 pl-4">
                  {headings.map((heading, i) => (
                    <li key={i} className={`${heading.level === 3 ? "pl-4" : ""}`}>
                      <a
                        href={`#${heading.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Col - Content */}
            <div className="lg:col-span-8 lg:col-start-4">
              <div className="
                text-lg text-foreground leading-relaxed
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-6
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4
                [&>p]:mb-6 [&>p]:text-muted-foreground
                [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:text-muted-foreground
                [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:text-muted-foreground
                [&>strong]:text-foreground [&>strong]:font-semibold
                [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:mb-6
              ">
                <ReactMarkdown
                  components={{
                    h2: ({ node, ...props }) => {
                      const text = props.children?.toString() || ""
                      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
                      return <h2 id={id} {...props} />
                    },
                    h3: ({ node, ...props }) => {
                      const text = props.children?.toString() || ""
                      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
                      return <h3 id={id} {...props} />
                    }
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RELATED ARTICLES ─── */}
      {relatedPosts.length > 0 && (
        <Section className="py-16 md:py-24 border-t border-border/50 bg-muted/10">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Related Articles</h2>
                <p className="mt-2 text-muted-foreground text-lg">More from {post.category}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group relative rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col">
                  <div className="relative aspect-video w-full bg-muted border-b border-border/50 overflow-hidden">
                    <Image
                      src={relatedPost.imageSrc}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="font-semibold text-primary uppercase tracking-wider">{relatedPost.category}</span>
                      <span>•</span>
                      <span>{relatedPost.publishDate}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12 bg-muted/10">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground mb-6">
                Want to build something similar?
              </h2>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base">
                  <Link href="/contact">Contact Our Engineers</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
