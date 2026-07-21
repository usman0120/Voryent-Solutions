"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@voryent/ui";
import { useActivityLogs } from "@/lib/admin/react-query/activity-logs.hooks";
import { Skeleton } from "@voryent/ui";
import { Activity, ShieldAlert, BarChart3 } from "lucide-react";

export function AuditLogsSection() {
  const { data: logs, isLoading } = useActivityLogs();

  const summary = useMemo(() => {
    if (!logs || logs.length === 0) return null;
    const actionsCount = logs.length;
    const modules = new Set(logs.map(l => l.module));
    const recentLogs = logs.filter(l => new Date(l.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000));
    return {
      total: actionsCount,
      modulesCount: modules.size,
      recent: recentLogs.length
    };
  }, [logs]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Audit Logs</CardTitle>
          <CardDescription>Review recent administrative actions and system events.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-6">
              {!logs || logs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No audit logs available.</p>
              ) : (
                <>
                  {summary && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Actions</p>
                          <p className="text-2xl font-bold">{summary.total}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Modules Affected</p>
                          <p className="text-2xl font-bold">{summary.modulesCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <ShieldAlert className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Last 24 Hours</p>
                          <p className="text-2xl font-bold">{summary.recent}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                      <div className="col-span-1">Timestamp</div>
                      <div className="col-span-1">User</div>
                      <div className="col-span-1">Module</div>
                      <div className="col-span-2">Action Summary</div>
                    </div>
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {logs.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((log) => (
                    <div key={log.id} className="grid grid-cols-5 px-4 py-3 text-sm items-center">
                      <div className="col-span-1 text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                      <div className="col-span-1 font-medium">{log.userName || "System"}</div>
                      <div className="col-span-1">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {log.module}
                        </span>
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        <span className="font-medium text-foreground">{log.action}:</span> {log.summary}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
