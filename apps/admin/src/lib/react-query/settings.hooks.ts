import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService, SettingsType } from "../services/settings.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const SETTINGS_KEYS = {
  all: ["settings"] as const,
  group: (groupId: string) => [...SETTINGS_KEYS.all, groupId] as const,
};

export function useSettingsGroup(groupId: string) {
  return useQuery({
    queryKey: SETTINGS_KEYS.group(groupId),
    queryFn: () => settingsService.getById(groupId),
    enabled: !!groupId,
  });
}

export function useAllSettings() {
  return useQuery({
    queryKey: SETTINGS_KEYS.all,
    queryFn: () => settingsService.getAll(),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ groupId, values }: { groupId: string; values: Record<string, any> }) => {
      await settingsService.upsert(groupId, { values, group: groupId }, user?.uid);
      
      await activityLogsService.log(
        "Settings Updated",
        `Updated settings group: ${groupId}`,
        "settings",
        groupId,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.group(variables.groupId) });
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.all });
    },
  });
}
