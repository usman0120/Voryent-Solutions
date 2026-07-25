import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pagesService, Page } from "../services/pages.service";

export const usePage = (id: string) => {
  return useQuery({
    queryKey: ["pages", id],
    queryFn: () => pagesService.getById(id),
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Page> }) => pagesService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["pages", id] });
    },
  });
};
