"use client";

import { useInvestor } from "@/lib/admin/react-query/investors.hooks";
import { useAuth } from "@/providers/auth-provider";
import { use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { InvestorStatusBadge } from "@/components/admin/operations/investor-status-badge";
import { 
  ChevronLeft, Pencil, Mail, Phone, Building, Briefcase, FileText, Clock
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@voryent/ui";

interface InvestorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function InvestorDetailPage({ params }: InvestorDetailPageProps) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const { data: investor, isLoading } = useInvestor(resolvedParams.id);
  
  const canManage = role === "Founder" || role === "admin" || role === "Super Admin" || role === "CEO" || role === "Finance";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading investor...</div>;
  }

  if (!investor) {
    return <div className="flex h-64 items-center justify-center">Investor not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/investors" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Investors
        </Link>
        {canManage && (
          <Button asChild size="sm" variant="outline">
  <Link href={`/dashboard/investors/${investor.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" /> Edit Investor
            </Link>
</Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto text-xl font-bold mb-4">
                  {investor.name[0]}
                </div>
                <h2 className="text-xl font-bold">{investor.name}</h2>
                <p className="text-sm text-muted-foreground">{investor.organization || "Individual Investor"}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <InvestorStatusBadge status={investor.status} />
                  <Badge variant="outline">{investor.type}</Badge>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                {investor.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${investor.email}`} className="hover:underline">{investor.email}</a>
                  </div>
                )}
                {investor.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${investor.phone}`} className="hover:underline">{investor.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Added: </span>
                  <span>{investor.createdAt ? format(new Date(investor.createdAt as any), "MMM d, yyyy") : "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/20 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="text-xl font-bold">
                    {investor.investmentAmount.toLocaleString(undefined, { style: 'currency', currency: investor.currency })}
                  </p>
                </div>
                <div className="p-4 bg-muted/20 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Equity</p>
                  <p className="text-xl font-bold">{investor.equityPercentage}%</p>
                </div>
                <div className="p-4 bg-muted/20 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="text-lg font-semibold">
                    {investor.investmentDate ? format(new Date(investor.investmentDate), "MMM d, yyyy") : "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-muted/20 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <p className="text-lg font-semibold">{investor.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Notes & Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              {investor.notes ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-sm whitespace-pre-wrap">
                    {investor.notes}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-md">
                  No notes or terms recorded.
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {investor.documents && investor.documents.length > 0 ? (
                <div className="space-y-2">
                  {investor.documents.map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{doc.name}</span>
                        <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                      </div>
                      <Button size="sm" variant="ghost" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-md">
                  No documents uploaded.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
