"use server";

import { headers } from "next/headers";
import { 
  submitJobApplication, 
  submitContactMessage, 
  submitProjectRequest, 
  uploadResume 
} from "@/lib/firebase/services";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_PER_WINDOW = 3;
const RATE_LIMIT_MAX_PER_DAY = 20;
const DAY_MS = 24 * 60 * 60 * 1000;

// Simple magic number check for PDF, DOC, DOCX
async function isValidFileType(file: File): Promise<boolean> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  if (buffer.length < 8) return false;
  
  const hex = buffer.subarray(0, 8).toString("hex").toUpperCase();
  
  const PDF_MAGIC = "25504446";
  const DOCX_MAGIC = "504B0304";
  const DOC_MAGIC = "D0CF11E0A1B11AE1";
  
  return hex.startsWith(PDF_MAGIC) || hex.startsWith(DOCX_MAGIC) || hex.startsWith(DOC_MAGIC);
}

// Extract IP
async function getClientIp() {
  const headersList = await headers();
  let ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  if (ip.includes(",")) {
    ip = ip.split(",")[0]?.trim() || "unknown";
  }
  return ip;
}

// Enforce Rate Limiting using Firestore
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; reason?: string }> {
  if (ip === "unknown") return { allowed: true }; // Fallback

  try {
    const docRef = doc(db, "rate_limits", ip.replace(/[^a-zA-Z0-9.:]/g, "_"));
    const docSnap = await getDoc(docRef);
    
    const now = Date.now();
    
    if (docSnap.exists()) {
      const data = docSnap.data() || {};
      let timestamps: number[] = data["timestamps"] || [];
      
      // Clean up old timestamps (older than 24h)
      timestamps = timestamps.filter(t => now - t < DAY_MS);
      
      // Check daily limit
      if (timestamps.length >= RATE_LIMIT_MAX_PER_DAY) {
        return { allowed: false, reason: "Daily submission limit reached. Try again tomorrow." };
      }
      
      // Check minute limit
      const lastMinute = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (lastMinute.length >= RATE_LIMIT_MAX_PER_WINDOW) {
        return { allowed: false, reason: "Too many requests. Please wait a minute." };
      }
      
      timestamps.push(now);
      await setDoc(docRef, { timestamps }, { merge: true });
    } else {
      await setDoc(docRef, { timestamps: [now] });
    }
    
    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check failed (possibly due to permissions). Bypassing limit:", error);
    return { allowed: true };
  }
}

// Verify Anti-Spam (Honeypot, Time, Token)
function verifyAntiSpam(formData: FormData): { valid: boolean; reason?: string } {
  // 1. Honeypot check
  const honeypot = formData.get("bot_field_website");
  if (honeypot) {
    return { valid: false, reason: "Spam detected." };
  }

  // 2. JS Challenge Token & Time Validation
  const token = formData.get("security_token") as string;
  if (!token) {
    return { valid: false, reason: "Security token missing. Please enable JavaScript." };
  }

  try {
    // Expected format: timestamp_hash
    const [timestampStr, hash] = token.split("_");
    if (!timestampStr || !hash) throw new Error("Invalid token format");
    const timestamp = parseInt(timestampStr, 36);
    
    // Simple hash verification (must match client side logic)
    const expectedHash = (timestamp * 7).toString(36);
    if (hash !== expectedHash) {
      return { valid: false, reason: "Security token invalid." };
    }

    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 3000) {
      return { valid: false, reason: "Form submitted too quickly." };
    }
    
    if (diff > 1000 * 60 * 60) {
      return { valid: false, reason: "Form session expired. Please refresh the page." };
    }
  } catch (err) {
    return { valid: false, reason: "Invalid security token." };
  }

  return { valid: true };
}

// Server Action: Submit Contact Form
export async function handleContactSubmission(formData: FormData) {
  try {
    const spamCheck = verifyAntiSpam(formData);
    if (!spamCheck.valid) return { error: spamCheck.reason };

    const ip = await getClientIp();
    const limitCheck = await checkRateLimit(ip);
    if (!limitCheck.allowed) return { error: limitCheck.reason };

    const data: any = {
      firstName: formData.get("name") as string || formData.get("firstName") as string || "",
      lastName: formData.get("lastName") as string || "",
      email: formData.get("email") as string || "",
      phone: formData.get("phone") as string || "",
      message: formData.get("message") as string || "",
      company: formData.get("company") as string || "",
      services: formData.getAll("services") as string[],
      projectType: formData.get("type") as string || formData.get("service") as string || "",
      budget: formData.get("budget") as string || "",
      timeline: formData.get("timeline") as string || "",
      ndaRequired: formData.get("nda") === "on" || formData.get("nda") === "true",
      formType: formData.get("formType") as string || "contact",
    };

    // Extract Base64 Attachment Data
    const attachmentBase64 = formData.get("attachmentBase64") as string;
    const attachmentName = formData.get("attachmentName") as string;
    const attachmentMimeType = formData.get("attachmentMimeType") as string;
    
    if (attachmentBase64) {
      data.attachmentBase64 = attachmentBase64;
      data.attachmentName = attachmentName;
      data.attachmentMimeType = attachmentMimeType;
    }

    // Basic Server-side validation
    if (!data.email || !data.email.includes("@")) {
      return { error: "Invalid email address." };
    }
    if (!data.firstName) {
      return { error: "Name is required." };
    }
    if (data.message && data.message.length > 5000) {
      return { error: "Message is too long." };
    }

    if (data.formType === "project") {
      await submitProjectRequest(data);
    } else {
      await submitContactMessage(data);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Contact Submission Error:", error);
    return { error: "Failed to submit. Please try again later." };
  }
}

export async function handleJobApplication(formData: FormData) {
  try {
    const spamCheck = verifyAntiSpam(formData);
    if (!spamCheck.valid) return { error: spamCheck.reason };

    const ip = await getClientIp();
    const limitCheck = await checkRateLimit(ip);
    if (!limitCheck.allowed) return { error: limitCheck.reason };

    const email = formData.get("email") as string;
    const jobSlug = formData.get("jobSlug") as string;
    const jobTitle = formData.get("jobTitle") as string;
    
    if (!email || !jobSlug) return { error: "Missing required fields." };

    // Check for duplicate application
    const q = query(
      collection(db, "applications"), 
      where("email", "==", email), 
      where("jobSlug", "==", jobSlug)
    );
    const existingDocs = await getDocs(q);
    if (!existingDocs.empty) {
      return { error: "You have already applied for this position." };
    }

    const file = formData.get("resume") as File;
    if (!file || file.size === 0) {
      return { error: "Resume is required." };
    }

    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { error: "Resume must be under 5MB." };
    }

    // File type validation (Magic Number check)
    const isValid = await isValidFileType(file);
    if (!isValid) {
      return { error: "Invalid file type. Only PDF, DOC, and DOCX are allowed. We scan for fake extensions." };
    }

    const data = {
      fullName: formData.get("fullName") as string,
      email: email,
      phone: formData.get("phone") as string,
      linkedIn: formData.get("linkedIn") as string,
      portfolio: formData.get("portfolio") as string,
      coverLetter: formData.get("coverLetter") as string,
      jobSlug: jobSlug,
      jobTitle: jobTitle,
    };

    const resumeUrl = await uploadResume(file);
    await submitJobApplication({ ...data, resumeUrl });
    return { success: true };
  } catch (error: any) {
    console.error("Job Application Error:", error);
    return { error: "Failed to submit application. Please try again later." };
  }
}
