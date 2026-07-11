"use client";

import { useReport, useUpdateReport } from "@/lib/react-query/reports.hooks";
import { useAuth } from "@/providers/auth-provider";
import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReportStatusBadge } from "@/components/operations/report-status-badge";
import { 
  ChevronLeft, Pencil, FileText, Calendar, Play, Download
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ReportDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const { data: report, isLoading } = useReport(resolvedParams.id);
  const updateMutation = useUpdateReport();
  
  const canManage = role === "Founder" || role === "CEO" || role === "Finance" || role === "HR" || role === "Marketing";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading report...</div>;
  }

  if (!report) {
    return <div className="flex h-64 items-center justify-center">Report not found.</div>;
  }

  const handleGenerate = async () => {
    alert("Triggering report generation. A background function would process this.");
    await updateMutation.mutateAsync({
      id: report.id!,
      data: { status: "Generating" }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/reports" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex gap-2">
          {report.status === "Ready" && report.fileUrl && (
            <Button size="sm" variant="default" asChild>
              <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Result
              </a>
            </Button>
          )}
          {canManage && (
            <>
              <Button size="sm" variant="secondary" onClick={handleGenerate} disabled={report.status === "Generating"}>
                <Play className="mr-2 h-4 w-4" /> {report.status === "Generating" ? "Generating..." : "Generate Now"}
              </Button>
              <Link href={`/dashboard/reports/${report.id}/edit`}>
                <Button size="sm" variant="outline">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Config
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold">{report.title}</h2>
                <div className="flex justify-center gap-2 mt-4">
                  <ReportStatusBadge status={report.status} />
                  <Badge variant="secondary">{report.type}</Badge>
                </div>
              </div>
              
              <div className="space-y-3 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-semibold">{report.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Module Data</span>
                  <span className="font-semibold">{report.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Config Created</span>
                  <span className="font-semibold">
                    {report.createdAt ? format(new Date(report.createdAt as any), "MMM d, yyyy") : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Description</h3>
                <p className="text-base">{report.description || "No description provided."}</p>
              </div>

              {report.dateRange && (
                <div className="p-4 bg-muted/20 border rounded-lg">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Date Range Filter
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                      <p className="font-medium">
                        {format(new Date(report.dateRange.startDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">End Date</p>
                      <p className="font-medium">
                        {format(new Date(report.dateRange.endDate), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {report.status === "Generating" && (
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-900/50 flex items-center gap-4">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin shrink-0"></div>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">Report is generating</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">This may take a few minutes depending on data volume. Check back later.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
