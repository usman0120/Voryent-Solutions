"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@voryent/ui";
import { Badge } from "@voryent/ui";
import { Progress } from "@/components/ui/progress";
import { Briefcase, UserPlus, FileText, PieChart } from "lucide-react";
import { PermissionGuard } from "@/components/operations/permission-guard";

import { useCompany } from "@/lib/react-query/companies.hooks";

export default function EquityPage() {
  const { data: company, isLoading } = useCompany();

  const stakeholders = company?.leadership || [];
  
  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading cap table...</div>;
  }

  return (
    <PermissionGuard action="view_company" module="Company / Equity">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equity & Cap Table</h1>
            <p className="text-muted-foreground mt-1">Manage founders, investors, and option pools.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Shares Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,000,000</div>
              <p className="text-xs text-muted-foreground mt-1">Fully diluted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Option Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10%</div>
              <Progress value={10} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Valuation (Est)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5.0M</div>
              <p className="text-xs text-muted-foreground mt-1">Post-money</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Bootstrapped</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" /> Cap Table
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm text-left text-muted-foreground">
                <thead className="text-xs uppercase bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium text-foreground">Stakeholder</th>
                    <th className="px-6 py-3 font-medium text-foreground">Role</th>
                    <th className="px-6 py-3 font-medium text-foreground">Class</th>
                    <th className="px-6 py-3 font-medium text-foreground text-right">Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {stakeholders.map((s, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{s.name}</td>
                      <td className="px-6 py-4">{s.role}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{s.role?.includes("Founder") ? "Common" : "Options"}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">{s.ownershipPercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
