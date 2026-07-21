"use client";

import { useContact } from "@/lib/admin/react-query/contacts.hooks";
import { ContactForm } from "../../contact-form";
import { useRouter, useParams } from "next/navigation";

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: contact, isLoading } = useContact(id);

  if (isLoading) {
    return <div className="p-8">Loading contact...</div>;
  }

  if (!contact) {
    return <div className="p-8">Contact not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Contact</h1>
        <p className="text-muted-foreground">Update CRM contact: {contact.firstName} {contact.lastName}</p>
      </div>
      <ContactForm initialData={contact} onSuccess={() => router.push(`/dashboard/contacts/${id}`)} />
    </div>
  );
}
