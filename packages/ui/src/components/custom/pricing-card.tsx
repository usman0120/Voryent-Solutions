import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"

export interface PricingFeature {
  text: string
  included?: boolean
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  price: string
  period?: string
  description: string
  features: (string | PricingFeature)[]
  isPopular?: boolean
  action?: React.ReactNode
}

export function PricingCard({ 
  title, 
  price, 
  period = "/month",
  description, 
  features, 
  isPopular, 
  action,
  className, 
  ...props 
}: PricingCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col h-full transition-all duration-300", 
      isPopular ? "border-primary shadow-xl md:scale-105 z-10" : "hover:shadow-md",
      className
    )} {...props}>
      {isPopular && (
        <div className="absolute top-0 right-0 left-0 flex justify-center -translate-y-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className={cn("text-center pb-8 pt-8", isPopular && "pt-10")}>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-6">
        <div className="mb-8 text-center">
          <span className="text-5xl font-extrabold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground font-medium ml-1">{period}</span>}
        </div>
        <ul className="space-y-4 text-sm" aria-label={`Features for ${title} plan`}>
          {features.map((feature, i) => {
            const isObject = typeof feature === 'object'
            const text = isObject ? feature.text : feature
            const included = isObject ? feature.included !== false : true
            
            return (
              <li key={i} className={cn("flex items-start gap-3", !included && "text-muted-foreground/50")}>
                <div className={cn("mt-0.5 rounded-full p-1 flex-shrink-0", included ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground/50")}>
                  <Check className="h-3 w-3" strokeWidth={3} />
                </div>
                <span className="leading-tight">{text}</span>
              </li>
            )
          })}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-6">
        {action ? action : (
          <div className={cn(
            "w-full text-center py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer",
            isPopular ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}>
            Get Started
          </div>
        )}
      </CardFooter>
    </Card>
  )
}