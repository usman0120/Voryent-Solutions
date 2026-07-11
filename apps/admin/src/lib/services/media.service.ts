import { CoreService, BaseEntity } from "./core.service";

export interface Media extends BaseEntity {
  name: string;
  folder?: string;
  type: string;
  mimeType: string;
  width?: number;
  height?: number;
  size: number;
  tags?: string[];
  uploadedBy?: string;
  data: string; // Base64 data
}

export const mediaService = new CoreService<Media>("media");
