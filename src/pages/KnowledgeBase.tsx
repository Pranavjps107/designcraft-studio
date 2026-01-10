import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, Download, Trash2, Grid, List, Loader2, FileText } from "lucide-react";
import api, { Document } from "@/lib/api";
import { toast } from "sonner";

const tabs = ["Documents", "Text Snippets"];

const getDocIcon = (type: string) => {
  if (type.includes("pdf")) return { icon: "📕", bg: "bg-red-100" };
  if (type.includes("word") || type.includes("docx")) return { icon: "📘", bg: "bg-blue-100" };
  if (type.includes("text")) return { icon: "📙", bg: "bg-purple-100" };
  return { icon: "📄", bg: "bg-muted" };
};

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState("Documents");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [processingCount, setProcessingCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadDocuments(); }, [viewMode]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const data = await api.getDocuments(viewMode);
      setDocuments(data.documents);
      setProcessingCount(data.processing_count);
      setTotal(data.total);
    } catch (error) { toast.error("Failed to load documents"); }
    finally { setIsLoading(false); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await api.uploadDocument(file);
      toast.success("Document uploaded successfully");
      loadDocuments();
    } catch (error: any) { toast.error(error.message || "Failed to upload document"); }
    finally { setIsUploading(false); }
  };

  const handleTextUpload = async () => {
    if (!textContent.trim()) {
      toast.error("Please enter some text content");
      return;
    }
    setIsUploading(true);
    try {
      await api.addTextSnippet(textTitle || "Untitled", textContent);
      toast.success("Text snippet added successfully");
      setTextTitle("");
      setTextContent("");
      loadDocuments();
    } catch (error: any) { toast.error(error.message || "Failed to add text snippet"); }
    finally { setIsUploading(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteDocument(id);
      toast.success("Document deleted");
      loadDocuments();
    } catch (error) { toast.error("Failed to delete document"); }
  };

  const handleDownload = async (id: string, filename: string) => {
    try {
      const blob = await api.downloadDocument(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    } catch (error) { toast.error("Failed to download document"); }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
          {activeTab === "Documents" ? (
            <>
              <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx,.txt" onChange={handleUpload} />
              <Button className="gap-2" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload Document
              </Button>
            </>
          ) : (
            <Button className="gap-2" onClick={handleTextUpload} disabled={isUploading || !textContent.trim()}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />} Add Text Snippet
            </Button>
          )}
        </div>

        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors", activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab}</button>))}
        </div>

        {activeTab === "Documents" ? (
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center mb-8 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Drag & Drop Files Here</h3>
            <p className="text-muted-foreground mb-1">or click to browse</p>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, TXT | Max size: 10MB per file</p>
          </div>
        ) : (
          <div className="border border-border rounded-xl p-6 mb-8 bg-card">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-title" className="text-sm font-medium">Title (Optional)</Label>
                <Input
                  id="text-title"
                  placeholder="Enter a title for your text snippet..."
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="text-content" className="text-sm font-medium">Text Content</Label>
                <Textarea
                  id="text-content"
                  placeholder="Enter your text content here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={8}
                  className="mt-1 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {processingCount > 0 && (
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Processing Documents</h3>
              <span className="text-sm text-muted-foreground">{total - processingCount} of {total} processed</span>
            </div>
            <Progress value={((total - processingCount) / total) * 100} className="h-2" />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <p className="font-semibold text-foreground">
            {activeTab === "Documents" ? `All Documents (${documents.length})` : `All Text Snippets (${documents.length})`}
          </p>
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className="gap-2"><Grid className="h-4 w-4" /> Grid</Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className="gap-2"><List className="h-4 w-4" /> List</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-4 gap-5">{Array(4).fill(0).map((_, i) => (<div key={i} className="bg-card rounded-xl p-5 border border-border"><Skeleton className="w-14 h-14 rounded-xl mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-3 w-24" /></div>))}</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {activeTab === "Documents" ? "No documents yet. Upload your first document!" : "No text snippets yet. Add your first text snippet!"}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-5">
            {documents.map((doc) => {
              const { icon, bg } = getDocIcon(doc.content_type);
              return (
                <div key={doc.id} className="bg-card rounded-xl p-5 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4", bg)}>{icon}</div>
                  <h4 className="font-semibold text-foreground truncate mb-2">{doc.filename}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{new Date(doc.uploaded_at).toLocaleDateString()} • {doc.size}</p>
                  <div className="flex justify-between items-center">
                    <StatusBadge status={doc.status}>{doc.status === "ready" && "✓ Ready"}{doc.status === "processing" && "⏳ Processing"}{doc.status === "failed" && "✕ Failed"}</StatusBadge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(doc.id, doc.filename)}><Download className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(doc.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full"><thead><tr className="bg-muted/50"><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Document</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Size</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Date</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Status</th><th className="w-24 px-6 py-4"></th></tr></thead>
            <tbody>{documents.map((doc) => { const { icon } = getDocIcon(doc.content_type); return (<tr key={doc.id} className="border-t border-border hover:bg-muted/30"><td className="px-6 py-4"><div className="flex items-center gap-3"><span className="text-xl">{icon}</span><span className="font-medium text-foreground">{doc.filename}</span></div></td><td className="px-6 py-4 text-muted-foreground">{doc.size}</td><td className="px-6 py-4 text-muted-foreground">{new Date(doc.uploaded_at).toLocaleDateString()}</td><td className="px-6 py-4"><StatusBadge status={doc.status}>{doc.status === "ready" && "✓ Ready"}{doc.status === "processing" && "⏳ Processing"}{doc.status === "failed" && "✕ Failed"}</StatusBadge></td><td className="px-6 py-4"><div className="flex gap-1"><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(doc.id, doc.filename)}><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(doc.id)}><Trash2 className="h-4 w-4" /></Button></div></td></tr>); })}</tbody></table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
