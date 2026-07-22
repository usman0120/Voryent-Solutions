import { CoreService, BaseEntity } from "./core.service";

export interface ActivityLog extends BaseEntity {
  userId?: string;
  userName?: string;
  module: string;
  action: string;
  entityId?: string;
  entityType?: string;
  summary: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

class ActivityLogsService extends CoreService<ActivityLog> {
  constructor() {
    super("activityLogs");
  }

  /**
   * Universal logging method used across hooks
   */
  async log(
    action: string, 
    summary: string, 
    moduleName: string, 
    entityId?: string, 
    userId?: string, 
    metadata?: Record<string, any>
  ): Promise<string> {
    try {
      const payload: Omit<ActivityLog, "id" | "createdAt" | "updatedAt"> = {
        action,
        summary,
        module: moduleName,
        entityId: entityId || null as any,
        entityType: moduleName,
        userId: userId || null as any,
        userName: userId ? "User" : "System", // Ideally resolved via auth context or user cache
        metadata: metadata || null as any,
      };

      // Strip any top-level undefined just to be safe
      Object.keys(payload).forEach(key => (payload as any)[key] === undefined && delete (payload as any)[key]);

      // Deep clean metadata to remove undefined fields recursively
      if (payload.metadata) {
        const cleanUndefined = (obj: any): any => {
          if (obj === undefined) return null;
          if (typeof obj !== 'object' || obj === null) return obj;
          if (Array.isArray(obj)) return obj.map(cleanUndefined);
          const cleaned: any = {};
          for (const [key, value] of Object.entries(obj)) {
            if (value !== undefined) {
              cleaned[key] = cleanUndefined(value);
            }
          }
          return cleaned;
        };
        payload.metadata = cleanUndefined(payload.metadata);
      }
      
      return await this.create(payload, userId);
    } catch (error) {
      console.error("Failed to write activity log:", error);
      return "";
    }
  }
}

export const activityLogsService = new ActivityLogsService();
export type { ActivityLog as ActivityLogType };

export async function logActivity(action: string, details: string, performedBy = "System"): Promise<string> {
  return await activityLogsService.log(action, details, "Legacy", undefined, performedBy);
}
