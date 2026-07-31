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
  const projects = contacts.filter((c: ContactType) => c.type === "project");

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
          <TabsTrigger value="projects" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Project Requests
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

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Requests</CardTitle>
              <CardDescription>Inquiries received from the "Need Service/Project" form.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="p-4 text-center animate-pulse text-muted-foreground">Loading requests...</div>
              ) : projects.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                  No project requests found.
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((req: ContactType) => (
                    <div key={req.id} className="border rounded-lg p-5 space-y-4">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{req.firstName} {req.lastName} {req.name}</h3>
                          {req.company && <span className="text-muted-foreground">({req.company})</span>}
                          <Badge variant="secondary">{req.status}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {req.createdAt ? format(new Date(req.createdAt.seconds * 1000), "PPP") : ""}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${req.email}`} className="text-foreground hover:underline">{req.email}</a>
                          </div>
                          {req.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span className="h-4 w-4">📞</span>
                              <span className="text-foreground">{req.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span>Type: <span className="text-foreground font-medium">{req.projectType || 'N/A'}</span></span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>Budget: <span className="text-foreground font-medium">{req.budget || 'N/A'}</span></span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Timeline: <span className="text-foreground font-medium">{req.timeline || 'N/A'}</span></span>
                          </div>
                          {req.ndaRequired && (
                            <Badge variant="destructive" className="mt-1">NDA Required</Badge>
                          )}
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Project Description
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {req.description || req.message || "No description provided."}
                        </p>
                      </div>

                      {req.attachmentBase64 && (
                        <div className="bg-primary/5 p-4 rounded-md border border-primary/20 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{req.attachmentName || "Attached File"}</p>
                              <p className="text-xs text-muted-foreground">Base64 Encoded Attachment</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <a href={req.attachmentBase64} download={req.attachmentName || "attachment"}>
                              Download File
                            </a>
                          </Button>
                        </div>
                      )}
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
