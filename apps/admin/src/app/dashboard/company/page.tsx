"use client";

import { useCompany } from "@/lib/react-query/companies.hooks";
import { CompanyForm } from "./company-form";
import { CompanyProfileCard } from "@/components/operations/company-profile-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function CompanyPage() {
  const { data: company, isLoading } = useCompany();
  const [isEditing, setIsEditing] = useState(false);
  const { role } = useAuth();
  
  // Only Founder and CEO should have write access.
  const canManage = role === "Founder" || role === "CEO";

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center border rounded-md">Loading company profile...</div>;
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Company Profile</h1>
          <p className="text-muted-foreground">Manage internal company information and settings.</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <CompanyForm initialData={company} onSuccess={() => setIsEditing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <p className="text-muted-foreground">Internal company information, branding, and structure.</p>
        </div>
        {canManage && (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CompanyProfileCard company={company || null} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {/* We can display read-only versions of the data here */}
          {!company && (
            <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-lg p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No Profile Configured</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set up the internal company profile to use across the platform.
              </p>
              {canManage && (
                <Button onClick={() => setIsEditing(true)}>
                  Configure Profile
                </Button>
              )}
            </div>
          )}
          
          {company && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registration No.</h3>
                  <p className="font-medium">{company.registrationNumber || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tax ID / VAT</h3>
                  <p className="font-medium">{company.taxNumber || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Industry</h3>
                  <p className="font-medium">{company.industry || "N/A"}</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Founded</h3>
                  <p className="font-medium">{company.foundedDate || "N/A"}</p>
                </div>
              </div>

              {company.mission || company.vision ? (
                <div className="p-6 border rounded-lg bg-card space-y-4">
                  {company.mission && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Mission</h3>
                      <p className="text-sm text-muted-foreground">{company.mission}</p>
                    </div>
                  )}
                  {company.vision && (
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold mb-2">Vision</h3>
                      <p className="text-sm text-muted-foreground">{company.vision}</p>
                    </div>
                  )}
                </div>
              ) : null}

              {company.leadership && company.leadership.length > 0 && (
                <div className="p-6 border rounded-lg bg-card">
                  <h3 className="text-sm font-semibold mb-4">Leadership & Ownership</h3>
                  <div className="space-y-4">
                    {company.leadership.map((leader, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{leader.name}</p>
                          <p className="text-xs text-muted-foreground">{leader.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{leader.ownershipPercentage}%</p>
                          <p className="text-xs text-muted-foreground">Ownership</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
