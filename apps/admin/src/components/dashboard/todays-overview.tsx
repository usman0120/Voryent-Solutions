"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, DollarSign } from "lucide-react";

export function TodaysOverview() {
  // In a real app, you would fetch these from Firestore.
  // We'll use mock data to fulfill the UI requirement for now.

  const stats = [
    { name: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
    { name: "Active Projects", value: "+12", change: "+2", icon: Briefcase },
    { name: "New Contacts", value: "+34", change: "+19%", icon: Users },
    { name: "Blog Views", value: "12,234", change: "+12%", icon: FileText },
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
              <span className="text-emerald-500 font-medium">{stat.change}</span> from last month
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
