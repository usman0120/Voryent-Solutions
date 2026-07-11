import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./config";

// --- Homepage ---
export async function getHomepageData() {
  const docRef = doc(db, "pages", "homepage");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// --- Services ---
export async function getServices() {
  const q = query(
    collection(db, "services"),
    where("status", "==", "published"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  const q = query(
    collection(db, "industries"),
    where("status", "==", "published"),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// --- Blog ---
export async function getBlogPosts() {
  const q = query(
    collection(db, "blogPosts"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  const snapshot = await getDocs(collection(db, "resources"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  const q = query(
    collection(db, "jobs"),
    where("status", "==", "Published")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

