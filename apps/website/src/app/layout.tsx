import type { Metadata, Viewport } from "next"
import { fontSans, fontMono, fontSerif } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { siteConfig } from "@/config/site"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Software Engineering", "Cloud Architecture", "AI", "Design System"],
  authors: [
    {
      name: "Voryent Solutions",
      url: "https://voryentsolutions.com",
    },
  ],
  creator: "Voryent Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@voryentsolutions",
  },
  alternates: {
    canonical: "https://voryentsolutions.com",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

import { JsonLd } from "@/components/json-ld"
import { Analytics } from "@/components/analytics"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": "https://voryentsolutions.com/Assets/Logos/Voryent%20Solutions%20-%20Dark%20Background.svg",
    "description": siteConfig.description
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={orgJsonLd} />
        <Analytics />
      </head>
      <body
        suppressHydrationWarning
        className={`min-h-screen bg-background font-sans text-foreground antialiased ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}