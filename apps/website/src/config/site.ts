export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Voryent Solutions",
  description:
    "Next-generation design and engineering foundation for scale. Empowering digital products with unparalleled architecture and UX.",
  url: process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000",
  ogImage: "https://voryentsolutions.com/og.jpg",
  links: {
    twitter: "https://twitter.com/voryentsolutions",
    github: "https://github.com/voryentsolutions",
  },
}
