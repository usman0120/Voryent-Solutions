import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./config";

// --- Homepage ---
export async function getHomepageData() {
  const docRef = doc(db, "pages", "homepage");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getAboutData() {
  const docRef = doc(db, "pages", "about");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// --- Services ---
export async function getServices() {
  try {
    const q = query(
      collection(db, "services"),
      where("status", "==", "published")
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    return docs.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  const q = query(
    collection(db, "services"),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  return { id: firstDoc.id, ...firstDoc.data() };
}

// --- Industries ---
export async function getIndustries() {
  try {
    const q = query(
      collection(db, "industries"),
      where("status", "==", "published")
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    return docs.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Failed to fetch industries:", error);
    return [];
  }
}

// --- Blog ---
export async function getBlogPosts() {
  try {
    const q = query(
      collection(db, "blogPosts"),
      where("status", "==", "published")
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    return docs.sort((a, b) => {
      const timeA = a.publishedAt?.toMillis?.() || 0;
      const timeB = b.publishedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const q = query(
    collection(db, "blogPosts"),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  return { id: firstDoc.id, ...firstDoc.data() };
}

// --- FAQ ---
export async function getFaqs() {
  const snapshot = await getDocs(collection(db, "faqItems"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// --- Resources ---
export async function getResources() {
  try {
    const snapshot = await getDocs(collection(db, "resources"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

// --- SEO ---
export async function getSeoSettings() {
  const docRef = doc(db, "settings", "seo");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getAnalyticsSettings() {
  const docRef = doc(db, "settings", "analytics");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// --- Careers CMS & Jobs ---
export async function getCareersData() {
  const docRef = doc(db, "pages", "careers");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getCareersJobs() {
  try {
    const q = query(
      collection(db, "jobs"),
      where("status", "==", "Published")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

export async function getJobBySlug(slug: string) {
  const q = query(
    collection(db, "jobs"),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  return { id: firstDoc.id, ...firstDoc.data() };
}

// --- Settings ---
export async function getSocialSettings() {
  const docRef = doc(db, "settings", "social");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getContactSettings() {
  const docRef = doc(db, "settings", "contact");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// --- Projects ---
export async function getProjects(): Promise<any[]> {
  try {
    const q = query(
      collection(db, "projects"),
      where("status", "==", "Completed") // Only fetch completed ones for public
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    return docs.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<any> {
  const q = query(
    collection(db, "projects"),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  return { id: firstDoc.id, ...firstDoc.data() };
}

// --- Applications ---
export async function submitJobApplication(data: any) {
  const { addDoc, serverTimestamp } = await import("firebase/firestore");
  return addDoc(collection(db, "applications"), {
    ...data,
    status: "New",
    submittedAt: serverTimestamp(),
  });
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
    const q = query(
      collection(db, "employees"),
      where("status", "==", "Active")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

// --- Investors ---
export async function getInvestors(): Promise<any[]> {
  try {
    const q = query(
      collection(db, "investors"),
      where("status", "==", "Active")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch investors:", error);
    return [];
  }
}

// --- Case Studies ---
export async function getCaseStudiesFromDb(): Promise<any[]> {
  try {
    const q = query(
      collection(db, "case-studies"),
      where("status", "==", "Published")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<any> {
  const q = query(
    collection(db, "case-studies"),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const firstDoc = snapshot.docs[0];
  if (!firstDoc) return null;
  return { id: firstDoc.id, ...firstDoc.data() };
}
