import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKWBVMTorgguQB203TzJErX9Eu0d0l4J4",
  authDomain: "voryent-solutions.firebaseapp.com",
  projectId: "voryent-solutions",
  storageBucket: "voryent-solutions.firebasestorage.app",
  messagingSenderId: "880427890600",
  appId: "1:880427890600:web:f905900ce7f3a3d38b8f9d",
  measurementId: "G-7D2FPP431D"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const pages = [
  {
    id: "homepage",
    title: "Voryent Solutions - Enterprise Software Development",
    slug: "/",
    content: {
      hero: { title: "Transforming Businesses with Modern Software", subtitle: "We build scalable, secure, and intuitive digital experiences." },
    },
    seo: { title: "Voryent Solutions | Enterprise Software", description: "Voryent Solutions is a premier enterprise software development company.", keywords: "software development, enterprise, SaaS" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "about",
    title: "About Us",
    slug: "about",
    content: {
      hero: { title: "Our Mission & Vision", subtitle: "Innovating for a better digital tomorrow." },
    },
    seo: { title: "About | Voryent Solutions", description: "Learn more about Voryent Solutions.", keywords: "about us, voryent team" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const services = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    slug: "custom-software",
    shortDescription: "Tailored software solutions to address your unique business challenges.",
    seo: { title: "Custom Software | Voryent Solutions", description: "Bespoke software development services." },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    slug: "cloud-architecture",
    shortDescription: "Scalable and secure cloud infrastructure design and migration.",
    seo: { title: "Cloud Architecture | Voryent Solutions", description: "AWS, Azure, and GCP cloud architecture services." },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const industries = [
  {
    id: "finance",
    title: "Financial Services",
    slug: "finance",
    shortDescription: "Secure, compliant tech for modern finance.",
    seo: { title: "Financial Services | Voryent Solutions", description: "Fintech solutions and secure financial software." },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "healthcare",
    title: "Healthcare",
    slug: "healthcare",
    shortDescription: "HIPAA-compliant platforms for the healthcare industry.",
    seo: { title: "Healthcare | Voryent Solutions", description: "Healthcare software development." },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const faqs = [
  {
    id: "faq-1",
    question: "What is your typical project timeline?",
    answer: "Our project timelines vary depending on complexity, but most MVP projects take between 3 to 6 months.",
    category: "General",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "faq-2",
    question: "Do you offer post-launch support?",
    answer: "Yes, we offer comprehensive SLA-based support and maintenance packages.",
    category: "Support",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const resources = [
  {
    id: "cloud-migration-guide",
    title: "The Ultimate Cloud Migration Guide",
    slug: "cloud-migration-guide",
    type: "Whitepaper",
    description: "Learn how to successfully migrate legacy systems to the cloud without downtime.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const blogs = Array.from({ length: 10 }).map((_, i) => ({
  id: `blog-post-${i + 1}`,
  title: `The Future of Enterprise Tech ${i + 1}`,
  slug: `future-enterprise-tech-${i + 1}`,
  excerpt: `An in-depth look at how emerging technologies are reshaping the enterprise landscape in part ${i + 1}.`,
  content: `This is the full markdown content for the blog post ${i + 1}. We cover AI, cloud, and security.`,
  author: "Admin User",
  category: "Technology",
  tags: ["AI", "Cloud", "Enterprise"],
  publishedAt: new Date().toISOString(),
  seo: { title: `Future of Enterprise Tech ${i + 1} | Voryent Solutions`, description: "A deep dive into emerging tech trends." },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

async function seedData() {
  try {
    console.log("Signing in...");
    const email = process.env["ADMIN_EMAIL"] || "admin@voryent.com";
    const password = process.env["ADMIN_PASSWORD"] || "admin123";
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully. Seeding data...");
    } catch (authErr) {
      console.warn("Could not sign in automatically. If you have strict Firestore rules, seeding might fail.");
      console.warn("Error:", (authErr as any).message);
    }

    const collections = [
      { name: "pages", data: pages },
      { name: "services", data: services },
      { name: "industries", data: industries },
      { name: "faqs", data: faqs },
      { name: "resources", data: resources },
      { name: "blogs", data: blogs },
    ];

    for (const coll of collections) {
      console.log(`Seeding ${coll.name}...`);
      for (const item of coll.data) {
        const docRef = doc(db, coll.name, item.id);
        await setDoc(docRef, item);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
