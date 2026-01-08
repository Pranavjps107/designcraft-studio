import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import {
  Upload,
  FileText,
  File,
  Download,
  Trash2,
  Grid,
  List,
} from "lucide-react";

const tabs = ["Documents", "Text Snippets"];

const documents = [
  {
    id: 1,
    name: "Product Catalog 2025.pdf",
    type: "pdf",
    size: "2.4 MB",
    date: "Uploaded Jan 5, 2025",
    status: "ready" as const,
  },
  {
    id: 2,
    name: "FAQ Document.docx",
    type: "docx",
    size: "1.8 MB",
    date: "Uploaded Jan 6, 2025",
    status: "ready" as const,
  },
  {
    id: 3,
    name: "Return Policy.txt",
    type: "txt",
    size: "24 KB",
    date: "Uploaded Jan 7, 2025",
    status: "processing" as const,
  },
  {
    id: 4,
    name: "Shipping Guidelines.pdf",
    type: "pdf",
    size: "1.2 MB",
    date: "Uploaded Jan 7, 2025",
    status: "ready" as const,
  },
  {
    id: 5,
    name: "Terms of Service.pdf",
    type: "pdf",
    size: "890 KB",
    date: "Uploaded Jan 8, 2025",
    status: "ready" as const,
  },
  {
    id: 6,
    name: "Privacy Policy.docx",
    type: "docx",
    size: "456 KB",
    date: "Uploaded Jan 8, 2025",
    status: "failed" as const,
  },
  {
    id: 7,
    name: "User Guide.pdf",
    type: "pdf",
    size: "3.1 MB",
    date: "Uploaded Jan 8, 2025",
    status: "ready" as const,
  },
  {
    id: 8,
    name: "Contact Info.txt",
    type: "txt",
    size: "12 KB",
    date: "Uploaded Jan 8, 2025",
    status: "ready" as const,
  },
];

const getDocIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return { icon: "📕", bg: "bg-red-100" };
    case "docx":
      return { icon: "📘", bg: "bg-blue-100" };
    case "txt":
      return { icon: "📙", bg: "bg-purple-100" };
    default:
      return { icon: "📄", bg: "bg-muted" };
  }
};

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState("Documents");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
          <Button className="gap-2">
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-border rounded-xl p-12 text-center mb-8 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drag & Drop Files Here
          </h3>
          <p className="text-muted-foreground mb-1">or click to browse</p>
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOCX, TXT | Max size: 10MB per file
          </p>
        </div>

        {/* Processing Card */}
        <div className="bg-card rounded-xl p-6 border border-border mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-foreground">Processing Documents</h3>
            <span className="text-sm text-muted-foreground">3 of 10 processed</span>
          </div>
          <Progress value={30} className="h-2" />
        </div>

        {/* Documents Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="font-semibold text-foreground">
            All Documents ({documents.length})
          </p>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-2"
            >
              <Grid className="h-4 w-4" /> Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" /> List
            </Button>
          </div>
        </div>

        {/* Documents Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-5">
            {documents.map((doc) => {
              const { icon, bg } = getDocIcon(doc.type);
              return (
                <div
                  key={doc.id}
                  className="bg-card rounded-xl p-5 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4",
                      bg
                    )}
                  >
                    {icon}
                  </div>
                  <h4 className="font-semibold text-foreground truncate mb-2">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {doc.date} • {doc.size}
                  </p>
                  <div className="flex justify-between items-center">
                    <StatusBadge status={doc.status}>
                      {doc.status === "ready" && "✓ Ready"}
                      {doc.status === "processing" && "⏳ Processing"}
                      {doc.status === "failed" && "✕ Failed"}
                    </StatusBadge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Document
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Size
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-24 px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => {
                  const { icon } = getDocIcon(doc.type);
                  return (
                    <tr key={doc.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{icon}</span>
                          <span className="font-medium text-foreground">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.date}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={doc.status}>
                          {doc.status === "ready" && "✓ Ready"}
                          {doc.status === "processing" && "⏳ Processing"}
                          {doc.status === "failed" && "✕ Failed"}
                        </StatusBadge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
