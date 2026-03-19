import { useState, useEffect } from "react";
import { Cpu, Globe, Activity, ShieldAlert, Clock, CheckCircle2, AlertTriangle, RefreshCcw, Loader2 } from "lucide-react";

const metrics = [
  { label: "GPU Cluster A", value: 88, unit: "%", status: "nominal" },
  { label: "GPU Cluster B", value: 72, unit: "%", status: "nominal" },
  { label: "CPU Utilization", value: 45, unit: "%", status: "nominal" },
  { label: "Memory Usage", value: 67, unit: "%", status: "nominal" },
  { label: "Network I/O", value: 34, unit: "Gbps", status: "nominal" },
  { label: "Storage IOPS", value: 82, unit: "K", status: "warning" },
  { label: "System Latency", value: 14, unit: "ms", status: "nominal" },
  { label: "Server Uptime", value: 99.97, unit: "%", status: "nominal" },
];

const initialClusters = [
  { region: "North America (NA-EAST)", nodes: 124, load: 68, status: "active", icon: Globe },
  { region: "Europe Central (EU-CENT)", nodes: 98, load: 45, status: "active", icon: Globe },
  { region: "Asia Pacific (AP-SOUTH)", nodes: 72, load: 89, status: "warning", icon: Globe },
  { region: "South America (SA-EAST)", nodes: 44, load: 22, status: "maintenance", icon: Globe },
  { region: "Middle East (ME-SOUTH)", nodes: 56, load: 34, status: "active", icon: Globe },
  { region: "Australia (AU-SOUTHEAST)", nodes: 38, load: 15, status: "active", icon: Globe },
];

const initialLogs = [
  { event: "Kernel Update Applied", time: "14:22:05", type: "info", icon: CheckCircle2 },
  { event: "Neural Path Recalibration", time: "13:45:12", type: "info", icon: RefreshCcw },
  { event: "Unauthorized Access Attempt Blocked", time: "04:30:15", type: "critical", icon: ShieldAlert },
];

const statusColor: Record<string, string> = {
  nominal: "bg-green-500",
  warning: "bg-yellow-500",
  critical: "bg-destructive",
  active: "bg-green-500",
  maintenance: "bg-primary-foreground/30",
};

const SystemHealth = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncLogs = () => {
    setIsSyncing(true);
    
    // Simulate sync delay
    setTimeout(() => {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-GB', { hour12: false });
      
      const newLog = {
        event: "Full Kernel Log Synchronized",
        time: timestamp,
        type: "info",
        icon: CheckCircle2
      };
      
      setLogs([newLog, ...logs]);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex items-center gap-3 mb-6">
        <Cpu size={24} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">SYSTEM HEALTH STATUS</h1>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="widget-card hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-3">
              <span className="metric-label">{m.label.toUpperCase()}</span>
              <span className={`w-2 h-2 rounded-full ${statusColor[m.status]} ${m.status !== 'nominal' ? 'animate-pulse' : ''}`} />
            </div>
            <p className="text-3xl font-quantico text-foreground mb-3">
              {m.value}<span className="text-sm text-muted-foreground ml-1">{m.unit}</span>
            </p>
            <div className="metric-bar-track">
              <div
                className={m.status === "warning" ? "h-full bg-yellow-500 transition-all duration-500" : "metric-bar-fill-primary"}
                style={{ width: `${Math.min(m.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Cluster Infrastructure Section */}
        <section className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <Globe size={18} className="text-primary" />
            <h2 className="text-sm font-quantico uppercase tracking-widest text-secondary">Cluster Infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full">
            {initialClusters.map((cluster, i) => (
              <div key={i} className="widget-card group flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium font-dmsans text-foreground group-hover:text-primary transition-colors">
                      {cluster.region}
                    </h3>
                    <p className="text-[10px] font-quantico text-muted-foreground mt-0.5 uppercase tracking-tighter">
                      Nodes: {cluster.nodes} Active
                    </p>
                  </div>
                  <div className={`text-[9px] font-quantico px-1.5 py-0.5 border ${cluster.status === 'active' ? 'border-green-500/30 text-green-500' : cluster.status === 'warning' ? 'border-yellow-500/30 text-yellow-500' : 'border-border text-muted-foreground'} uppercase`}>
                    {cluster.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-muted-foreground font-dmsans">Cluster Load</span>
                    <span className="font-quantico">{cluster.load}%</span>
                  </div>
                  <div className="metric-bar-track h-1">
                    <div 
                      className={`h-full transition-all duration-1000 ${cluster.status === 'warning' ? 'bg-yellow-500' : 'bg-primary'}`}
                      style={{ width: `${cluster.load}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Event Log Section */}
        <section className="lg:col-span-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <Clock size={18} className="text-primary" />
            <h2 className="text-sm font-quantico uppercase tracking-widest text-secondary">System Event Log</h2>
          </div>
          <div className="widget-card divide-y divide-border/20 p-0 flex flex-col h-full flex-1">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {logs.map((log, i) => (
                <div key={`${log.time}-${i}`} className="p-3 flex items-start gap-3 hover:bg-primary/5 transition-colors cursor-default border-b border-border/10 last:border-0 h-16">
                  <log.icon size={14} className={`${log.type === 'critical' ? 'text-destructive' : log.type === 'warning' ? 'text-yellow-500' : 'text-primary'} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-dmsans mb-1 leading-tight ${log.type === 'critical' ? 'text-destructive font-medium' : 'text-foreground/90'}`}>
                      {log.event}
                    </p>
                    <span className="text-[10px] font-quantico text-muted-foreground/60">{log.time} — NETWORK_GATEWAY_V4</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-background/50 border-t border-border mt-auto shrink-0">
              <button 
                onClick={handleSyncLogs}
                disabled={isSyncing}
                className={`w-full group relative overflow-hidden flex items-center justify-center gap-2 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-sm transition-all duration-300 ${isSyncing ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <div className={`absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none`} />
                {isSyncing ? (
                  <Loader2 size={12} className="text-primary animate-spin" />
                ) : (
                  <RefreshCcw size={12} className={`text-primary group-hover:rotate-180 transition-transform duration-500`} />
                )}
                <span className="text-[10px] font-quantico text-primary uppercase tracking-[0.2em] font-bold">
                  {isSyncing ? 'Synchronizing...' : 'Sync Full Kernel Log'}
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemHealth;

