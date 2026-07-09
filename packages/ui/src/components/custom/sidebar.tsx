import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarNavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
  children?: SidebarNavItem[]
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode
  items?: SidebarNavItem[]
  footer?: React.ReactNode
}

export function Sidebar({ 
  header, 
  items = [], 
  footer,
  className, 
  ...props 
}: SidebarProps) {
  return (
    <aside
      className={cn("hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 w-64 border-r bg-background", className)}
      aria-label="Sidebar Navigation"
      {...props}
    >
      {header && (
        <div className="h-16 flex items-center px-6 border-b shrink-0">
          {header}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <a
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.icon && <span className={cn("h-4 w-4", item.isActive ? "text-primary-foreground" : "text-muted-foreground")}>{item.icon}</span>}
              {item.label}
            </a>
            {item.children && (
              <div className="ml-4 mt-1 flex flex-col gap-1 border-l pl-2 border-muted">
                {item.children.map((child, childIdx) => (
                  <a
                    key={childIdx}
                    href={child.href || "#"}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      child.isActive 
                        ? "font-medium text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={child.isActive ? "page" : undefined}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {footer && (
        <div className="p-4 border-t shrink-0">
          {footer}
        </div>
      )}
    </aside>
  )
}