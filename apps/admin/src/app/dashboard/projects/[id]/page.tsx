"use client";

import { useProject } from "@/lib/react-query/projects.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";
import { use } from "react";
import Link from "next/link";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/operations/project-status-badge";
import { PriorityBadge } from "@/components/operations/priority-badge";
import { 
  ChevronLeft, Pencil, Calendar, Clock, FolderGit2, Link as LinkIcon, FileText
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = use(params);
  const { role } = useAuth();
  
  const { data: project, isLoading } = useProject(resolvedParams.id);
  const canManage = role === "Founder" || role === "CEO" || role === "Developer"; 

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading project...</div>;
  }

  if (!project) {
    return <div className="flex h-64 items-center justify-center">Project not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/projects" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Back to Projects
        </Link>
        {canManage && (
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Button size="sm" variant="outline">
              <Pencil className="mr-2 h-4 w-4" /> Edit Project
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <CardContent className="space-y-6 pt-4">
              <div>
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <ProjectStatusBadge status={project.status} />
                <PriorityBadge priority={project.priority} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="border-t pt-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Client:</span>
                  <span className="font-medium text-right">{project.client || "Internal"}</span>
                </div>
                {project.budget !== null && project.budget !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">
                      {project.budget.toLocaleString(undefined, { style: 'currency', currency: project.currency })}
                    </span>
                  </div>
                )}
                {project.projectManager && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="font-medium">{project.projectManager}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <CardHeader className="p-0 pb-6 mb-6 border-b">
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="repository">Links & Repo</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Description</h3>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-sm mb-3 text-muted-foreground">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-sm mb-3 text-muted-foreground">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Start Date</span>
                      </div>
                      <span className="font-medium text-lg">
                        {project.startDate ? format(new Date(project.startDate), "MMM d, yyyy") : "Not set"}
                      </span>
                    </Card>
                    <Card className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Target Date</span>
                      </div>
                      <span className="font-medium text-lg">
                        {project.targetDate ? format(new Date(project.targetDate), "MMM d, yyyy") : "Not set"}
                      </span>
                    </Card>
                    <Card className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Completed Date</span>
                      </div>
                      <span className="font-medium text-lg">
                        {project.completedDate ? format(new Date(project.completedDate), "MMM d, yyyy") : "Not set"}
                      </span>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="repository" className="space-y-6">
                  {project.repository || project.website ? (
                    <div className="space-y-4">
                      {project.repository && (
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <FolderGit2 className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Repository</h4>
                            <a href={project.repository} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                              {project.repository}
                            </a>
                          </div>
                        </div>
                      )}
                      {project.website && (
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <LinkIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Live Website</h4>
                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                              {project.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                      No repository or website links provided.
                    </p>
                  )}
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-sm mb-4 text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Attachments
                    </h3>
                    {project.attachments && project.attachments.length > 0 ? (
                      <div className="space-y-2">
                        {project.attachments.map((doc: any, i: number) => (
                          <div key={i} className="flex justify-between items-center border p-3 rounded-md bg-muted/20 text-sm">
                            <span className="font-semibold truncate max-w-sm">{doc.name}</span>
                            <a
                              href={doc.url}
                              download={doc.name}
                              className="text-primary hover:underline font-medium text-xs"
                            >
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No attachments.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  {project.teamMembers && project.teamMembers.length > 0 ? (
                    <ul className="space-y-2">
                      {project.teamMembers.map((member: string) => (
                        <li key={member} className="p-3 border rounded-md text-sm font-medium">
                          {member}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                      No team members assigned yet.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  {project.notes ? (
                    <p className="text-sm whitespace-pre-wrap p-4 bg-muted/30 rounded-lg">
                      {project.notes}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-lg">
                      No notes available for this project.
                    </p>
                  )}
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
