"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useProjects, useDeleteProject, useArchiveProject } from "@/lib/admin/react-query/projects.hooks";
import { Button } from "@voryent/ui";
import { Plus, Edit, Trash, FileText, ArrowRight, Eye, Archive } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { TableGridSkeleton } from "@/components/ui/generic-grid-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/lib/admin/services/projects.service";
import { toast } from "sonner";
import Image from "next/image";

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const { data: projects = [], isLoading } = useProjects();
  const deleteProjectMutation = useDeleteProject();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteProjectMutation.mutateAsync({ id, projectName: name });
        toast.success("Project deleted successfully");
      } catch (error: any) {
        toast.error("Failed to delete project");
      }
    }
  };

  const archiveProjectMutation = useArchiveProject();

  const handleArchive = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to archive ${name}?`)) {
      try {
        await archiveProjectMutation.mutateAsync({ id, projectName: name });
        toast.success("Project archived successfully");
      } catch (error: any) {
        toast.error("Failed to archive project");
      }
    }
  };

  const canCreate = role === "admin";

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio</p>
        </div>
        {canCreate && (
          <Button asChild className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all text-white">
            <Link href="/admin/dashboard/projects/create">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Link>
          </Button>
        )}
      </div>

      {isLoading ? (
        <TableGridSkeleton rows={2} />
      ) : projects.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-card rounded-xl border shadow-sm">
          <div className="text-5xl mb-4 opacity-50">📁</div>
          <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first project.</p>
          {canCreate && (
            <Button asChild>
              <Link href="/admin/dashboard/projects/create">Add Project</Link>
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {projects.map((project: ProjectType) => {
              const coverImage = project.coverImage || (project.attachments && project.attachments.length > 0 ? project.attachments[0]?.url : null) || "https://placehold.co/600x400/EEE/31343C";
              return (
                <motion.div key={project.id} variants={scale} layout className="h-full">
                  <div className="group h-full flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
                    <div className="relative h-48 w-full bg-muted border-b">
                      <Image
                        src={coverImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded text-xs shadow-md">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">{project.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider rounded-full">
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2 mt-auto">
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={`/admin/dashboard/projects/${project.id}`}>
                              <Eye className="w-4 h-4 mr-1" /> View Details
                            </Link>
                          </Button>
                          {canCreate && (
                            <Button asChild variant="outline" size="sm" className="flex-1">
                              <Link href={`/admin/dashboard/projects/${project.id}/edit`}>
                                <Edit className="w-4 h-4 mr-1" /> Edit
                              </Link>
                            </Button>
                          )}
                        </div>
                        {role === "admin" ? (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 border-orange-500/50 text-orange-600 hover:bg-orange-500/10 hover:text-orange-600" onClick={() => handleArchive(project.id!, project.name)}>
                              <Archive className="w-4 h-4 mr-1" /> Archive
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(project.id!, project.name)}>
                              <Trash className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </div>
                        ) : null}
                        <Button asChild variant="secondary" size="sm" className="w-full group/btn">
                          <Link href={`/work/${project.slug}`} target="_blank">
                            <FileText className="w-4 h-4 mr-2" />
                            View Public Page
                            <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
