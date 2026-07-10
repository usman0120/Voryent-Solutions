"use client"

import { useState } from "react"
import Link from "next/link"
import { Container, Section, Button } from "@voryent/ui"
import { Search } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voryent/ui"

export type FaqItem = {
  question: string
  answer: string
  category: string
}

const CATEGORIES = ["All", "General", "Services", "Process", "Pricing", "Support", "Security"]
export function FaqContent({ faqs }: { faqs: FaqItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Group by category to display them nicely
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    const arr = acc[faq.category] || []
    arr.push(faq)
    acc[faq.category] = arr
    return acc
  }, {} as Record<string, FaqItem[]>)

  return (
    <>
      {/* ─── HERO & SEARCH ─── */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center border-b border-border/50 bg-muted/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              How can we help?
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Search our knowledge base or browse categories to find answers.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                suppressHydrationWarning
                placeholder="Search questions or keywords..."
                className="w-full pl-12 pr-4 py-4 border border-border/50 rounded-xl bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── CATEGORY FILTERS & ACCORDION ─── */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Desktop Sidebar Filters */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      suppressHydrationWarning
                      className={`whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Accordion Content */}
            <div className="lg:col-span-9">
              {Object.keys(groupedFaqs).length > 0 ? (
                <div className="space-y-12">
                  {Object.entries(groupedFaqs).map(([category, items]) => (
                    <div key={category}>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                        {category}
                      </h2>
                      <div className="rounded-xl border border-border/50 bg-card p-2 shadow-sm">
                        <Accordion type="single" collapsible className="w-full">
                          {items.map((item, index) => (
                            <AccordionItem key={index} value={`${category}-${index}`} className="px-4 border-border/50 last:border-0">
                              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline hover:text-primary transition-colors py-4">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-base">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-border/50 rounded-xl bg-muted/10">
                  <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                  <p className="text-muted-foreground">We couldn't find any questions matching "{searchQuery}".</p>
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>

      {/* ─── STILL NEED HELP & CTA ─── */}
      <Section className="pb-24 pt-12 bg-muted/30 border-t border-border/50">
        <Container>
          <div className="relative rounded-3xl bg-background border border-border/50 px-8 py-20 text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
                Still have questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Can't find the answer you're looking for? Please chat to our friendly team. We are always happy to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="default" className="h-12 px-8 text-base">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
