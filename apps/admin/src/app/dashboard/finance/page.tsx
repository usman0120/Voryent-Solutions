"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTransactions } from "@/lib/react-query/finance.hooks";
import { DataTable } from "@/components/cms/data-table";
import { getColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import Link from "next/link";
import { DataTableToolbar } from "@/components/cms/data-toolbar";
import { useAuth } from "@/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function FinancePage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: transactions = [], isLoading } = useTransactions();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["finance"] });
  };

  const columns = getColumns(role, handleRefresh);
  const canManage = role === "Founder" || role === "CEO" || role === "Finance";

  if (role !== "Founder" && role !== "CEO" && role !== "Finance" && role !== "Analyst") {
    return <div className="p-8 text-center text-muted-foreground">You do not have access to the Finance module.</div>;
  }

  const { totalIncome, totalExpense, balance, chartData } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const monthlyData: Record<string, { name: string; Income: number; Expense: number }> = {};

    transactions.forEach(t => {
      if (t.status === "Completed") {
        if (t.type === "Income") income += t.amount;
        if (t.type === "Expense") expense += t.amount;

        // Extract month (YYYY-MM)
        const date = t.date ? new Date(t.date) : new Date();
        const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { name: monthKey, Income: 0, Expense: 0 };
        }
        
        if (t.type === "Income") monthlyData[monthKey].Income += t.amount;
        if (t.type === "Expense") monthlyData[monthKey].Expense += t.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      chartData: Object.values(monthlyData).reverse() // Simple reverse for chronological if sorted desc
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">Track internal business income and expenses.</p>
        </div>
        {canManage && (
          <Link href="/dashboard/finance/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalExpense.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? "text-foreground" : "text-red-600"}`}>
              {balance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                  />
                  <Legend />
                  <Bar dataKey="Income" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Bar dataKey="Expense" fill="#dc2626" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center border border-dashed rounded-md text-muted-foreground">
              Not enough data to display chart.
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <DataTableToolbar
            table={{ getState: () => ({ columnFilters: [] }), getColumn: () => null } as any}
            searchKey="description"
          />
          <DataTable columns={columns} data={transactions} searchKey="description" />
        </div>
      )}
    </div>
  );
}
