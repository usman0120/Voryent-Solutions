import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface FaqItem {
  question: string
  answer: string | React.ReactNode
}

export interface FaqProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[]
}

export function FaqComponent({ items, className, ...props }: FaqProps) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)} aria-label="Frequently Asked Questions" {...props}>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-card border rounded-lg px-6 data-[state=open]:shadow-sm transition-all"
          >
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary transition-colors py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pt-0">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}