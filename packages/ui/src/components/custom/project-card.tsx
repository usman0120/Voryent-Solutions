import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  tags?: string[]
  action?: React.ReactNode
}

export function ProjectCard({ title, description, tags = [], action, className, ...props }: ProjectCardProps) {
  return (
    <Card className={cn("group overflow-hidden flex flex-col h-full transition-shadow hover:shadow-md", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Project tags">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t bg-muted/5">
        {action ? action : (
          <div className="flex items-center text-sm font-medium text-primary cursor-pointer hover:underline">
            View Project <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}