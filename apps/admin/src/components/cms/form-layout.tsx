"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  description?: string;
  backHref: string;
  children: ReactNode;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function FormLayout({
  title,
  description,
  backHref,
  children,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Changes",
}: FormLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={backHref}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </div>
      <div className="mx-auto max-w-4xl">
        {children}
      </div>
    </div>
  );
}
