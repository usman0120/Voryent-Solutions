import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companiesService, CompanyType } from "../services/companies.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

// Usually there is only ONE company document, e.g. id "main" or the first one returned.
export const COMPANY_KEYS = {
  all: ["companies"] as const,
  detail: (id: string) => [...COMPANY_KEYS.all, id] as const,
  primary: () => [...COMPANY_KEYS.all, "primary"] as const,
};

export function useCompany() {
  return useQuery({
    queryKey: COMPANY_KEYS.primary(),
    queryFn: async () => {
      // Fetch all, return the first one. If none exists, return null.
      const all = await companiesService.getAll();
      return all.length > 0 ? all[0] : null;
    },
  });
}

export function useSaveCompany() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data }: { id?: string; data: Partial<CompanyType> }) => {
      let savedId = id;
      if (id) {
        await companiesService.update(id, data, user?.uid);
      } else {
        savedId = await companiesService.create(data as any, user?.uid);
      }
      
      await activityLogsService.log(
        "Company Profile Updated",
        `Updated internal company settings`,
        "companies",
        savedId!,
        user?.uid
      );
      
      return savedId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.primary() });
    },
  });
}
