"use client"

import * as React from "react"
import { Navbar } from "@voryent/ui"
import { Button } from "@voryent/ui"
import { Search } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import Image from "next/image"
import Link from "next/link"

import { useScroll } from "@/hooks/use-scroll"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const isScrolled = useScroll(10)

  return (
    <Navbar
      isScrolled={isScrolled}
      className="h-16" // 64px height specified
      logo={
        <div className="flex items-center gap-2">
          <div className="w-[180px] h-10 relative">
            <Image 
              src="/Assets/Logos/Transparent logos/Horizontal_layout_Logo_Transparent.png" 
              alt="Voryent Solutions" 
              fill
              sizes="180px" 
              className="object-contain dark:hidden"
              priority
            />
            <Image 
              src="/Assets/Logos/Dark BG/Horizontal_layout_Logo_Dark.png" 
              alt="Voryent Solutions" 
              fill
              sizes="180px" 
              className="object-contain hidden dark:block"
              priority
            />
          </div>
        </div>
      }
      links={navigationLinks}
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="w-9 h-9" aria-label="Search">
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <Button className="hidden md:inline-flex">
            Let&apos;s Talk
          </Button>
        </div>
      }
    />
  )
}
