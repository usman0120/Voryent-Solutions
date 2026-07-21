import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportsService, ReportType } from "../services/reports.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const REPORT_KEYS = {
  all: ["reports"] as const,
  lists: () => [...REPORT_KEYS.all, "list"] as const,
  list: (filters: string) => [...REPORT_KEYS.lists(), { filters }] as const,
  details: () => [...REPORT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...REPORT_KEYS.details(), id] as const,
};

export function useReports() {
  return useQuery({
    queryKey: REPORT_KEYS.lists(),
    queryFn: () => reportsService.getAll(),
  });
}

export function useReport(id: string) {
  return useQuery({
    queryKey: REPORT_KEYS.detail(id),
    queryFn: () => reportsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<ReportType, "id" | "createdAt" | "updatedAt">) => {
      // Typically the actual generation would be handled by a Cloud Function.
      // Here we just save the config.
      const id = await reportsService.create(data, user?.uid);
      await activityLogsService.log(
        "Report Configuration Created",
        `Created report config: ${data.title}`,
        "reports",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.lists() });
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, title }: { id: string; data: Partial<ReportType>; title?: string }) => {
      await reportsService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Report Configuration Updated",
        `Updated report: ${title || id}`,
        "reports",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, title }: { id: string; title?: string }) => {
      await reportsService.delete(id);
      await activityLogsService.log(
        "Report Configuration Deleted",
        `Deleted report config: ${title || id}`,
        "reports",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REPORT_KEYS.lists() });
    },
  });
}
