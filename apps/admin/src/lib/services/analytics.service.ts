import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";

export interface DashboardMetrics {
  totalUsers: number;
  totalProjects: number;
  totalContacts: number;
  totalJobs: number;
  totalApplications: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const [users, projects, contacts, jobs, applications] = await Promise.all([
      getCountFromServer(collection(db, "users")),
      getCountFromServer(collection(db, "projects")),
      getCountFromServer(collection(db, "contacts")),
      getCountFromServer(collection(db, "jobs")),
      getCountFromServer(collection(db, "applications")),
    ]);

    return {
      totalUsers: users.data().count,
      totalProjects: projects.data().count,
      totalContacts: contacts.data().count,
      totalJobs: jobs.data().count,
      totalApplications: applications.data().count,
    };
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    // Return zeros if there's a permission or network error
    return {
      totalUsers: 0,
      totalProjects: 0,
      totalContacts: 0,
      totalJobs: 0,
      totalApplications: 0,
    };
  }
}

// Mock chart data for MVP - In production, this would aggregate real timestamped data
export function getVisitorData() {
  return [
    { name: "Mon", visitors: 4000, pageViews: 2400 },
    { name: "Tue", visitors: 3000, pageViews: 1398 },
    { name: "Wed", visitors: 2000, pageViews: 9800 },
    { name: "Thu", visitors: 2780, pageViews: 3908 },
    { name: "Fri", visitors: 1890, pageViews: 4800 },
    { name: "Sat", visitors: 2390, pageViews: 3800 },
    { name: "Sun", visitors: 3490, pageViews: 4300 },
  ];
}
