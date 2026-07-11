"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search across modules..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
        <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <button className="flex items-center gap-2 rounded-full p-2 hover:bg-muted transition-colors">
          <UserCircle className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
