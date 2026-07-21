import { CoreService, BaseEntity } from "./core.service";

export interface AiRequest extends BaseEntity {
  tool: string;
  prompt: string;
  response: string;
  createdBy?: string | null;
}

export const aiService = new CoreService<AiRequest>("aiRequests");
export type { AiRequest as AiRequestType };
