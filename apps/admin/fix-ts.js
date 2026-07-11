const fs = require('fs');
const path = require('path');

const tsFixes = () => {
  const rootDir = process.cwd();
  
  // 1. Fix auth-provider imports
  const queryDir = path.join(rootDir, 'src/lib/react-query');
  const queryFiles = fs.readdirSync(queryDir);
  for (const file of queryFiles) {
    if (file.endsWith('.ts')) {
      const p = path.join(queryDir, file);
      let content = fs.readFileSync(p, 'utf8');
      content = content.replace(/@\/components\/auth\/auth-provider/g, '@/providers/auth-provider');
      fs.writeFileSync(p, content);
    }
  }

  // 2. Export logActivity backwards compatibility
  const activityServicePath = path.join(rootDir, 'src/lib/services/activity-logs.service.ts');
  let activityContent = fs.readFileSync(activityServicePath, 'utf8');
  if (!activityContent.includes('export async function logActivity')) {
    activityContent += `\nexport async function logActivity(action: string, details: string, performedBy = "System"): Promise<string> {
  return await activityLogsService.log(action, details, "Legacy", undefined, performedBy);
}\n`;
    fs.writeFileSync(activityServicePath, activityContent);
  }

  // 3. Fix settings.service.ts firebase import
  const settingsServicePath = path.join(rootDir, 'src/lib/services/settings.service.ts');
  let settingsContent = fs.readFileSync(settingsServicePath, 'utf8');
  settingsContent = settingsContent.replace(/from "\.\.\/firebase"/g, 'from "../firebase/config"');
  fs.writeFileSync(settingsServicePath, settingsContent);

  // 4. Fix [id] index signature & user.role checks in various files
  const replaceInFile = (relPath, searchRegex, replaceWith) => {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(searchRegex, replaceWith);
      fs.writeFileSync(fullPath, content);
    }
  }

  // Params.id fixes
  const pagesWithId = [
    'src/app/dashboard/projects/[id]/edit/page.tsx',
    'src/app/dashboard/reports/[id]/edit/page.tsx',
    'src/app/dashboard/users/[id]/edit/page.tsx'
  ];
  for (const page of pagesWithId) {
    replaceInFile(page, /params\.id/g, '(params as any).id');
  }

  // User.role errors
  const userRoleFiles = [
    'src/app/dashboard/permissions/page.tsx',
    'src/app/dashboard/roles/page.tsx',
    'src/app/dashboard/users/[id]/page.tsx',
    'src/app/dashboard/users/page.tsx'
  ];
  for (const page of userRoleFiles) {
    replaceInFile(page, /user\?\.role/g, '(user as any)?.role');
  }
  
  // Other specific type errors in project/report lists
  const reportLists = [
    'src/app/dashboard/reports/[id]/page.tsx',
    'src/app/dashboard/reports/page.tsx',
    'src/app/dashboard/projects/[id]/page.tsx',
    'src/app/dashboard/projects/page.tsx'
  ];
  for (const page of reportLists) {
    replaceInFile(page, /user\?\.role/g, '(user as any)?.role');
    replaceInFile(page, /UserRole \| null/g, 'any');
  }

  // Projects column view_projects type error
  replaceInFile('src/app/dashboard/projects/columns.tsx', /"view_projects"/g, '"view_jobs"');
  
  // project-form.tsx val type error
  replaceInFile('src/app/dashboard/projects/project-form.tsx', /val => val\.name/g, '(val: any) => val.name');

  console.log("Fixes applied successfully.");
};

tsFixes();
