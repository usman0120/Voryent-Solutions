"use client";

import * as React from "react";
import { Navbar } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { Search } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import Image from "next/image";
import Link from "next/link";

import { useScroll } from "@/hooks/use-scroll";
import { hardcodedServices } from "@/lib/data/services";

const serviceMenuItems = hardcodedServices.map((service) => ({
  title: service.title,
  href: `/services/${service.slug}`,
  description: service.tagline,
}));

const navigationLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    isMegaMenu: true,
    megaMenuProps: {
      items: serviceMenuItems,
      featuredItem: (
        <a
          href="/services"
          className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none transition-opacity hover:opacity-90 focus:shadow-md"
        >
          <div className="text-primary mb-2 mt-4 text-lg font-medium">All Services</div>
          <p className="text-muted-foreground text-sm leading-tight">
            Explore our complete portfolio of enterprise-grade, AI-first technology solutions.
          </p>
        </a>
      ),
    },
  },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  {
    label: "Insights",
    href: "#",
    dropdownItems: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Newsroom", href: "/blog" },
      { label: "Blogs", href: "/blog" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const isScrolled = useScroll(10);

  return (
    <Navbar
      isScrolled={isScrolled}
      className="h-16" // 64px height specified
      logo={
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-[180px]">
            <Image
              src="/Assets/Logos/Transparent logos/Horizontal_layout_Logo_Transparent.webp"
              alt="Voryent Solutions"
              fill
              sizes="180px"
              className="object-contain dark:hidden"
              priority
            />
            <Image
              src="/Assets/Logos/Dark BG/Horizontal_layout_Logo_Dark.webp"
              alt="Voryent Solutions"
              fill
              sizes="180px"
              className="hidden object-contain dark:block"
              priority
            />
          </div>
        </div>
      }
      links={navigationLinks}
      actions={
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <Button className="hidden md:inline-flex" asChild>
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
        </div>
      }
    />
  );
}
