import * as React from "react"
import { cn } from "@/lib/utils"

export interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  description?: string
  sections?: FooterSection[]
  copyright?: string
  socialLinks?: React.ReactNode
}

export function Footer({ 
  logo, 
  description, 
  sections = [], 
  copyright, 
  socialLinks,
  className, 
  ...props 
}: FooterProps) {
  return (
    <footer
      className={cn("bg-muted/40 text-muted-foreground border-t", className)}
      aria-labelledby="footer-heading"
      {...props}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 xl:col-span-1">
            <a href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
              {logo ? logo : <span className="font-bold text-2xl tracking-tight text-foreground">Voryent</span>}
            </a>
            {description && (
              <p className="text-sm leading-6 max-w-sm">
                {description}
              </p>
            )}
            {socialLinks && (
              <div className="flex space-x-4">
                {socialLinks}
              </div>
            )}
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {sections.map((section, idx) => (
              <div key={idx} className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-foreground tracking-wider">{section.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a 
                          href={link.href} 
                          className="text-sm leading-6 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 -mx-1"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5">
            {copyright || `© ${new Date().getFullYear()} Voryent Solutions. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}