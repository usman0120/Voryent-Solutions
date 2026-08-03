"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, FileText } from "lucide-react"
import { Container, Section, Button, Input, Badge, Card, CardContent, EmptyState } from "@voryent/ui"

export type SearchItem = {
  id: string
  type: "Service" | "Blog" | "FAQ" | "Case Study"
  title: string
  description: string
  url: string
  tags: string[]
}

export function SearchClient({ initialData }: { initialData: SearchItem[] }) {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const filters = ["Service", "Blog", "FAQ", "Case Study"]
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => 
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    )
  }

  const results = useMemo(() => {
    if (!query && activeFilters.length === 0) return []
    
    let filtered = initialData

    // Filter by type
    if (activeFilters.length > 0) {
      filtered = filtered.filter((item) => activeFilters.includes(item.type))
    }

    // Filter by query
    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (item) => 
          item.title.toLowerCase().includes(q) || 
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    return filtered
  }, [query, activeFilters, initialData])

  return (
    <>
      <Section className="relative min-h-[60vh] flex items-center pt-24 pb-16 bg-black overflow-hidden border-b border-border">
        {/* Subtle animated grid background overlaying the image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
        
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80"
            alt="Search Hero"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
            <span className="mb-6 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Explore Our Platform
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Search<br />everything.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl leading-relaxed">
              Find exactly what you're looking for across our entire platform.
            </p>

            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input 
                type="search"
                placeholder="Search services, articles, case studies, and FAQs..."
                className="w-full pl-12 pr-4 py-4 border-none rounded-none bg-white text-black font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm h-16"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16 min-h-[50vh]">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Filter by Type</h3>
                <div className="flex flex-row md:flex-col flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      className={`text-left px-4 py-3 border-l-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        activeFilters.includes(filter)
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-transparent hover:border-border hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="text-left px-4 py-3 mt-4 border-l-2 border-transparent text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Area */}
            <div className="flex-1">
              {!query && activeFilters.length === 0 ? (
                <div className="text-center py-24 border border-border bg-muted/5">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">Start searching</h3>
                  <p className="text-lg text-muted-foreground">Type a keyword to search across Voryent Solutions.</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-6">
                  <div className="mb-8 text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-4">
                    Showing {results.length} result{results.length !== 1 && 's'}
                  </div>
                  {results.map((item) => (
                    <Link key={item.id} href={item.url} className="block group">
                      <div className="border border-border bg-card p-6 md:p-8 transition-all hover:border-primary group-hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                                {item.type}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="mt-4 text-muted-foreground leading-relaxed font-medium">
                              {item.description}
                            </p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex gap-2 mt-6 flex-wrap">
                                {item.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-xs font-bold tracking-wider uppercase text-muted-foreground bg-muted/50 border border-border px-2 py-1">
                                    {tag}
                                  </span>
                                ))}
                                {item.tags.length > 3 && (
                                  <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground bg-muted/50 border border-border px-2 py-1">
                                    +{item.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 border border-border bg-muted/5">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">No results found</h3>
                  <p className="text-lg text-muted-foreground">We couldn't find anything matching "{query}".</p>
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>
    </>
  )
}
