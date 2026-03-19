import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import TrendSignals from "./pages/TrendSignals";
import NewsStreams from "./pages/NewsStreams";
import Alerts from "./pages/Alerts";
import DataSources from "./pages/DataSources";
import Analytics from "./pages/Analytics";
import SystemHealth from "./pages/SystemHealth";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => (
  <ClerkProvider 
    publishableKey={CLERK_PUBLISHABLE_KEY}
    signInUrl="/login"
    signUpUrl="/signup"
    afterSignInUrl="/"
    afterSignUpUrl="/"
  >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Auth routes */}
              <Route element={<AuthLayout />}>
                <Route 
                  path="/login" 
                  element={
                    <>
                      <SignedIn><Navigate to="/" replace /></SignedIn>
                      <SignedOut><Login /></SignedOut>
                    </>
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    <>
                      <SignedIn><Navigate to="/" replace /></SignedIn>
                      <SignedOut><Signup /></SignedOut>
                    </>
                  } 
                />
                <Route path="/verify-email" element={<VerifyEmail />} />
              </Route>

              {/* Dashboard routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trends" element={<TrendSignals />} />
                <Route path="/news" element={<NewsStreams />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/data-sources" element={<DataSources />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/system-health" element={<SystemHealth />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
