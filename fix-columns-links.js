const fs = require('fs');
const path = require('path');

const dir = 'apps/website/src/app/admin/dashboard';

function walk(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file === 'columns.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      content = content.replace(/href=\{`\/dashboard\//g, 'href={`/admin/dashboard/');
      content = content.replace(/href="\/dashboard\//g, 'href="/admin/dashboard/');
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

walk(dir);
