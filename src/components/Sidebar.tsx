import {
  LayoutDashboard,
  TrendingUp,
  Newspaper,
  ShieldAlert,
  Database,
  BarChart3,
  Cpu,
  Settings,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Trend Signals", to: "/trends", icon: TrendingUp },
  { label: "News Streams", to: "/news", icon: Newspaper },
  { label: "Alerts", to: "/alerts", icon: ShieldAlert },
  { label: "Data Sources", to: "/data-sources", icon: Database },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "System Health", to: "/system-health", icon: Cpu },
  { label: "Settings", to: "/settings", icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

const Sidebar = ({ isCollapsed, onItemClick }: SidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        {!isCollapsed ? (
          <img src="/logo.svg" alt="Pulsewire Logo" className="h-20 w-auto" />
        ) : (
          <img src="/favicon.svg" alt="Pulsewire" className="h-8 w-8 mx-auto" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isCollapsed={isCollapsed}
            onClick={onItemClick}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {!isCollapsed && (
          <p className="text-[10px] font-quantico uppercase tracking-widest text-muted-foreground">
            v2.4.1 — OPERATIONAL
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
