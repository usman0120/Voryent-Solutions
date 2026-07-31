"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApplication, useUpdateApplication } from "@/lib/admin/react-query/applications.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/admin/utils/permissions";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Badge } from "@voryent/ui";
import { Button } from "@voryent/ui";
import { ArrowLeft, Briefcase, Mail, Phone, Calendar, User, FileText, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@voryent/ui";

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { role, user } = useAuth();
  
  const { data: application, isLoading } = useApplication(id);
  const { mutate: updateApplication, isPending: isUpdating } = useUpdateApplication(user?.uid);

  useEffect(() => {
    if (!isLoading && !application) {
      router.push("/admin/dashboard/applications");
    }
  }, [application, isLoading, router]);

  if (!hasPermission(role, "view_applications")) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-8">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to view applications.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !application) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6 flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">Loading application details...</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    updateApplication({
      id,
      data: { status: newStatus as any },
    });
  };

  const renderArray = (items: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="space-y-2 mt-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircle2 className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  const stageColorMap: Record<string, string> = {
    Applied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Screening: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Interview Scheduled": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    "Technical Review": "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "Final Interview": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    "Offer Sent": "bg-teal-500/10 text-teal-500 border-teal-500/20",
    Hired: "bg-green-500/10 text-green-500 border-green-500/20",
    Rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    Withdrawn: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/applications">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Application Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-1">
                    {application.firstName} {application.lastName}
                  </CardTitle>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Applied for <strong>{application.jobTitle}</strong>
                  </p>
                </div>
                <Badge variant="outline" className={stageColorMap[application.status] || ""}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2">
                {application.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{application.email}</span>
                  </div>
                )}
                {application.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{application.phone}</span>
                  </div>
                )}
                {application.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{application.address}</span>
                  </div>
                )}
                {application.city && application.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{application.city}, {application.country}</span>
                  </div>
                )}
                {application.appliedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied: {format(application.appliedAt.toDate ? application.appliedAt.toDate() : new Date(application.appliedAt), "PPP")}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          {application.education && Array.isArray(application.education) && application.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.education.map((edu, idx) => (
                  <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-foreground">{edu.school}</h4>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.startDate || "N/A"} - {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Legacy Education String fallback */}
          {application.education && typeof application.education === "string" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{application.education}</p>
              </CardContent>
            </Card>
          )}

          {/* Experience */}
          {application.experience && Array.isArray(application.experience) && application.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.experience.map((exp, idx) => (
                  <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-sm font-medium">
                      {exp.company} {exp.industry ? `(${exp.industry})` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      {exp.startDate || "N/A"} - {exp.current ? "Present" : (exp.endDate || "N/A")}
                    </p>
                    {exp.summary && <p className="text-sm text-muted-foreground">{exp.summary}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{application.coverLetter}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Status & Resume */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={application.status} onValueChange={handleStatusChange} disabled={isUpdating}>
                <SelectTrigger>
                  <SelectValue placeholder="Change pipeline stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Screening">Screening</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="Technical Review">Technical Review</SelectItem>
                  <SelectItem value="Final Interview">Final Interview</SelectItem>
                  <SelectItem value="Offer Sent">Offer Sent</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resume / CV</CardTitle>
            </CardHeader>
            <CardContent>
              {application.resume ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
                    <FileText className="h-8 w-8 text-primary shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate" title={application.resumeName || "Resume Document"}>
                        {application.resumeName || "resume-document"}
                      </p>
                      <p className="text-xs text-muted-foreground">Attached Document</p>
                    </div>
                  </div>
                  
                  {/* For PDFs, we can provide an embed or just a download link. Base64 can be opened in new tab for PDF/Images */}
                  {application.resume.startsWith("data:application/pdf") ? (
                    <div className="flex gap-2">
                      <Button asChild className="w-full" variant="outline">
                        <a href={application.resume} download={application.resumeName || "Resume.pdf"}>Download</a>
                      </Button>
                      <Button asChild className="w-full">
                        <a href={application.resume} target="_blank" rel="noreferrer">View</a>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <a href={application.resume} download={application.resumeName || "Resume"}>
                        Download File
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No resume attached.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="font-medium text-right">{application.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium text-right">
                  {application.experienceYears ? `${application.experienceYears} Years` : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salary Exp:</span>
                <span className="font-medium text-right">{application.salaryExpectation || "N/A"}</span>
              </div>
              
              {(application.linkedin || application.github || application.portfolio || application.website) && (
                <div className="pt-4 mt-2 border-t space-y-2">
                  <h4 className="font-semibold mb-2">Links</h4>
                  {application.linkedin && (
                    <a href={application.linkedin} target="_blank" rel="noreferrer" className="block text-primary hover:underline truncate">
                      LinkedIn
                    </a>
                  )}
                  {application.github && (
                    <a href={application.github} target="_blank" rel="noreferrer" className="block text-primary hover:underline truncate">
                      GitHub
                    </a>
                  )}
                  {application.portfolio && (
                    <a href={application.portfolio} target="_blank" rel="noreferrer" className="block text-primary hover:underline truncate">
                      Portfolio
                    </a>
                  )}
                  {application.website && (
                    <a href={application.website} target="_blank" rel="noreferrer" className="block text-primary hover:underline truncate">
                      Website
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
