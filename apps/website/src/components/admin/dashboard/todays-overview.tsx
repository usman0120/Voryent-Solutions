"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, DollarSign } from "lucide-react";
import { useTransactions } from "@/lib/admin/react-query/finance.hooks";
import { useProjects } from "@/lib/admin/react-query/projects.hooks";
import { Skeleton } from "@voryent/ui";
// Assuming you have a contacts hook, we'll try to import it, or default to 0
import { contactsService } from "@/lib/admin/services/contacts.service";

export function TodaysOverview() {
  const { data: transactions = [], isLoading: loadingTx } = useTransactions();
  const { data: projects = [], isLoading: loadingProjects } = useProjects();
  
  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => contactsService.getAll(),
  });

  if (loadingTx || loadingProjects || loadingContacts) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </>
    )
  }

  const totalRevenue = transactions
    .filter(t => t.type === "Income" && t.status === "Completed")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const activeProjects = projects.filter(p => p.status === "Active" || p.status === "Planning").length;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const stats = [
    { name: "Total Revenue", value: formatter.format(totalRevenue), change: "Real-time", icon: DollarSign },
    { name: "Active Projects", value: activeProjects.toString(), change: "Active", icon: Briefcase },
    { name: "Total Contacts", value: contacts.length.toString(), change: "All time", icon: Users },
    { name: "Blog Views", value: "Analytics TBA", change: "N/A", icon: FileText },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">{stat.name}</h3>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium">{stat.change}</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
