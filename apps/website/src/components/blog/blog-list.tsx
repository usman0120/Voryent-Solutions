"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container, Section, Button, Card, CardContent } from "@voryent/ui"
import { Search, ArrowRight, Calendar, Clock } from "lucide-react"
import type { BlogPost } from "../../lib/blog"

const CATEGORIES = ["All", "AI", "Web Development", "Mobile", "Cloud", "Engineering", "Design", "DevOps", "Security"]
const POSTS_PER_PAGE = 6

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const featuredPost = posts.length > 0 ? posts[0] : null

  return (
    <>
      {/* ─── HERO & FEATURED ARTICLE ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Insights & Engineering
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              Thoughts on software architecture, artificial intelligence, and building scalable digital products.
            </p>
          </div>

          {featuredPost && activeCategory === "All" && searchQuery === "" && currentPage === 1 && (
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto w-full bg-muted overflow-hidden">
                    <Image
                      src={featuredPost.imageSrc}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="font-semibold text-primary uppercase tracking-wider">{featuredPost.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {featuredPost.publishDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readingTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )}
        </Container>
      </Section>

      {/* ─── FILTERS & GRID ─── */}
      <Section className="py-16 md:py-24 bg-muted/30">
        <Container>
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex-1 w-full md:max-w-xs relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            
            {/* Scrollable Category Row */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category)
                      setCurrentPage(1)
                    }}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="flex flex-col h-full border-border/50 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
                      <div className="relative aspect-video w-full bg-muted border-b border-border/50 overflow-hidden">
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                          <span>•</span>
                          <span>{post.publishDate}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/50 rounded-xl bg-background">
              <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </Container>
      </Section>
      
      {/* ─── CTA ─── */}
      <Section className="pb-24 pt-12 bg-muted/30">
        <Container>
          <div className="relative rounded-3xl bg-primary px-8 py-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground mb-6">
                Stay updated with our latest insights.
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Subscribe to our newsletter for engineering deep dives and product updates. No spam, ever.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md bg-background text-foreground border-0 focus:ring-2 focus:ring-primary-foreground/50 placeholder:text-muted-foreground"
                  required
                />
                <Button type="submit" size="lg" variant="secondary" className="px-8">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
