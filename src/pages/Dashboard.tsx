import { useState, useEffect } from "react";
import { LucideIcon, Activity, Zap, ShieldAlert, Cpu, Newspaper, Database, LineChart, TrendingUp, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../contexts/AuthContext";

const Widget = ({
  title,
  icon: Icon,
  className = "",
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`widget-card hover:scale-[1.01] transition-transform flex flex-col ${className}`}>
    <div className="widget-header">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="status-dot-primary" />
    </div>
    {children}
  </div>
);

const initialNews = [
  { headline: "APAC tech consolidation accelerates", time: "2m ago", active: true },
  { headline: "New EU AI governance framework", time: "14m ago", active: false },
  { headline: "Semiconductor supply chain shift", time: "28m ago", active: false },
  { headline: "Quantum computing milestone reached", time: "1h ago", active: false },
];

const potentialNews = [
  "Global defense spending reaches $2.4T annual run rate",
  "Central bank digital currency pilots expand to 30 nations",
  "Neural interface trials show promising clinical results",
  "Autonomous shipping lanes approved in Nordic waters",
  "New synthetic biology breakthrough in protein folding",
  "Dark web cybersecurity incident highlights zero-day exploit",
  "Major financial API network suffers unprecedented latency",
  "Satellite orbital path deviation detected over Atlantic",
  "Algorithm optimization slashes cloud computation costs",
];

const Dashboard = () => {
  const { user } = useAuth();
  const [news, setNews] = useState(initialNews);

  useEffect(() => {
    // Simulate real-time news updates
    const interval = setInterval(() => {
      setNews(prev => {
        const randomHeadline = potentialNews[Math.floor(Math.random() * potentialNews.length)];
        // Ensure we don't pick the exact same headline back-to-back
        if (randomHeadline === prev[0].headline) return prev;

        return [
          { headline: randomHeadline, time: "Just now", active: true },
          { ...prev[0], time: "2m ago", active: false },
          { ...prev[1], time: "14m ago", active: false },
          { ...prev[2], time: "28m ago", active: false }
        ];
      });
    }, 6000); // Updates every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-quantico tracking-tight flex items-center gap-2">
            Welcome back, {user?.username || 'Operator-7X'}
          </h1>
          <p className="text-sm font-dmsans text-muted-foreground mt-1 flex items-center gap-1.5">
            System Active — All streams integrated
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {/* Main Overview Chart */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 widget-card hover:scale-[1.005]">
          <div className="widget-header mb-6">
            <div className="flex items-center gap-2">
              <LineChart size={18} className="text-primary" />
              <h3 className="widget-title text-sm">Real-time Global Pulse</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="metric-label">Signal Processed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="metric-label">Neural Pathways</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { time: '00:00', signal: 4000, neural: 2400 },
                  { time: '04:00', signal: 3000, neural: 1398 },
                  { time: '08:00', signal: 2000, neural: 9800 },
                  { time: '12:00', signal: 2780, neural: 3908 },
                  { time: '16:00', signal: 1890, neural: 4800 },
                  { time: '20:00', signal: 2390, neural: 3800 },
                  { time: '24:00', signal: 3490, neural: 4300 },
                ]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNeural" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted))"
                  fontSize={12}
                  fontFamily="Quantico"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted))"
                  fontSize={12}
                  fontFamily="Quantico"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    fontFamily: 'DM Sans',
                    borderWidth: '1px',
                    borderRadius: '2px'
                  }}
                  itemStyle={{ fontFamily: 'Quantico' }}
                />
                <Area
                  type="monotone"
                  dataKey="signal"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSignal)"
                />
                <Area
                  type="monotone"
                  dataKey="neural"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNeural)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Trend Signals */}
        <Widget title="Trend Signals" icon={Zap} className="xl:col-span-1">
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {[
              { label: "Quantum Encryption", growth: "+124%", trend: "up" },
              { label: "Neural Interfaces", growth: "+82%", trend: "up" },
              { label: "Autonomous Logistics", growth: "+45%", trend: "up" },
              { label: "Edge Computing", growth: "+37%", trend: "up" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-2 rounded-sm bg-foreground/5 hover:bg-foreground/10 transition-colors border border-transparent hover:border-border cursor-default">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-sm font-dmsans text-foreground">{item.label}</span>
                </div>
                <span className="growth-badge shadow-[0_0_10px_rgba(32,0,234,0.2)]">
                  {item.growth}
                </span>
              </div>
            ))}
          </div>
        </Widget>

        {/* News Streams - Timeline Layout */}
        <Widget title="News Streams" icon={Newspaper} className="md:col-span-2 lg:col-span-2 xl:col-span-1">
          <div className="relative pl-4 border-l border-border/50 space-y-4 py-2 my-auto">
            {news.map((item, i) => (
              <div key={`${item.headline}-${i}`} className="relative group cursor-pointer animate-fade-in">
                <div className={`absolute -left-[21px] top-1.5 w-2 h-2 rounded-full ${item.active ? 'bg-primary shadow-[0_0_8px_hsl(var(--primary))]' : 'bg-muted-foreground/30'} group-hover:bg-primary transition-colors`} />
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-dmsans leading-tight transition-colors line-clamp-2 ${item.active ? 'text-foreground font-medium' : 'text-foreground/80'} group-hover:text-primary`}>
                    {item.headline}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={10} />
                    <span className={`metric-label !text-[9px] ${item.active ? 'text-primary/80 animate-pulse' : ''}`}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* AI Analysis */}
        <Widget title="AI Intelligence Flow" icon={Activity} className="col-span-1">
          <div className="h-full min-h-[140px] flex items-end gap-1.5 pt-4">
            {[40, 70, 45, 90, 65, 80, 30, 95, 50, 75, 60, 85].map((h, i) => (
              <div
                key={i}
                className="group relative flex-1 bg-primary/20 hover:bg-primary transition-all duration-300 cursor-crosshair rounded-t-sm"
                style={{ height: `${h}%` }}
              >
                {/* Tooltip on hover */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border text-[10px] font-quantico py-0.5 px-1.5 rounded-sm pointer-events-none z-10 shadow-lg">
                  {h}%
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </Widget>

        {/* System Health */}
        <Widget title="System Infrastructure" icon={Cpu} className="col-span-1">
          <div className="space-y-4 my-auto">
            {[
              { label: "GPU CLUSTER A", value: 88, variant: "primary" },
              { label: "DATA PROCESSING", value: 64, variant: "secondary" },
              { label: "LATENCY", value: 14, variant: "primary", unit: "MS" },
              { label: "UPTIME", value: 99, variant: "secondary", unit: "%" },
            ].map((metric, i) => (
              <div key={i} className="group">
                <div className="flex justify-between metric-label mb-1.5">
                  <span className="group-hover:text-foreground transition-colors">{metric.label}</span>
                  <span className={metric.variant === 'primary' ? 'text-primary' : 'text-secondary'}>
                    {metric.value}{metric.unit || "%"}
                  </span>
                </div>
                <div className="metric-bar-track overflow-hidden rounded-full h-1.5">
                  <div
                    className={`h-full transition-all duration-1000 ease-out relative ${metric.variant === "primary" ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))]" : "bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]"}`}
                    style={{ width: `${metric.value}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" style={{ transform: 'skewX(-20deg)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* Alerts */}
        <Widget title="Critical Alerts" icon={ShieldAlert} className="md:col-span-2 xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
            <div className="severity-critical rounded-sm flex flex-col h-full justify-between group hover:bg-destructive/10 transition-colors">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  <p className="text-destructive font-bold uppercase text-[10px] tracking-wider">Market Disruption</p>
                </div>
                <p className="text-muted-foreground text-xs font-dmsans group-hover:text-foreground/80 transition-colors">High-frequency shift in APAC tech sector.</p>
              </div>
              <button className="mt-3 text-[10px] font-quantico text-foreground flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-destructive">
                Investigate <ArrowRight size={10} />
              </button>
            </div>

            <div className="severity-warning rounded-sm flex flex-col h-full justify-between group hover:bg-yellow-500/10 transition-colors">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <p className="text-yellow-500 font-bold uppercase text-[10px] tracking-wider">Adoption Spike</p>
                </div>
                <p className="text-muted-foreground text-xs font-dmsans group-hover:text-foreground/80 transition-colors">Neural interface patent filings up 300%.</p>
              </div>
              <button className="mt-3 text-[10px] font-quantico text-foreground flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-yellow-500">
                View Data <ArrowRight size={10} />
              </button>
            </div>

            <div className="severity-info rounded-sm flex flex-col h-full justify-between group hover:bg-primary/10 transition-colors">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="text-primary font-bold uppercase text-[10px] tracking-wider">New Data Stream</p>
                </div>
                <p className="text-muted-foreground text-xs font-dmsans group-hover:text-foreground/80 transition-colors">Satellite imagery feed synchronized.</p>
              </div>
              <button className="mt-3 text-[10px] font-quantico text-foreground flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-primary">
                Explore Feed <ArrowRight size={10} />
              </button>
            </div>
          </div>
        </Widget>

        {/* Data Sources */}
        <Widget title="Connected Sources" icon={Database} className="md:col-span-2 xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Global News Feeds", status: true, delay: "12ms" },
              { name: "Social Media Streams", status: true, delay: "45ms" },
              { name: "Industry Research", status: true, delay: "8ms" },
              { name: "Financial Market APIs", status: false, delay: "--" },
              { name: "Satellite Imagery", status: true, delay: "120ms" },
              { name: "Dark Web Scanners", status: true, delay: "34ms" },
            ].map((source, i) => (
              <div key={i} className="flex flex-col p-2.5 rounded-sm border border-border/50 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-dmsans text-foreground line-clamp-1 pr-2">{source.name}</span>
                  {source.status ? (
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                  ) : (
                    <XCircle size={14} className="text-muted-foreground shrink-0" />
                  )}
                </div>
                <div className="flex gap-3 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-quantico text-muted-foreground uppercase tracking-wider mb-0.5">Status</span>
                    <span className={`text-[10px] font-quantico uppercase tracking-wider ${source.status ? "text-green-500" : "text-muted-foreground"}`}>
                      {source.status ? "Active" : "Offline"}
                    </span>
                  </div>
                  <div className="w-px bg-border/50" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-quantico text-muted-foreground uppercase tracking-wider mb-0.5">Ping</span>
                    <span className="text-[10px] font-quantico uppercase tracking-wider text-foreground">
                      {source.delay}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default Dashboard;
