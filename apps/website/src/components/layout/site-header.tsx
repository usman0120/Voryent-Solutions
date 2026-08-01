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
import { hardcodedIndustries } from "@/lib/data/industries";

const serviceMenuItems = hardcodedServices.map((service) => ({
  title: service.title,
  href: `/services/${service.slug}`,
  description: service.tagline,
}));

const industryMenuItems = hardcodedIndustries.map((industry) => ({
  title: industry.title,
  href: `/industries/${industry.slug}`,
  description: industry.shortDescription,
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
        <Link
          href="/services"
          className="relative group flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md p-6 no-underline outline-none transition-all focus:shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="All Services"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-colors group-hover:from-black/90" />
          <div className="relative z-10">
            <div className="text-white mb-2 mt-4 text-lg font-bold">All Services</div>
            <p className="text-white/90 text-sm leading-tight">
              Explore our complete portfolio of enterprise-grade, AI-first technology solutions.
            </p>
          </div>
        </Link>
      ),
    },
  },
  { 
    label: "Industries", 
    href: "/industries",
    isMegaMenu: true,
    megaMenuProps: {
      items: industryMenuItems,
      featuredItem: (
        <Link
          href="/industries"
          className="relative group flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-md p-6 no-underline outline-none transition-all focus:shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="All Industries"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-colors group-hover:from-black/90" />
          <div className="relative z-10">
            <div className="text-white mb-2 mt-4 text-lg font-bold">All Industries</div>
            <p className="text-white/90 text-sm leading-tight">
              Discover how our digital solutions empower businesses across various domains.
            </p>
          </div>
        </Link>
      ),
    },
  },
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
