import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService, type Job } from "../services/jobs.service";
import { logActivity } from "../services/activity-logs.service";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsService.getAll(),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateJob(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Job, "id" | "createdAt" | "updatedAt">) => {
      const id = await jobsService.create(data, userId);
      await logActivity("Job Created", `Job "${data.title}" was created.`, userId || "System");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useUpdateJob(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Job> }) => {
      await jobsService.update(id, data, userId);
      if (data.status) {
        await logActivity("Job Updated", `Job status updated to "${data.status}".`, userId || "System");
      } else {
        await logActivity("Job Updated", `Job details updated.`, userId || "System");
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.id] });
    },
  });
}
