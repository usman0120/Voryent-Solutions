import * as z from "zod";

export const aboutPageSchema = z.object({
  contentBlocks: z.object({
    hero: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      image: z.string().optional(),
    }),
    whoWeAre: z.object({
      title: z.string().min(2, "Title is required"),
      paragraphs: z.array(z.string().min(5, "Paragraph cannot be empty")),
      pillars: z.array(z.object({
        icon: z.string(),
        title: z.string().min(2),
        description: z.string().min(5)
      })),
    }),
    missionVision: z.object({
      mission: z.string().min(10, "Mission is required"),
      vision: z.string().min(10, "Vision is required"),
    }),
    coreValues: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      items: z.array(z.object({
        icon: z.string(),
        title: z.string().min(2),
        desc: z.string().min(5)
      })),
    }),
    processSteps: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      items: z.array(z.object({
        icon: z.string(),
        title: z.string().min(2)
      })),
    }),
    whyChooseVoryent: z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      items: z.array(z.object({
        icon: z.string(),
        title: z.string().min(2),
        desc: z.string().min(5)
      })),
    }),
    leadership: z.object({
      title: z.string().min(2, "Title is required"),
      members: z.array(z.object({
        name: z.string().min(2, "Name is required"),
        title: z.string().min(2, "Role/Title is required"),
        image: z.string().min(5, "Image is required"),
        linkedin: z.string().optional()
      }))
    }).optional(),
    companyProfile: z.object({
      title: z.string().min(2, "Title is required"),
      fields: z.array(z.object({
        label: z.string().min(2, "Label is required"),
        value: z.string().min(1, "Value is required")
      }))
    }).optional(),
  }),
});

export type AboutPageFormValues = z.infer<typeof aboutPageSchema>;
