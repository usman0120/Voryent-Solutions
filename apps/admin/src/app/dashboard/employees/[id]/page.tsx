"use client";

import { useEmployee, useUpdateEmployee } from "@/lib/react-query/employees.hooks";
import { useAuth } from "@/providers/auth-provider";
import { hasPermission } from "@/lib/utils/permissions";
import { use } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@voryent/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@voryent/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { empStatusColorMap } from "../columns";
import { 
  User, Mail, Phone, MapPin, Calendar, DollarSign, 
  Briefcase, FileText, ChevronLeft, ShieldCheck, HeartCrack, 
  NotebookPen, ShieldAlert 
} from "lucide-react";
import { useState, useEffect } from "react";

interface EmployeeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const resolvedParams = use(params);
  const { toast } = useToast();
  const { role, user } = useAuth();

  const { data: employee, isLoading } = useEmployee(resolvedParams.id);
  const updateMutation = useUpdateEmployee(user?.uid);

  const canManage = hasPermission(role, "manage_employees");

  // State variables for inline edits
  const [formData, setFormData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
        department: employee.department || "",
        employmentType: employee.employmentType || "Full-time",
        manager: employee.manager || "",
        joiningDate: employee.joiningDate || "",
        salary: employee.salary || "",
        currency: employee.currency || "USD",
        status: employee.status || "Active",
        address: employee.address || "",
        emergencyContact: {
          name: employee.emergencyContact?.name || "",
          relationship: employee.emergencyContact?.relationship || "",
          phone: employee.emergencyContact?.phone || "",
        },
        performanceReviews: employee.performanceReviews || [],
        skills: employee.skills || [],
        notes: employee.notes || "",
      });
    }
  }, [employee]);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">Loading employee profile...</div>;
  }

  if (!employee) {
    return <div className="flex h-64 items-center justify-center">Employee record not found.</div>;
  }

  if (!canManage) {
    return <div className="flex h-64 items-center justify-center text-muted-foreground">Unauthorized.</div>;
  }

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        id: resolvedParams.id,
        data: formData
      });
      setIsEditing(false);
      toast({ title: "Employee profile saved." });
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
  };

  const badgeClass = empStatusColorMap[employee.status] || "bg-gray-500/10 text-gray-500 border-gray-500/20";

  return (
    <div className="space-y-6">
      {/* HEADER BREADCRUMB */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard/employees" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium">
          <ChevronLeft className="h-4 w-4" /> Employee Directory
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: EMPLOYEE CARD SUMMARY */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="text-center p-6">
            <CardContent className="space-y-4 pt-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto text-3xl font-bold">
                {employee.firstName?.[0]}{employee.lastName?.[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-muted-foreground text-sm">{employee.position}</p>
                <p className="text-xs text-primary font-semibold mt-1">{employee.employeeId}</p>
              </div>

              <div className="flex justify-center">
                <Badge variant="outline" className={badgeClass}>
                  {employee.status}
                </Badge>
              </div>

              <div className="border-t pt-4 space-y-3 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{employee.employmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joining Date:</span>
                  <span className="font-medium">{employee.joiningDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: DETAILED TABS */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
              <CardTitle className="text-lg">Detailed Information</CardTitle>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={updateMutation.isPending}>
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="documents">Docs</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">First Name</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.firstName || ""}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Last Name</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.lastName || ""}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                    <Input
                      disabled={!isEditing}
                      value={formData.email || ""}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Position</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.position || ""}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Department</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.department || ""}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* PERSONAL TAB */}
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Address</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.address || ""}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="pt-4 border-t space-y-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <HeartCrack className="h-4 w-4 text-red-500" /> Emergency Contact Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground">Contact Name</label>
                        <Input
                          disabled={!isEditing}
                          value={formData.emergencyContact?.name || ""}
                          onChange={(e) => setFormData({
                            ...formData,
                            emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground">Relationship</label>
                        <Input
                          disabled={!isEditing}
                          value={formData.emergencyContact?.relationship || ""}
                          onChange={(e) => setFormData({
                            ...formData,
                            emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                        <Input
                          disabled={!isEditing}
                          value={formData.emergencyContact?.phone || ""}
                          onChange={(e) => setFormData({
                            ...formData,
                            emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* EMPLOYMENT TAB */}
                <TabsContent value="employment" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Joining Date</label>
                      <Input
                        type="date"
                        disabled={!isEditing}
                        value={formData.joiningDate || ""}
                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Employment Status</label>
                      <Select
                        disabled={!isEditing}
                        onValueChange={(val) => setFormData({ ...formData, status: val })}
                        value={formData.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Probation">Probation</SelectItem>
                          <SelectItem value="Notice Period">Notice Period</SelectItem>
                          <SelectItem value="Resigned">Resigned</SelectItem>
                          <SelectItem value="Terminated">Terminated</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Employment Type</label>
                      <Select
                        disabled={!isEditing}
                        onValueChange={(val) => setFormData({ ...formData, employmentType: val })}
                        value={formData.employmentType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground">Base Salary</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.salary || ""}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">Currency</label>
                      <Input
                        disabled={!isEditing}
                        value={formData.currency || "USD"}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <label className="text-xs font-semibold text-muted-foreground">Notes / Internal Record</label>
                    <Textarea
                      disabled={!isEditing}
                      value={formData.notes || ""}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                    />
                  </div>
                </TabsContent>

                {/* DOCUMENTS TAB */}
                <TabsContent value="documents" className="space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Employee Attachments
                  </h4>
                  {employee.documents && employee.documents.length > 0 ? (
                    <div className="space-y-2">
                      {employee.documents.map((doc: any, i: number) => (
                        <div key={i} className="flex justify-between items-center border p-3 rounded-md bg-muted/20 text-sm">
                          <span className="font-semibold truncate max-w-sm">{doc.name}</span>
                          <a
                            href={doc.fileData}
                            download={doc.name}
                            className="text-primary hover:underline font-medium flex items-center gap-1 text-xs"
                          >
                            Download Document
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">No documents uploaded.</div>
                  )}
                </TabsContent>

                {/* PERFORMANCE TAB */}
                <TabsContent value="performance" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <NotebookPen className="h-4 w-4 text-emerald-500" /> Performance Reviews
                    </h4>
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setFormData({
                          ...formData,
                          performanceReviews: [
                            ...(formData.performanceReviews || []),
                            { reviewDate: new Date().toISOString().split("T")[0], reviewer: "", rating: 3, comments: "" }
                          ]
                        })}
                      >
                        Add Review
                      </Button>
                    )}
                  </div>
                  
                  {formData.performanceReviews?.length > 0 ? (
                    <div className="space-y-4">
                      {formData.performanceReviews.map((review: any, i: number) => (
                        <Card key={i} className="p-4 border bg-muted/5 relative">
                          {isEditing && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 text-destructive h-8 w-8 p-0"
                              onClick={() => {
                                const newReviews = [...formData.performanceReviews];
                                newReviews.splice(i, 1);
                                setFormData({ ...formData, performanceReviews: newReviews });
                              }}
                            >
                              x
                            </Button>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-muted-foreground">Date</label>
                              <Input
                                type="date"
                                disabled={!isEditing}
                                value={review.reviewDate}
                                onChange={(e) => {
                                  const newReviews = [...formData.performanceReviews];
                                  newReviews[i].reviewDate = e.target.value;
                                  setFormData({ ...formData, performanceReviews: newReviews });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-muted-foreground">Reviewer</label>
                              <Input
                                disabled={!isEditing}
                                value={review.reviewer}
                                placeholder="Manager Name"
                                onChange={(e) => {
                                  const newReviews = [...formData.performanceReviews];
                                  newReviews[i].reviewer = e.target.value;
                                  setFormData({ ...formData, performanceReviews: newReviews });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-muted-foreground">Rating (1-5)</label>
                              <Input
                                type="number"
                                min="1"
                                max="5"
                                disabled={!isEditing}
                                value={review.rating}
                                onChange={(e) => {
                                  const newReviews = [...formData.performanceReviews];
                                  newReviews[i].rating = parseInt(e.target.value) || 0;
                                  setFormData({ ...formData, performanceReviews: newReviews });
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground">Comments</label>
                            <Textarea
                              disabled={!isEditing}
                              value={review.comments}
                              placeholder="Performance summary..."
                              onChange={(e) => {
                                const newReviews = [...formData.performanceReviews];
                                newReviews[i].comments = e.target.value;
                                setFormData({ ...formData, performanceReviews: newReviews });
                              }}
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground border border-dashed rounded-md">No performance reviews yet.</div>
                  )}

                  <div className="pt-6 border-t mt-6">
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-4">
                      <Briefcase className="h-4 w-4 text-primary" /> Core Skills
                    </h4>
                    <div className="space-y-2">
                      <Input
                        disabled={!isEditing}
                        placeholder="Comma separated (e.g. React, Node.js, Project Management)"
                        value={(formData.skills || []).join(", ")}
                        onChange={(e) => setFormData({
                          ...formData,
                          skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                        })}
                      />
                      {!isEditing && formData.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {formData.skills.map((skill: string, i: number) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
