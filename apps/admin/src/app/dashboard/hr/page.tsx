"use client";

import { useJobs } from "@/lib/react-query/jobs.hooks";
import { useApplications } from "@/lib/react-query/applications.hooks";
import { useEmployees } from "@/lib/react-query/employees.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Badge } from "@voryent/ui";
import { 
  Briefcase, FileText, Calendar, Users, 
  ChevronRight, Award, PlusCircle, Building 
} from "lucide-react";
import Link from "next/link";
import { format, isToday, subDays, parseISO } from "date-fns";

export default function HRDashboardPage() {
  const { role } = useAuth();
  const { data: jobs = [], isLoading: loadingJobs } = useJobs();
  const { data: applications = [], isLoading: loadingApps } = useApplications();
  const { data: employees = [], isLoading: loadingEmps } = useEmployees();

  const canViewReports = hasPermission(role, "view_hr_reports");

  if (!canViewReports) {
    return (
      <div className="flex h-64 items-center justify-center border border-dashed rounded-lg bg-card text-muted-foreground">
        You do not have permission to view HR reports and metrics.
      </div>
    );
  }

  if (loadingJobs || loadingApps || loadingEmps) {
    return <div className="flex h-64 items-center justify-center">Loading HR Analytics...</div>;
  }

  // Calculate metrics
  const openJobsCount = jobs.filter((j) => j.status === "Published").length;
  
  const appsToday = applications.filter((app) => {
    if (!app.appliedAt) return false;
    const date = app.appliedAt.toDate ? app.appliedAt.toDate() : new Date(app.appliedAt);
    return isToday(date);
  }).length;

  const interviewsCount = applications.filter((app) => 
    ["Interview Scheduled", "Technical Review", "Final Interview"].includes(app.status)
  ).length;

  const offersCount = applications.filter((app) => app.status === "Offer Sent").length;

  // New Employees (last 30 days)
  const thirtyDaysAgo = subDays(new Date(), 30);
  const newEmployeesCount = employees.filter((emp) => {
    if (!emp.joiningDate) return false;
    const date = parseISO(emp.joiningDate);
    return date >= thirtyDaysAgo;
  }).length;

  // Upcoming joinings (joiningDate is in the future)
  const todayStr = new Date().toISOString().split("T")[0]!;
  const upcomingJoins = employees
    .filter((emp) => emp.joiningDate && emp.joiningDate >= todayStr)
    .sort((a, b) => a.joiningDate.localeCompare(b.joiningDate))
    .slice(0, 5);

  // Group pipeline funnel
  const funnelStages = [
    "Applied",
    "Screening",
    "Interview Scheduled",
    "Technical Review",
    "Final Interview",
    "Offer Sent",
    "Hired"
  ];
  const funnelCounts = funnelStages.map((stage) => ({
    stage,
    count: applications.filter((app) => app.status === stage).length
  }));

  // Group employees by department
  const deptsCount = employees.reduce((acc, emp) => {
    const d = emp.department || "Unassigned";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData = Object.entries(deptsCount).map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HR & Recruitment Dashboard</h1>
        <p className="text-muted-foreground">Overview of hiring funnels, active job postings, and employee onboarding.</p>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Open Jobs */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Open Positions</p>
              <h3 className="text-2xl font-bold">{openJobsCount}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
              <Briefcase className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Apps Today */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Applications Today</p>
              <h3 className="text-2xl font-bold">{appsToday}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Interviews scheduled */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Active Interviews</p>
              <h3 className="text-2xl font-bold">{interviewsCount}</h3>
            </div>
            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Offers Sent */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Offers Pending</p>
              <h3 className="text-2xl font-bold">{offersCount}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-lg">
              <Award className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Hired Last 30 Days */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">New Starters (30d)</p>
              <h3 className="text-2xl font-bold">{newEmployeesCount}</h3>
            </div>
            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DETAILED DIAGRAMS & TABLES SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Funnel */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recruitment Funnel Stages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {funnelCounts.map(({ stage, count }) => {
              const maxCount = Math.max(...funnelCounts.map((f) => f.count), 1);
              const pct = (count / maxCount) * 100;
              return (
                <div key={stage} className="space-y-1 text-sm">
                  <div className="flex justify-between font-medium">
                    <span>{stage}</span>
                    <span className="text-muted-foreground">{count} Candidates</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Upcoming Joins */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Joiners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {upcomingJoins.length > 0 ? (
              upcomingJoins.map((emp) => (
                <div key={emp.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0 text-sm">
                  <div>
                    <h5 className="font-semibold">{emp.firstName} {emp.lastName}</h5>
                    <p className="text-xs text-muted-foreground">{emp.position} ({emp.department})</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary text-xs py-0.5">
                    {emp.joiningDate}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-md bg-muted/10">
                No upcoming joiners this month.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DEPARTMENTS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {departmentData.length > 0 ? (
              departmentData.map(({ name, count }) => (
                <div key={name} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{name}</span>
                  </div>
                  <span className="font-bold text-foreground">{count}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No active employee records.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
