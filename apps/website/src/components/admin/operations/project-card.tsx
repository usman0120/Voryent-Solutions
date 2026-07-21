import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@voryent/ui";
import { ProjectType } from "@/lib/admin/services/projects.service";
import { ProjectStatusBadge } from "./project-status-badge";
import { PriorityBadge } from "./priority-badge";
import { Progress } from "@/components/admin/ui/progress";
import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@voryent/ui";

interface ProjectCardProps {
  project: ProjectType;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <ProjectStatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>
        <CardTitle className="text-xl line-clamp-1">{project.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.type}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
          
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {project.targetDate ? format(new Date(project.targetDate), "MMM d, yyyy") : "No deadline"}
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {project.teamMembers.length} member{project.teamMembers.length !== 1 && 's'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/projects/${project.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
