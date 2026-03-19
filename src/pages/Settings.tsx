import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Mail, Bell, Shield, TrendingUp, Cpu, Calendar, Save, Camera, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const [profileName, setProfileName] = useState(user?.username || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileName(user.username);
      setProfileEmail(user.email);
    }
  }, [user]);

  const [preferences, setPreferences] = useState([
    { id: 'critical', label: "Critical Alerts", enabled: true, icon: Shield, desc: "Immediate notifications for system breaches or hardware failure" },
    { id: 'trends', label: "Trend Notifications", enabled: true, icon: TrendingUp, desc: "Alerts when signals exceed 50% growth threshold" },
    { id: 'status', label: "System Status Updates", enabled: false, icon: Cpu, desc: "Daily report on node health and latency metrics" },
    { id: 'digest', label: "Weekly Digest", enabled: true, icon: Calendar, desc: "Comprehensive summary of weekly signal intelligence" },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    updateUser({
      username: profileName,
      email: profileEmail
    });
    
    setIsSaving(false);
    toast({
      title: "Profile Updated",
      description: "Operator identity credentials have been successfully synchronized.",
    });
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={24} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">SETTINGS</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Operator Profile */}
        <div className="space-y-6 flex flex-col h-full text-left">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <User size={18} className="text-primary" />
            <h2 className="text-sm font-quantico uppercase tracking-widest text-secondary">Operator Profile</h2>
          </div>
          
          <div className="widget-card relative overflow-hidden group flex-1 h-full">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center relative overflow-hidden group/avatar">
                  <User size={40} className="text-primary" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-quantico text-foreground">{user?.username || 'Operator-7X'}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{user?.clearance || 'Level 4'} Clearance — Pulsewire Core</p>
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-[10px] font-quantico text-primary uppercase">Active Session</span>
                  <span className="px-2 py-0.5 bg-foreground/5 border border-border text-[10px] font-quantico text-muted-foreground uppercase">ID: {user?.id || 'PW-4829-X'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-quantico text-secondary uppercase tracking-widest">
                  <User size={12} />
                  Display Name
                </label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-background border border-border p-3 text-sm font-dmsans text-foreground focus:border-primary outline-none transition-all rounded-sm pl-10" 
                  />
                  <User size={14} className="absolute left-3 top-3.5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-quantico text-secondary uppercase tracking-widest">
                  <Mail size={12} />
                  Email Address
                </label>
                <div className="relative group/input">
                  <input 
                    type="email" 
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-background border border-border p-3 text-sm font-dmsans text-foreground focus:border-primary outline-none transition-all rounded-sm pl-10" 
                  />
                  <Mail size={14} className="absolute left-3 top-3.5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/30">
              <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`w-full group relative overflow-hidden flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-sm transition-all duration-300 ${isSaving ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <div className={`absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none`} />
                {isSaving ? (
                   <span className="flex items-center gap-2 text-[10px] font-quantico text-primary uppercase tracking-[0.2em] font-bold">Synchronizing...</span>
                ) : (
                  <>
                    <CheckCircle2 size={14} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-quantico text-primary uppercase tracking-[0.2em] font-bold">Save Operator Identity</span>
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>

        {/* Right Column: Alert Preferences */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <Bell size={18} className="text-primary" />
            <h2 className="text-sm font-quantico uppercase tracking-widest text-secondary">Alert Preferences</h2>
          </div>

          <div className="widget-card flex flex-col h-full flex-1">
            <div className="space-y-1 flex-1">
              {preferences.map((pref, i) => (
                <div key={pref.id} className="flex items-center justify-between py-4 group/pref border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors px-2 -mx-2 rounded-sm cursor-default">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-sm transition-colors duration-300 ${pref.enabled ? "bg-primary/10 text-primary" : "bg-muted/10 text-muted-foreground"}`}>
                      <pref.icon size={16} />
                    </div>
                    <div>
                      <span className="block text-sm font-quantico tracking-wide text-foreground group-hover:text-primary transition-colors">{pref.label}</span>
                      <p className="text-[11px] font-dmsans text-muted-foreground mt-0.5 max-w-[200px] sm:max-w-[300px]">
                        {pref.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => togglePreference(pref.id)}
                    className={`w-12 h-6 rounded-sm cursor-pointer transition-all duration-300 relative shrink-0 ${pref.enabled ? "bg-primary/20 border border-primary/40 shadow-[0_0_10px_rgba(32,0,234,0.1)]" : "bg-muted/10 border border-border"}`}>
                    <div className={`absolute top-1 w-3.5 h-3.5 rounded-sm transition-all duration-300 ${pref.enabled ? "bg-primary left-7 shadow-[0_0_8px_hsl(var(--primary))]" : "bg-muted-foreground/30 left-1"}`} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
