import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon?: ReactNode;
  iconBg?: "green" | "blue" | "purple" | "orange";
}

const iconBgColors = {
  green: "bg-accent",
  blue: "bg-info/10",
  purple: "bg-purple-100",
  orange: "bg-orange-100",
};

export function KPICard({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  iconBg = "green",
}: KPICardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              iconBgColors[iconBg]
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      {change && (
        <div className="flex items-center gap-1.5 text-sm">
          {changeType === "positive" ? (
            <TrendingUp className="h-4 w-4 text-primary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          <span
            className={cn(
              "font-medium",
              changeType === "positive" ? "text-primary" : "text-destructive"
            )}
          >
            {change}
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}
