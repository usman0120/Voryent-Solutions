import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyType } from "@/lib/services/companies.service";
import { Building2, MapPin, Globe, Mail, Phone } from "lucide-react";

interface CompanyProfileCardProps {
  company: CompanyType | null;
}

export function CompanyProfileCard({ company }: CompanyProfileCardProps) {
  if (!company) {
    return (
      <Card className="h-full flex items-center justify-center text-muted-foreground p-6">
        No company profile configured yet.
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {company.logo ? (
              <img src={company.logo} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <Building2 className="w-8 h-8" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">{company.companyName}</CardTitle>
            <p className="text-sm text-muted-foreground">{company.legalName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-muted-foreground">
          {company.description && (
            <p className="line-clamp-3 leading-relaxed mb-4">{company.description}</p>
          )}
          
          {company.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 shrink-0" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                {company.website}
              </a>
            </div>
          )}
          
          {company.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <a href={`mailto:${company.email}`} className="hover:underline truncate">
                {company.email}
              </a>
            </div>
          )}
          
          {company.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <a href={`tel:${company.phone}`} className="hover:underline truncate">
                {company.phone}
              </a>
            </div>
          )}
          
          {(company.address || company.city || company.country) && (
            <div className="flex items-start gap-2 pt-2 border-t mt-4">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {[company.address, company.city, company.postalCode, company.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
