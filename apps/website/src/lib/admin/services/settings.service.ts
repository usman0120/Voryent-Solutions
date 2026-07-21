import { CoreService, BaseEntity } from "./core.service";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // Assuming db is exported from firebase config

export interface SettingsGroup extends BaseEntity {
  id?: string;
  group: string;
  values: Record<string, any>;
  updatedBy?: string | null;
}

class SettingsService extends CoreService<SettingsGroup> {
  constructor() {
    super("settings");
  }

  // Upsert method to handle predefined string IDs like "general", "branding"
  async upsert(id: string, data: Partial<SettingsGroup>, userId?: string) {
    const timestamp = new Date().toISOString();
    const payload = {
      ...data,
      updatedAt: timestamp,
      updatedBy: userId || null,
    };
    
    // Check if creating for the first time
    if (!data.createdAt) {
       (payload as any).createdAt = timestamp;
       (payload as any).createdBy = userId || null;
    }

    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, payload, { merge: true });
    return id;
  }
}

export const settingsService = new SettingsService();
export type { SettingsGroup as SettingsType };
