import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsService, ContactType } from "../services/contacts.service";
import { useAuth } from "@/providers/auth-provider";
import { activityLogsService } from "../services/activity-logs.service";

export const CONTACT_KEYS = {
  all: ["contacts"] as const,
  lists: () => [...CONTACT_KEYS.all, "list"] as const,
  list: (filters: string) => [...CONTACT_KEYS.lists(), { filters }] as const,
  details: () => [...CONTACT_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CONTACT_KEYS.details(), id] as const,
};

export function useContacts() {
  return useQuery({
    queryKey: CONTACT_KEYS.lists(),
    queryFn: () => contactsService.getAll(),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.detail(id),
    queryFn: () => contactsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<ContactType, "id" | "createdAt" | "updatedAt">) => {
      const id = await contactsService.create(data, user?.uid);
      await activityLogsService.log(
        "Contact Added",
        `New contact added: ${data.firstName} ${data.lastName}`,
        "contacts",
        id,
        user?.uid
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.lists() });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data, contactName }: { id: string; data: Partial<ContactType>; contactName?: string }) => {
      await contactsService.update(id, data, user?.uid);
      if (data.assignedTo) {
        await activityLogsService.log(
          "Contact Assigned",
          `Contact ${contactName || id} assigned`,
          "contacts",
          id,
          user?.uid
        );
      } else {
        await activityLogsService.log(
          "Contact Updated",
          `Updated contact: ${contactName || id}`,
          "contacts",
          id,
          user?.uid
        );
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, contactName }: { id: string; contactName?: string }) => {
      await contactsService.delete(id);
      await activityLogsService.log(
        "Contact Deleted",
        `Deleted contact: ${contactName || id}`,
        "contacts",
        id,
        user?.uid
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.lists() });
    },
  });
}
