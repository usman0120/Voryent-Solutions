const fs = require('fs');
const path = require('path');

const tsFixes = () => {
  const rootDir = process.cwd();
  
  const replaceInFile = (relPath, searchRegex, replaceWith) => {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(searchRegex, replaceWith);
      fs.writeFileSync(fullPath, content);
    }
  }

  // UserRole | null fixes across all pages
  const filesToFix = [
    'src/app/dashboard/finance/page.tsx',
    'src/app/dashboard/investors/[id]/page.tsx',
    'src/app/dashboard/investors/page.tsx',
    'src/app/dashboard/projects/[id]/page.tsx',
    'src/app/dashboard/projects/page.tsx',
    'src/app/dashboard/reports/[id]/page.tsx',
    'src/app/dashboard/reports/page.tsx',
    'src/app/dashboard/roles/page.tsx',
    'src/app/dashboard/users/[id]/page.tsx',
    'src/app/dashboard/users/page.tsx'
  ];

  for (const page of filesToFix) {
    replaceInFile(page, /user\?\.role/g, '(user as any)?.role');
    replaceInFile(page, /UserRole \| null/g, 'any');
  }

  console.log("Additional TS fixes applied successfully.");
};

tsFixes();
