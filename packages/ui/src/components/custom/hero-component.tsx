import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactNode
  subtitle: string | React.ReactNode
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  pattern?: boolean
}

export function HeroComponent({ 
  title, 
  subtitle, 
  primaryAction, 
  secondaryAction, 
  pattern = true,
  className, 
  ...props 
}: HeroProps) {
  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background py-24 lg:py-32 flex flex-col items-center text-center", 
        className
      )} 
      aria-labelledby="hero-title"
      {...props}
    >
      {pattern && (
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom pointer-events-none" />
      )}
      <div className="relative z-10 container px-4 md:px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 
          id="hero-title"
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
        >
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </section>
  )
}