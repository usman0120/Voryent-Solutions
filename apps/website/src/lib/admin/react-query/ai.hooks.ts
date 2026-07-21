import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aiService, AiRequestType } from "../services/ai.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const AI_KEYS = {
  all: ["aiRequests"] as const,
  lists: () => [...AI_KEYS.all, "list"] as const,
  list: (toolId: string) => [...AI_KEYS.lists(), { toolId }] as const,
};

export function useAiHistory(toolId?: string) {
  return useQuery({
    queryKey: toolId ? AI_KEYS.list(toolId) : AI_KEYS.lists(),
    queryFn: async () => {
      const all = await aiService.getAll();
      let filtered = all;
      if (toolId) {
        filtered = all.filter(r => r.tool === toolId);
      }
      return filtered.sort((a, b) => {
        const dA = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
        const dB = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
        return dB - dA;
      });
    },
  });
}

export function useSaveAiRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<AiRequestType, "id" | "createdAt" | "updatedAt">) => {
      const id = await aiService.create(data, user?.uid);
      await activityLogsService.log(
        "AI Content Saved",
        `Saved output from ${data.tool}`,
        "AI",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: AI_KEYS.lists() });
    },
  });
}
