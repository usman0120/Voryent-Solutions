"use client";

import { useMetrics, useVisitorData } from "@/lib/admin/react-query/analytics.hooks";
import { ModuleGuard } from "@/components/admin/operations/module-guard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@voryent/ui";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { Users, FolderGit2, Contact2, Briefcase, FileText } from "lucide-react";

export default function AnalyticsPage() {
  const { data: metrics, isLoading: isMetricsLoading } = useMetrics();
  const { data: visitorData = [] } = useVisitorData();

  return (
    <ModuleGuard module="Analytics" action="Read">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Key performance indicators across all modules.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard 
            title="Total Users" 
            value={metrics?.totalUsers} 
            loading={isMetricsLoading} 
            icon={<Users className="w-4 h-4 text-muted-foreground" />} 
          />
          <MetricCard 
            title="Projects" 
            value={metrics?.totalProjects} 
            loading={isMetricsLoading} 
            icon={<FolderGit2 className="w-4 h-4 text-muted-foreground" />} 
          />
          <MetricCard 
            title="Contacts" 
            value={metrics?.totalContacts} 
            loading={isMetricsLoading} 
            icon={<Contact2 className="w-4 h-4 text-muted-foreground" />} 
          />
          <MetricCard 
            title="Active Jobs" 
            value={metrics?.totalJobs} 
            loading={isMetricsLoading} 
            icon={<Briefcase className="w-4 h-4 text-muted-foreground" />} 
          />
          <MetricCard 
            title="Applications" 
            value={metrics?.totalApplications} 
            loading={isMetricsLoading} 
            icon={<FileText className="w-4 h-4 text-muted-foreground" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic (Simulated)</CardTitle>
              <CardDescription>Daily unique visitors vs total page views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                    <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Acquisition (Simulated)</CardTitle>
              <CardDescription>New registrations over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip />
                    <Bar dataKey="visitors" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleGuard>
  );
}

function MetricCard({ title, value, loading, icon }: { title: string, value?: number, loading: boolean, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-7 w-12 bg-muted animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold">{value || 0}</div>
        )}
      </CardContent>
    </Card>
  );
}
