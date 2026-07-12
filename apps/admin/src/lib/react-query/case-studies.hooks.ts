import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { caseStudiesService, type CaseStudy } from "../services/case-studies.service";
import { useToast } from "@/hooks/use-toast";
import type { CaseStudyFormValues } from "../validations/case-study.schema";

export const CACHE_KEY = ["case-studies"];

export function useCaseStudies() {
  return useQuery({
    queryKey: CACHE_KEY,
    queryFn: async () => {
      const data = await caseStudiesService.getAll();
      return data as CaseStudy[];
    },
  });
}

export function useCaseStudy(id: string) {
  return useQuery({
    queryKey: [...CACHE_KEY, id],
    queryFn: () => caseStudiesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCaseStudy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CaseStudyFormValues) => caseStudiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY });
      toast({ title: "Case Study created successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating case study",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCaseStudy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CaseStudyFormValues> }) =>
      caseStudiesService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY });
      queryClient.invalidateQueries({ queryKey: [...CACHE_KEY, id] });
      toast({ title: "Case Study updated successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating case study",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCaseStudy() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => caseStudiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY });
      toast({ title: "Case Study deleted successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting case study",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
