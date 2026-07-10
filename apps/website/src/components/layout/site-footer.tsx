"use client"

import * as React from "react"
import { Footer } from "@voryent/ui"
import Image from "next/image"

const servicesLinks = [
  { label: "Software Engineering", href: "/services/custom-software" },
  { label: "Cloud Architecture", href: "/services/cloud-engineering" },
  { label: "Data & AI", href: "/services/ai-solutions" },
  { label: "UI/UX Design", href: "/services/ui-ux" },
  { label: "DevOps & SRE", href: "/services/cloud-engineering" },
]

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Case Studies", href: "/case-studies" },
]

const resourcesLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Security", href: "/security" },
]

function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {/* Twitter / X */}
      <a
        href="https://twitter.com/voryentsolutions"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
        aria-label="Follow Voryent Solutions on X (Twitter)"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      {/* LinkedIn */}
      <a
        href="https://linkedin.com/company/voryentsolutions"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
        aria-label="Follow Voryent Solutions on LinkedIn"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      {/* GitHub */}
      <a
        href="https://github.com/voryentsolutions"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
        aria-label="Follow Voryent Solutions on GitHub"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  )
}

export function SiteFooter() {
  return (
    <Footer
      logo={
        <div className="flex items-center gap-3">
          {/* Light mode: primary logo designed for light backgrounds */}
          <div className="w-10 h-10 relative block dark:hidden">
            <Image
              src="/Assets/Logos/Light BG/Primary_Logo_white.png"
              alt="Voryent Solutions"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          {/* Dark mode: primary logo designed for dark backgrounds */}
          <div className="w-10 h-10 relative hidden dark:block">
            <Image
              src="/Assets/Logos/Dark BG/Primary_Logo_Dark.png"
              alt="Voryent Solutions"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="font-bold tracking-tight text-xl text-foreground">
            Voryent
          </span>
        </div>
      }
      description="Empowering digital products with next-generation design and engineering. We build scalable, resilient software that drives real business outcomes."
      sections={[
        { title: "Services", links: servicesLinks },
        { title: "Company", links: companyLinks },
        { title: "Resources", links: resourcesLinks },
      ]}
      socialLinks={<SocialIcons />}
      legalLinks={legalLinks}
      copyright={`\u00A9 ${new Date().getFullYear()} Voryent Solutions. All rights reserved.`}
    />
  )
}
