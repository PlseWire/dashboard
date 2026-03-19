import { ShieldAlert } from "lucide-react";

const alerts = [
  { title: "Market Disruption Detected", description: "High-frequency trading shift detected in APAC technology sector. Correlation with recent policy announcements.", severity: "critical", time: "2m ago" },
  { title: "Technology Adoption Spike", description: "Neural interface patent filings increased 300% quarter-over-quarter across major jurisdictions.", severity: "warning", time: "18m ago" },
  { title: "New Data Stream Available", description: "Satellite imagery feed from ESA Sentinel-2 synchronized successfully.", severity: "info", time: "1h ago" },
  { title: "Anomalous Trading Pattern", description: "Unusual volume detected in rare earth mineral futures. Cross-referencing with geopolitical signals.", severity: "critical", time: "2h ago" },
  { title: "Sentiment Shift Detected", description: "Social media sentiment for autonomous vehicles shifted from neutral to strongly positive.", severity: "warning", time: "3h ago" },
  { title: "Model Recalibration Complete", description: "Trend prediction model v4.2 recalibrated with latest market data. Accuracy improved 2.3%.", severity: "info", time: "4h ago" },
];

const severityMap: Record<string, string> = {
  critical: "severity-critical",
  warning: "severity-warning",
  info: "severity-info",
};

const severityLabel: Record<string, string> = {
  critical: "CRITICAL",
  warning: "WARNING",
  info: "INFO",
};

const Alerts = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert size={20} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">Alert Log</h1>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`widget-card ${severityMap[alert.severity]}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-sm font-bold text-foreground uppercase">{alert.title}</p>
                  <span className="metric-label">{severityLabel[alert.severity]}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <span className="metric-label shrink-0">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
