import { useQuery } from "@tanstack/react-query";
import { activityLogsService } from "../services/activity-logs.service";

export const ACTIVITY_LOGS_KEYS = {
  all: ["activityLogs"] as const,
  lists: () => [...ACTIVITY_LOGS_KEYS.all, "list"] as const,
};

export function useActivityLogs() {
  return useQuery({
    queryKey: ACTIVITY_LOGS_KEYS.lists(),
    queryFn: () => activityLogsService.getAll(),
  });
}
