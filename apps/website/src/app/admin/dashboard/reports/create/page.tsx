"use client";

import { ReportForm } from "../report-form";
import { useRouter } from "next/navigation";

export default function CreateReportPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configure New Report</h1>
        <p className="text-muted-foreground">Setup a new data export configuration.</p>
      </div>
      <ReportForm onSuccess={() => router.push("/dashboard/reports")} />
    </div>
  );
}
