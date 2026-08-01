import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { hardcodedServices } from "../../data/services";

export const servicesService = {
  getAll: async () => {
    // Fetch overrides from Firestore
    const snapshot = await getDocs(collection(db, "services"));
    const overrides = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    
    // Merge hardcoded services with any overrides
    return hardcodedServices.map(service => {
      const override = overrides.find(o => o.id === service.slug || o.slug === service.slug);
      return {
        ...service,
        ...override,
        id: service.slug // Ensure ID is the slug for updates
      };
    }).sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  
  updateStatus: async (id: string, data: { status?: string; featured?: boolean }) => {
    const docRef = doc(db, "services", id);
    // Use setDoc with merge: true to just create/update the overrides
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  }
};
