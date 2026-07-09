import * as React from "react"
import { cn } from "@/lib/utils"

const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6", className)}
      {...props}
    />
  )
)
Grid.displayName = "Grid"

export { Grid }