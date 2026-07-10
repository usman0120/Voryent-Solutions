const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/import { Metadata }/g, 'import type { Metadata }')
    .replace(/import { MetadataRoute }/g, 'import type { MetadataRoute }')
    .replace(/@voryent\/ui\/src\/components\/custom\/container/g, '@voryent/ui')
    .replace(/@voryent\/ui\/src\/components\/ui\/button/g, '@voryent/ui')
    .replace(/@voryent\/ui\/src\/components\/custom\/loading-spinner/g, '@voryent/ui')
    .replace(/@voryent\/ui\/src\/components\/custom\/footer/g, '@voryent/ui')
    .replace(/@voryent\/ui\/src\/components\/custom\/navbar/g, '@voryent/ui')
    .replace(/@voryent\/ui\/src\/components\/ui\/dropdown-menu/g, '@voryent/ui');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Updated: " + filePath);
  }
}

function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  });
}

traverseDirectory(path.join(__dirname, 'src'));
