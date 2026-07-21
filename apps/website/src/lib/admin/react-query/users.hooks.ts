import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService, UserType } from "../services/users.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const USER_KEYS = {
  all: ["users"] as const,
  lists: () => [...USER_KEYS.all, "list"] as const,
  list: (filters: string) => [...USER_KEYS.lists(), { filters }] as const,
  details: () => [...USER_KEYS.all, "detail"] as const,
  detail: (id: string) => [...USER_KEYS.details(), id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.lists(),
    queryFn: () => usersService.getAll(),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<UserType, "id" | "createdAt" | "updatedAt">) => {
      // Typically Firebase Admin SDK is used to create the Auth user,
      // here we are just managing the Firestore profile document.
      // E.g., a Cloud Function trigger usually creates the auth user when a profile is created in "invites", 
      // or we handle auth user creation via a server action.
      const id = await usersService.create(data, user?.uid);
      await activityLogsService.log(
        "User Created",
        `Created user profile for ${data.email}`,
        "users",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, displayName }: { id: string; data: Partial<UserType>; displayName?: string }) => {
      await usersService.update(id, data, user?.uid);
      await activityLogsService.log(
        "User Updated",
        `Updated profile for ${displayName || id}`,
        "users",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: USER_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, displayName }: { id: string; displayName?: string }) => {
      await usersService.delete(id);
      await activityLogsService.log(
        "User Deleted",
        `Deleted user profile: ${displayName || id}`,
        "users",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
}
