import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  hideTopBar?: boolean;
}

export function DashboardLayout({ children, title, hideTopBar }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-60">
        {!hideTopBar && <TopBar title={title} />}
        <main>{children}</main>
      </div>
    </div>
  );
}
