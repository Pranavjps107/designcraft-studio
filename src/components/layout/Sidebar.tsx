import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Plug,
  Mail,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Contacts", href: "/contacts", icon: Users },
];

const analyticsNav = [
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
];

const settingsNav = [
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  const NavItem = ({
    item,
    isActive,
  }: {
    item: { name: string; href: string; icon: React.ElementType };
    isActive: boolean;
  }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  );

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-lg text-foreground">ChatBot AI</span>
            <p className="text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin">
        {/* Main Section */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main
          </p>
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* Analytics Section */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Analytics
          </p>
          {analyticsNav.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* Settings Section */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Settings
          </p>
          {settingsNav.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-info flex items-center justify-center text-sm font-semibold text-info-foreground">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
