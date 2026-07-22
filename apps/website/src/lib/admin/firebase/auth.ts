import { auth } from "./config";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import type { User } from "firebase/auth";
import { logActivity } from "../services/activity-logs.service";

export const loginAdmin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  try {
    await logActivity("Admin Login", `Admin user ${userCredential.user.email} logged in.`, userCredential.user.uid);
  } catch (e) {
    console.error("Failed to log login activity", e);
  }
  return userCredential.user;
};

export const logoutAdmin = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await logActivity("Admin Logout", `Admin user ${user.email} logged out.`, user.uid);
    } catch (e) {
      console.error("Failed to log logout activity", e);
    }
  }
  await signOut(auth);
};

export const resetAdminPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
