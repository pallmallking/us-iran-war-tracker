import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DiplomacyCard } from "@/components/feeds/DiplomacyCard";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchDiplomacyFeed, fetchDiplomacyEvents } from "@/lib/feeds";

export default async function DiplomacyPage() {
  const [feed, events] = await Promise.all([
    getCached("diplomacy-feed", fetchDiplomacyFeed, CACHE_TTL_MS),
    getCached("diplomacy-events", fetchDiplomacyEvents, CACHE_TTL_MS),
  ]);

  return (
    <div>
      <PageHeader title="Diplomacy" description="Ceasefire negotiations, official statements, and back-channel signals" updated={feed.fetched_at} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <KpiCard label="Deal Status" value="Islamabad MOU" subtext="Signed June 17, 2026 — 60-day final deal clock" variant="success" />
        <KpiCard label="Ceasefire Expires" value={feed.data.ceasefire_expires ?? "No fixed expiry"} />
        <KpiCard label="Diplomatic Events" value={events.data.length} />
      </div>
      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900/50 p-5">
        <h3 className="font-medium text-amber-300">14-Point Islamabad MOU (Summary)</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-400">
          <li>Permanent termination of military operations on all fronts including Lebanon</li>
          <li>Strait of Hormuz reopens with free commercial passage (60 days)</li>
          <li>US lifts naval blockade; oil/sanctions waivers and frozen asset release</li>
          <li>Iran reaffirms no nuclear weapons; HEU stockpile down-blended under IAEA</li>
          <li>Final deal due within 60 days; binding UNSC resolution planned</li>
        </ul>
      </div>
      <div className="grid gap-4">
        {events.data.map((event) => <DiplomacyCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}
