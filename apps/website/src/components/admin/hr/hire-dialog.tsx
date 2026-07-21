"use client";

import { useState } from "react";
import { Button } from "@voryent/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@voryent/ui";
import { Input } from "@voryent/ui";
import { Label } from "@voryent/ui";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import { BriefcaseBusiness, Loader2 } from "lucide-react";

interface HireDialogProps {
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  defaultPosition?: string;
  trigger?: React.ReactNode;
}

export function HireDialog({
  applicationId,
  candidateName,
  candidateEmail,
  candidatePhone,
  defaultPosition,
  trigger
}: HireDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
    department: "",
    position: defaultPosition || "",
    employmentType: "Full-time",
    salary: "",
    joiningDate: new Date().toISOString().split("T")[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHire = async () => {
    try {
      setIsSubmitting(true);
      const { collection, doc, setDoc, updateDoc, serverTimestamp, addDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase/config");

      // 1. Create employee record
      await addDoc(collection(db, "employees"), {
        firstName: candidateName.split(" ")[0] || "",
        lastName: candidateName.split(" ").slice(1).join(" ") || "",
        email: candidateEmail,
        phone: candidatePhone || "",
        employeeId: formData.employeeId,
        department: formData.department,
        position: formData.position,
        employmentType: formData.employmentType,
        salary: formData.salary,
        joiningDate: formData.joiningDate,
        status: "Active",
        createdAt: serverTimestamp(),
      });

      // 2. Update application status
      await updateDoc(doc(db, "applications", applicationId), {
        status: "Hired"
      });

      // 3. Log activity
      if (user) {
        await addDoc(collection(db, "activityLogs"), {
          action: "Candidate Hired",
          details: `Hired ${candidateName} as ${formData.position}`,
          performedBy: user.email || "Admin",
          timestamp: serverTimestamp(),
        });
      }

      toast({ title: "Candidate hired successfully!" });
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      toast({ 
        title: "Failed to hire candidate", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            Hire Candidate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hire Candidate</DialogTitle>
          <DialogDescription>
            Onboard {candidateName} as a new employee. Fill in their role details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Engineering" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Position / Title</Label>
            <Input id="position" name="position" value={formData.position} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="employmentType">Type</Label>
              <select 
                id="employmentType" 
                name="employmentType" 
                value={formData.employmentType} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary</Label>
              <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. ,000" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input id="joiningDate" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleHire} disabled={isSubmitting || !formData.department || !formData.position}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Hire"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
