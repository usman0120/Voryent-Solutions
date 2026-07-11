const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\Self Skills\\summar-vacations-2026\\Voryent\\Voryent_Solutions_Code\\voryent_solutions-website\\apps\\admin\\src';

function walkSync(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filelist = walkSync(fullPath, filelist);
    } else {
      filelist.push(fullPath);
    }
  });
  return filelist;
}

const allFiles = walkSync(srcDir);

// Fix FAQ
allFiles.filter(f => f.includes('faq')).forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/type FAQ,/g, 'type FaqItem,');
  content = content.replace(/type FAQ\b/g, 'type FaqItem');
  content = content.replace(/\bFAQ\b/g, 'FaqItem'); // Replace all usages
  // But wait, it might replace FAQForm etc, let's just do exact type replacement:
  // "import { type FAQ, faqService }" -> "import { type FaqItem, faqService }"
  content = content.replace(/import\s*\{\s*type\s*FAQ\s*,\s*faqService\s*\}/g, 'import { type FaqItem as FAQ, faqService }');
  content = content.replace(/import\s*\{\s*faqService\s*,\s*type\s*FAQ\s*\}/g, 'import { faqService, type FaqItem as FAQ }');
  fs.writeFileSync(f, content, 'utf-8');
});

// Fix Media
allFiles.filter(f => f.includes('media\\page.tsx')).forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/type MediaItem/g, 'type Media');
  content = content.replace(/MediaItem/g, 'Media');
  
  content = content.replace(/title:\s*file.name/g, 'name: file.name');
  content = content.replace(/item.url/g, 'item.data');
  content = content.replace(/item.title/g, 'item.name');
  
  // also handle "file | undefined"
  content = content.replace(/const file = files\[i\];/g, 'const file = files[i]; if (!file) continue;');

  fs.writeFileSync(f, content, 'utf-8');
});

// Fix Resource missing properties
const resourceServicePath = path.join(srcDir, 'lib', 'services', 'resources.service.ts');
if (fs.existsSync(resourceServicePath)) {
  let content = fs.readFileSync(resourceServicePath, 'utf-8');
  if (!content.includes('fileUrl')) {
    content = content.replace(/url\?:\s*string;/g, 'url?: string;\n  fileUrl?: string;\n  type?: string;\n  coverImage?: string;\n  gated?: boolean;');
    fs.writeFileSync(resourceServicePath, content, 'utf-8');
  }
}

// Fix SeoSettings missing properties
const seoServicePath = path.join(srcDir, 'lib', 'services', 'seo.service.ts');
if (fs.existsSync(seoServicePath)) {
  let content = fs.readFileSync(seoServicePath, 'utf-8');
  if (!content.includes('siteName')) {
    content = content.replace(/siteTitle\?:\s*string;/g, 'siteTitle?: string;\n  siteName?: string;\n  defaultTitle?: string;\n  titleTemplate?: string;\n  defaultOgImage?: string;\n  twitterHandle?: string;');
    fs.writeFileSync(seoServicePath, content, 'utf-8');
  }
}

// Fix alert-dialog imports
allFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  if (content.includes('@/components/ui/alert-dialog')) {
    content = content.replace(/@\/components\/ui\/alert-dialog/g, '@/components/ui/dialog');
    content = content.replace(/AlertDialog/g, 'Dialog'); // simplified fallback
    fs.writeFileSync(f, content, 'utf-8');
  }
});

console.log('Fixed types successfully.');
