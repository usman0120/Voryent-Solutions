"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/lib/admin/services/subscription.service";
import { Input, Button, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@voryent/ui";
import { Search, Download, Trash2, MailCheck, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { TableGridSkeleton } from "@/components/ui/generic-grid-skeleton";

export function SubscriptionsTable() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data: subscribers = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["blogSubscriptions"],
    queryFn: () => subscriptionService.getAll(),
  });

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subscribers, searchQuery]);

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsAdding(true);
    try {
      await subscriptionService.create({
        email: newEmail.trim().toLowerCase(),
        status: "Active",
      });
      toast.success(`Added ${newEmail} to subscribers!`);
      setNewEmail("");
      setOpenAddModal(false);
      queryClient.invalidateQueries({ queryKey: ["blogSubscriptions"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to add subscriber.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to remove ${email} from subscribers?`)) {
      try {
        await subscriptionService.delete(id);
        toast.success(`Removed ${email} from subscribers.`);
        queryClient.invalidateQueries({ queryKey: ["blogSubscriptions"] });
      } catch (err: any) {
        toast.error("Failed to delete subscriber.");
      }
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return toast.error("No subscribers to export.");
    const headers = ["Email", "Subscribed At", "Status"];
    const rows = subscribers.map((sub) => {
      let dateStr = "Recently";
      if (sub.subscribedAt?.seconds) dateStr = new Date(sub.subscribedAt.seconds * 1000).toLocaleString();
      else if (sub.createdAt?.seconds) dateStr = new Date(sub.createdAt.seconds * 1000).toLocaleString();
      else if (typeof sub.createdAt === "string") dateStr = new Date(sub.createdAt).toLocaleString();
      return `"${sub.email}","${dateStr}","${sub.status || "Active"}"`;
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Subscriber list exported to CSV.");
  };

  if (isLoading) {
    return <TableGridSkeleton rows={5} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-lg border">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="ghost" size="sm" onClick={() => refetch()} disabled={isRefetching}>
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </Button>

          <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-1.5 h-4 w-4" /> Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Newsletter Subscriber</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubscriber} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpenAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isAdding}>
                    {isAdding ? "Adding..." : "Add Subscriber"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-1.5 h-4 w-4" /> Export CSV ({subscribers.length})
          </Button>
        </div>
      </div>

      <div className="border rounded-md bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((sub) => {
                let dateStr = "Recently";
                if (sub.subscribedAt?.seconds) dateStr = new Date(sub.subscribedAt.seconds * 1000).toLocaleString();
                else if (sub.createdAt?.seconds) dateStr = new Date(sub.createdAt.seconds * 1000).toLocaleString();
                else if (typeof sub.createdAt === "string") dateStr = new Date(sub.createdAt).toLocaleString();

                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <MailCheck className="h-4 w-4 text-primary" /> {sub.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{dateStr}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        {sub.status || "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sub.id!, sub.email)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No subscribers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
