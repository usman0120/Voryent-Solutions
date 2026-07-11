import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionsService, PermissionType } from "../services/permissions.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const PERMISSION_KEYS = {
  all: ["permissions"] as const,
  lists: () => [...PERMISSION_KEYS.all, "list"] as const,
  list: (filters: string) => [...PERMISSION_KEYS.lists(), { filters }] as const,
  details: () => [...PERMISSION_KEYS.all, "detail"] as const,
  detail: (id: string) => [...PERMISSION_KEYS.details(), id] as const,
};

export function usePermissions() {
  return useQuery({
    queryKey: PERMISSION_KEYS.lists(),
    queryFn: () => permissionsService.getAll(),
  });
}

export function usePermission(id: string) {
  return useQuery({
    queryKey: PERMISSION_KEYS.detail(id),
    queryFn: () => permissionsService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePermission() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<PermissionType, "id" | "createdAt" | "updatedAt">) => {
      const id = await permissionsService.create(data, user?.uid);
      await activityLogsService.log(
        "Permission Group Created",
        `Created module permission: ${data.module}`,
        "permissions",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.lists() });
    },
  });
}

export function useUpdatePermission() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, moduleName }: { id: string; data: Partial<PermissionType>; moduleName?: string }) => {
      await permissionsService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Permission Group Updated",
        `Updated permissions for: ${moduleName || id}`,
        "permissions",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.detail(variables.id) });
    },
  });
}

export function useDeletePermission() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, moduleName }: { id: string; moduleName?: string }) => {
      await permissionsService.delete(id);
      await activityLogsService.log(
        "Permission Group Deleted",
        `Deleted module permission: ${moduleName || id}`,
        "permissions",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_KEYS.lists() });
    },
  });
}
