import * as React from "react"
import { cn } from "@/lib/utils"
import { InboxIcon } from "lucide-react"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title = "No data found", description, icon, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center animate-in fade-in-50 rounded-lg border border-dashed bg-muted/20", 
        className
      )}
      role="status"
      aria-label={title}
      {...props}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground mb-6 shadow-sm">
        {icon || <InboxIcon className="h-10 w-10" />}
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"