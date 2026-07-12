import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

interface StringArrayInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function StringArrayInput({ value, onChange, placeholder = "Add item..." }: StringArrayInputProps) {
  const [current, setCurrent] = useState("");

  const handleAdd = () => {
    if (current.trim()) {
      onChange([...(value || []), current.trim()]);
      setCurrent("");
    }
  };

  const handleRemove = (index: number) => {
    const newVal = [...(value || [])];
    newVal.splice(index, 1);
    onChange(newVal);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Textarea 
          placeholder={placeholder}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAdd();
            }
          }}
          className="min-h-[80px]"
        />
        <Button type="button" variant="outline" size="icon" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {(value || []).map((item, index) => (
          <div key={index} className="flex items-start justify-between rounded-md border p-3 bg-muted/50">
            <p className="text-sm text-foreground whitespace-pre-wrap flex-1 mr-4">{item}</p>
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => handleRemove(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
