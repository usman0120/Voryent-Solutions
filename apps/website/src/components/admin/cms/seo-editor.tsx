"use client";

import { Input } from "@voryent/ui";
import { Label } from "@voryent/ui";
import { Textarea } from "@voryent/ui";

interface SeoEditorProps {
  value: any;
  onChange: (value: any) => void;
}

export function SeoEditor({ value, onChange }: SeoEditorProps) {
  const handleChange = (field: string, val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <h3 className="text-lg font-medium">SEO Settings</h3>
      <div className="space-y-2">
        <Label>Meta Title</Label>
        <Input
          value={value?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="SEO Title"
        />
      </div>
      <div className="space-y-2">
        <Label>Meta Description</Label>
        <Textarea
          value={value?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="SEO Description"
        />
      </div>
      <div className="space-y-2">
        <Label>Keywords</Label>
        <Input
          value={value?.keywords || ""}
          onChange={(e) => handleChange("keywords", e.target.value)}
          placeholder="Comma-separated keywords"
        />
      </div>
    </div>
  );
}
