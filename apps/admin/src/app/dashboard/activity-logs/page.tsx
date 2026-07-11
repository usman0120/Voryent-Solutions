"use client";

import { useState, useMemo } from "react";
import { useActivityLogs } from "@/lib/react-query/activity.hooks";
import { ModuleGuard } from "@/components/operations/module-guard";
import { ActivityTimeline } from "@/components/operations/activity-timeline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";

export default function ActivityLogsPage() {
  const { data: logs = [], isLoading } = useActivityLogs();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const modules = useMemo(() => {
    const mods = new Set(logs.map(l => l.module));
    return Array.from(mods).sort();
  }, [logs]);

  const actions = useMemo(() => {
    const acts = new Set(logs.map(l => l.action));
    return Array.from(acts).sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (log.userName || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
      const matchesAction = actionFilter === "all" || log.action === actionFilter;
      return matchesSearch && matchesModule && matchesAction;
    });
  }, [logs, searchTerm, moduleFilter, actionFilter]);

  return (
    <ModuleGuard module="Settings" action="Read">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
            <p className="text-muted-foreground">Audit trail for all system operations.</p>
          </div>
          <Button variant="outline" onClick={() => alert("Export functionality coming soon.")}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search summary or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              {modules.map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {actions.map(a => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12 text-muted-foreground">Loading activity history...</div>
        ) : (
          <ActivityTimeline logs={filteredLogs} />
        )}
      </div>
    </ModuleGuard>
  );
}
