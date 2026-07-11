const fs = require('fs');
const { execSync } = require('child_process');

const srcDir = 'd:\\Self Skills\\summar-vacations-2026\\Voryent\\Voryent_Solutions_Code\\voryent_solutions-website\\apps\\admin\\src';

try {
  // Fix services
  const services = execSync('dir /s /b "' + srcDir + '\\lib\\services\\*.ts"').toString().split('\r\n').filter(Boolean);
  services.forEach(f => {
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/import\s*\{\s*CoreService,\s*BaseEntity\s*\}\s*from/g, 'import { CoreService, type BaseEntity } from');
    fs.writeFileSync(f, content, 'utf-8');
  });
  
  // Fix react-table imports in data-table.tsx, data-toolbar.tsx, pagination.tsx
  const tableFiles = [
    'components\\cms\\data-table.tsx',
    'components\\cms\\data-toolbar.tsx',
    'components\\cms\\pagination.tsx'
  ];
  tableFiles.forEach(f => {
    const p = srcDir + '\\' + f;
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf-8');
      content = content.replace(/import\s*\{\s*ColumnDef/g, 'import { type ColumnDef');
      content = content.replace(/import\s*\{\s*Table\s*\}\s*from/g, 'import { type Table } from');
      content = content.replace(/import\s*\{\s*SortingState,\s*ColumnFiltersState/g, 'import { type SortingState, type ColumnFiltersState');
      content = content.replace(/import\s*\{\s*RowSelectionState\s*\}\s*from/g, 'import { type RowSelectionState } from');
      fs.writeFileSync(p, content, 'utf-8');
    }
  });
  
  // Fix form-layout.tsx ReactNode import
  const formLayout = srcDir + '\\components\\cms\\form-layout.tsx';
  if (fs.existsSync(formLayout)) {
    let content = fs.readFileSync(formLayout, 'utf-8');
    content = content.replace(/import\s*\{\s*ReactNode\s*\}\s*from/g, 'import { type ReactNode } from');
    fs.writeFileSync(formLayout, content, 'utf-8');
  }

  // Fix delete-dialog.tsx and archive-dialog.tsx imports
  ['delete-dialog.tsx', 'archive-dialog.tsx'].forEach(name => {
    const p = srcDir + '\\components\\cms\\' + name;
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf-8');
      content = content.replace(/@\/components\/ui\/alert-dialog/g, '@/components/ui/dialog'); // or change to something valid
      fs.writeFileSync(p, content, 'utf-8');
    }
  });

  console.log('Fixed additional types');
} catch (e) {
  console.error(e);
}
