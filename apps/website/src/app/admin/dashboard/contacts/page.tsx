"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useContacts } from "@/lib/admin/react-query/contacts.hooks";
import { DataTable } from "@/components/admin/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/admin/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";

export default function ContactsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: contacts = [], isLoading } = useContacts();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canCreate = role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Marketing" || role === "HR";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts (CRM)</h1>
          <p className="text-muted-foreground">Manage customer inquiries and website contact submissions.</p>
        </div>
        {canCreate && (
          <Button asChild>
  <Link href="/admin/dashboard/contacts/create">
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Link>
</Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="subject" // Custom filtering can be added for firstName/lastName
          />
          <DataTable columns={columns} data={contacts} searchKey="subject" />
        </div>
      )}
    </div>
  );
}
