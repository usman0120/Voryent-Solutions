"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DownloadModal } from "./download-modal";

interface CaseStudyCardProps {
  study: any;
  index: number;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
];

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Use real image if it exists and isn't the default AI placeholder, otherwise use a high-quality fallback
  const isDefaultPlaceholder = !study.coverImage || 
    study.coverImage.includes("AI Illustration") || 
    study.coverImage.includes("AI%20Illustration") ||
    study.coverImage.trim() === "";
    
  const displayImage = isDefaultPlaceholder ? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length] : study.coverImage;

  return (
    <>
      <div className="group flex flex-col h-full bg-background">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted mb-6 border border-border/60">
          <img
            src={displayImage}
            alt={study.title}
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
        
        <div className="flex flex-col flex-grow px-2">
          {study.industry && (
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border/60 pb-2 self-start">
              {study.industry}
            </div>
          )}
          
          <h3 className="mb-3 text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {study.title}
          </h3>
          
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {study.description}
          </p>
          
          <button 
            onClick={() => setModalOpen(true)}
            className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-foreground"
          >
            Read More <ArrowRight className="ml-2 h-3 w-3" />
          </button>
        </div>
      </div>
      
      <DownloadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        caseStudyTitle={study.title}
        caseStudyId={study.id}
        downloadLink={study.downloadLink}
        fileBase64={study.fileBase64}
        fileName={study.fileName}
        fileType={study.fileType}
      />
    </>
  );
}
