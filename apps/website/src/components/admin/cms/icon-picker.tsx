"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "@voryent/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Search } from "lucide-react";

// A curated list of popular icons for quick access, or we can use all icons
const POPULAR_ICONS = [
  "Activity", "ArrowRight", "BarChart", "BookOpen", "Box", "Briefcase", 
  "Building2", "Calendar", "CheckCircle", "Cloud", "Code", "Compass", 
  "Cpu", "Database", "DownloadCloud", "Factory", "FileBox", "FileText", 
  "Globe", "GraduationCap", "HeartPulse", "Key", "Landmark", "Layers", 
  "Layout", "Lightbulb", "Link", "Map", "MessageSquare", "Monitor", 
  "PieChart", "Rocket", "Settings", "Shield", "ShoppingBag", "Smartphone", 
  "Star", "Target", "Tool", "Truck", "Users", "Wrench", "Zap", "Brain"
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = POPULAR_ICONS.filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase())
  );

  const CurrentIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start text-left font-normal"
        >
          {value ? (
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4" />
              <span>{value}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select an icon...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0"
          />
        </div>
        <div className="h-[250px] overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-5 gap-2 p-4">
            {filteredIcons.map((iconName) => {
              const Icon = (LucideIcons as any)[iconName];
              if (!Icon) return null;
              return (
                <Button
                  key={iconName}
                  variant={value === iconName ? "default" : "ghost"}
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                  title={iconName}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              );
            })}
          </div>
          {filteredIcons.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No icons found.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
