"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, FileText } from "lucide-react"
import { Container, Section, Button, Input, Badge, Card, CardContent, EmptyState } from "@voryent/ui"

export type SearchItem = {
  id: string
  type: "Service" | "Blog" | "Resource" | "FAQ"
  title: string
  description: string
  url: string
  tags: string[]
}

export function SearchClient({ initialData }: { initialData: SearchItem[] }) {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filters = ["Service", "Blog", "Resource", "FAQ"]

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
      <Section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-muted/20 border-b border-border/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Search
            </h1>
            <p className="text-lg text-muted-foreground">
              Find exactly what you're looking for across our entire platform.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input 
                type="search"
                placeholder="Search services, articles, resources, and FAQs..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-border/50 bg-background shadow-sm text-base"
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
                <div className="flex items-center gap-2 mb-4 font-semibold text-foreground">
                  <Filter className="w-4 h-4" />
                  <h3>Filter by Type</h3>
                </div>
                <div className="flex flex-row md:flex-col flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilters.includes(filter)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="text-left px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                <div className="text-center py-20 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Start typing to search across Voryent Solutions.</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <div className="mb-6 text-sm text-muted-foreground">
                    Showing {results.length} result{results.length !== 1 && 's'}
                  </div>
                  {results.map((item) => (
                    <Link key={item.id} href={item.url} className="block group">
                      <Card className="transition-all hover:shadow-md border-border/50 group-hover:border-primary/50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="secondary" className="text-xs font-medium">
                                  {item.type}
                                </Badge>
                              </div>
                              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-muted-foreground line-clamp-2">
                                {item.description}
                              </p>
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex gap-2 mt-4 flex-wrap">
                                  {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState 
                  title="No results found."
                  description={`We couldn't find anything matching "${query}". Try a different keyword or checking your spelling.`}
                  icon={<Search className="w-10 h-10" />}
                  action={
                    <Button onClick={() => { setQuery(""); setActiveFilters([]) }} variant="outline">
                      Clear Search
                    </Button>
                  }
                />
              )}
            </div>

          </div>
        </Container>
      </Section>
    </>
  )
}
