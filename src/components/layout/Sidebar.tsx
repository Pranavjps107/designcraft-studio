import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Plug,
  Wrench,
  ChevronDown,
  Mic2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const configureNav = [
  { name: "Agents", href: "/dashboard", icon: Home },
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { name: "Tools", href: "/integrations", icon: Wrench },
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "Voices", href: "/settings", icon: Mic2 },
];

const monitorNav = [
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Contacts", href: "/contacts", icon: Users },
];

const deployNav = [
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  const NavItem = ({
    item,
    isActive,
    badge,
  }: {
    item: { name: string; href: string; icon: React.ElementType };
    isActive: boolean;
    badge?: string;
  }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        isActive
          ? "bg-sidebar-active text-sidebar-active-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-active hover:text-sidebar-active-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span className="flex-1">{item.name}</span>
      {badge && (
        <span className="badge-new">{badge}</span>
      )}
    </Link>
  );

  return (
    <aside className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4">
        <span className="font-bold text-lg text-foreground">DesignCraft Studio</span>
      </div>

      {/* Platform Selector */}
      <div className="px-3 mb-4">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-active text-sm font-medium text-sidebar-active-foreground">
          <div className="w-5 h-5 rounded bg-chart-2 flex items-center justify-center">
            <Mic2 className="h-3 w-3 text-white" />
          </div>
          <span>Agents Platform</span>
          <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
        {/* Home */}
        <div>
          <NavItem
            item={{ name: "Home", href: "/dashboard", icon: Home }}
            isActive={location.pathname === "/dashboard"}
          />
        </div>

        {/* Configure Section */}
        <div>
          <p className="section-header">Configure</p>
          <div className="space-y-0.5">
            {configureNav.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* Monitor Section */}
        <div>
          <p className="section-header">Monitor</p>
          <div className="space-y-0.5">
            {monitorNav.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
                badge={item.name === "Contacts" ? "New" : undefined}
              />
            ))}
          </div>
        </div>

        {/* Deploy Section */}
        <div>
          <p className="section-header">Deploy</p>
          <div className="space-y-0.5">
            {deployNav.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-active cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
