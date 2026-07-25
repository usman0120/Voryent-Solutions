"use client";

import React, { useState } from "react";
import { Button } from "@voryent/ui";
import { X, Plus } from "lucide-react";

interface ArrayInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function ArrayInput({ label, values, onChange, placeholder }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addValue = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeValue = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded-xl bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button type="button" variant="secondary" onClick={addValue}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((value, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1"
          >
            {value}
            <button
              type="button"
              onClick={() => removeValue(i)}
              className="hover:text-red-500 ml-1 focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
