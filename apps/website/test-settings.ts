import { db } from "./src/lib/firebase/config.ts";
import { doc, getDoc } from "firebase/firestore";

async function run() {
  const socialSnap = await getDoc(doc(db(), "settings", "social"));
  console.log("Social:", socialSnap.data());
  
  const contactSnap = await getDoc(doc(db(), "settings", "contact"));
  console.log("Contact:", contactSnap.data());
}
run();
