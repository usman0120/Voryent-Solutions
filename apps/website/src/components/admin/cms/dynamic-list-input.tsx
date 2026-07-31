"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Plus, X, GripVertical } from "lucide-react";

interface DynamicListInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function DynamicListInput({ value = [], onChange, placeholder = "Enter an item..." }: DynamicListInputProps) {
  const items = Array.isArray(value) ? value : [];
  const displayItems = items.length > 0 ? items : [""];

  const handleItemChange = (index: number, newValue: string) => {
    const newItems = [...displayItems];
    newItems[index] = newValue;
    onChange(newItems);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.includes("\n")) {
      e.preventDefault();
      const newLines = pastedText
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      if (newLines.length > 0) {
        const newItems = [...displayItems];
        newItems.splice(index, 1, ...newLines);
        onChange(newItems);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...displayItems];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      
      setTimeout(() => {
        const nextInput = document.getElementById(`list-input-${index + 1}`);
        nextInput?.focus();
      }, 10);
    } else if (e.key === "Backspace" && displayItems[index] === "" && displayItems.length > 1) {
      e.preventDefault();
      const newItems = [...displayItems];
      newItems.splice(index, 1);
      onChange(newItems);
      
      setTimeout(() => {
        const prevInput = document.getElementById(`list-input-${index - 1}`);
        prevInput?.focus();
      }, 10);
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...displayItems];
    newItems.splice(index, 1);
    if (newItems.length === 0) {
      newItems.push("");
    }
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...displayItems, ""]);
  };

  return (
    <div className="space-y-2">
      {displayItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-1" />
          </div>
          <Input
            id={`list-input-${index}`}
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeItem(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 text-primary"
        onClick={addItem}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Bullet Point
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Tip: You can paste a bulleted list to automatically create multiple items. Press Enter to add a new line.
      </p>
    </div>
  );
}
