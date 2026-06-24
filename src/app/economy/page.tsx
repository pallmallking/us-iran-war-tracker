import { OilTrendChart } from "@/components/charts/OilTrendChart";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchHormuzFeed, fetchOilPrices } from "@/lib/feeds";
import { formatDate } from "@/lib/utils";

const MILESTONES = [
  { date: "2026-02-28", title: "Operation Epic Fury begins", description: "US-Israeli strikes on Iran launch the conflict." },
  { date: "2026-04-13", title: "US naval blockade", description: "US blockade of Iranian ports begins." },
  { date: "2026-06-17", title: "Islamabad MOU signed", description: "14-point US-Iran memorandum signed." },
  { date: "2026-06-18", title: "Hormuz blockade lifted", description: "Commercial tanker traffic resumes." },
  { date: "2026-06-22", title: "Burgenstock talks", description: "IAEA inspection agreement and sanctions oil waiver." },
];

export default async function EconomyPage() {
  const [hormuz, oil] = await Promise.all([
    getCached("hormuz", fetchHormuzFeed, CACHE_TTL_MS),
    getCached("oil-prices", fetchOilPrices, CACHE_TTL_MS),
  ]);

  return (
    <div>
      <PageHeader title="Economy & Hormuz" description="Strait of Hormuz status, oil markets, and economic milestones" updated={hormuz.fetched_at} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Hormuz Status" value={hormuz.data.current_status} />
        <KpiCard label="Ships Today" value={hormuz.data.ships_today} subtext={`Target: ~100/day prewar`} />
        <KpiCard label="Oil Transit" value={`${hormuz.data.oil_transit_mbpd} mbpd`} />
        <KpiCard label="Brent Crude" value={oil.data.current ? `$${oil.data.current.toFixed(2)}` : "N/A"} variant="success" />
      </div>
      <p className="mb-4 text-sm text-slate-400">{hormuz.data.notes}</p>
      <h3 className="mb-3 text-lg font-medium">Brent Crude Trend (3 months)</h3>
      <OilTrendChart prices={oil.data.prices} />
      <h3 className="mb-3 mt-8 text-lg font-medium">Economic Milestones</h3>
      <div className="space-y-3">
        {MILESTONES.map((m) => (
          <div key={m.date} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-xs text-slate-500">{formatDate(m.date)}</p>
            <p className="font-medium text-slate-200">{m.title}</p>
            <p className="text-sm text-slate-400">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
