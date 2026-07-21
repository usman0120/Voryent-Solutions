"use client";

import { useState } from "react";
import { db } from "@/lib/admin/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox, Label } from "@voryent/ui";
import { useToast } from "@/hooks/use-toast";
import { Download, FileJson, FileText, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COLLECTIONS = [
  "users",
  "projects",
  "contacts",
  "jobs",
  "applications",
  "services",
  "industries",
  "blogPosts",
  "faqItems",
  "resources",
  "employees",
  "investors",
  "case-studies"
];

export default function ExportPage() {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const toggleCollection = (name: string) => {
    setSelectedCollections((prev) => 
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleAll = () => {
    if (selectedCollections.length === COLLECTIONS.length) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(COLLECTIONS);
    }
  };

  const fetchCollectionData = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const handleExportJSON = async () => {
    if (selectedCollections.length === 0) return toast({ title: "Please select at least one collection", variant: "destructive" });
    
    setIsExporting(true);
    try {
      const exportData: Record<string, any[]> = {};
      for (const col of selectedCollections) {
        exportData[col] = await fetchCollectionData(col);
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      downloadBlob(blob, `voryent-backup-${new Date().toISOString().split("T")[0]}.json`);
      toast({ title: "Export successful" });
    } catch (err: any) {
      toast({ title: "Export failed", description: err.message, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    if (selectedCollections.length === 0) return toast({ title: "Please select at least one collection", variant: "destructive" });
    
    setIsExporting(true);
    try {
      for (const col of selectedCollections) {
        const data = await fetchCollectionData(col);
        if (data.length === 0) continue;

        const headers = Array.from(new Set(data.flatMap(Object.keys)));
        const csvRows = [];
        csvRows.push(headers.join(","));

        for (const row of data) {
          const values = headers.map(header => {
            let val = row[header as keyof typeof row];
            if (typeof val === "object" && val !== null) {
              val = JSON.stringify(val);
            }
            const escaped = (val?.toString() || "").replace(/"/g, '""');
            return `"${escaped}"`;
          });
          csvRows.push(values.join("\n"));
        }

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        downloadBlob(blob, `${col}-export-${new Date().toISOString().split("T")[0]}.csv`);
        
        await new Promise(r => setTimeout(r, 500));
      }
      toast({ title: "CSV Export successful" });
    } catch (err: any) {
      toast({ title: "Export failed", description: err.message, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (selectedCollections.length === 0) return toast({ title: "Please select at least one collection", variant: "destructive" });
    
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.text(`Voryent Solutions - Database Export`, 14, 15);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

      let currentY = 30;
      let i = 0;

      for (const col of selectedCollections) {
        const data = await fetchCollectionData(col);
        
        if (data.length === 0) { i++; continue; }

        if (i > 0) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFontSize(14);
        doc.text(`Collection: ${col}`, 14, currentY);
        currentY += 5;

        const headers = Array.from(new Set(data.flatMap(Object.keys))).slice(0, 5);
        
        const body = data.map(row => {
          return headers.map(h => {
            const val = row[h as keyof typeof row];
            return typeof val === 'object' && val !== null ? '[Object]' : (val?.toString() || "");
          });
        });

        autoTable(doc, {
          startY: currentY,
          head: [headers],
          body: body,
          theme: 'grid',
          styles: { fontSize: 8 },
        });
        
        currentY = (doc as any).lastAutoTable.finalY + 10;
        i++;
      }

      doc.save(`voryent-backup-${new Date().toISOString().split("T")[0]}.pdf`);
      toast({ title: "PDF Export successful" });
    } catch (err: any) {
      toast({ title: "Export failed", description: err.message, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Export & Backup</h1>
        <p className="text-muted-foreground mt-2">
          Select the collections you wish to export and choose your preferred format.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Database Collections</CardTitle>
              <CardDescription>Select which data points to include in your backup.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={toggleAll}>
              {selectedCollections.length === COLLECTIONS.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {COLLECTIONS.map((col) => (
              <div key={col} className="flex items-center space-x-2">
                <Checkbox 
                  id={col} 
                  checked={selectedCollections.includes(col)}
                  onCheckedChange={() => toggleCollection(col)}
                />
                <Label htmlFor={col} className="cursor-pointer capitalize font-medium">
                  {col.replace("-", " ")}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-blue-500" />
              JSON Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Best format for data migrations to other databases like MongoDB or another Firebase project. Includes all nested objects and relationships.
            </p>
            <Button 
              className="w-full" 
              onClick={handleExportJSON} 
              disabled={isExporting || selectedCollections.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-green-500" />
              CSV Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Downloads a separate CSV file for each selected collection. Best for opening in Excel or importing into SQL databases.
            </p>
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={handleExportCSV} 
              disabled={isExporting || selectedCollections.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              PDF Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generates a formatted PDF document containing tables of your data. Great for sharing reports with stakeholders.
            </p>
            <Button 
              className="w-full" 
              variant="secondary" 
              onClick={handleExportPDF} 
              disabled={isExporting || selectedCollections.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
