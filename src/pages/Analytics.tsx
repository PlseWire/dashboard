import { BarChart3 } from "lucide-react";

const Analytics = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={20} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Signal Volume */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Signal Volume (24h)</h3>
            <div className="status-dot-primary" />
          </div>
          <div className="h-40 flex items-end gap-1">
            {[30, 45, 60, 40, 80, 55, 70, 90, 65, 50, 75, 85, 45, 60, 95, 70, 55, 80, 40, 65, 50, 75, 90, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 hover:bg-primary transition-colors cursor-crosshair rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 metric-label">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>NOW</span>
          </div>
        </div>

        {/* Trend Accuracy */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Prediction Accuracy</h3>
            <div className="status-dot-primary" />
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-5xl font-quantico text-primary">94.7%</p>
              <p className="metric-label mt-2">30-DAY ROLLING AVERAGE</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Signal Categories</h3>
            <div className="status-dot-primary" />
          </div>
          <div className="space-y-3">
            {[
              { label: "Technology", pct: 34 },
              { label: "Finance", pct: 22 },
              { label: "Geopolitics", pct: 18 },
              { label: "Biotech", pct: 14 },
              { label: "Defense", pct: 12 },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between metric-label mb-1">
                  <span>{cat.label.toUpperCase()}</span>
                  <span>{cat.pct}%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill-primary" style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Stats */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Processing Stats</h3>
            <div className="status-dot-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Signals/sec", value: "1,247" },
              { label: "Sources Active", value: "6/8" },
              { label: "Models Running", value: "12" },
              { label: "Queue Depth", value: "342" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 border border-border rounded-sm">
                <p className="text-xl font-quantico text-foreground">{stat.value}</p>
                <p className="metric-label mt-1">{stat.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
