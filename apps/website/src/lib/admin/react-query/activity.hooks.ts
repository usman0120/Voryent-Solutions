import { useQuery } from "@tanstack/react-query";
import { activityLogsService } from "../services/activity-logs.service";

export const ACTIVITY_KEYS = {
  all: ["activityLogs"] as const,
  lists: () => [...ACTIVITY_KEYS.all, "list"] as const,
  list: (filters: Record<string, any>) => [...ACTIVITY_KEYS.lists(), { filters }] as const,
};

export function useActivityLogs() {
  return useQuery({
    queryKey: ACTIVITY_KEYS.lists(),
    queryFn: async () => {
      // Typically we'd use a paginated/filtered query here.
      // Getting all logs is expensive. For MVP we'll just pull a limit natively or do full list if small.
      const logs = await activityLogsService.getAll();
      return logs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
        return dateB - dateA;
      });
    },
  });
}
