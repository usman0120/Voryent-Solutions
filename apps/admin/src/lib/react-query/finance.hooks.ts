import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeService, TransactionType } from "../services/finance.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const FINANCE_KEYS = {
  all: ["finance"] as const,
  lists: () => [...FINANCE_KEYS.all, "list"] as const,
  list: (filters: string) => [...FINANCE_KEYS.lists(), { filters }] as const,
  details: () => [...FINANCE_KEYS.all, "detail"] as const,
  detail: (id: string) => [...FINANCE_KEYS.details(), id] as const,
};

export function useTransactions() {
  return useQuery({
    queryKey: FINANCE_KEYS.lists(),
    queryFn: () => financeService.getAll(),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: FINANCE_KEYS.detail(id),
    queryFn: () => financeService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<TransactionType, "id" | "createdAt" | "updatedAt">) => {
      const id = await financeService.create(data, user?.uid);
      await activityLogsService.log(
        "Transaction Added",
        `New ${data.type.toLowerCase()} added: ${data.description} (${data.amount} ${data.currency})`,
        "finance",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.lists() });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, description }: { id: string; data: Partial<TransactionType>; description?: string }) => {
      await financeService.update(id, data, user?.uid);
      await activityLogsService.log(
        "Transaction Updated",
        `Updated transaction: ${description || id}`,
        "finance",
        id,
        user?.uid
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, description }: { id: string; description?: string }) => {
      await financeService.delete(id);
      await activityLogsService.log(
        "Transaction Deleted",
        `Deleted transaction: ${description || id}`,
        "finance",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.lists() });
    },
  });
}
