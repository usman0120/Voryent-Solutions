import * as React from "react"
import { cn } from "@/lib/utils"

export interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  description?: React.ReactNode
  sections?: FooterSection[]
  copyright?: string
  socialLinks?: React.ReactNode
  legalLinks?: { label: string; href: string }[]
}

export function Footer({ 
  logo, 
  description, 
  sections = [], 
  copyright, 
  socialLinks,
  legalLinks = [],
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
        {/* Four-column layout: Logo/desc column + one column per section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <a
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              {logo ? (
                logo
              ) : (
                <span className="font-bold text-2xl tracking-tight text-foreground">
                  Voryent
                </span>
              )}
            </a>
            {description && (
              <div className="text-sm leading-6 max-w-xs">{description}</div>
            )}
            {socialLinks && <div>{socialLinks}</div>}
          </div>

          {/* Columns 2–4: Link sections */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold leading-6 text-foreground tracking-wider uppercase">
                {section.title}
              </h3>
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
          ))}
        </div>

        {/* Bottom legal row */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5">
            {copyright ||
              `\u00A9 ${new Date().getFullYear()} Voryent Solutions. All rights reserved.`}
          </p>
          {legalLinks.length > 0 && (
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs leading-5 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}