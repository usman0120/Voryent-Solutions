"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { slugify } from "@/lib/utils";

interface SlugFieldProps {
  value: string;
  onChange: (value: string) => void;
  sourceValue?: string;
}

export function SlugField({ value, onChange, sourceValue }: SlugFieldProps) {
  const handleGenerate = () => {
    if (sourceValue) {
      onChange(slugify(sourceValue));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., my-awesome-page"
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleGenerate}
        disabled={!sourceValue}
        title="Generate from title"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
