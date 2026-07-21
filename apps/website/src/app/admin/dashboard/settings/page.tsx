"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { SettingsSection } from "@/components/admin/operations/settings-section";
import { AccountSection } from "@/components/admin/operations/account-section";
import { AuditLogsSection } from "@/components/admin/operations/audit-logs-section";
import { ModuleGuard } from "@/components/admin/operations/module-guard";
import { 
  generalSettingsSchema, 
  brandingSettingsSchema, 
  contactSettingsSchema,
  socialSettingsSchema,
  seoSettingsSchema,
  legalSettingsSchema
} from "@/lib/admin/validations/settings.schema";

export default function SettingsPage() {
  return (
    <ModuleGuard module="Settings" action="Read">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
          <p className="text-muted-foreground">Manage application configurations and preferences.</p>
        </div>

        <Tabs defaultValue="general" className="flex flex-col md:flex-row gap-6">
          <div className="md:w-48 shrink-0">
            <TabsList className="flex flex-col h-auto bg-transparent justify-start items-start space-y-1">
              <TabsTrigger value="general" className="w-full justify-start data-[state=active]:bg-muted">General</TabsTrigger>
              <TabsTrigger value="account" className="w-full justify-start data-[state=active]:bg-muted">Account & Security</TabsTrigger>
              <TabsTrigger value="branding" className="w-full justify-start data-[state=active]:bg-muted">Branding</TabsTrigger>
              <TabsTrigger value="contact" className="w-full justify-start data-[state=active]:bg-muted">Contact Info</TabsTrigger>
              <TabsTrigger value="social" className="w-full justify-start data-[state=active]:bg-muted">Social Media</TabsTrigger>
              <TabsTrigger value="seo" className="w-full justify-start data-[state=active]:bg-muted">SEO Foundation</TabsTrigger>
              <TabsTrigger value="legal" className="w-full justify-start data-[state=active]:bg-muted">Legal Pages</TabsTrigger>
              <TabsTrigger value="audit" className="w-full justify-start data-[state=active]:bg-muted">Audit Logs</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="general"
                  title="General Settings"
                  description="Core identity and localization for the system."
                  schema={generalSettingsSchema}
                  defaultValues={{ companyName: "Voryent Solutions", websiteUrl: "https://voryent.com", timezone: "UTC", language: "English", dateFormat: "MM/DD/YYYY" }}
                  fields={[
                    { name: "companyName", label: "Company Name" },
                    { name: "websiteUrl", label: "Website URL", type: "url" },
                    { name: "timezone", label: "Timezone" },
                    { name: "language", label: "Language" },
                    { name: "dateFormat", label: "Date Format" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>

            <TabsContent value="account" className="m-0">
              <AccountSection />
            </TabsContent>

            <TabsContent value="branding" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="branding"
                  title="Brand Assets"
                  description="Reuse existing brand assets. DO NOT upload unapproved files."
                  schema={brandingSettingsSchema}
                  defaultValues={{ logo: "", wordmark: "", favicon: "", primaryColor: "#0f172a", secondaryColor: "#e2e8f0" }}
                  fields={[
                    { name: "logo", label: "Logo URL (Dark/Light)", type: "url" },
                    { name: "wordmark", label: "Wordmark URL", type: "url" },
                    { name: "favicon", label: "Favicon URL", type: "url" },
                    { name: "primaryColor", label: "Primary Color (Hex)", type: "text" },
                    { name: "secondaryColor", label: "Secondary Color (Hex)", type: "text" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>

            <TabsContent value="contact" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="contact"
                  title="Contact Information"
                  description="Publicly displayed contact details for the website."
                  schema={contactSettingsSchema}
                  defaultValues={{ email: "contact@voryent.com", phone: "", address: "", officeHours: "9 AM - 5 PM EST", mapUrl: "" }}
                  fields={[
                    { name: "email", label: "Support Email", type: "email" },
                    { name: "phone", label: "Phone Number" },
                    { name: "address", label: "Physical Address" },
                    { name: "officeHours", label: "Office Hours" },
                    { name: "mapUrl", label: "Google Maps Embed URL", type: "url" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>

            <TabsContent value="social" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="social"
                  title="Social Media Links"
                  description="Connect your social presence."
                  schema={socialSettingsSchema}
                  defaultValues={{ linkedIn: "", github: "", youtube: "", x: "", facebook: "", whatsapp: "" }}
                  fields={[
                    { name: "linkedIn", label: "LinkedIn URL", type: "url" },
                    { name: "github", label: "GitHub URL", type: "url" },
                    { name: "youtube", label: "YouTube URL", type: "url" },
                    { name: "x", label: "X (Twitter) URL", type: "url" },
                    { name: "facebook", label: "Facebook URL", type: "url" },
                    { name: "whatsapp", label: "WhatsApp Number" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>

            <TabsContent value="seo" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="seo"
                  title="Global SEO Settings"
                  description="Default search engine optimization rules and metadata."
                  schema={seoSettingsSchema}
                  defaultValues={{ 
                    siteTitle: "Voryent Solutions", 
                    siteDescription: "Building robust software solutions.", 
                    defaultKeywords: "software, development, agency", 
                    defaultOgImage: "", 
                    twitterImage: "", 
                    robots: "index, follow", 
                    canonicalBaseUrl: "https://voryentsolutions.com",
                    organizationName: "Voryent Solutions",
                    organizationLogo: "",
                    organizationEmail: "contact@voryent.com",
                    organizationPhone: "",
                    organizationAddress: ""
                  }}
                  fields={[
                    { name: "siteTitle", label: "Site Title" },
                    { name: "siteDescription", label: "Site Description" },
                    { name: "defaultKeywords", label: "Default Keywords" },
                    { name: "defaultOgImage", label: "Default Open Graph Image URL", type: "url" },
                    { name: "twitterImage", label: "Twitter Card Image URL", type: "url" },
                    { name: "robots", label: "Robots Meta" },
                    { name: "canonicalBaseUrl", label: "Canonical Base URL", type: "url" },
                    { name: "organizationName", label: "Organization Name" },
                    { name: "organizationLogo", label: "Organization Logo URL", type: "url" },
                    { name: "organizationEmail", label: "Organization Email", type: "email" },
                    { name: "organizationPhone", label: "Organization Phone" },
                    { name: "organizationAddress", label: "Organization Address" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>


            <TabsContent value="legal" className="m-0">
              <ModuleGuard module="Settings" action="Edit">
                <SettingsSection
                  groupId="legal"
                  title="Legal Pages"
                  description="Manage URLs for public legal documents."
                  schema={legalSettingsSchema}
                  defaultValues={{ privacyPolicyUrl: "", termsOfServiceUrl: "", cookiePolicyUrl: "" }}
                  fields={[
                    { name: "privacyPolicyUrl", label: "Privacy Policy URL", type: "url" },
                    { name: "termsOfServiceUrl", label: "Terms of Service URL", type: "url" },
                    { name: "cookiePolicyUrl", label: "Cookie Policy URL", type: "url" },
                  ]}
                />
              </ModuleGuard>
            </TabsContent>

            <TabsContent value="audit" className="m-0">
              <ModuleGuard module="Settings" action="View">
                <AuditLogsSection />
              </ModuleGuard>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </ModuleGuard>
  );
}
