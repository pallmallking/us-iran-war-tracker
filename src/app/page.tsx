import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { EventList } from "@/components/feeds/EventList";
import { ConflictMap } from "@/components/map/ConflictMap";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchAllEvents, fetchDiplomacyEvents, fetchHormuzFeed } from "@/lib/feeds";
import casualties from "@/data/casualties.json";
import { getWarDay } from "@/lib/utils";
import type { CasualtiesData } from "@/lib/types";

export default async function OverviewPage() {
  const [events, diplomacy, hormuz] = await Promise.all([
    getCached("events", fetchAllEvents, CACHE_TTL_MS),
    getCached("diplomacy-events", fetchDiplomacyEvents, CACHE_TTL_MS).catch(() => ({ data: [], fetched_at: new Date().toISOString(), stale: false })),
    getCached("hormuz", fetchHormuzFeed, CACHE_TTL_MS).catch(() => null),
  ]);

  const data = casualties as CasualtiesData;
  const latestDiplomacy = diplomacy.data[0];
  const recent = events.data.slice(0, 8);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Operation Epic Fury — US-Iran-Israel conflict tracker"
        updated={events.fetched_at}
      />

      {latestDiplomacy && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="Latest Diplomatic Signal" tone="alert" />
            {latestDiplomacy.ceasefireImpact && (
              <StatusBadge label={latestDiplomacy.ceasefireImpact} tone={latestDiplomacy.ceasefireImpact === "Positive" ? "positive" : latestDiplomacy.ceasefireImpact === "Negative" ? "negative" : "neutral"} />
            )}
          </div>
          <p className="mt-2 text-sm text-slate-300">{latestDiplomacy.summary}</p>
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="War Day" value={`Day ${getWarDay()}`} subtext="Since Feb 28, 2026" />
        <KpiCard label="Verified Deaths (range)" value={`${data.total_range[0].toLocaleString()}–${data.total_range[1].toLocaleString()}`} subtext="All fronts, cross-source" variant="alert" />
        <KpiCard label="Hormuz Status" value={hormuz?.data.current_status ?? "Unknown"} subtext={hormuz ? `${hormuz.data.ships_today} ships today` : "Feed unavailable"} variant={hormuz?.data.current_status?.includes("Open") ? "success" : "alert"} />
        <KpiCard label="Tracked Events" value={events.data.length} subtext={`${events.data.filter((e) => e.coordinates).length} with map coordinates`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <h3 className="mb-3 text-lg font-medium text-slate-200">Live Map (24H)</h3>
          <ConflictMap events={events.data} height="360px" showControls={false} />
        </section>
        <section>
          <h3 className="mb-3 text-lg font-medium text-slate-200">Latest Events</h3>
          <EventList events={recent} compact />
        </section>
      </div>
    </div>
  );
}
