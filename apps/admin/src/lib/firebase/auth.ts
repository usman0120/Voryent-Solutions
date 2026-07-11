import { auth } from "./config";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export const loginAdmin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutAdmin = async () => {
  await signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
