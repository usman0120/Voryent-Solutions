"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type CaseStudyLead } from "@/lib/admin/services/case-studies.service";

export const leadsColumns: ColumnDef<CaseStudyLead>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "caseStudyTitle",
    header: "Case Study",
  },
  {
    accessorKey: "downloadedAt",
    header: "Downloaded At",
    cell: ({ row }) => {
      const date = row.getValue("downloadedAt") as any;
      if (!date) return "N/A";
      const jsDate = date.toDate ? date.toDate() : new Date(date);
      return jsDate.toLocaleDateString();
    },
  },
];
