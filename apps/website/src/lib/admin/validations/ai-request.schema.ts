import * as z from "zod";

export const aiRequestSchema = z.object({
  tool: z.string(),
  prompt: z.string().min(1, "Prompt cannot be empty"),
  response: z.string().optional(),
});

export type AiRequestFormValues = z.infer<typeof aiRequestSchema>;
