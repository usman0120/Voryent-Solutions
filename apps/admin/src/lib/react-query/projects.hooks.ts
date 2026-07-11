import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService, ProjectType } from "../services/projects.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const PROJECT_KEYS = {
  all: ["projects"] as const,
  lists: () => [...PROJECT_KEYS.all, "list"] as const,
  list: (filters: string) => [...PROJECT_KEYS.lists(), { filters }] as const,
  details: () => [...PROJECT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...PROJECT_KEYS.details(), id] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: PROJECT_KEYS.lists(),
    queryFn: () => projectsService.getAll(),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => projectsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<ProjectType, "id" | "createdAt" | "updatedAt">) => {
      const id = await projectsService.create(data, user?.uid);
      await activityLogsService.log(
        "Project Created",
        `Created project: ${data.name}`,
        "projects",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, projectName }: { id: string; data: Partial<ProjectType>; projectName?: string }) => {
      await projectsService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Project Updated",
        `Updated project: ${projectName || id}`,
        "projects",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(variables.id) });
    },
  });
}

export function useArchiveProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, projectName }: { id: string; projectName?: string }) => {
      await projectsService.archive(id, user?.uid);
      await activityLogsService.log(
        "Project Archived",
        `Archived project: ${projectName || id}`,
        "projects",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, projectName }: { id: string; projectName?: string }) => {
      await projectsService.delete(id);
      await activityLogsService.log(
        "Project Deleted",
        `Deleted project: ${projectName || id}`,
        "projects",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
    },
  });
}
