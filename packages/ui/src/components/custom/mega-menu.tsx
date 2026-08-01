import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { ArrowRight } from "lucide-react"

export interface MegaMenuItem {
  title: string
  href: string
  description: string
}

export interface MegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  triggerLabel: string
  items: MegaMenuItem[]
  featuredItem?: React.ReactNode
}

export function MegaMenu({ triggerLabel, items, featuredItem, className, ...props }: MegaMenuProps) {
  return (
    <div className={cn("hidden md:flex", className)} {...props}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{triggerLabel}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex w-screen max-w-full">
                {/* Left side: featured item in grey background */}
                {featuredItem && (
                  <div className="hidden lg:flex w-1/3 bg-muted/50 p-8 xl:p-12 justify-end border-r">
                    <div className="w-full max-w-sm flex flex-col justify-center">
                      <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden shadow-lg border">
                        <NavigationMenuLink asChild>
                          {featuredItem}
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </div>
                )}
                {/* Right side: links grid */}
                <div className={cn(
                  "w-full bg-background p-8 xl:p-12 flex justify-start",
                  featuredItem ? "lg:w-2/3" : "w-full"
                )}>
                  <div className="w-full max-w-5xl">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                      {items.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-muted/80 hover:shadow-sm focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring border border-transparent hover:border-border/50"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-bold leading-none text-foreground group-hover:text-primary transition-colors">{item.title}</div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                              </div>
                              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
