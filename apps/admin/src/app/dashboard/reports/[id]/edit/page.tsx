"use client";

import { useReport } from "@/lib/react-query/reports.hooks";
import { ReportForm } from "../../report-form";
import { useRouter, useParams } from "next/navigation";

export default function EditReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: report, isLoading } = useReport(id);

  if (isLoading) {
    return <div className="p-8">Loading report config...</div>;
  }

  if (!report) {
    return <div className="p-8">Report configuration not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Report Configuration</h1>
        <p className="text-muted-foreground">Update configuration for {report.title}</p>
      </div>
      <ReportForm initialData={report} onSuccess={() => router.push(`/dashboard/reports/${id}`)} />
    </div>
  );
}
