"use client";

import { useState, useMemo } from "react";
import { CareerCard, Button } from "@voryent/ui";
import Link from "next/link";
import { Search, Filter, X } from "lucide-react";

interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel?: string;
  salary?: string;
  currency?: string;
  createdAt?: any;
  featured?: boolean;
}

interface JobListClientProps {
  jobs: Job[];
  emptyState: { title: string; description: string };
}

export function JobListClient({ jobs, emptyState }: JobListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Extract unique filter options
  const departments = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)))], [jobs]);
  const locations = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)))], [jobs]);
  const types = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.employmentType).filter(Boolean)))], [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.department?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
      const matchesLoc = selectedLocation === "All" || job.location === selectedLocation;
      const matchesType = selectedType === "All" || job.employmentType === selectedType;

      return matchesSearch && matchesDept && matchesLoc && matchesType;
    });
  }, [jobs, searchQuery, selectedDepartment, selectedLocation, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All");
    setSelectedLocation("All");
    setSelectedType("All");
  };

  const hasActiveFilters = searchQuery !== "" || selectedDepartment !== "All" || selectedLocation !== "All" || selectedType !== "All";

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-2xl border border-dashed border-border/50 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Search className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{emptyState.title}</h3>
        <p className="text-muted-foreground max-w-md">{emptyState.description}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* FILTER BAR */}
      <div className="bg-card p-4 sm:p-6 rounded-2xl border shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by job title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 h-12 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-12 px-4 rounded-xl border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="All" disabled className="text-muted-foreground">Category</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept === "All" ? "All Categories" : dept}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="h-12 px-4 rounded-xl border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="All" disabled className="text-muted-foreground">Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-12 px-4 rounded-xl border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="All" disabled className="text-muted-foreground">Job Type</option>
              {types.map((type) => (
                <option key={type} value={type}>{type === "All" ? "All Types" : type}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{filteredJobs.length}</strong> jobs
            </p>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-destructive">
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* JOB LISTINGS */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <CareerCard
              key={job.id}
              title={job.title}
              department={job.department}
              location={job.location}
              type={job.employmentType}
              experience={job.experienceLevel}
              salary={job.salary}
              currency={job.currency}
              postedDate={job.createdAt}
              featured={job.featured}
              action={
                <Button asChild className="w-full shadow-sm">
                  <Link href={`/careers/${job.slug}`}>
                    View Details & Apply
                  </Link>
                </Button>
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Filter className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No jobs match your filters</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Try adjusting your search query or changing the filter categories to find what you're looking for.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
