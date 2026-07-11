const fs = require('fs');
const { execSync } = require('child_process');

const srcDir = 'd:\\Self Skills\\summar-vacations-2026\\Voryent\\Voryent_Solutions_Code\\voryent_solutions-website\\apps\\admin\\src\\app\\dashboard';

try {
  const files = execSync('dir /s /b "' + srcDir + '\\columns.tsx"').toString().split('\r\n').filter(Boolean);
  
  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf-8');
    
    content = content.replace(/import\s*\{\s*ColumnDef\s*\}\s*from/g, 'import { type ColumnDef } from');
    content = content.replace(/import\s*\{\s*([A-Z][a-zA-Z0-9_]*),\s*([a-z][a-zA-Z0-9_]*Service)\s*\}\s*from/g, 'import { type $1, $2 } from');
    content = content.replace(/import\s*\{\s*([a-z][a-zA-Z0-9_]*Service),\s*([A-Z][a-zA-Z0-9_]*)\s*\}\s*from/g, 'import { $1, type $2 } from');
    
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Fixed', f);
  });
} catch (e) {
  console.error(e);
}
