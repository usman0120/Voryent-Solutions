"use client";

import { ActivityLogType } from "@/lib/services/activity-logs.service";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ActivityTimelineProps {
  logs: ActivityLogType[];
}

export function ActivityTimeline({ logs }: ActivityTimelineProps) {
  if (logs.length === 0) {
    return (
      <div className="py-8 text-center border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No activity logs found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => {
        const jsDate = log.createdAt ? (typeof log.createdAt === 'object' && 'toDate' in log.createdAt ? (log.createdAt as any).toDate() : new Date(log.createdAt)) : new Date();

        return (
          <div key={log.id} className="flex gap-4 p-4 border rounded-lg bg-card text-card-foreground">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="font-bold text-primary text-sm">{log.userName?.[0] || "S"}</span>
            </div>
            
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium leading-none truncate">
                  {log.summary}
                </p>
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(jsDate, { addSuffix: true })}
                </time>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">{log.userName || "System"}</span>
                <span>•</span>
                <span title={format(jsDate, "PPpp")}>{format(jsDate, "MMM d, h:mm a")}</span>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{log.module}</Badge>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{log.action}</Badge>
                {log.entityId && (
                  <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                    ID: {log.entityId}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
