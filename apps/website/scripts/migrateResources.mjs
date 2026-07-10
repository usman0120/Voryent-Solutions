import fs from 'fs';
import path from 'path';

const guides = [
  { title: "Engineering Insights", description: "Read our latest thoughts on AI and software architecture.", link: "/blog", icon: "BookOpen" },
  { title: "Our Services", description: "Learn how we build scalable digital products from scratch.", link: "/services", icon: "Compass" },
  { title: "Help Center", description: "Find answers to the most commonly asked questions.", link: "/contact", icon: "HelpCircle" },
];

const faqs = [
  {
    question: "Are your templates and checklists free to use?",
    answer: "Yes, all public resources listed on this page are completely free to download and use for your personal or commercial projects.",
  },
  {
    question: "Do you offer premium documentation or tools?",
    answer: "We occasionally release premium boilerplates or extensive architectural guides. These will be clearly marked, but our core knowledge sharing remains free.",
  },
  {
    question: "How often do you publish new guides?",
    answer: "Our engineering and design teams aim to publish new insights and resources bi-weekly. Subscribe to our newsletter to stay updated.",
  },
  {
    question: "Can I request a specific guide or template?",
    answer: "Absolutely! If there's a specific engineering challenge you'd like us to cover, feel free to reach out via our Contact page.",
  },
];

const outputDir = path.join(process.cwd(), 'content', 'resources');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

guides.forEach((guide, i) => {
  const slug = guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const frontmatter = `---
type: "guide"
title: "${guide.title}"
summary: "${guide.description}"
link: "${guide.link}"
icon: "${guide.icon}"
order: ${i}
---

${guide.description}
`;
  fs.writeFileSync(path.join(outputDir, slug + '.md'), frontmatter);
});

faqs.forEach((faq, i) => {
  const slug = 'faq-' + faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const frontmatter = `---
type: "faq"
question: "${faq.question.replace(/"/g, '\\"')}"
order: ${i}
---

${faq.answer}
`;
  fs.writeFileSync(path.join(outputDir, slug + '.md'), frontmatter);
});

console.log('Resources migrated!');
