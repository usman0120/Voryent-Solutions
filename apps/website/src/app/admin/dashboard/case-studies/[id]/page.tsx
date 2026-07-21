"use client";

import { useCaseStudy } from "@/lib/admin/react-query/case-studies.hooks";
import { type CaseStudy } from "@/lib/admin/services/case-studies.service";
import { CaseStudyForm } from "../case-study-form";
import { Skeleton } from "@voryent/ui";
import { use } from "react";

export default function EditCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: caseStudy, isLoading } = useCaseStudy(id);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!caseStudy) {
    return <div>Case Study not found</div>;
  }

  return <CaseStudyForm initialData={caseStudy as CaseStudy} id={id} />;
}
