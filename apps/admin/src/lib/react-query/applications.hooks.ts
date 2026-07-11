import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsService, type Application } from "../services/applications.service";
import { logActivity } from "../services/activity-logs.service";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsService.getAll(),
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => applicationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Application, "id" | "createdAt" | "updatedAt">) => {
      const id = await applicationsService.create(data, "Candidate");
      await logActivity("Application Submitted", `Candidate ${data.firstName} ${data.lastName} applied for "${data.jobTitle}".`, "Candidate");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useUpdateApplication(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Application> }) => {
      // Fetch current status to see if it changes
      const current = await applicationsService.getById(id);
      await applicationsService.update(id, data, userId);
      
      if (data.status && current?.status !== data.status) {
        if (data.status === "Interview Scheduled") {
          await logActivity("Interview Scheduled", `Interview scheduled for candidate ${current?.firstName} ${current?.lastName}.`, userId || "System");
        } else {
          await logActivity("Candidate Moved", `Candidate ${current?.firstName} ${current?.lastName} moved to stage "${data.status}".`, userId || "System");
        }
      } else if (data.notes && current?.notes?.length !== data.notes.length) {
        await logActivity("Application Updated", `Note added to ${current?.firstName} ${current?.lastName}'s application.`, userId || "System");
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["applications", variables.id] });
    },
  });
}
