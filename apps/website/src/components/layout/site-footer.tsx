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

import { Github, Twitter, Linkedin, Facebook, Youtube, Link as LinkIcon, Instagram } from "lucide-react";

export function SocialIcons({ social }: { social: any }) {
  if (!social) return null;

  // Support both new `platforms` array and old flat object structure
  const platforms = Array.isArray(social.platforms) 
    ? social.platforms 
    : Object.keys(social)
        .filter(key => key !== "id" && social[key])
        .map(key => ({
          platform: key === "x" ? "Twitter" : key.charAt(0).toUpperCase() + key.slice(1),
          url: social[key]
        }));

  if (platforms.length === 0) return null;

  const getIcon = (name: string) => {
    if (!name) return <LinkIcon className="h-5 w-5" />;
    const n = name.toLowerCase();
    if (n.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
    if (n.includes("github")) return <Github className="h-5 w-5" />;
    if (n.includes("youtube")) return <Youtube className="h-5 w-5" />;
    if (n.includes("twitter") || n === "x") return <Twitter className="h-5 w-5" />;
    if (n.includes("facebook")) return <Facebook className="h-5 w-5" />;
    if (n.includes("instagram")) return <Instagram className="h-5 w-5" />;
    return <LinkIcon className="h-5 w-5" />;
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {platforms.map((item: any, idx: number) => (
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label={`Follow us on ${item.platform}`}
          title={item.platform}
        >
          {getIcon(item.platform)}
        </a>
      ))}
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
