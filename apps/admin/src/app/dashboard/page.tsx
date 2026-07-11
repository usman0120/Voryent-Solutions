import { TodaysOverview } from "@/components/dashboard/todays-overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { OpenJobs } from "@/components/dashboard/open-jobs";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { LatestContacts } from "@/components/dashboard/latest-contacts";
import { BlogStatus } from "@/components/dashboard/blog-status";
import { Projects } from "@/components/dashboard/projects";
import { SeoHealth } from "@/components/dashboard/seo-health";
import { RevenueSummary } from "@/components/dashboard/revenue-summary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of what's happening at Voryent Solutions today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TodaysOverview />
      </div>
      
      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
        <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-6">
          <RevenueSummary />
          <OpenJobs />
          <Projects />
          <LatestContacts />
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-3 space-y-6">
          <QuickActions />
          <RecentActivity />
          <RecentApplications />
          <BlogStatus />
          <SeoHealth />
        </div>
      </div>
    </div>
  );
}
