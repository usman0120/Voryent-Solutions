import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesService, type Employee } from "../services/employees.service";
import { logActivity } from "../services/activity-logs.service";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => employeesService.getAll(),
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => employeesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateEmployee(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
      const id = await employeesService.create(data, userId);
      await logActivity("Employee Created", `Employee record created for ${data.firstName} ${data.lastName}.`, userId || "System");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useUpdateEmployee(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Employee> }) => {
      await employeesService.update(id, data, userId);
      await logActivity("Employee Updated", `Employee record updated for ${data.firstName || ""} ${data.lastName || ""}.`, userId || "System");
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees", variables.id] });
    },
  });
}
