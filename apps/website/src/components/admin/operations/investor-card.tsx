import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@voryent/ui";
import { InvestorType } from "@/lib/admin/services/investors.service";
import { InvestorStatusBadge } from "./investor-status-badge";
import { Briefcase, Building, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@voryent/ui";
import { Badge } from "@voryent/ui";

interface InvestorCardProps {
  investor: InvestorType;
}

export function InvestorCard({ investor }: InvestorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <InvestorStatusBadge status={investor.status} />
          <Badge variant="outline">{investor.type}</Badge>
        </div>
        <CardTitle className="text-xl line-clamp-1">{investor.name}</CardTitle>
        <p className="text-sm text-muted-foreground font-medium line-clamp-1">
          {investor.organization || "Individual Investor"}
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between font-semibold text-foreground bg-muted/20 p-2 rounded-md border">
            <span>Investment</span>
            <span>
              {investor.investmentAmount.toLocaleString(undefined, { style: 'currency', currency: investor.currency })}
            </span>
          </div>
          
          <div className="flex justify-between text-xs pt-1">
            <span>Equity Share</span>
            <span className="font-medium text-foreground">{investor.equityPercentage}%</span>
          </div>

          <div className="pt-2 border-t mt-2 space-y-2">
            {investor.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="line-clamp-1 truncate">{investor.email}</span>
              </div>
            )}
            {investor.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="line-clamp-1 truncate">{investor.phone}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/investors/${investor.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
