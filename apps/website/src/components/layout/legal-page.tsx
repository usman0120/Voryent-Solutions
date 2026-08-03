import * as React from "react"
import Link from "next/link"
import { Container, Section, Button } from "@voryent/ui"

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
  bgImage?: string
}

export function LegalPage({ title, lastUpdated, children, bgImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" }: LegalPageProps) {
  return (
    <>
      <Section className="relative min-h-[60vh] flex items-end pb-24 pt-48 overflow-hidden bg-black text-white">
        {/* Structural Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Structural Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          {/* Blend a primary or dark gradient over it */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-4xl border-l-4 border-primary pl-6">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Legal Documentation
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              {title}
            </h1>
            <p className="text-lg text-white/80 font-medium mb-8">
              Last Updated: {lastUpdated}
            </p>
            <Button asChild size="lg" className="rounded-none h-14 px-8 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>
      </Section>
      
      <Section className="py-24 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground leading-relaxed text-lg 
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h2]:border-b [&>h2]:border-border/60 [&>h2]:pb-4
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4 
            [&>ul]:list-none [&>ul]:pl-0 [&>ul]:space-y-3 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[10px] [&>ul>li]:before:h-1.5 [&>ul>li]:before:w-1.5 [&>ul>li]:before:bg-primary
            [&>a]:text-primary [&>a]:font-bold [&>a]:underline-offset-4 hover:[&>a]:underline">
            {children}
          </div>
        </Container>
      </Section>
    </>
  )
}
