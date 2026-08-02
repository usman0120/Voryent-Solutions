"use client";

import { useState } from "react";
import { useCaseStudies, useCaseStudyLeads } from "@/lib/admin/react-query/case-studies.hooks";
import { type CaseStudy } from "@/lib/admin/services/case-studies.service";
import { columns } from "./columns";
import { leadsColumns } from "./leads-columns";
import { DataTable } from "@/components/admin/cms/data-table";
import { Button } from "@voryent/ui";
import { Plus } from "lucide-react";
import { CaseStudyDialog } from "./case-study-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";

export default function CaseStudiesPage() {
  const { data: caseStudies, isLoading: caseStudiesLoading } = useCaseStudies();
  const { data: leads, isLoading: leadsLoading } = useCaseStudyLeads();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | undefined>(undefined);

  const handleEdit = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedCaseStudy(undefined);
    setDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Case Studies</h2>
          <p className="text-muted-foreground">
            Manage case studies and view downloaded leads.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="case-studies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="leads">Downloads & Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="case-studies" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Case Study
            </Button>
          </div>
          <DataTable 
            columns={columns} 
            data={caseStudies || []} 
            searchKey="title"
            meta={{ onEdit: handleEdit }}
          />
        </TabsContent>
        
        <TabsContent value="leads">
          <DataTable 
            columns={leadsColumns} 
            data={leads || []} 
            searchKey="email"
          />
        </TabsContent>
      </Tabs>

      {dialogOpen && (
        <CaseStudyDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
          initialData={selectedCaseStudy} 
        />
      )}
    </div>
  );
}
