"use client";

import { useState } from "react";
import { Button } from "@voryent/ui";
import { Share2, Copy, Check, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";

interface BlogShareButtonsProps {
  title: string;
  url?: string;
}

export function BlogShareButtons({ title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    const url = getUrl();
    if (url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`Check out "${title}" on Voryent Solutions`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const handleShareLinkedin = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-border/40 my-8">
      <span className="text-sm font-semibold text-muted-foreground mr-2 flex items-center gap-1.5">
        <Share2 className="h-4 w-4" /> Share Article:
      </span>
      <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5">
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Button variant="outline" size="sm" onClick={handleShareLinkedin} className="gap-1.5">
        <Linkedin className="h-3.5 w-3.5 text-blue-500" /> LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={handleShareTwitter} className="gap-1.5">
        <Twitter className="h-3.5 w-3.5 text-sky-400" /> Twitter
      </Button>
    </div>
  );
}
