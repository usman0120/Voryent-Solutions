"use client";

import { Bell, Search, UserCircle, LogOut, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@voryent/ui";
import { logoutAdmin } from "@/lib/admin/firebase/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/lib/admin/react-query/notifications.hooks";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/providers/auth-provider";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const { user, role } = useAuth();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = (id: string, link?: string) => {
    markRead.mutate(id);
    if (link) {
      window.location.href = link;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
          className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted transition-colors h-9 w-9"
          aria-label="Toggle theme"
        >
          {mounted && (
            <>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          )}
        </button>

        <Popover>
          <PopoverTrigger asChild>
                        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted transition-colors h-9 w-9">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 max-h-[400px] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium leading-none">Notifications</h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => markAllRead.mutate(notifications.map(n => n.id))}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              {notificationsLoading ? (
                <p className="text-sm text-muted-foreground text-center py-4">Loading...</p>
              ) : notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">You have no notifications.</p>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex flex-col space-y-1 p-2 rounded-md transition-colors ${notification.isRead ? "opacity-60" : "bg-muted/50"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground cursor-pointer hover:underline" onClick={() => handleMarkRead(notification.id, notification.link)}>
                          {notification.title}
                        </span>
                        {!notification.isRead && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1"></span>}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 cursor-pointer" onClick={() => handleMarkRead(notification.id, notification.link)}>
                        {notification.message}
                      </p>
                      {notification.createdAt && (
                        <span className="text-[10px] text-muted-foreground/70">
                          {formatDistanceToNow(notification.createdAt.toDate ? notification.createdAt.toDate() : new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center rounded-full hover:bg-muted transition-colors h-9 w-9">
              <UserCircle className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.displayName || "Admin User"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                {role && <p className="text-[10px] uppercase tracking-wider text-primary mt-1">{typeof role === 'string' ? role : (role as any).name}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutAdmin} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

