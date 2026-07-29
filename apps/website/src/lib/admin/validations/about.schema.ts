import * as z from "zod";

export const aboutPageSchema = z.object({
  contentBlocks: z.object({
    missionVision: z.object({
      mission: z.string().min(10, "Mission is required"),
      vision: z.string().min(10, "Vision is required"),
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
