import { LucideIcon } from "lucide-react";
import { NavLink as RouterNavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, to, isCollapsed, onClick }: SidebarItemProps) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 transition-all duration-200 group relative ${isActive
          ? "bg-primary/20 border-r-2 border-primary text-foreground"
          : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
        }`
      }
    >
      <Icon size={20} className="shrink-0" />
      {!isCollapsed && (
        <span className="font-dmsans text-sm font-medium tracking-wide whitespace-nowrap">
          {label}
        </span>
      )}
    </RouterNavLink>
  );
};

export default SidebarItem;
