"use client";

import { useApplications, useUpdateApplication } from "@/lib/react-query/applications.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";
import { stageColorMap } from "../applications/columns";
import { Badge } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowRight, Eye, User, Briefcase, Calendar } from "lucide-react";
import { format } from "date-fns";

const stages = [
  "Applied",
  "Screening",
  "Interview Scheduled",
  "Technical Review",
  "Final Interview",
  "Offer Sent",
  "Hired",
  "Rejected",
  "Withdrawn"
];

export default function PipelinePage() {
  const { toast } = useToast();
  const { role, user } = useAuth();
  const { data: applications = [], isLoading } = useApplications();
  const updateMutation = useUpdateApplication(user?.uid);

  const canView = hasPermission(role, "view_applications");
  const canMove = hasPermission(role, "move_candidates");

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading recruitment pipeline...</div>;
  }

  if (!canView) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed rounded-lg bg-card text-muted-foreground">
        You do not have permission to view the recruitment pipeline.
      </div>
    );
  }

  const handleStageChange = async (id: string, newStage: string) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: { status: newStage as any }
      });
      toast({ title: "Candidate moved successfully." });
    } catch (err: any) {
      toast({ title: "Failed to move candidate", description: err.message, variant: "destructive" });
    }
  };

  // Group candidates by stage
  const grouped = stages.reduce((acc, stage) => {
    acc[stage] = applications.filter((app) => app.status === stage);
    return acc;
  }, {} as Record<string, typeof applications>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recruitment Pipeline</h1>
        <p className="text-muted-foreground">Track and manage candidates through the hiring process.</p>
      </div>

      {/* Horizontal scrollable columns */}
      <div className="flex gap-4 overflow-x-auto pb-4 items-start min-h-[600px]">
        {stages.map((stage) => {
          const list = grouped[stage] || [];
          const headerBadgeClass = stageColorMap[stage] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
          
          return (
            <div key={stage} className="w-80 flex-shrink-0 bg-muted/30 border rounded-lg p-4 flex flex-col space-y-4 max-h-[700px] overflow-y-auto">
              {/* Column Header */}
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-semibold text-sm">{stage}</span>
                <Badge variant="outline" className={`${headerBadgeClass} py-0.5 px-2 text-[10px]`}>
                  {list.length}
                </Badge>
              </div>

              {/* Candidates list */}
              <div className="space-y-3">
                {list.length > 0 ? (
                  list.map((candidate) => {
                    const date = candidate.appliedAt as any;
                    const dateStr = date
                      ? format(date.toDate ? date.toDate() : new Date(date), "MMM d, yyyy")
                      : "N/A";

                    return (
                      <Card key={candidate.id} className="border bg-background p-4 shadow-sm hover:shadow-md transition-shadow relative">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm text-foreground">
                              {candidate.firstName} {candidate.lastName}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                              <Briefcase className="h-3 w-3" />
                              <span className="truncate">{candidate.jobTitle}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                              <Calendar className="h-3 w-3" />
                              <span>Applied: {dateStr}</span>
                            </div>
                          </div>

                          {/* Quick Actions inside Card */}
                          <div className="flex items-center justify-between pt-2 border-t gap-2">
                            <Link href={`/dashboard/applications/${candidate.id}`} className="flex-1">
                              <Button variant="ghost" size="sm" className="w-full text-xs font-semibold h-7">
                                <Eye className="h-3.5 w-3.5 mr-1" /> View Profile
                              </Button>
                            </Link>

                            {canMove && (
                              <Select
                                defaultValue={candidate.status}
                                onValueChange={(val) => handleStageChange(candidate.id!, val)}
                              >
                                <SelectTrigger className="w-24 h-7 text-[10px] py-0 px-2">
                                  <SelectValue placeholder="Move" />
                                </SelectTrigger>
                                <SelectContent>
                                  {stages.map((stg) => (
                                    <SelectItem key={stg} value={stg} className="text-xs">
                                      {stg}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-xs text-muted-foreground border border-dashed rounded-md bg-muted/10">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
