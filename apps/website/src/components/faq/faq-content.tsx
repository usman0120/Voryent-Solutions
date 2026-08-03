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

export function FaqContent({ faqs }: { faqs: FaqItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Compute dynamic categories from FAQs
  const dynamicCategories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category || "General")))]

  // Fuzzy match function: each word in the query must be a subsequence of the text
  const isMatch = (query: string, text: string) => {
    if (!query.trim()) return true;
    const terms = query.toLowerCase().trim().split(/\s+/);
    const textLower = text.toLowerCase();
    
    return terms.every(term => {
      let pIdx = 0;
      for (let i = 0; i < textLower.length && pIdx < term.length; i++) {
        if (textLower[i] === term[pIdx]) pIdx++;
      }
      return pIdx === term.length;
    });
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory
    const combinedText = `${faq.question} ${faq.answer}`;
    const matchesSearch = isMatch(searchQuery, combinedText);
    return matchesCategory && matchesSearch
  })

  // Group by category to display them nicely
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    const cat = faq.category || "General";
    const arr = acc[cat] || []
    arr.push(faq)
    acc[cat] = arr
    return acc
  }, {} as Record<string, FaqItem[]>)

  return (
    <>
      {/* ─── HERO & SEARCH ─── */}
      <Section className="relative min-h-[60vh] flex items-center pt-24 pb-16 bg-black overflow-hidden border-b border-border">
        {/* Subtle animated grid background overlaying the image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
        
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80"
            alt="FAQ Hero"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl border-l-4 border-primary pl-6 md:pl-10">
            <span className="mb-6 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Support & Knowledge Base
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              How can we<br />help you?
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl leading-relaxed">
              Search our knowledge base or browse categories below to find answers to the most common questions about our services.
            </p>

            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                suppressHydrationWarning
                placeholder="Search questions or keywords..."
                className="w-full pl-12 pr-4 py-4 border-none rounded-none bg-white text-black font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm h-16"
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                  {dynamicCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      suppressHydrationWarning
                      className={`whitespace-nowrap text-left px-4 py-3 border-l-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        activeCategory === category
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-transparent hover:border-border hover:bg-muted/30 text-muted-foreground hover:text-foreground"
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
                <div className="space-y-16">
                  {Object.entries(groupedFaqs).map(([category, items]) => (
                    <div key={category}>
                      <h2 className="text-3xl font-black tracking-tighter text-foreground mb-8 border-b border-border pb-4">
                        {category}
                      </h2>
                      <div className="border border-border bg-card">
                        <Accordion type="single" collapsible className="w-full">
                          {items.map((item, index) => (
                            <AccordionItem key={index} value={`${category}-${index}`} className="px-6 border-border last:border-0">
                              <AccordionTrigger className="text-left text-lg font-bold hover:no-underline hover:text-primary transition-colors py-6">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base font-medium">
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
                <div className="text-center py-24 border border-border bg-muted/5">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">No results found</h3>
                  <p className="text-lg text-muted-foreground">We couldn't find any questions matching "{searchQuery}".</p>
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>

      {/* ─── STILL NEED HELP & CTA ─── */}
      <Section className="py-24 bg-black text-white overflow-hidden border-t border-border">
        <Container>
          <div className="relative border border-white/10 bg-white/5 p-12 md:p-20 text-center backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <span className="mb-4 block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                Direct Support
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-8">
                Still have questions?
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Can't find the answer you're looking for? Please chat to our friendly team. We are always happy to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors border-none">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none h-16 px-10 text-sm font-bold uppercase tracking-widest bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors">
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
