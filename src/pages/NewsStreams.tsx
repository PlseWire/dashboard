import { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";

const initialNewsItems = [
  { id: 1, headline: "APAC tech sector consolidation reaches record pace", source: "Reuters", category: "Markets", time: "2m ago", priority: "high" },
  { id: 2, headline: "EU proposes comprehensive AI governance framework", source: "Bloomberg", category: "Policy", time: "14m ago", priority: "medium" },
  { id: 3, headline: "Semiconductor supply chain diversification accelerates", source: "Nikkei", category: "Industry", time: "28m ago", priority: "high" },
  { id: 4, headline: "Quantum computing breakthrough at MIT research lab", source: "Nature", category: "Research", time: "1h ago", priority: "medium" },
  { id: 5, headline: "Global defense spending reaches $2.4T annual run rate", source: "SIPRI", category: "Defense", time: "2h ago", priority: "low" },
  { id: 6, headline: "Central bank digital currency pilots expand to 30 nations", source: "BIS", category: "Finance", time: "3h ago", priority: "medium" },
  { id: 7, headline: "Neural interface trials show promising clinical results", source: "JAMA", category: "Biotech", time: "4h ago", priority: "high" },
  { id: 8, headline: "Autonomous shipping lanes approved in Nordic waters", source: "Lloyd's", category: "Logistics", time: "5h ago", priority: "low" },
];

const liveHeadlinePool = [
  { headline: "Synthetic biology breakthrough allows rapid protein modeling", category: "Biotech", source: "Science" },
  { headline: "Dark web forum breached revealing zero-day exploits", category: "Cybersecurity", source: "Wired" },
  { headline: "Major crypto exchange halts trading amid regulatory probe", category: "Finance", source: "Coindesk" },
  { headline: "Next-gen solid-state batteries entering mass production", category: "Energy", source: "The Verge" },
  { headline: "Commercial space station module successfully deployed", category: "Aerospace", source: "Space.com" },
  { headline: "Global latency drop achieved via new undersea cable", category: "Infrastructure", source: "TechCrunch" },
  { headline: "Algorithmic trading firm reports unprecedented Q3 yields", category: "Markets", source: "WSJ" },
];

const priorityStyles: Record<string, string> = {
  high: "border-l-2 border-destructive",
  medium: "border-l-2 border-primary",
  low: "border-l-2 border-muted",
};

const NewsStreams = () => {
  const [items, setItems] = useState(initialNewsItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) => {
        // Pick a matching pair out of the headline pool
        const randomNews = liveHeadlinePool[Math.floor(Math.random() * liveHeadlinePool.length)];
        
        // Randomize priority dynamically
        const priorities = ["high", "medium", "low"];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

        const newItem = {
          id: Date.now(),
          headline: randomNews.headline,
          source: randomNews.source,
          category: randomNews.category,
          time: "Just now",
          priority: randomPriority,
        };

        // Inject new item at top, shift the rest down
        const updatedItems = [newItem, ...prevItems.slice(0, 7)];
        
        // Update timestamps on older items to look realistic
        updatedItems[1].time = "1m ago";
        updatedItems[2].time = "14m ago";

        return updatedItems;
      });
    }, 5000); // Trigger every 5 seconds for demonstration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper size={20} className="text-primary" />
        <h1 className="text-2xl font-quantico tracking-tight">News Streams</h1>
        <span className="status-dot-active ml-2" />
        <span className="metric-label">LIVE</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`widget-card ${priorityStyles[item.priority]} hover:scale-[1.01] transition-transform animate-fade-in`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-dmsans text-foreground leading-tight mb-2">{item.headline}</p>
                <div className="flex items-center gap-3">
                  <span className="metric-label">{item.source}</span>
                  <span className="text-[10px] font-quantico uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-sm">{item.category}</span>
                </div>
              </div>
              <span className="metric-label shrink-0">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsStreams;
