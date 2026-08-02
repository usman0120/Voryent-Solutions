"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, CardContent } from "@voryent/ui";
import { Download } from "lucide-react";
import { DownloadModal } from "./download-modal";

interface CaseStudyCardProps {
  study: any;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="border-border/50 bg-card group flex h-full flex-col overflow-hidden shadow-sm transition-all hover:shadow-md">
        <div className="bg-muted relative h-48 w-full overflow-hidden sm:h-56">
          <Image
            src={
              study.coverImage ||
              "/Assets/Illustrations/AI Illustration.webp"
            }
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {study.category && (
            <div className="bg-background/90 absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
              {study.category}
            </div>
          )}
        </div>
        <CardContent className="flex flex-grow flex-col p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-primary text-sm font-semibold uppercase tracking-wider">
              {study.industry}
            </div>
          </div>
          <h3 className="text-foreground mb-4 text-2xl font-bold leading-tight">
            {study.title}
          </h3>
          <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
            {study.description}
          </p>
          <Button 
            onClick={() => setModalOpen(true)} 
            variant="default" 
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Case Study
          </Button>
        </CardContent>
      </Card>
      
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
