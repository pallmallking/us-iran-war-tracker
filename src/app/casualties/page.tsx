import { CasualtyBarChart } from "@/components/charts/CasualtyBarChart";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SourceLink } from "@/components/dashboard/SourceLink";
import casualties from "@/data/casualties.json";
import type { CasualtiesData } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function CasualtiesPage() {
  const data = casualties as CasualtiesData;
  return (
    <div>
      <PageHeader title="Casualties" description="Verified fatality figures by faction — sourced from official ministries and defense briefings" updated={formatDate(data.last_updated)} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs text-slate-400">Total verified range</p>
          <p className="text-3xl font-semibold text-red-300">{data.total_range[0].toLocaleString()}–{data.total_range[1].toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 sm:col-span-2">
          <p className="text-sm text-slate-400">{data.notes}</p>
        </div>
      </div>
      <CasualtyBarChart factions={data.factions} />
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs uppercase text-slate-500">
            <tr><th className="px-4 py-3">Faction</th><th className="px-4 py-3">Killed</th><th className="px-4 py-3">Wounded</th><th className="px-4 py-3">Breakdown</th><th className="px-4 py-3">Source</th></tr>
          </thead>
          <tbody>
            {data.factions.map((f) => (
              <tr key={f.name} className="border-t border-slate-800">
                <td className="px-4 py-3 font-medium">{f.name}</td>
                <td className="px-4 py-3">{f.killed_range ? `${f.killed.toLocaleString()} (${f.killed_range[0]}–${f.killed_range[1]})` : f.killed.toLocaleString()}</td>
                <td className="px-4 py-3">{f.wounded?.toLocaleString() ?? "—"}</td>
                <td className="px-4 py-3 text-slate-400">{f.military_killed ? `${f.military_killed} military` : ""}{f.civilian_killed ? ` / ${f.civilian_killed} civilian` : ""}</td>
                <td className="px-4 py-3 text-slate-400">{f.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
