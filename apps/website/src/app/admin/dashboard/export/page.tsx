"use client";

import { useState } from "react";
import { db } from "@/lib/admin/firebase/config";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Checkbox, Label } from "@voryent/ui";
import { useToast } from "@/hooks/use-toast";
import { Download, FileJson, FileText, FileSpreadsheet, Upload } from "lucide-react";
import { Input } from "@voryent/ui";

const COLLECTIONS = [
  "users",
  "projects",
  "contacts",
  "jobs",
  "applications",
  "industries",
  "blogPosts",
  "blogSubscriptions",
  "notifications",
  "faqItems",
  "resources",
  "employees",
  "investors",
  "case-studies",
  "settings",
  "pages",
  "seo",
  "activityLogs"
];

export default function ExportPage() {
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Import State
  const [importData, setImportData] = useState<Record<string, any[]> | null>(null);
  const [selectedImportCollections, setSelectedImportCollections] = useState<string[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [isMerge, setIsMerge] = useState(false);

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

  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setImportData(json);
        setSelectedImportCollections(Object.keys(json));
        toast({ title: "Backup file loaded successfully" });
      } catch (err) {
        toast({ title: "Invalid JSON file", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  const toggleImportCollection = (name: string) => {
    setSelectedImportCollections((prev) => 
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleImportSubmit = async () => {
    if (!importData || selectedImportCollections.length === 0) return;

    setIsImporting(true);
    try {
      for (const col of selectedImportCollections) {
        const data = importData[col];
        if (!Array.isArray(data)) continue;
        
        for (const item of data) {
          if (!item.id) continue;
          
          const itemData = { ...item };
          const docId = itemData.id;
          delete itemData.id; // Don't write the 'id' field to document body

          await setDoc(doc(db, col, docId), itemData, { merge: isMerge });
        }
      }
      toast({ title: "Import successful!" });
      setImportData(null);
      setSelectedImportCollections([]);
    } catch (err: any) {
      toast({ title: "Import failed", description: err.message, variant: "destructive" });
    } finally {
      setIsImporting(false);
    }
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
              try { val = JSON.stringify(val); } catch (e) { val = "[Object]"; }
            }
            const strVal = val === undefined || val === null ? "" : String(val);
            const escaped = strVal.replace(/"/g, '""');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(","));
        }

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
        downloadBlob(blob, `${col}-export-${new Date().toISOString().split("T")[0]}.csv`);
        
        await new Promise(r => setTimeout(r, 800));
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
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

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

      
      {/* Import Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Data Import</h2>
        <Card>
          <CardHeader>
            <CardTitle>Restore from Backup</CardTitle>
            <CardDescription>Upload a JSON backup file to restore or merge data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="backup-upload">Backup JSON File</Label>
              <Input 
                id="backup-upload" 
                type="file" 
                accept=".json" 
                onChange={handleFileUpload} 
                className="mt-2"
              />
            </div>
            
            {importData && (
              <div className="space-y-6 pt-4 border-t">
                <div>
                  <h3 className="text-sm font-medium mb-3">Found Collections in Backup:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(importData).map((col) => (
                      <div key={col} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`import-${col}`} 
                          checked={selectedImportCollections.includes(col)}
                          onCheckedChange={() => toggleImportCollection(col)}
                        />
                        <Label htmlFor={`import-${col}`} className="cursor-pointer capitalize font-medium">
                          {col.replace("-", " ")} ({importData[col]?.length || 0} items)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
                  <Checkbox 
                    id="merge-toggle" 
                    checked={isMerge}
                    onCheckedChange={(checked) => setIsMerge(!!checked)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="merge-toggle" className="cursor-pointer font-medium">Merge new fields</Label>
                    <p className="text-xs text-muted-foreground">If checked, existing fields won't be overwritten if they are not in the backup. If unchecked, documents will be completely replaced.</p>
                  </div>
                </div>

                <Button 
                  onClick={handleImportSubmit} 
                  disabled={isImporting || selectedImportCollections.length === 0}
                  className="w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isImporting ? "Importing..." : "Import Selected Collections"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Data Export</h2>
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
