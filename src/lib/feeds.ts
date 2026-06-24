import { FEED_URLS } from "./constants";
import type { ConflictEvent, DiplomacyFeed, FeedItem, HormuzFeed, KineticFeed, OilPricePoint } from "./types";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 0 }, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

function normalizeKineticItem(item: FeedItem, category: "kinetic" | "ground"): ConflictEvent {
  return {
    id: item.event_id,
    type: item.type ?? "Unknown",
    category,
    location: item.location ?? "Unknown",
    timestamp: item.timestamp,
    confidence: item.confidence,
    summary: item.event_summary ?? "No summary available",
    sourceUrl: item.source_url,
    casualties: item._osint_meta?.casualties,
    coordinates: item._osint_meta?.coordinates,
  };
}

function normalizeDiplomacyItem(item: FeedItem): ConflictEvent {
  return {
    id: item.event_id,
    type: item.event_type ?? "Diplomatic",
    category: "diplomacy",
    location: "Diplomatic",
    timestamp: item.timestamp,
    summary: item.statement_summary ?? "No summary available",
    sourceUrl: item.source_url,
    actor: item.actor,
    significance: item.significance,
    ceasefireImpact: item.ceasefire_impact,
  };
}

export async function fetchKineticEvents(): Promise<ConflictEvent[]> {
  const [kinetic, ground] = await Promise.all([
    fetchJson<KineticFeed>(FEED_URLS.kinetic).catch(() => ({ last_updated: new Date().toISOString(), items: [] })),
    fetchJson<KineticFeed>(FEED_URLS.ground).catch(() => ({ last_updated: new Date().toISOString(), items: [] })),
  ]);
  const events = [
    ...kinetic.items.map((item) => normalizeKineticItem(item, "kinetic")),
    ...ground.items.map((item) => normalizeKineticItem(item, "ground")),
  ];
  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function fetchDiplomacyFeed(): Promise<DiplomacyFeed> {
  return fetchJson<DiplomacyFeed>(FEED_URLS.diplomacy);
}

export async function fetchDiplomacyEvents(): Promise<ConflictEvent[]> {
  const feed = await fetchDiplomacyFeed();
  return feed.items.map(normalizeDiplomacyItem).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function fetchHormuzFeed(): Promise<HormuzFeed> {
  return fetchJson<HormuzFeed>(FEED_URLS.hormuz);
}

export async function fetchAllEvents(): Promise<ConflictEvent[]> {
  const [kinetic, diplomacy] = await Promise.all([fetchKineticEvents(), fetchDiplomacyEvents().catch(() => [])]);
  return [...kinetic, ...diplomacy].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function fetchOilPrices(): Promise<{ prices: OilPricePoint[]; current?: number }> {
  try {
    const url = "https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=3mo";
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("Yahoo finance unavailable");
    const json = (await res.json()) as {
      chart?: { result?: Array<{ timestamp?: number[]; indicators?: { quote?: Array<{ close?: (number | null)[] }> } }> };
    };
    const result = json.chart?.result?.[0];
    const timestamps = result?.timestamp ?? [];
    const closes = result?.indicators?.quote?.[0]?.close ?? [];
    const prices: OilPricePoint[] = timestamps
      .map((ts, i) => ({ date: new Date(ts * 1000).toISOString().split("T")[0], price: closes[i] ?? 0 }))
      .filter((p) => p.price > 0);
    return { prices, current: prices.at(-1)?.price };
  } catch {
    return {
      prices: [
        { date: "2026-02-28", price: 72 },
        { date: "2026-03-15", price: 95 },
        { date: "2026-04-01", price: 118 },
        { date: "2026-05-01", price: 105 },
        { date: "2026-06-01", price: 88 },
        { date: "2026-06-18", price: 74 },
        { date: "2026-06-24", price: 71 },
      ],
      current: 71,
    };
  }
}
