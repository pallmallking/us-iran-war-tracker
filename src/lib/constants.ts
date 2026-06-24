export const FEED_URLS = {
  kinetic: "https://iranwarlive.com/feed.json",
  ground: "https://ground-scraper.aggeeinn.workers.dev/ground-feed.json",
  diplomacy: "https://diplomacy-scraper.aggeeinn.workers.dev/diplomacy-feed.json",
  hormuz: "https://hormuz-scraper.aggeeinn.workers.dev/hormuz-feed.json",
} as const;

export const RSS_FEEDS = [
  { name: "Reuters", url: "https://feeds.reuters.com/reuters/worldNews", keywords: ["iran", "hormuz", "lebanon", "israel", "gulf", "ceasefire"] },
  { name: "AP News", url: "https://feeds.apnews.com/rss/apf-topnews", keywords: ["iran", "hormuz", "lebanon", "israel", "gulf", "ceasefire"] },
  { name: "BBC", url: "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml", keywords: ["iran", "hormuz", "lebanon", "israel", "gulf", "ceasefire"] },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", keywords: ["iran", "hormuz", "lebanon", "israel", "gulf", "ceasefire"] },
] as const;

export const EVENT_TYPE_COLORS: Record<string, string> = {
  "Missile Strike": "#ef4444",
  "Air Strike": "#f97316",
  "Ground Forces": "#eab308",
  Interception: "#3b82f6",
  "Ceasefire Violation": "#dc2626",
  Ultimatum: "#f59e0b",
  "Official Statement": "#6366f1",
  "Back-Channel Signal": "#8b5cf6",
  Diplomatic: "#22c55e",
};

export const MAP_LAYERS = ["Missile Strike", "Air Strike", "Ground Forces", "Interception", "Diplomatic"] as const;

export const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: "LayoutDashboard" },
  { href: "/map", label: "Map", icon: "Map" },
  { href: "/timeline", label: "Timeline", icon: "Clock" },
  { href: "/casualties", label: "Casualties", icon: "Users" },
  { href: "/military", label: "Military", icon: "Shield" },
  { href: "/economy", label: "Economy", icon: "TrendingUp" },
  { href: "/diplomacy", label: "Diplomacy", icon: "Handshake" },
  { href: "/news", label: "News", icon: "Newspaper" },
] as const;

export const CACHE_TTL_MS = 2 * 60 * 60 * 1000;
