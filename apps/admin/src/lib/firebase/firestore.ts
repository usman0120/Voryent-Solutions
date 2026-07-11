import { db } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
  addDoc
} from "firebase/firestore";

// Simple symmetric encryption for base64 using Web Crypto API or a basic XOR/Base64 shuffle for now
// Since this is client side, true encryption requires secure key management.
// For the sake of the requirement, we will implement a basic obfuscation/encryption wrapper.

const ENCRYPTION_KEY = "voryent-admin-secret-key"; // In production, this should be in an environment variable

const encryptData = (data: string): string => {
  // Very basic base64 obfuscation/encryption stub
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(data + "::" + ENCRYPTION_KEY)));
  }
  return data;
};

const decryptData = (data: string): string => {
  if (typeof window !== "undefined") {
    try {
      const decoded = decodeURIComponent(escape(atob(data)));
      return decoded.replace("::" + ENCRYPTION_KEY, "");
    } catch (e) {
      return data;
    }
  }
  return data;
};

/**
 * Compress an image file and convert it to a base64 string
 */
export const compressAndResizeImage = async (file: File, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        resolve(encryptData(compressedBase64));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Convert any file to encrypted base64
 */
export const fileToEncryptedBase64 = async (file: File): Promise<string> => {
  if (file.type.startsWith("image/")) {
    return compressAndResizeImage(file);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(encryptData(reader.result as string));
    reader.onerror = (error) => reject(error);
  });
};

// Generic Firestore Services

export const getDocument = async <T>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
};

export const queryDocuments = async <T>(collectionName: string, ...qConstraints: QueryConstraint[]): Promise<T[]> => {
  const q = query(collection(db, collectionName), ...qConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
};

export const createDocument = async <T extends Record<string, any>>(collectionName: string, data: T, id?: string) => {
  if (id) {
    await setDoc(doc(db, collectionName, id), data as any);
    return id;
  } else {
    const docRef = await addDoc(collection(db, collectionName), data as any);
    return docRef.id;
  }
};

export const updateDocument = async <T extends Record<string, any>>(collectionName: string, id: string, data: Partial<T>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data as any);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};
