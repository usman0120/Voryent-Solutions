const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/website/src');
const hrDir = path.join(srcDir, 'app/admin/dashboard/hr');
const hrComponentsDir = path.join(srcDir, 'components/admin/hr');

if (!fs.existsSync(hrComponentsDir)) {
  fs.mkdirSync(hrComponentsDir, { recursive: true });
}

// 1. Migrate Pipeline
const pipelineSrc = fs.readFileSync(path.join(srcDir, 'app/admin/dashboard/pipeline/page.tsx'), 'utf8');
const pipelineDest = pipelineSrc
  .replace('export default function PipelinePage()', 'export function PipelineBoard()')
  .replace('import { stageColorMap } from "../applications/columns";', 'import { stageColorMap } from "./applications-columns";')
  .replace(/href={`\/dashboard\/applications\//g, 'href={`/admin/dashboard/applications/');
fs.writeFileSync(path.join(hrComponentsDir, 'pipeline-board.tsx'), pipelineDest);

// 2. Migrate Applications Table
const appsSrc = fs.readFileSync(path.join(srcDir, 'app/admin/dashboard/applications/page.tsx'), 'utf8');
const appsDest = appsSrc
  .replace('export default function ApplicationsPage()', 'export function ApplicationsTable()')
  .replace('import { getColumns } from "./columns";', 'import { getColumns } from "./applications-columns";')
  .replace(/href="\/admin\/dashboard\/applications\/create"/g, 'href="/admin/dashboard/applications/create"'); // Wait, create might not be needed
fs.writeFileSync(path.join(hrComponentsDir, 'applications-table.tsx'), appsDest);

// We also need the columns for applications
const appsColsSrc = fs.readFileSync(path.join(srcDir, 'app/admin/dashboard/applications/columns.tsx'), 'utf8');
fs.writeFileSync(path.join(hrComponentsDir, 'applications-columns.tsx'), appsColsSrc.replace(/href={`\/dashboard\/applications\//g, 'href={`/admin/dashboard/applications/'));

// 3. Migrate Employees (Hired Roster)
const empsSrc = fs.readFileSync(path.join(srcDir, 'app/admin/dashboard/employees/page.tsx'), 'utf8');
const empsDest = empsSrc
  .replace('export default function EmployeesPage()', 'export function HiredRoster()')
  .replace('import { getColumns } from "./columns";', 'import { getColumns } from "./employees-columns";');
fs.writeFileSync(path.join(hrComponentsDir, 'hired-roster.tsx'), empsDest);

// We also need the columns for employees
const empsColsSrc = fs.readFileSync(path.join(srcDir, 'app/admin/dashboard/employees/columns.tsx'), 'utf8');
fs.writeFileSync(path.join(hrComponentsDir, 'employees-columns.tsx'), empsColsSrc.replace(/href={`\/dashboard\/employees\//g, 'href={`/admin/dashboard/employees/'));

// 4. Update HR Dashboard page
const hrOverviewSrc = fs.readFileSync(path.join(hrDir, 'page.tsx'), 'utf8');
const hrNewPage = `
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineBoard } from "@/components/admin/hr/pipeline-board";
import { ApplicationsTable } from "@/components/admin/hr/applications-table";
import { HiredRoster } from "@/components/admin/hr/hired-roster";
${hrOverviewSrc.replace('"use client";', '')}
`;

// However, hrOverviewSrc already exports default function HRDashboardPage.
// We will rename it to HROverview and wrap the whole thing in Tabs.
const hrNewContent = hrNewPage
  .replace('export default function HRDashboardPage()', 'function HROverview()')
  + `
export default function HRDashboardMasterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recruitment & HR</h1>
        <p className="text-muted-foreground">Manage job postings, applicant pipelines, and hired employees.</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Board</TabsTrigger>
          <TabsTrigger value="applications">All Applications</TabsTrigger>
          <TabsTrigger value="hired">Hired Roster</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <HROverview />
        </TabsContent>
        <TabsContent value="pipeline" className="mt-6">
          <PipelineBoard />
        </TabsContent>
        <TabsContent value="applications" className="mt-6">
          <ApplicationsTable />
        </TabsContent>
        <TabsContent value="hired" className="mt-6">
          <HiredRoster />
        </TabsContent>
      </Tabs>
    </div>
  );
}
`;

fs.writeFileSync(path.join(hrDir, 'page.tsx'), hrNewContent);

console.log("Migration script complete");
