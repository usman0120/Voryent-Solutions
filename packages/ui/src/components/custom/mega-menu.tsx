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
              <ul className={cn(
                "grid gap-3 p-6 md:w-[400px] lg:w-[600px]",
                featuredItem ? "lg:grid-cols-[.75fr_1fr]" : "lg:grid-cols-2"
              )}>
                {featuredItem && (
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      {featuredItem}
                    </NavigationMenuLink>
                  </li>
                )}
                {items.map((item, index) => (
                  <li key={index}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                          {item.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
