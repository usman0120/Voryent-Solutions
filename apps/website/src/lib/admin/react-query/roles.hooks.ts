import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesService, RoleType } from "../services/roles.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const ROLE_KEYS = {
  all: ["roles"] as const,
  lists: () => [...ROLE_KEYS.all, "list"] as const,
  list: (filters: string) => [...ROLE_KEYS.lists(), { filters }] as const,
  details: () => [...ROLE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...ROLE_KEYS.details(), id] as const,
};

export function useRoles() {
  return useQuery({
    queryKey: ROLE_KEYS.lists(),
    queryFn: () => rolesService.getAll(),
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ROLE_KEYS.detail(id),
    queryFn: () => rolesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<RoleType, "id" | "createdAt" | "updatedAt">) => {
      const id = await rolesService.create(data, user?.uid);
      await activityLogsService.log(
        "Role Created",
        `Created custom role: ${data.name}`,
        "roles",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, name }: { id: string; data: Partial<RoleType>; name?: string }) => {
      await rolesService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Role Updated",
        `Updated permissions for role: ${name || id}`,
        "roles",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name?: string }) => {
      await rolesService.delete(id);
      await activityLogsService.log(
        "Role Deleted",
        `Deleted custom role: ${name || id}`,
        "roles",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
    },
  });
}
