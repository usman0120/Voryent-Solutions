"use client";

import { InvestorForm } from "../investor-form";
import { useRouter } from "next/navigation";

export default function CreateInvestorPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Investor</h1>
        <p className="text-muted-foreground">Record a new investor or prospect.</p>
      </div>
      <InvestorForm onSuccess={() => router.push("/dashboard/investors")} />
    </div>
  );
}
