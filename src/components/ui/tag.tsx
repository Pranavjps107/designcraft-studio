import { cn } from "@/lib/utils";

interface TagProps {
  variant?: "default" | "vip" | "support" | "general";
  children: React.ReactNode;
}

const tagStyles = {
  default: "bg-accent text-accent-foreground",
  vip: "bg-warning/20 text-warning-foreground",
  support: "bg-info/20 text-info",
  general: "bg-primary/10 text-primary",
};

export function Tag({ variant = "default", children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
        tagStyles[variant]
      )}
    >
      {children}
    </span>
  );
}
