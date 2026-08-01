import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { hardcodedIndustries } from "../../data/industries";

export type Industry = any;

export const industriesService = {
  getAll: async () => {
    // Fetch overrides from Firestore
    const snapshot = await getDocs(collection(db, "industries"));
    const overrides = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    
    // Merge hardcoded industries with any overrides
    return hardcodedIndustries.map(industry => {
      const override = overrides.find(o => o.id === industry.slug || o.slug === industry.slug);
      return {
        ...industry,
        ...override,
        id: industry.slug // Ensure ID is the slug for updates
      };
    }).sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  
  updateStatus: async (id: string, data: { status?: string; featured?: boolean }) => {
    const docRef = doc(db, "industries", id);
    // Use setDoc with merge: true to just create/update the overrides
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  }
};
