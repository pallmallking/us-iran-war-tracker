import { PageHeader } from "@/components/dashboard/PageHeader";
import { SourceLink } from "@/components/dashboard/SourceLink";
import { ConflictMap } from "@/components/map/ConflictMap";
import military from "@/data/military-assets.json";
import type { ConflictEvent, MilitaryData } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function MilitaryPage() {
  const data = military as MilitaryData;
  const mapEvents: ConflictEvent[] = data.assets.map((a) => ({
    id: a.id,
    type: a.type,
    category: "ground",
    location: a.location,
    timestamp: a.last_confirmed,
    summary: `${a.name} — ${a.status}`,
    sourceUrl: a.source_url,
    coordinates: a.coordinates,
  }));

  return (
    <div>
      <PageHeader title="Military Assets" description="Curated deployment tracker — updated from public defense reporting" updated={formatDate(data.last_updated)} />
      <ConflictMap events={mapEvents} height="400px" showControls={false} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data.assets.map((asset) => (
          <article key={asset.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-slate-100">{asset.name}</h3>
                <p className="text-xs text-slate-500">{asset.faction} · {asset.type}</p>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-amber-300">{asset.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{asset.location}</p>
            <p className="mt-1 text-xs text-slate-600">Confirmed: {formatDate(asset.last_confirmed)}</p>
            <div className="mt-2"><SourceLink href={asset.source_url}>Reference</SourceLink></div>
          </article>
        ))}
      </div>
    </div>
  );
}
