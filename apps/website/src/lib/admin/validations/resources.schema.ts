import * as z from "zod";

export const resourcesPageSchema = z.object({
  contentBlocks: z.object({
    hero: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
    }),
    categories: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      items: z.array(z.object({
        title: z.string().min(2, "Title is required"),
        icon: z.string(),
        description: z.string().min(5, "Description is required"),
        link: z.string().min(1, "Link is required"),
      })),
    }),
    downloads: z.object({
      title: z.string().min(2, "Title is required"),
      emptyStateTitle: z.string().optional(),
      emptyStateDescription: z.string().optional(),
      items: z.array(z.object({
        title: z.string().min(2, "Title is required"),
        description: z.string().optional(),
        icon: z.string().optional(),
        link: z.string().optional(),
      })),
    }),
    guides: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().optional(),
    }),
    tools: z.object({
      title: z.string().min(2, "Title is required"),
      emptyStateTitle: z.string().optional(),
      emptyStateDescription: z.string().optional(),
      items: z.array(z.object({
        title: z.string().min(2, "Title is required"),
        description: z.string().optional(),
        icon: z.string().optional(),
        link: z.string().optional(),
      })),
    }),
    faqs: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().optional(),
    }),
    cta: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(5, "Description is required"),
      primaryButtonText: z.string().optional(),
      primaryButtonLink: z.string().optional(),
      secondaryButtonText: z.string().optional(),
      secondaryButtonLink: z.string().optional(),
    }),
  }),
});

export type ResourcesPageFormValues = z.infer<typeof resourcesPageSchema>;
