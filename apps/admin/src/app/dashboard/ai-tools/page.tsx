"use client";

import { ModuleGuard } from "@/components/operations/module-guard";
import { aiToolsConfig } from "@/lib/config/ai-tools.config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AiToolsPage() {
  return (
    <ModuleGuard module="AI" action="Read">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Utilities</h1>
          <p className="text-muted-foreground">Internal productivity tools for the Voryent team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiToolsConfig.map(tool => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={`/dashboard/ai-tools/${tool.id}`}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </ModuleGuard>
  );
}
