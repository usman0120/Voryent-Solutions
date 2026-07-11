import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { investorsService, InvestorType } from "../services/investors.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const INVESTOR_KEYS = {
  all: ["investors"] as const,
  lists: () => [...INVESTOR_KEYS.all, "list"] as const,
  list: (filters: string) => [...INVESTOR_KEYS.lists(), { filters }] as const,
  details: () => [...INVESTOR_KEYS.all, "detail"] as const,
  detail: (id: string) => [...INVESTOR_KEYS.details(), id] as const,
};

export function useInvestors() {
  return useQuery({
    queryKey: INVESTOR_KEYS.lists(),
    queryFn: () => investorsService.getAll(),
  });
}

export function useInvestor(id: string) {
  return useQuery({
    queryKey: INVESTOR_KEYS.detail(id),
    queryFn: () => investorsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateInvestor() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<InvestorType, "id" | "createdAt" | "updatedAt">) => {
      const id = await investorsService.create(data, user?.uid);
      await activityLogsService.log(
        "Investor Added",
        `New investor added: ${data.name}`,
        "investors",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.lists() });
    },
  });
}

export function useUpdateInvestor() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, investorName }: { id: string; data: Partial<InvestorType>; investorName?: string }) => {
      await investorsService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Investor Updated",
        `Updated investor: ${investorName || id}`,
        "investors",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.detail(variables.id) });
    },
  });
}

export function useArchiveInvestor() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, investorName }: { id: string; investorName?: string }) => {
      await investorsService.archive(id, user?.uid);
      await activityLogsService.log(
        "Investor Archived",
        `Archived investor: ${investorName || id}`,
        "investors",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteInvestor() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, investorName }: { id: string; investorName?: string }) => {
      await investorsService.delete(id);
      await activityLogsService.log(
        "Investor Deleted",
        `Deleted investor: ${investorName || id}`,
        "investors",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVESTOR_KEYS.lists() });
    },
  });
}
