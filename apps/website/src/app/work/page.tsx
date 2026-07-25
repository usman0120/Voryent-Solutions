export const dynamic = "force-dynamic";

import { getProjects } from "@/lib/firebase/services"
import { WorkClientPage } from "./client-page"

export default async function WorkPage() {
  const allProjects = await getProjects() || [];
  
  // Map content item to project format
  const projects = allProjects.map(p => ({
    id: (p["id"] || "") as string,
    title: (p["title"] || p["name"] || "") as string,
    description: (p["description"] || p["summary"] || "") as string,
    techStack: (p["technologies"] || []) as string[],
    imageUrl: p["coverImage"] || (p["attachments"]?.[0]?.url) || "https://placehold.co/800x450/EEE/31343C",
    githubUrl: (p["repository"] || "") as string,
    demoUrl: (p["demoUrl"] || "") as string,
    featured: Boolean(p["isFeatured"]),
    slug: (p["slug"] || "") as string,
  }))

  return <WorkClientPage initialProjects={projects} />;
}
