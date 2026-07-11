"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { aiToolsConfig } from "@/lib/config/ai-tools.config";
import { ModuleGuard } from "@/components/operations/module-guard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assume generic textarea or use standard
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Wand2, Copy, Save, Clock } from "lucide-react";
import { toast } from "sonner";
import { useSaveAiRequest, useAiHistory } from "@/lib/react-query/ai.hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AiToolDetail() {
  const params = useParams();
  const router = useRouter();
  const toolId = (params as any).toolId as string;
  const tool = aiToolsConfig.find(t => t.id === toolId);
  
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  
  const { data: history = [] } = useAiHistory(toolId);
  const saveMutation = useSaveAiRequest();

  if (!tool) {
    return <div className="p-8 text-center">Tool not found.</div>;
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }
    
    setIsGenerating(true);
    // Mocking an AI generation delay. 
    // In a real app, this would call a Next.js API route that interfaces with an LLM.
    setTimeout(() => {
      const mockOutput = `# Generated output for: ${tool.name}\n\nBased on your prompt: "${prompt}"\n\nThis is a simulated AI response. In a production environment, this would be wired to an OpenAI, Anthropic, or Gemini API endpoint via a Next.js API route.`;
      setOutput(mockOutput);
      setIsGenerating(false);
      toast.success("Content generated successfully.");
    }, 2000);
  };

  const handleSave = async () => {
    if (!output) return;
    try {
      await saveMutation.mutateAsync({
        tool: tool.id,
        prompt,
        response: output
      });
      toast.success("Saved to history.");
    } catch (e) {
      toast.error("Failed to save.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard.");
  };

  return (
    <ModuleGuard module="AI" action="Execute">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <Tabs defaultValue="generator">
          <TabsList>
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Prompt</CardTitle>
                <CardDescription>Provide details or context for the AI to work with.</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" /> 
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </CardFooter>
            </Card>

            {output && (
              <Card className="border-primary/50 shadow-sm">
                <CardHeader className="bg-primary/5 pb-4 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Generated Output</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </Button>
                      <Button size="sm" onClick={handleSave} disabled={saveMutation.isPending}>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{output}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Request History</CardTitle>
                <CardDescription>Previous generations from this tool.</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No history found for this tool.</p>
                ) : (
                  <div className="space-y-4">
                    {history.map(req => (
                      <div key={req.id} className="border rounded-md p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {req.createdAt ? new Date(req.createdAt as any).toLocaleString() : "Unknown"}
                        </div>
                        <p className="text-sm font-medium mb-2 truncate">Prompt: {req.prompt}</p>
                        <p className="text-sm text-muted-foreground line-clamp-3">{req.response}</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="secondary" size="sm" onClick={() => {
                            setPrompt(req.prompt);
                            setOutput(req.response);
                            document.querySelector('[data-value="generator"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                          }}>
                            Load in Editor
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ModuleGuard>
  );
}
