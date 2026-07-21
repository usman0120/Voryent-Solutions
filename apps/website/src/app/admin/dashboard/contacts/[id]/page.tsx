"use client";

import { useContact } from "@/lib/admin/react-query/contacts.hooks";
import { useAuth } from "@/providers/auth-provider";
import { use } from "react";
import Link from "next/link";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { ContactStatusBadge } from "@/components/admin/operations/contact-status-badge";
import { PriorityBadge } from "@/components/admin/operations/priority-badge";
import { 
  ChevronLeft, Pencil, User, Mail, Phone, Building2, Globe
} from "lucide-react";
import { format } from "date-fns";

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ContactDetailPage({ params }: ContactDetailPageProps) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const { data: contact, isLoading } = useContact(resolvedParams.id);
  
  // CRM write access: Founder, CEO, Marketing, HR
  const canManage = role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Marketing" || role === "HR";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading contact...</div>;
  }

  if (!contact) {
    return <div className="flex h-64 items-center justify-center">Contact not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/contacts" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Contacts
        </Link>
        {canManage && (
          <Button asChild size="sm" variant="outline">
  <Link href={`/dashboard/contacts/${contact.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" /> Edit / Assign
            </Link>
</Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <CardContent className="space-y-6 pt-4 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto text-2xl font-bold">
                {contact.firstName?.[0]}{contact.lastName?.[0]}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold">{contact.firstName} {contact.lastName}</h2>
                {contact.company && <p className="text-sm text-muted-foreground mt-1">{contact.company}</p>}
              </div>

              <div className="flex justify-center gap-2">
                <ContactStatusBadge status={contact.status} />
                <PriorityBadge priority={contact.priority} />
              </div>

              <div className="border-t pt-4 space-y-3 text-sm text-left">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                  </div>
                )}
                {contact.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {contact.website}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4 text-sm text-left">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Assigned to:</span>
                  <span className="font-medium">{contact.assignedTo || "Unassigned"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <CardHeader className="p-0 pb-6 mb-6 border-b">
              <CardTitle className="text-lg">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="conversation" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  <TabsTrigger value="conversation">Conversation</TabsTrigger>
                  <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>

                <TabsContent value="conversation" className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{contact.subject}</h3>
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Source: {contact.source} | Submitted: {
                      contact.createdAt ? 
                      format(contact.createdAt.toDate ? contact.createdAt.toDate() : new Date(contact.createdAt), "MMM d, yyyy h:mm a") : 
                      "Unknown"
                    }
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  {contact.notes ? (
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                      <p className="text-sm whitespace-pre-wrap">
                        {contact.notes}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                      No internal notes available for this contact.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Detailed activity history tracking will be available in the Activity Logs dashboard. 
                  </p>
                  {/* The Activity timeline component can be hooked up here querying by ID */}
                </TabsContent>

                <TabsContent value="tags" className="space-y-4">
                  {contact.tags && contact.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                      No tags assigned to this contact.
                    </p>
                  )}
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
