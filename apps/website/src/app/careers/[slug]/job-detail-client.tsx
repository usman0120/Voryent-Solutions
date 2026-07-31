"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { ApplicationForm } from "./application-form";
import { CheckCircle2, ChevronRight, Briefcase } from "lucide-react";

interface JobDetailClientProps {
  job: any;
}

export function JobDetailClient({ job }: JobDetailClientProps) {
  const renderList = (items: string[] | string) => {
    if (!items) return null;
    
    // If it's a legacy string with HTML (e.g. from old RichTextEditor)
    if (typeof items === "string") {
      return (
        <div 
          className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: items }} 
        />
      );
    }
    
    // If it's the new array format
    if (Array.isArray(items) && items.length > 0) {
      return (
        <ul className="space-y-3 mt-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    return null;
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 overflow-x-auto flex-nowrap hide-scrollbar">
        <TabsTrigger 
          value="overview" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 text-base font-medium"
        >
          Job Overview
        </TabsTrigger>
        <TabsTrigger 
          value="apply" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 text-base font-medium"
        >
          Apply Now
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Description */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">About the Role</h2>
          <div 
            className="prose dark:prose-invert max-w-none text-muted-foreground text-base leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: job.description }} 
          />
        </section>

        {/* Responsibilities */}
        {job.responsibilities && (job.responsibilities.length > 0) && (
          <section className="bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Key Responsibilities</h2>
            </div>
            {renderList(job.responsibilities)}
          </section>
        )}

        {/* Requirements */}
        {job.requirements && (job.requirements.length > 0) && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Requirements</h2>
            {renderList(job.requirements)}
          </section>
        )}

        {/* Preferred Skills */}
        {job.preferredSkills && (job.preferredSkills.length > 0) && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Nice to Have</h2>
            {renderList(job.preferredSkills)}
          </section>
        )}

        {/* Benefits */}
        {job.benefits && (job.benefits.length > 0) && (
          <section className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-primary">Benefits & Perks</h2>
            {renderList(job.benefits)}
          </section>
        )}
      </TabsContent>

      <TabsContent value="apply" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-3xl mx-auto">
          <ApplicationForm jobId={job.id} jobTitle={job.title} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
