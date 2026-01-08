import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "pending" | "resolved" | "processing" | "ready" | "failed";
  children: React.ReactNode;
}

const statusStyles = {
  active: "bg-accent text-accent-foreground",
  pending: "bg-warning/20 text-warning-foreground",
  resolved: "bg-info/20 text-info",
  processing: "bg-warning/20 text-warning-foreground",
  ready: "bg-accent text-accent-foreground",
  failed: "bg-destructive/20 text-destructive",
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}
