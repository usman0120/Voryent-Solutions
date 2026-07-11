"use client";

import { useTransaction } from "@/lib/react-query/finance.hooks";
import { useAuth } from "@/providers/auth-provider";
import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionStatusBadge } from "@/components/operations/transaction-status-badge";
import { 
  ChevronLeft, Pencil, FileText, Calendar, Hash, DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TransactionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const { data: transaction, isLoading } = useTransaction(resolvedParams.id);
  
  const canManage = role === "Founder" || role === "CEO" || role === "Finance";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading transaction...</div>;
  }

  if (!transaction) {
    return <div className="flex h-64 items-center justify-center">Transaction not found.</div>;
  }

  const isIncome = transaction.type === "Income";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/finance" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Finance
        </Link>
        {canManage && (
          <Link href={`/dashboard/finance/${transaction.id}/edit`}>
            <Button size="sm" variant="outline">
              <Pencil className="mr-2 h-4 w-4" /> Edit Transaction
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-4 ${isIncome ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  <DollarSign className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">
                  {transaction.amount.toLocaleString(undefined, { style: 'currency', currency: transaction.currency })}
                </h2>
                <p className="text-sm text-muted-foreground">{transaction.type}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <TransactionStatusBadge status={transaction.status} />
                  <Badge variant="secondary">{transaction.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Description</h3>
                  <p className="text-lg font-medium">{transaction.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/20 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                    <p className="font-semibold">
                      {transaction.date ? format(new Date(transaction.date), "MMM d, yyyy") : "N/A"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/20 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Reference</p>
                    </div>
                    <p className="font-semibold">{transaction.reference || "None"}</p>
                  </div>
                  
                  <div className="p-4 bg-muted/20 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Receipt</p>
                    </div>
                    {transaction.receiptUrl ? (
                      <a href={transaction.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                        View Receipt
                      </a>
                    ) : (
                      <p className="text-muted-foreground font-semibold">No Receipt</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction.notes ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-sm whitespace-pre-wrap">
                    {transaction.notes}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-md">
                  No internal notes recorded.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
