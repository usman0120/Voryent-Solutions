export const siteConfig = {
  name: "Voryent Solutions",
  description: "Technology consulting and digital solutions",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com/usman0120/Voryent-Solutions",
  },
} as const;

export type SiteConfig = typeof siteConfig;