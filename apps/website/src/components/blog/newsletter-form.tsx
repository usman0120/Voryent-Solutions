"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { subscribeBlogNewsletter } from "@/lib/firebase/services";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmittingEmail(true);
    try {
      await subscribeBlogNewsletter(email);
      toast.success("Thank you for subscribing! You will receive our latest updates.");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="border border-background/20 p-8 bg-background/5">
      <form className="flex flex-col gap-4" onSubmit={handleSubscribe} suppressHydrationWarning>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-background mb-3">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-6 py-4 bg-background text-foreground border-none outline-none font-medium placeholder:text-muted-foreground"
            required
            suppressHydrationWarning
          />
        </div>
        <button 
          type="submit" 
          className="h-14 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 mt-4 disabled:opacity-50" 
          disabled={isSubmittingEmail}
          suppressHydrationWarning
        >
          <Send className="h-4 w-4" /> {isSubmittingEmail ? "Subscribing..." : "Subscribe to Newsletter"}
        </button>
      </form>
    </div>
  );
}
