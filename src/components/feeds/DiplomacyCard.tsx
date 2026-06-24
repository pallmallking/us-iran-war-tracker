import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SourceLink } from "@/components/dashboard/SourceLink";
import type { ConflictEvent } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";

export function DiplomacyCard({ event }: { event: ConflictEvent }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge label={event.type} tone="alert" />
        {event.significance && <StatusBadge label={event.significance} tone="neutral" />}
        {event.ceasefireImpact && (
          <StatusBadge label={`Ceasefire: ${event.ceasefireImpact}`} tone={event.ceasefireImpact === "Positive" ? "positive" : event.ceasefireImpact === "Negative" ? "negative" : "neutral"} />
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">{event.actor} · {formatTimestamp(event.timestamp)}</p>
      <p className="mt-3 text-sm text-slate-200">{event.summary}</p>
      <div className="mt-3"><SourceLink href={event.sourceUrl}>Source</SourceLink></div>
    </article>
  );
}
