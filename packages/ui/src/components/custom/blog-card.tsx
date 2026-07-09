import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  excerpt: string
  date: string
  author: { name: string; avatar?: string }
  category?: string
  imageUrl?: string
  href?: string
}

export function BlogCard({ title, excerpt, date, author, category, imageUrl, href, className, ...props }: BlogCardProps) {
  const Comp = href ? "a" : "div"
  
  return (
    <Comp 
      href={href} 
      className={cn("block group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg", className)}
    >
      <Card className="h-full flex flex-col transition-shadow hover:shadow-md overflow-hidden" {...props}>
        {imageUrl && (
          <div className="w-full h-48 overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        )}
        <CardHeader className="gap-2">
          {category && <Badge className="w-fit" variant="secondary">{category}</Badge>}
          <CardTitle className="leading-tight group-hover:text-primary transition-colors line-clamp-2">{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{excerpt}</p>
        </CardContent>
        <CardFooter className="pt-4 border-t bg-muted/5 flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{author.name}</span>
        </CardFooter>
      </Card>
    </Comp>
  )
}