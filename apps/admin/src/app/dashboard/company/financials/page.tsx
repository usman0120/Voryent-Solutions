"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import { PermissionGuard } from "@/components/operations/permission-guard";
import { DollarSign, TrendingUp, TrendingDown, Activity, CreditCard } from "lucide-react";

export default function FinancialsPage() {
  return (
    <PermissionGuard action="view_company" module="Company / Financials">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
            <p className="text-muted-foreground mt-1">Track revenue, burn rate, and runway.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Burn</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,000</div>
              <p className="text-xs text-rose-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +4% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Runway</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 Months</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on current cash balance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$216,000</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all accounts
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Cash Flow Summary</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-dashed border-2 rounded-md bg-muted/10 mx-6 mb-6">
            <p className="text-muted-foreground text-sm">Financial charts integration pending (e.g., Recharts / Chart.js)</p>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
