import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export interface StatItem {
  label: string
  value: string
  description?: string
  icon?: React.ReactNode
}

export interface StatisticsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatItem[]
}

export function Statistics({ stats, className, ...props }: StatisticsProps) {
  return (
    <div 
      className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)} 
      aria-label="Statistics overview"
      {...props}
    >
      {stats.map((stat, i) => (
        <Card key={i} className="bg-muted/30 border border-muted-foreground/10 hover:border-primary/30 transition-colors shadow-none overflow-hidden">
          <CardContent className="p-6 relative">
            {stat.icon && (
              <div className="absolute top-4 right-4 text-muted-foreground/20 h-16 w-16 -mr-4 -mt-4">
                {stat.icon}
              </div>
            )}
            <div className="relative z-10">
              <div className="text-4xl font-black tracking-tight mb-2 text-primary drop-shadow-sm">{stat.value}</div>
              <div className="font-semibold text-foreground text-sm uppercase tracking-wider">{stat.label}</div>
              {stat.description && <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.description}</div>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}