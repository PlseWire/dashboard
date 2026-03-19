import { useState } from "react";
import { TrendingUp, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";

const trends = [
  { topic: "Quantum Encryption Standards", growth: 124, category: "Technology", direction: "up" },
  { topic: "Neural Interface Patents", growth: 82, category: "Biotech", direction: "up" },
  { topic: "Autonomous Supply Chains", growth: 45, category: "Logistics", direction: "up" },
  { topic: "Edge Computing Adoption", growth: 37, category: "Infrastructure", direction: "up" },
  { topic: "Digital Currency Regulation", growth: 29, category: "Finance", direction: "up" },
  { topic: "Space-based Internet", growth: 18, category: "Telecom", direction: "up" },
  { topic: "Traditional Retail", growth: -12, category: "Commerce", direction: "down" },
  { topic: "Legacy Cloud Services", growth: -8, category: "Technology", direction: "down" },
];

const TrendSignals = () => {
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredTrends = trends.filter(t => filter === "all" ? true : t.direction === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-primary" />
          <h1 className="text-2xl font-quantico tracking-tight">Trend Signals</h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-3 py-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-dmsans rounded-sm bg-card"
          >
            <Filter size={14} />
            {filter === 'all' ? 'Filter' : `Filter: ${filter === 'up' ? 'Up' : 'Down'}`}
          </button>

          {isFilterOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-sm shadow-lg z-50 py-1 animate-fade-in">
                {['all', 'up', 'down'].map(f => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm font-dmsans hover:bg-primary/10 transition-colors ${filter === f ? 'text-primary' : 'text-foreground'}`}
                  >
                    {f === 'all' ? 'All Signals' : f === 'up' ? 'Trending Up' : 'Trending Down'}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="widget-card">
        <div className="space-y-0">
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-12 gap-4 py-2 border-b border-border metric-label items-center">
            <div className="col-span-5">SIGNAL</div>
            <div className="col-span-3">CATEGORY</div>
            <div className="col-span-2">GROWTH</div>
            <div className="col-span-2">DIRECTION</div>
          </div>
          {filteredTrends.map((t, i) => (
            <div key={i} className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 py-4 sm:py-3 border-b border-border/50 hover:bg-primary/5 transition-colors relative group">
              <div className="sm:col-span-5 text-sm font-dmsans text-foreground font-medium sm:font-normal pr-8 sm:pr-0 flex items-center">
                {t.topic}
              </div>
              <div className="sm:col-span-3 flex items-center gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">CATEGORY</span>
                <span className="text-[10px] font-quantico uppercase tracking-wider text-secondary flex items-center">{t.category}</span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <span className="sm:hidden metric-label !text-[8px] opacity-70">GROWTH</span>
                <span className={`growth-badge ${t.direction === "down" ? "bg-destructive/20 text-destructive shadow-[0_0_10px_rgba(255,0,0,0.15)]" : "shadow-[0_0_10px_rgba(32,0,234,0.15)]"}`}>
                  {t.direction === "up" ? "+" : ""}{t.growth}%
                </span>
              </div>
              <div className="absolute top-4 right-2 sm:static sm:col-span-2 flex items-center">
                {t.direction === "up" ? (
                  <ArrowUpRight size={18} className="text-green-500 max-sm:opacity-80" />
                ) : (
                  <ArrowDownRight size={18} className="text-destructive max-sm:opacity-80" />
                )}
              </div>
            </div>
          ))}
          {filteredTrends.length === 0 && (
            <div className="py-8 text-center text-muted-foreground text-sm font-dmsans">
              No signals found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendSignals;
