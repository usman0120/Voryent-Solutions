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
        entityId,
        entityType: moduleName,
        userId,
        userName: userId ? "User" : "System", // Ideally resolved via auth context or user cache
        metadata,
      };
      
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
