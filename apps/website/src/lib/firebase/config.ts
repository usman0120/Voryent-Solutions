import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKWBVMTorgguQB203TzJErX9Eu0d0l4J4",
  authDomain: "voryent-solutions.firebaseapp.com",
  projectId: "voryent-solutions",
  storageBucket: "voryent-solutions.firebasestorage.app",
  messagingSenderId: "880427890600",
  appId: "1:880427890600:web:f905900ce7f3a3d38b8f9d",
  measurementId: "G-7D2FPP431D",
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
