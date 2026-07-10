import * as React from "react"
import { Container, Section, Badge } from "@voryent/ui"

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 border-b border-border/50 bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm font-medium">
              Legal Documentation
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {title}
            </h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </Section>
      
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>a]:text-primary hover:[&>a]:underline">
            {children}
          </div>
        </Container>
      </Section>
    </>
  )
}
