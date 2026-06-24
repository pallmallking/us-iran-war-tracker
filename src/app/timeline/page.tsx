"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EventList } from "@/components/feeds/EventList";
import type { ConflictEvent } from "@/lib/types";

export default function TimelinePage() {
  const [events, setEvents] = useState<ConflictEvent[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    fetch("/api/events").then((r) => r.json()).then((d) => { setEvents(d.events ?? []); setUpdated(d.meta?.last_updated ?? ""); });
  }, []);

  const types = useMemo(() => Array.from(new Set(events.map((e) => e.type))).sort(), [events]);
  const filtered = useMemo(() => events.filter((e) => {
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
    return true;
  }), [events, typeFilter, categoryFilter]);

  return (
    <div>
      <PageHeader title="Event Timeline" description="Unified chronological feed of kinetic and diplomatic events" updated={updated} />
      <div className="mb-4 flex flex-wrap gap-2">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300">
          <option value="all">All categories</option>
          <option value="kinetic">Kinetic</option>
          <option value="ground">Ground</option>
          <option value="diplomacy">Diplomacy</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-300">
          <option value="all">All types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <EventList events={filtered} />
    </div>
  );
}
