const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace exactly: role === "Founder" with role === "Founder" || role === "admin" || role === "Super Admin"
      if (content.includes('role === "Founder"')) {
        content = content.replace(/role === "Founder"/g, 'role === "Founder" || role === "admin" || role === "Super Admin"');
        fs.writeFileSync(fullPath, content);
      }
      
      // For cases like: (user as any)?.role === "Founder"
      if (content.includes('?.role === "Founder"')) {
        content = content.replace(/\?\.role === "Founder"/g, '?.role === "Founder" || (user as any)?.role === "admin" || (user as any)?.role === "Super Admin"');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'apps/website/src/app/admin/dashboard'));
console.log('Role checks updated.');
