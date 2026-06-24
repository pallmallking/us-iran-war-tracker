import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SourceLink } from "@/components/dashboard/SourceLink";
import { EVENT_TYPE_COLORS } from "@/lib/constants";
import type { ConflictEvent } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";

export function EventList({ events, compact = false }: { events: ConflictEvent[]; compact?: boolean }) {
  if (!events.length) return <p className="text-sm text-slate-500">No events available.</p>;
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <article key={event.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium" style={{ color: EVENT_TYPE_COLORS[event.type] ?? "#94a3b8" }}>{event.type}</span>
            {event.ceasefireImpact && (
              <StatusBadge label={event.ceasefireImpact} tone={event.ceasefireImpact === "Positive" ? "positive" : event.ceasefireImpact === "Negative" ? "negative" : "neutral"} />
            )}
            <span className="text-xs text-slate-500">{formatTimestamp(event.timestamp)}</span>
          </div>
          {!compact && <p className="mt-1 text-xs text-slate-400">{event.location}{event.actor ? ` · ${event.actor}` : ""}</p>}
          <p className={compact ? "mt-1 text-sm text-slate-300 line-clamp-2" : "mt-2 text-sm text-slate-200"}>{event.summary}</p>
          <div className="mt-2"><SourceLink href={event.sourceUrl}>Source</SourceLink></div>
        </article>
      ))}
    </div>
  );
}
