"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voryent/ui";

interface StatusSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}

export function StatusSelector({
  value,
  onChange,
  options = ["Draft", "Published", "Archived"],
}: StatusSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
