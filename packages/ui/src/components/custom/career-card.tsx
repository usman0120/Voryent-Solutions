import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export interface CareerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  department: string
  location: string
  type: string
  action?: React.ReactNode
}

export function CareerCard({ title, department, location, type, action, className, ...props }: CareerCardProps) {
  return (
    <Card className={cn("flex flex-col h-full transition-shadow hover:shadow-md", className)} {...props}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-primary/5">{department}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-foreground/50" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-foreground/50" />
          <span>{type}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        {action ? action : (
          <div className="w-full text-center text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 py-2 rounded-md transition-colors cursor-pointer">
            View Details
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
