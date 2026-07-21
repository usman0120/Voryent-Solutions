"use client";

import { EmptyState } from "@/components/admin/ui/empty-state";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { useTransactions } from "@/lib/admin/react-query/finance.hooks";
import { Skeleton } from "@voryent/ui";

export function RevenueSummary() {
  const { data: transactions = [], isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow col-span-4 h-[400px]">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const completedTransactions = transactions.filter((t) => t.status === "Completed");
  const totalIncome = completedTransactions.filter(t => t.type === "Income").reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const totalExpense = completedTransactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const netRevenue = totalIncome - totalExpense;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Revenue Summary</h3>
        <p className="text-sm text-muted-foreground">All-time revenue breakdown.</p>
      </div>
      <div className="p-6 pt-0">
        {completedTransactions.length > 0 ? (
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid grid-cols-3 gap-4">
               <div className="space-y-2">
                 <p className="text-sm text-muted-foreground">Total Income</p>
                 <p className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
                   <TrendingUp className="h-5 w-5" />
                   {formatter.format(totalIncome)}
                 </p>
               </div>
               <div className="space-y-2">
                 <p className="text-sm text-muted-foreground">Total Expenses</p>
                 <p className="text-2xl font-bold text-destructive flex items-center gap-2">
                   <TrendingDown className="h-5 w-5" />
                   {formatter.format(totalExpense)}
                 </p>
               </div>
               <div className="space-y-2">
                 <p className="text-sm text-muted-foreground">Net Revenue</p>
                 <p className={`text-2xl font-bold ${netRevenue >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                   {formatter.format(netRevenue)}
                 </p>
               </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Recent Transactions</h4>
              <div className="space-y-3">
                {completedTransactions.slice(0, 5).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                    <div className={`font-semibold ${tx.type === "Income" ? "text-emerald-500" : "text-destructive"}`}>
                      {tx.type === "Income" ? "+" : "-"}{formatter.format(Number(tx.amount))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No data available"
            description="Revenue data will appear here once transactions start."
            icon={<BarChart3 className="h-10 w-10 text-muted-foreground" />}
            className="h-[300px] border-none"
          />
        )}
      </div>
    </div>
  );
}
