"use client";

import { ContactForm } from "../contact-form";
import { useRouter } from "next/navigation";

export default function CreateContactPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Contact</h1>
        <p className="text-muted-foreground">Manually add a new CRM contact.</p>
      </div>
      <ContactForm onSuccess={() => router.push("/dashboard/contacts")} />
    </div>
  );
}
