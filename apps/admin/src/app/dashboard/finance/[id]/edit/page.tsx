"use client";

import { useTransaction } from "@/lib/react-query/finance.hooks";
import { TransactionForm } from "../../transaction-form";
import { useRouter, useParams } from "next/navigation";

export default function EditTransactionPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any).id as string;
  const { data: transaction, isLoading } = useTransaction(id);

  if (isLoading) {
    return <div className="p-8">Loading transaction...</div>;
  }

  if (!transaction) {
    return <div className="p-8">Transaction not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Transaction</h1>
        <p className="text-muted-foreground">Update details for this record.</p>
      </div>
      <TransactionForm initialData={transaction} onSuccess={() => router.push(`/dashboard/finance/${id}`)} />
    </div>
  );
}
