import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Voryent Solutions",
  description = "Next-generation design and engineering foundation for scale.",
  image = "https://voryentsolutions.com/og.jpg",
  icons = "/favicon.ico",
  noIndex = false,
  canonicalUrl,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  canonicalUrl?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@voryentsolutions",
    },
    icons,
    metadataBase: new URL("https://voryentsolutions.com"),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
