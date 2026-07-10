const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');

// Folders requested
const rootFolders = [
  'components',
  'features',
  'layouts',
  'hooks',
  'lib',
  'styles',
  'types',
  'config',
  'constants',
  'content'
];

const routes = [
  '(marketing)',
  'about',
  'services',
  'industries',
  'work',
  'case-studies',
  'blog',
  'resources',
  'careers',
  'contact',
  'faq',
  'privacy',
  'terms',
  'cookies',
  'security',
  'search'
];

// 1. Create root folders in src/
rootFolders.forEach(folder => {
  const dir = path.join(srcDir, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Also create subfolders in components
const componentSubfolders = [
  'layout',
  'navigation',
  'footer',
  'sections',
  'shared',
  'seo',
  'forms',
  'cards'
];
componentSubfolders.forEach(folder => {
  const dir = path.join(srcDir, 'components', folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 2. Create routes in src/app/
routes.forEach(route => {
  const dir = path.join(appDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (route !== '(marketing)') {
    const pagePath = path.join(dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      const componentName = route.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^[a-z]/, (g) => g.toUpperCase());
      const content = `import { Metadata } from "next"

export const metadata: Metadata = {
  title: "${componentName} | Voryent Solutions",
  description: "Voryent Solutions ${componentName} page."
}

export default function ${componentName}Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight">${componentName}</h1>
      <p className="mt-4 text-muted-foreground">This is the ${componentName} page.</p>
    </div>
  )
}
`;
      fs.writeFileSync(pagePath, content);
    }
  }
});

console.log("Setup complete.");
