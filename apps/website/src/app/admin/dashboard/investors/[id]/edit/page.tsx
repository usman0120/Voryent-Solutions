"use client";

import { useInvestor } from "@/lib/admin/react-query/investors.hooks";
import { InvestorForm } from "../../investor-form";
import { useRouter, useParams } from "next/navigation";

export default function EditInvestorPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: investor, isLoading } = useInvestor(id);

  if (isLoading) {
    return <div className="p-8">Loading investor...</div>;
  }

  if (!investor) {
    return <div className="p-8">Investor not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Investor</h1>
        <p className="text-muted-foreground">Update details for {investor.name}</p>
      </div>
      <InvestorForm initialData={investor} onSuccess={() => router.push(`/dashboard/investors/${id}`)} />
    </div>
  );
}
