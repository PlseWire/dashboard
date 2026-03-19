import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, PanelLeftClose, PanelLeft, Bell, User, Search, LogOut, LayoutDashboard, TrendingUp, Newspaper, ShieldAlert, Database, BarChart3, HeartPulse, Settings as SettingsIcon, Command } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleMobile: () => void;
  isCollapsed: boolean;
}

const SEARCH_ITEMS = [
  { title: "Dashboard Overview", path: "/", icon: LayoutDashboard, category: "Pages" },
  { title: "Trend Signals", path: "/trends", icon: TrendingUp, category: "Intelligence" },
  { title: "News Streams", path: "/news", icon: Newspaper, category: "Intelligence" },
  { title: "Critical Alerts", path: "/alerts", icon: ShieldAlert, category: "System" },
  { title: "Data Sources", path: "/data-sources", icon: Database, category: "Integration" },
  { title: "Analytics Engine", path: "/analytics", icon: BarChart3, category: "Intelligence" },
  { title: "System Health", path: "/system-health", icon: HeartPulse, category: "System" },
  { title: "Operator Settings", path: "/settings", icon: SettingsIcon, category: "Account" },
];

const Header = ({ toggleSidebar, toggleMobile, isCollapsed }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState(SEARCH_ITEMS);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Critical Signal Breach", desc: "APAC neural pathway latency spike detected (+450ms)", time: "2m ago", type: "critical", read: false, path: "/alerts" },
    { id: 2, title: "System Sync Complete", desc: "Full kernel log successfully synchronized to central core", time: "14m ago", type: "system", read: false, path: "/system-health" },
    { id: 3, title: "New Trend Alert", desc: "Quantum encryption signals exceeding 80% growth threshold", time: "1h ago", type: "trend", read: true, path: "/trends" },
    { id: 4, title: "Security Protocols Active", desc: "Operator credentials successfully validated with Tier 4 clearance", time: "3h ago", type: "security", read: true, path: "/settings" },
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setShowResults(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults(SEARCH_ITEMS);
      return;
    }

    const filtered = SEARCH_ITEMS.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchQuery]);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
  };

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowResults(false);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: number, path: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    navigate(path);
    setShowNotifications(false);
  };

  return (
    <header className={`fixed top-0 right-0 z-40 h-16 bg-background/95 backdrop-blur border-b border-border flex items-center justify-between px-4 transition-all duration-300 ${isCollapsed ? 'left-0 md:left-20' : 'left-0 md:left-[260px]'}`}>
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={toggleMobile}
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu size={22} />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>


        {/* Search bar */}
        <div ref={searchRef} className="relative hidden sm:block ml-2">
          <div className="flex items-center gap-2 bg-card border border-border rounded-sm px-3 py-1.5 w-48 md:w-56 lg:w-80 focus-within:border-primary transition-colors">
            <Search size={14} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              placeholder="Search terminal..."
              className="bg-transparent outline-none text-sm font-dmsans text-foreground placeholder:text-muted-foreground w-full"
            />
            <kbd className="hidden lg:flex items-center gap-1 text-[9px] font-quantico text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
              <Command size={8} /> K
            </kbd>
          </div>

          {showResults && (
            <div className="absolute top-11 left-0 w-full max-h-[400px] bg-card border border-border rounded-sm shadow-2xl animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
              <div className="p-2 border-b border-border/50">
                <span className="text-[10px] font-quantico uppercase tracking-widest text-muted-foreground px-2">Access Points</span>
              </div>
              <div className="overflow-y-auto max-h-[320px] p-1">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(item.path)}
                      className="w-full flex items-center justify-between p-2.5 rounded-sm hover:bg-primary/10 group transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-background border border-border rounded-sm group-hover:border-primary/30 transition-colors">
                          <item.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-dmsans text-foreground leading-none">{item.title}</p>
                          <p className="text-[10px] font-quantico text-muted-foreground uppercase tracking-widest mt-1 opacity-70">{item.category}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs font-dmsans text-muted-foreground">No matches found in intelligence database</p>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-border/50 bg-foreground/[0.02] flex justify-between items-center">
                <span className="text-[9px] font-quantico text-muted-foreground uppercase">Pulsewire Index v4.2.0</span>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1">
                      <kbd className="text-[8px] border border-border px-1 rounded-sm">ESC</kbd>
                      <span className="text-[8px] font-quantico text-muted-foreground uppercase">Close</span>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* System status */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="status-dot-active" />
          <span className="text-[10px] font-quantico uppercase tracking-widest text-muted-foreground">
            System Active
          </span>
        </div>

        {/* Notification */}
        <div ref={notificationRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`transition-colors relative p-1 rounded-sm hover:bg-primary/10 ${showNotifications ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                <span className="text-[7px] font-bold text-white">{unreadCount}</span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute -right-12 sm:right-0 top-11 w-[280px] xs:w-80 bg-card border border-border rounded-sm shadow-2xl animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
              <div className="p-3 border-b border-border/50 flex justify-between items-center bg-foreground/[0.02]">
                <h3 className="text-xs font-quantico uppercase tracking-widest text-foreground font-bold">Pulsewire Alerts</h3>
                <button 
                  onClick={markAllRead}
                  className="text-[9px] font-quantico uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="overflow-y-auto max-h-[350px]">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif.id, notif.path)}
                      className={`p-3.5 border-b border-border/20 last:border-0 cursor-pointer hover:bg-primary/[0.03] transition-colors relative group ${!notif.read ? 'bg-primary/[0.02]' : ''}`}
                    >
                      {!notif.read && <div className="absolute left-0 top-0 w-1 h-full bg-primary" />}
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-sm flex items-center justify-center border ${
                          notif.type === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                          notif.type === 'system' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 
                          'bg-primary/10 border-primary/20 text-primary'
                        }`}>
                          {notif.type === 'critical' ? <ShieldAlert size={14} /> : 
                           notif.type === 'system' ? <HeartPulse size={14} /> : 
                           <Bell size={14} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className={`text-xs font-dmsans leading-none ${!notif.read ? 'text-foreground font-bold' : 'text-foreground/80'}`}>{notif.title}</h4>
                            <span className="text-[9px] font-quantico text-muted-foreground uppercase">{notif.time}</span>
                          </div>
                          <p className="text-[11px] font-dmsans text-muted-foreground leading-normal line-clamp-2 mt-1">
                            {notif.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-xs font-dmsans text-muted-foreground">All clear. No active alerts.</p>
                  </div>
                )}
              </div>
              <div className="p-2.5 border-t border-border/50 text-center bg-foreground/[0.01]">
                <button 
                  onClick={() => {navigate('/alerts'); setShowNotifications(false);}}
                  className="text-[10px] font-quantico uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  View All Neural Alerts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-primary/20 border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <User size={16} className="text-primary" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-50" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-10 z-50 w-48 bg-card border border-border rounded-sm shadow-lg animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="text-xs font-dmsans text-foreground font-medium">{user?.username || 'Operator-7X'}</p>
                  <p className="text-[10px] text-muted-foreground">{user?.email || 'op7x@pulsewire.ai'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-dmsans text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <LogOut size={14} />
                  Terminate Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
