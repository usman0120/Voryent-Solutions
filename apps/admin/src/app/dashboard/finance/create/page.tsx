"use client";

import { TransactionForm } from "../transaction-form";
import { useRouter } from "next/navigation";

export default function CreateTransactionPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
        <p className="text-muted-foreground">Record a new business expense or income.</p>
      </div>
      <TransactionForm onSuccess={() => router.push("/dashboard/finance")} />
    </div>
  );
}
