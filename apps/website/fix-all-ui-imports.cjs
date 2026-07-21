const fs = require("fs");
const path = require("path");

const dirs = ["src"];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      
      const regex = /import\s+({[^}]+})\s+from\s+["']@\/components\/ui\/[^"']+["'];?/g;
      if (regex.test(content)) {
        content = content.replace(regex, "import $1 from \"@voryent/ui\";");
        fs.writeFileSync(fullPath, content);
        console.log("Fixed imports in:", fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
console.log("Done.");
