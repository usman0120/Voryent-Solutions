import * as React from "react";
import { Footer } from "@voryent/ui";
import Image from "next/image";
import { getSocialSettings, getContactSettings } from "@/lib/firebase/services";

const servicesLinks = [
  { label: "Software Engineering", href: "/services/custom-software" },
  { label: "Cloud Architecture", href: "/services/cloud-engineering" },
  { label: "Data & AI", href: "/services/ai-solutions" },
  { label: "UI/UX Design", href: "/services/ui-ux" },
  { label: "DevOps & SRE", href: "/services/cloud-engineering" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Case Studies", href: "/case-studies" },
];

const resourcesLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Security", href: "/security" },
];

export function SocialIcons({ social }: { social: any }) {
  if (!social) return null;
  return (
    <div className="flex items-center gap-4">
      {social.x && (
        <a
          href={social.x}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Follow us on X (Twitter)"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      )}
      {social.linkedIn && (
        <a
          href={social.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Follow us on LinkedIn"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      )}
      {social.github && (
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Follow us on GitHub"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
      {social.facebook && (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Follow us on Facebook"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
      {social.youtube && (
        <a
          href={social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Subscribe to our YouTube Channel"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

export async function SiteFooter() {
  const [social, contact] = await Promise.all([
    getSocialSettings().catch(() => null),
    getContactSettings().catch(() => null) as Promise<any>,
  ]);

  return (
    <Footer
      logo={
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-[180px]">
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
      description={
        <div className="space-y-4">
          <p>
            Empowering digital products with next-generation design and engineering. We build
            scalable, resilient software that drives real business outcomes.
          </p>
          {contact && (
            <div className="text-muted-foreground mt-4 space-y-2 text-sm">
              {contact.email && (
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.whatsapp && (
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    className="hover:text-foreground"
                  >
                    {contact.whatsapp}
                  </a>
                </p>
              )}
              {contact.address && (
                <p>
                  <strong>Address:</strong> {contact.address}
                </p>
              )}
            </div>
          )}
        </div>
      }
      sections={[
        { title: "Services", links: servicesLinks },
        { title: "Company", links: companyLinks },
        { title: "Resources", links: resourcesLinks },
      ]}
      socialLinks={<SocialIcons social={social} />}
      legalLinks={legalLinks}
      copyright={`\u00A9 ${new Date().getFullYear()} Voryent Solutions. All rights reserved.`}
    />
  );
}
