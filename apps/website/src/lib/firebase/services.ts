import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db as firestoreDb } from "./config";
import { getCached, setCacheWithPrune } from "../cache";
import { hardcodedServices } from "../data/services";

// Helper: get db lazily - call as db() to get the Firestore instance
const db = () => firestoreDb;

// Cache TTLs
const LONG_TTL = 10 * 60 * 1000; // 10 min for rarely-changing data
const SHORT_TTL = 2 * 60 * 1000; // 2 min for more dynamic data

// --- Homepage ---
export async function getHomepageData() {
  const key = "homepage";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "pages", "homepage");
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;
  if (data) setCacheWithPrune(key, data, LONG_TTL);
  return data;
}

export async function getAboutData() {
  const key = "about";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "pages", "about");
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;
  if (data) setCacheWithPrune(key, data, LONG_TTL);
  return data;
}


// --- Services ---
export async function getServices() {
  const key = "services_v2";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const snapshot = await getDocs(collection(db(), "services"));
    const overrides = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    
    // Merge hardcoded services with any overrides
    const merged = hardcodedServices.map(service => {
      const override = overrides.find(o => o.id === service.slug || o.slug === service.slug);
      return {
        ...service,
        ...override,
        id: service.slug
      };
    });
    
    // Only include Published services on the frontend
    const publishedServices = merged.filter(s => String(s.status).toLowerCase() === 'published');
    const data = publishedServices.sort((a, b) => (a.order || 0) - (b.order || 0));
    setCacheWithPrune(key, data, LONG_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return hardcodedServices.filter(s => String(s.status).toLowerCase() === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

export async function getServiceBySlug(slug: string) {
  const key = `service:${slug}`;
  const cached = getCached<any>(key);
  if (cached) return cached;

  const hardcoded = hardcodedServices.find(s => s.slug === slug);
  if (!hardcoded) return null; // No dynamic creation allowed anymore

  try {
    const docRef = doc(db(), "services", slug);
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? { ...hardcoded, ...docSnap.data(), id: slug } : { ...hardcoded, id: slug };
    
    setCacheWithPrune(key, data, LONG_TTL);
    return data;
  } catch (error) {
    console.error(`Failed to fetch service (${slug}):`, error);
    return { ...hardcoded, id: slug };
  }
}

// --- Industries ---
export async function getIndustries() {
  const key = "industries_v2";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const q = query(collection(db(), "industries"), where("status", "in", ["published", "Published"]));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    const data = docs.sort((a, b) => (a.order || 0) - (b.order || 0));
    setCacheWithPrune(key, data, LONG_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch industries:", error);
    return [];
  }
}

// --- Blog ---
export async function getBlogPosts() {
  const key = "blogPosts";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const snapshot = await getDocs(collection(db(), "blogPosts"));
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    
    // Resilient filter for published posts (case-insensitive) or posts without status constraint
    const publishedDocs = docs.filter((d) => {
      if (!d.status) return true;
      return String(d.status).toLowerCase() === "published";
    });

    const data = publishedDocs.sort((a, b) => {
      const timeA = a.publishedAt?.toMillis?.() || a.updatedAt?.toMillis?.() || a.createdAt?.toMillis?.() || 0;
      const timeB = b.publishedAt?.toMillis?.() || b.updatedAt?.toMillis?.() || b.createdAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
    setCacheWithPrune(key, data, SHORT_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const key = `blogPost:${slug}`;
  const cached = getCached<any>(key);
  if (cached) return cached;

  try {
    const q = query(collection(db(), "blogPosts"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    const firstDoc = snapshot.docs[0];
    if (!firstDoc) return null;
    const data = { id: firstDoc.id, ...firstDoc.data() };
    setCacheWithPrune(key, data, SHORT_TTL);
    return data;
  } catch (error) {
    console.error(`Failed to fetch blog post by slug (${slug}):`, error);
    return null;
  }
}

export async function subscribeBlogNewsletter(email: string) {
  if (!email || !email.includes("@")) throw new Error("Please enter a valid email address.");
  const cleanEmail = email.trim().toLowerCase();

  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
  
  const docRef = await addDoc(collection(db(), "blogSubscriptions"), {
    email: cleanEmail,
    subscribedAt: serverTimestamp(),
    createdAt: new Date().toISOString(),
    status: "Active",
    isArchived: false,
  });

  return { id: docRef.id, success: true };
}

// --- FAQ ---
export async function getFaqs() {
  const key = "faqs";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  const snapshot = await getDocs(collection(db(), "faqItems"));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setCacheWithPrune(key, data, LONG_TTL);
  return data;
}

// --- SEO ---
export async function getSeoSettings() {
  const key = "seoSettings";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "settings", "seo");
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;
  if (data) setCacheWithPrune(key, data, LONG_TTL);
  return data;
}


// --- Careers CMS & Jobs ---
export async function getCareersData() {
  const key = "careersData";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "pages", "careers");
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;
  if (data) setCacheWithPrune(key, data, LONG_TTL);
  return data;
}

export async function getCareersJobs() {
  const key = "careersJobs";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const q = query(collection(db(), "jobs"), where("status", "==", "Published"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCacheWithPrune(key, data, SHORT_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

export async function getJobBySlug(slug: string) {
  const key = `job:${slug}`;
  const cached = getCached<any>(key);
  if (cached) return cached;

  const q = query(collection(db(), "jobs"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  const data = { id: firstDoc.id, ...firstDoc.data() };
  setCacheWithPrune(key, data, SHORT_TTL);
  return data;
}

// --- Settings ---
export async function getSocialSettings() {
  const key = "socialSettings";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "settings", "social");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const raw = docSnap.data();
  const data = raw["values"] ? raw["values"] : raw;
  setCacheWithPrune(key, data, LONG_TTL);
  return data;
}

export async function getContactSettings() {
  const key = "contactSettings";
  const cached = getCached<any>(key);
  if (cached) return cached;

  const docRef = doc(db(), "settings", "contact");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const raw = docSnap.data();
  const data = raw["values"] ? raw["values"] : raw;
  setCacheWithPrune(key, data, LONG_TTL);
  return data;
}

// --- Projects ---
export async function getProjects(): Promise<any[]> {
  const key = "projects_v2";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const q = query(collection(db(), "projects"), where("status", "in", ["Completed", "Active", "Planning", "Published", "published"]));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    const data = docs.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
    setCacheWithPrune(key, data, SHORT_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<any[]> {
  const key = "featuredProjects_v2";
  const cached = getCached<any[]>(key);
  if (cached) return cached;

  try {
    const q = query(collection(db(), "projects"), where("status", "in", ["Completed", "Active", "Planning", "Published", "published"]));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    // Filter locally for isFeatured to avoid needing a composite index
    const featuredDocs = docs.filter(doc => doc.isFeatured === true);
    const data = featuredDocs.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
    setCacheWithPrune(key, data, SHORT_TTL);
    return data;
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<any> {
  const key = `project:${slug}`;
  const cached = getCached<any>(key);
  if (cached) return cached;

  const q = query(collection(db(), "projects"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  const data = { id: firstDoc.id, ...firstDoc.data() };
  setCacheWithPrune(key, data, SHORT_TTL);
  return data;
}

// --- Applications ---
export async function submitJobApplication(data: any) {
  const { addDoc, serverTimestamp, collection } = await import("firebase/firestore");
  const docRef = await addDoc(collection(db(), "applications"), {
    ...data,
    status: "Applied",
    submittedAt: serverTimestamp(),
  });
  await addDoc(collection(db(), "notifications"), {
    title: "New Job Application",
    message: `${data.firstName} ${data.lastName} applied for ${data.jobTitle}`,
    type: "application",
    isRead: false,
    createdAt: serverTimestamp(),
    link: `/admin/dashboard/hr?tab=applications`,
  });
  return docRef;
}

export async function submitContactMessage(data: any) {
  const { addDoc, serverTimestamp, collection } = await import("firebase/firestore");
  const docRef = await addDoc(collection(db(), "contacts"), {
    ...data,
    type: "message",
    status: "New",
    createdAt: serverTimestamp(),
  });
  await addDoc(collection(db(), "notifications"), {
    title: "New Contact Message",
    message: `${data.firstName || data.name} sent a message.`,
    type: "contact",
    isRead: false,
    createdAt: serverTimestamp(),
    link: `/admin/dashboard/contact-cms`,
  });
  return docRef;
}

export async function submitProjectRequest(data: any) {
  const { addDoc, serverTimestamp, collection } = await import("firebase/firestore");
  const docRef = await addDoc(collection(db(), "contacts"), {
    ...data,
    type: "project",
    status: "New",
    createdAt: serverTimestamp(),
  });
  await addDoc(collection(db(), "notifications"), {
    title: "New Project Request",
    message: `${data.firstName || data.name} from ${data.company || "a company"} requested a project.`,
    type: "contact",
    isRead: false,
    createdAt: serverTimestamp(),
    link: `/admin/dashboard/contact-cms`,
  });
  return docRef;
}

export async function uploadResume(file: File) {
  const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
  const { storage } = await import("./config");
  const fileRef = ref(storage, `resumes/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

// --- Employees ---
export async function getEmployees(): Promise<any[]> {
  try {
    const q = query(collection(db(), "employees"), where("status", "==", "Active"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

// --- Investors ---
export async function getInvestors(): Promise<any[]> {
  try {
    const q = query(collection(db(), "investors"), where("status", "==", "Active"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch investors:", error);
    return [];
  }
}

// --- Case Studies ---
export async function getCaseStudiesFromDb(): Promise<any[]> {
  try {
    const q = query(collection(db(), "case-studies"), where("status", "==", "Published"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<any> {
  try {
    const q = query(collection(db(), "case-studies"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    const firstDoc = snapshot.docs[0];
    if (!firstDoc) return null;
    return { id: firstDoc.id, ...firstDoc.data() };
  } catch (error) {
    console.error(`Failed to fetch case study by slug (${slug}):`, error);
    return null;
  }
}
