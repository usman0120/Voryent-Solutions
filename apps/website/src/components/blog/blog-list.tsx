"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Container, Section, Button } from "@voryent/ui";
import { Search, ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

export interface BlogItem {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  readingTime: string;
  publishDate: string;
  author: string;
  imageSrc: string;
  content: string;
}

const CATEGORIES = ["All", "AI", "Web Development", "Mobile", "Cloud", "Engineering", "Design", "DevOps", "Security"];
const POSTS_PER_PAGE = 6;

export function BlogList({ posts }: { posts: BlogItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Featured carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter featured posts (if explicitly marked featured, else fallback to first post)
  const featuredPosts = posts.filter((p) => p.featured);
  const displayFeatured = featuredPosts.length > 0 ? featuredPosts : (posts.length > 0 ? [posts[0]] : []);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ─── HERO & FEATURED ARTICLES ─── */}
      <Section className="relative min-h-[60vh] flex items-center pt-24 pb-16 bg-black overflow-hidden border-b border-border">
        {/* Subtle animated grid background overlaying the image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
        
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
            <span className="mb-6 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Knowledge Base
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Insights &<br />Engineering.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl leading-relaxed">
              Thoughts on software architecture, artificial intelligence, and building scalable digital products from the engineers at Voryent.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── FEATURED ARTICLES ─── */}
      <Section className="pb-16 bg-background pt-16 border-b border-border">
        <Container>
          {/* Featured Articles Section */}
          {displayFeatured.length > 0 && activeCategory === "All" && searchQuery === "" && currentPage === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Featured {displayFeatured.length > 1 ? "Articles" : "Article"}
                </h3>
                {displayFeatured.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button className="h-10 w-10 border border-border/60 flex items-center justify-center hover:bg-muted/20 transition-colors" onClick={() => scrollCarousel("left")}>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 border border-border/60 flex items-center justify-center hover:bg-muted/20 transition-colors" onClick={() => scrollCarousel("right")}>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {displayFeatured.length === 1 && displayFeatured[0] ? (
                (() => {
                  const featuredItem = displayFeatured[0];
                  return (
                    <Link href={`/blog/${featuredItem.slug}`} className="group block">
                      <div className="grid grid-cols-1 lg:grid-cols-2 border border-border/60 hover:border-primary/50 transition-colors bg-background">
                        <div className="relative aspect-square lg:aspect-auto w-full bg-muted overflow-hidden border-b lg:border-b-0 lg:border-r border-border/60">
                          <img
                            src={featuredItem.imageSrc}
                            alt={featuredItem.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6 font-bold uppercase tracking-widest">
                            <span className="text-primary">{featuredItem.category}</span>
                            <span>•</span>
                            <span>{featuredItem.publishDate}</span>
                            <span>•</span>
                            <span>{featuredItem.readingTime}</span>
                          </div>
                          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight group-hover:text-primary transition-colors">
                            {featuredItem.title}
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {featuredItem.excerpt}
                          </p>
                          <div className="inline-flex h-12 items-center justify-center border-b-2 border-foreground px-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors group-hover:border-primary group-hover:text-primary self-start">
                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })()
              ) : (
                <div 
                  ref={carouselRef}
                  className="flex gap-px overflow-x-auto snap-x snap-mandatory scrollbar-hide border border-border/60 bg-border/60"
                >
                  {displayFeatured.filter((p): p is BlogItem => Boolean(p)).map((post) => (
                    <div key={post.slug} className="min-w-[85%] md:min-w-[60%] lg:min-w-[48%] snap-start bg-background">
                      <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full hover:bg-muted/10 transition-colors">
                        <div className="relative aspect-video w-full bg-muted overflow-hidden border-b border-border/60">
                          <img
                            src={post.imageSrc}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-[0.2em]">
                            <span className="text-primary">{post.category}</span>
                            <span>•</span>
                            <span>{post.publishDate}</span>
                          </div>
                          <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-base text-muted-foreground leading-relaxed flex-grow line-clamp-3 mb-6">
                            {post.excerpt}
                          </p>
                          <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-foreground mt-auto group-hover:text-primary transition-colors">
                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* ─── FILTERS & GRID ─── */}
      <Section className="py-24 bg-muted/10 border-b border-border/60">
        <Container>
          {/* Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            <div className="w-full lg:w-96 relative border border-border/60 bg-background p-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search articles or tags..."
                className="w-full pl-12 pr-4 py-3 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60 font-medium"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                suppressHydrationWarning
              />
            </div>
            
            {/* Scrollable Category Row */}
            <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide border border-border/60 bg-background p-1">
              <div className="flex gap-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                    suppressHydrationWarning
                    className={`whitespace-nowrap px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeCategory === category
                        ? "bg-foreground text-background"
                        : "bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/60 mb-16">
                {paginatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-background hover:bg-foreground hover:text-background transition-colors p-8">
                    <div className="relative aspect-video w-full bg-muted border border-border/60 mb-8 overflow-hidden">
                      <img
                        src={post.imageSrc}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground group-hover:text-background/60 mb-4 font-bold uppercase tracking-[0.2em] transition-colors">
                        <span className="text-primary group-hover:text-background">{post.category}</span>
                        <span>•</span>
                        <span>{post.publishDate}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-background/80 leading-relaxed flex-grow line-clamp-3 mb-6 transition-colors">
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/60 group-hover:border-background/20 transition-colors">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-background/60 transition-colors border border-border/60 group-hover:border-background/20 px-2 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-12 px-6 border border-border/60 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-12 px-6 border border-border/60 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-32 border border-border/60 bg-background">
              <h3 className="text-2xl font-bold text-foreground mb-4">No articles found</h3>
              <p className="text-muted-foreground">Adjust your search or category filters.</p>
            </div>
          )}
        </Container>
      </Section>
      
      {/* ─── NEWSLETTER SUBSCRIPTION CTA ─── */}
      <Section className="bg-foreground text-background py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-background/60 mb-6 block text-xs font-bold uppercase tracking-[0.2em]">
                Stay Updated
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                Engineering deep dives,<br />delivered.
              </h2>
              <p className="text-lg text-background/80 max-w-lg leading-relaxed">
                Subscribe to our newsletter for insights on software architecture, artificial intelligence, and building scalable digital products. No spam, ever.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
