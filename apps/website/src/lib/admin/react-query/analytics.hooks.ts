import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics, getVisitorData } from "../services/analytics.service";

export function useMetrics() {
  return useQuery({
    queryKey: ["analytics", "metrics"],
    queryFn: () => getDashboardMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useVisitorData() {
  return useQuery({
    queryKey: ["analytics", "visitors"],
    queryFn: async () => getVisitorData(),
    staleTime: Infinity,
  });
}
