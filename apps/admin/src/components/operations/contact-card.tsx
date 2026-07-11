import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ContactType } from "@/lib/services/contacts.service";
import { ContactStatusBadge } from "./contact-status-badge";
import { PriorityBadge } from "./priority-badge";
import { Mail, Phone, Building2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ContactCardProps {
  contact: ContactType;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <ContactStatusBadge status={contact.status} />
          <PriorityBadge priority={contact.priority} />
        </div>
        <CardTitle className="text-xl line-clamp-1">
          {contact.firstName} {contact.lastName}
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium line-clamp-1">{contact.subject}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3 text-sm text-muted-foreground">
          {contact.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="line-clamp-1">{contact.company}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="line-clamp-1">{contact.email}</span>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="line-clamp-1">{contact.phone}</span>
            </div>
          )}
          {contact.assignedTo && (
            <div className="flex items-center gap-2 pt-2 border-t mt-2">
              <User className="w-4 h-4" />
              <span className="line-clamp-1 text-xs">Assigned: {contact.assignedTo}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/contacts/${contact.id}`}>
            View Contact
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
