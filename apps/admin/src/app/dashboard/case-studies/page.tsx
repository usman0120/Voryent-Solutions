"use client";

import { useCaseStudies } from "@/lib/react-query/case-studies.hooks";
import { columns } from "./columns";
import { DataTable } from "@/components/cms/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const { data: caseStudies, isLoading } = useCaseStudies();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Case Studies</h2>
          <p className="text-muted-foreground">
            Manage case studies shown on the public website.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/case-studies/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Case Study
            </Link>
          </Button>
        </div>
      </div>
      <DataTable 
        columns={columns} 
        data={caseStudies || []} 
        searchKey="title"
      />
    </div>
  );
}
