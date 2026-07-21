import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKWBVMTorgguQB203TzJErX9Eu0d0l4J4",
  authDomain: "voryent-solutions.firebaseapp.com",
  projectId: "voryent-solutions",
  storageBucket: "voryent-solutions.firebasestorage.app",
  messagingSenderId: "880427890600",
  appId: "1:880427890600:web:f905900ce7f3a3d38b8f9d",
  measurementId: "G-7D2FPP431D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function setupAdmin() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "admin@voryentsolutions.com", "Admin123!");
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "admin",
      displayName: "Admin User",
      createdAt: new Date().toISOString()
    });
    
    console.log("Admin account created successfully!");
    console.log("Email: admin@voryentsolutions.com");
    console.log("Password: Admin123!");
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Admin account already exists.");
      process.exit(0);
    }
    console.error("Error creating admin account:", error);
    process.exit(1);
  }
}

setupAdmin();
