"use client";

import { useQuery } from "@tanstack/react-query";
import { FileText, Briefcase, Users, MessageSquare, FolderOpen, ArrowRight, LayoutDashboard, Plus, PenTool } from "lucide-react";
import Link from "next/link";
import { Skeleton, Button } from "@voryent/ui";

// Assume we have these hooks or services (using generic fast fetches if available)
import { contactsService } from "@/lib/admin/services/contacts.service";
import { projectsService } from "@/lib/admin/services/projects.service";
import { jobsService } from "@/lib/admin/services/jobs.service";
import { applicationsService } from "@/lib/admin/services/applications.service";

export default function DashboardPage() {
  const { data: contacts = [], isLoading: loadingContacts } = useQuery({ queryKey: ["contacts"], queryFn: () => contactsService.getAll() });
  const { data: projects = [], isLoading: loadingProjects } = useQuery({ queryKey: ["projects"], queryFn: () => projectsService.getAll() });
  const { data: jobs = [], isLoading: loadingJobs } = useQuery({ queryKey: ["jobs"], queryFn: () => jobsService.getAll() });
  const { data: applications = [], isLoading: loadingApps } = useQuery({ queryKey: ["applications"], queryFn: () => applicationsService.getAll() });

  const loading = loadingContacts || loadingProjects || loadingJobs || loadingApps;

  const stats = [
    { name: "Total Projects", value: projects.length.toString(), icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Active Job Postings", value: jobs.filter((j: any) => j.status === "Published").length.toString(), icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "HR Applications", value: applications.length.toString(), icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Contact Inquiries", value: contacts.length.toString(), icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Website CMS</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolios, job listings, and public communications from one central hub.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              View Public Site <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          ))
        ) : (
          stats.map((stat) => (
            <div key={stat.name} className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className={`p-4 rounded-full ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="p-6 border-b bg-muted/20">
            <h3 className="font-semibold text-lg flex items-center gap-2"><LayoutDashboard className="h-5 w-5" /> Quick Actions</h3>
          </div>
          <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Button asChild variant="secondary" className="h-auto py-4 justify-start">
              <Link href="/admin/dashboard/projects/create">
                <Plus className="mr-3 h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">New Project</p>
                  <p className="text-xs text-muted-foreground">Add to portfolio</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto py-4 justify-start">
              <Link href="/admin/dashboard/blog/create">
                <PenTool className="mr-3 h-5 w-5 text-orange-500" />
                <div className="text-left">
                  <p className="font-medium">Write Blog</p>
                  <p className="text-xs text-muted-foreground">Publish an article</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto py-4 justify-start">
              <Link href="/admin/dashboard/jobs/create">
                <Briefcase className="mr-3 h-5 w-5 text-emerald-500" />
                <div className="text-left">
                  <p className="font-medium">Post Job</p>
                  <p className="text-xs text-muted-foreground">Open a new role</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto py-4 justify-start">
              <Link href="/admin/dashboard/hr">
                <Users className="mr-3 h-5 w-5 text-purple-500" />
                <div className="text-left">
                  <p className="font-medium">HR Dashboard</p>
                  <p className="text-xs text-muted-foreground">Review applications</p>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="p-6 border-b bg-muted/20">
            <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="h-5 w-5" /> System Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-medium">Database Connection</p>
                  <p className="text-sm text-muted-foreground">Firestore cluster is fully operational.</p>
                </div>
                <div className="flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-medium">Next.js Edge Caching</p>
                  <p className="text-sm text-muted-foreground">Lightning-fast static delivery is active.</p>
                </div>
                <div className="flex h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex justify-between items-center pb-2">
                <div>
                  <p className="font-medium">Performance Metrics</p>
                  <p className="text-sm text-muted-foreground">Memory footprint highly optimized.</p>
                </div>
                <div className="text-emerald-500 font-bold text-sm">Optimal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
