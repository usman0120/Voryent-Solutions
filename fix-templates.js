const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'packages', 'ui', 'src', 'components', 'custom');
const uiPath = path.join(__dirname, 'packages', 'ui', 'src', 'components', 'ui');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  
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

traverseDirectory(directoryPath);
traverseDirectory(uiPath);
