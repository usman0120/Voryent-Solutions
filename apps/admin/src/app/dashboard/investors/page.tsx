"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useInvestors } from "@/lib/react-query/investors.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";

export default function InvestorsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: investors = [], isLoading } = useInvestors();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["investors"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canCreate = role === "Founder" || role === "CEO" || role === "Finance";

  if (role !== "Founder" && role !== "CEO" && role !== "Finance" && role !== "Analyst") {
    return <div className="p-8 text-center text-muted-foreground">You do not have access to the Investors module.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investors</h1>
          <p className="text-muted-foreground">Manage investors, equity distribution, and investment records.</p>
        </div>
        {canCreate && (
          <Link href="/dashboard/investors/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Investor
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading investors...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="name"
          />
          <DataTable columns={columns} data={investors} searchKey="name" />
        </div>
      )}
    </div>
  );
}
