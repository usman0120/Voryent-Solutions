import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Calendar, DollarSign, Briefcase } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export interface CareerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  department: string
  location: string
  type: string
  action?: React.ReactNode
  experience?: string
  salary?: string
  currency?: string
  postedDate?: Date | string | any
  featured?: boolean
}

export function CareerCard({ 
  title, 
  department, 
  location, 
  type, 
  action, 
  experience,
  salary,
  currency = "USD",
  postedDate,
  featured = false,
  className, 
  ...props 
}: CareerCardProps) {
  
  // Format posted date if available
  let postedText = ""
  if (postedDate) {
    try {
      const date = typeof postedDate?.toDate === 'function' ? postedDate.toDate() : new Date(postedDate)
      postedText = formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      postedText = ""
    }
  }

  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group", 
      featured ? "border-primary/50 shadow-primary/10" : "",
      className
    )} {...props}>
      {/* Decorative gradient background that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {featured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          Featured
        </div>
      )}

      <CardHeader className="pb-4 relative z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted font-medium border-0">
            {department}
          </Badge>
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
            {type}
          </Badge>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3 text-sm text-muted-foreground relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          {experience && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary/70 shrink-0" />
              <span className="truncate">{experience}</span>
            </div>
          )}
          
          {salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary/70 shrink-0" />
              <span className="truncate">{salary} {currency}</span>
            </div>
          )}
          
          {postedText && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary/70 shrink-0" />
              <span className="truncate">{postedText}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-6 relative z-10">
        {action ? action : (
          <div className="w-full text-center text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 py-2.5 rounded-lg transition-all shadow-sm group-hover:shadow cursor-pointer">
            View Details & Apply
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
