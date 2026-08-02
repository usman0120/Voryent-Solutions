"use client";

import { useContacts } from "@/lib/admin/react-query/contacts.hooks";
import { ContactSettingsSection } from "@/components/admin/operations/contact-settings-section";
import { SocialSettingsSection } from "@/components/admin/operations/social-settings-section";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger,
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  Badge,
  Button
} from "@voryent/ui";
import { format } from "date-fns";
import { Mail, Briefcase, Settings, Link as LinkIcon, User, Calendar, DollarSign, FileText } from "lucide-react";
import { ContactType } from "@/lib/admin/services/contacts.service";

export default function ContactCMSPage() {
  const { data: contacts = [], isLoading } = useContacts();

  const messages = contacts.filter((c: ContactType) => c.type === "message" || !c.type);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact CMS</h1>
        <p className="text-muted-foreground">Manage your messages, project requests, and contact details.</p>
      </div>

      <Tabs defaultValue="messages" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="messages" className="gap-2">
            <Mail className="h-4 w-4" />
            Quick Messages
          </TabsTrigger>

          <TabsTrigger value="contact-info" className="gap-2">
            <Settings className="h-4 w-4" />
            Contact Info
          </TabsTrigger>
          <TabsTrigger value="social-links" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Social Links
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Messages</CardTitle>
              <CardDescription>Messages received from the quick contact form.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-4 text-center animate-pulse text-muted-foreground">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                  No messages found.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg: ContactType) => (
                    <div key={msg.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{msg.firstName} {msg.lastName} {msg.name}</h3>
                          <Badge variant="outline">{msg.status}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {msg.createdAt ? format(new Date(msg.createdAt.seconds * 1000), "PPP") : "Unknown date"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Phone:</span> {msg.phone}
                          </div>
                        )}
                      </div>
                      {msg.subject && <div className="font-medium text-sm">Subject: {msg.subject}</div>}
                      <div className="text-sm bg-muted/50 p-3 rounded-md whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="contact-info">
          <ContactSettingsSection />
        </TabsContent>

        <TabsContent value="social-links">
          <SocialSettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
