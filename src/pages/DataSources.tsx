import { Database } from "lucide-react";

const sources = [
  { name: "Reuters Global News Feed", type: "News", status: true, latency: "12ms", records: "2.4M" },
  { name: "Bloomberg Terminal API", type: "Financial", status: true, latency: "8ms", records: "18.7M" },
  { name: "X/Twitter Firehose", type: "Social Media", status: true, latency: "45ms", records: "142M" },
  { name: "arXiv Research Papers", type: "Research", status: true, latency: "200ms", records: "890K" },
  { name: "ESA Sentinel-2 Imagery", type: "Satellite", status: true, latency: "1.2s", records: "56K" },
  { name: "SIPRI Defense Database", type: "Defense", status: false, latency: "—", records: "340K" },
  { name: "World Bank Open Data", type: "Economic", status: true, latency: "180ms", records: "1.2M" },
  { name: "Patent Office APIs", type: "IP", status: false, latency: "—", records: "4.1M" },
];

const DataSources = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Database size={20} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">Data Sources</h1>
      </div>

      <div className="widget-card">
        <div className="space-y-0 min-w-full">
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-12 gap-4 py-2 border-b border-border metric-label items-center">
            <div className="col-span-4">SOURCE</div>
            <div className="col-span-3">TYPE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-1">LATENCY</div>
            <div className="col-span-2 text-right">RECORDS</div>
          </div>
          {sources.map((s, i) => (
            <div key={i} className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 py-4 sm:py-3 border-b border-border/50 hover:bg-primary/5 transition-colors relative group">
              <div className="sm:col-span-4 text-sm font-dmsans text-foreground font-medium sm:font-normal pr-8 sm:pr-0 flex items-center">
                {s.name}
              </div>
              <div className="sm:col-span-3 flex items-center gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">TYPE</span>
                <span className="text-[10px] font-quantico uppercase tracking-wider text-secondary flex items-center">{s.type}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">STATUS</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.status ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-muted shadow-none"}`} />
                  <span className="metric-label">{s.status ? "ACTIVE" : "OFFLINE"}</span>
                </div>
              </div>
              <div className="sm:col-span-1 flex items-center gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">LATENCY</span>
                <span className="text-sm font-dmsans text-muted-foreground">{s.latency}</span>
              </div>
              <div className="sm:col-span-2 flex items-center sm:justify-end gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">RECORDS</span>
                <span className="text-sm font-dmsans text-muted-foreground">{s.records}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSources;
