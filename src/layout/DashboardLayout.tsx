import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
        <p className="font-quantico text-[10px] uppercase tracking-widest text-primary animate-pulse">Initializing Terminal...</p>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background text-foreground flex">
          {/* Desktop sidebar */}
          <aside
            className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-background border-r border-border transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-20" : "w-[260px]"
            }`}
          >
            <Sidebar isCollapsed={isCollapsed} />
          </aside>

          {/* Mobile overlay */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-background/80 z-[60] md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}

          {/* Mobile drawer */}
          <aside
            className={`fixed inset-y-0 left-0 z-[70] w-[260px] bg-background border-r border-border transform transition-transform duration-300 md:hidden ${
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar isCollapsed={false} onItemClick={() => setIsMobileOpen(false)} />
          </aside>

          {/* Main content */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              isCollapsed ? "md:ml-20" : "md:ml-[260px]"
            }`}
          >
            <Header
              toggleSidebar={() => setIsCollapsed(!isCollapsed)}
              toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
              isCollapsed={isCollapsed}
            />
            <main className="p-4 md:p-6 mt-16 overflow-y-auto flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default DashboardLayout;
