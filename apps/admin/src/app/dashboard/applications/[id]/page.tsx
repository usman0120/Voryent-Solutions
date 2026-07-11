"use client";

import { useApplication, useUpdateApplication } from "@/lib/react-query/applications.hooks";
import { useCreateEmployee } from "@/lib/react-query/employees.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stageColorMap } from "../columns";
import { 
  User, Mail, Phone, MapPin, Calendar, 
  DollarSign, Briefcase, FileText, Linkedin, 
  Github, Globe, ExternalLink, PlusCircle, UserCheck 
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

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

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { user, role } = useAuth();
  const [newNote, setNewNote] = useState("");

  const { data: application, isLoading } = useApplication(resolvedParams.id);
  const updateMutation = useUpdateApplication(user?.uid);
  const createEmployeeMutation = useCreateEmployee(user?.uid);

  const canView = hasPermission(role, "view_applications");
  const canMove = hasPermission(role, "move_candidates");
  const canHire = hasPermission(role, "hire_candidate");

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading candidate details...</div>;
  }

  if (!application) {
    return <div className="flex h-64 items-center justify-center">Application not found.</div>;
  }

  if (!canView) {
    return <div className="flex h-64 items-center justify-center text-muted-foreground">Unauthorized access.</div>;
  }

  const handleStageChange = async (newStage: string) => {
    try {
      await updateMutation.mutateAsync({
        id: resolvedParams.id,
        data: { status: newStage as any }
      });
      toast({ title: `Stage updated to ${newStage}` });
    } catch (err: any) {
      toast({ title: "Failed to update stage", description: err.message, variant: "destructive" });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const currentNotes = application.notes || [];
      const noteObj = {
        id: Math.random().toString(36).substring(2, 9),
        authorName: user?.displayName || user?.email || "HR Manager",
        authorId: user?.uid || "unknown",
        text: newNote,
        createdAt: new Date().toISOString(),
      };

      await updateMutation.mutateAsync({
        id: resolvedParams.id,
        data: { notes: [...currentNotes, noteObj] }
      });

      setNewNote("");
      toast({ title: "Note added successfully." });
    } catch (err: any) {
      toast({ title: "Failed to add note", description: err.message, variant: "destructive" });
    }
  };

  const handleHireCandidate = async () => {
    if (!canHire) return;

    try {
      // 1. Generate unique employee ID (VORY-XXXX)
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const employeeId = `VORY-${randNum}`;

      // 2. Map candidate data to employee record
      const employeeData = {
        employeeId,
        applicationId: resolvedParams.id,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        phone: application.phone || "",
        position: application.jobTitle,
        department: application.city || "Engineering", // Fallback to a department
        employmentType: "Full-time" as const, // default
        joiningDate: new Date().toISOString().split("T")[0]!,
        salary: application.salaryExpectation || "",
        currency: application.currency || "USD",
        status: "Probation" as const,
        address: `${application.city || ""}, ${application.country || ""}`.trim(),
        documents: [
          {
            name: application.resumeName || "Resume.pdf",
            fileData: application.resume,
            uploadedAt: new Date().toISOString(),
          }
        ],
        notes: `Hired via recruitment pipeline for ${application.jobTitle}.`,
      };

      // 3. Create employee doc in Firestore
      const newEmpId = await createEmployeeMutation.mutateAsync(employeeData);

      // 4. Update candidate status to Hired
      await updateMutation.mutateAsync({
        id: resolvedParams.id,
        data: { status: "Hired" }
      });

      toast({ title: "Candidate hired successfully!", description: `Employee record ${employeeId} created.` });
      
      // 5. Redirect to newly created employee profile
      router.push(`/dashboard/employees/${newEmpId}`);
    } catch (err: any) {
      toast({ title: "Hiring process failed", description: err.message, variant: "destructive" });
    }
  };

  const badgeClass = stageColorMap[application.status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {application.firstName} {application.lastName}
            </h1>
            <Badge variant="outline" className={badgeClass}>
              {application.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Candidate for <span className="font-medium text-foreground">{application.jobTitle}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {canMove && (
            <div className="w-56">
              <Select onValueChange={handleStageChange} defaultValue={application.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Change pipeline stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {canHire && application.status !== "Hired" && (
            <Button onClick={handleHireCandidate} disabled={createEmployeeMutation.isPending} className="bg-green-600 hover:bg-green-700 text-white">
              <UserCheck className="h-4 w-4 mr-2" /> Hire Candidate
            </Button>
          )}

          <Link href="/dashboard/applications">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: CANDIDATE INFO & RESUME */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Candidate Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${application.email}`} className="text-primary hover:underline">
                  {application.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{application.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {application.city || ""}, {application.country || ""}
                  {!application.city && !application.country && "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Available: {application.availability}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Expectation: {application.salaryExpectation || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Experience: {application.experienceYears !== undefined ? `${application.experienceYears} Years` : "N/A"}</span>
              </div>

              {/* Links Row */}
              <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 pt-4 border-t">
                {application.linkedin && (
                  <a
                    href={application.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {application.github && (
                  <a
                    href={application.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {application.portfolio && (
                  <a
                    href={application.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" /> Portfolio <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {application.website && (
                  <a
                    href={application.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" /> Website <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  {application.skills || "No skills specified."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Education</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  {application.education || "No education details specified."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {application.coverLetter}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Resume Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Resume PDF / Attachment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {application.resume ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-muted/40 p-3 rounded-md border text-sm">
                    <span className="font-medium truncate max-w-md">{application.resumeName || "Resume.pdf"}</span>
                    <a
                      href={application.resume}
                      download={application.resumeName || "Resume.pdf"}
                      className="text-primary hover:underline flex items-center gap-1 font-semibold"
                    >
                      Download PDF
                    </a>
                  </div>
                  {/* Inline PDF Viewer iframe if format matches PDF */}
                  {application.resume.startsWith("data:application/pdf;base64") && (
                    <iframe
                      src={application.resume}
                      className="w-full h-[600px] border rounded-md"
                      title="Resume PDF Viewer"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">No resume attached.</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: NOTES & TIMELINE */}
        <div className="space-y-6">
          <Card className="flex flex-col h-full max-h-[800px]">
            <CardHeader>
              <CardTitle className="text-lg">Notes & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 space-y-4 overflow-hidden">
              {/* Form to add note */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <Textarea
                  placeholder="Add evaluation note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button type="submit" disabled={updateMutation.isPending} className="w-full">
                  Add Note
                </Button>
              </form>

              {/* Notes list */}
              <div className="flex-1 overflow-y-auto space-y-3 pt-4 border-t max-h-[400px]">
                {application.notes && application.notes.length > 0 ? (
                  application.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-lg bg-muted/30 border text-xs space-y-1">
                      <div className="flex justify-between font-semibold text-foreground">
                        <span>{note.authorName}</span>
                        <span className="text-muted-foreground text-[10px]">
                          {format(new Date(note.createdAt), "MMM d, h:mm a")}
                        </span>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-6 text-sm">No notes added yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
