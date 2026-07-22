import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

function getDb() {
  const firebaseConfig = {
    apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
    authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
    projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
    storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
    messagingSenderId: process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
    appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return getFirestore(app);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 200 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    
    try {
      const db = getDb();
      const subCollection = collection(db, "blogSubscriptions");

      // Save subscription
      await addDoc(subCollection, {
        email: cleanEmail,
        subscribedAt: serverTimestamp(),
        createdAt: new Date().toISOString(),
        status: "Active",
        isArchived: false,
      });

      // Create admin notification
      try {
        await addDoc(collection(db, "notifications"), {
          title: "New Blog Subscriber",
          message: `${cleanEmail} subscribed to the newsletter.`,
          type: "blog",
          isRead: false,
          createdAt: serverTimestamp(),
          link: `/admin/dashboard/blog`,
        });
      } catch (e) {
        // Ignore notification errors
      }
    } catch (dbErr: any) {
      console.warn("Firestore server save warning:", dbErr?.message || dbErr);
    }

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to our newsletter!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Newsletter Subscribe error:", error);
    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to our newsletter!" },
      { status: 200 }
    );
  }
}
