"use client";

import { useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { EVENT_TYPE_COLORS, MAP_LAYERS } from "@/lib/constants";
import type { ConflictEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ConflictMapProps {
  events: ConflictEvent[];
  height?: string;
  showControls?: boolean;
}

const HOURS: Record<string, number> = { "12H": 12, "24H": 24, "48H": 48, ALL: Infinity };

export function ConflictMap({ events, height = "500px", showControls = true }: ConflictMapProps) {
  const [window, setWindow] = useState<keyof typeof HOURS>("24H");
  const [layers, setLayers] = useState<Set<string>>(new Set(MAP_LAYERS));
  const [selected, setSelected] = useState<ConflictEvent | null>(null);

  const filtered = useMemo(() => {
    const cutoff = HOURS[window] === Infinity ? 0 : Date.now() - HOURS[window] * 3600000;
    return events.filter((e) => {
      if (!e.coordinates) return false;
      if (new Date(e.timestamp).getTime() < cutoff) return false;
      if (e.category === "diplomacy") return layers.has("Diplomatic");
      return layers.has(e.type);
    });
  }, [events, window, layers]);

  const toggleLayer = (layer: string) => {
    setLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {showControls && (
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(HOURS).map((w) => (
            <button key={w} onClick={() => setWindow(w as keyof typeof HOURS)} className={cn(
              "rounded-md px-3 py-1 text-xs",
              window === w ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400"
            )}>{w}</button>
          ))}
          <div className="mx-2 h-4 w-px bg-slate-700" />
          {MAP_LAYERS.map((layer) => (
            <button key={layer} onClick={() => toggleLayer(layer)} className={cn(
              "rounded-md px-2 py-1 text-xs",
              layers.has(layer) ? "bg-slate-700 text-slate-200" : "bg-slate-900 text-slate-600 line-through"
            )} style={{ borderLeft: `3px solid ${EVENT_TYPE_COLORS[layer] ?? "#64748b"}` }}>{layer}</button>
          ))}
        </div>
      )}
      <div className="relative overflow-hidden rounded-xl border border-slate-800" style={{ height }}>
        <Map
          initialViewState={{ longitude: 50, latitude: 28, zoom: 4 }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />
          {filtered.map((event) => (
            <Marker key={event.id} longitude={event.coordinates!.lng} latitude={event.coordinates!.lat} anchor="center" onClick={(e) => { e.originalEvent.stopPropagation(); setSelected(event); }}>
              <div className="h-3 w-3 cursor-pointer rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: EVENT_TYPE_COLORS[event.type] ?? "#94a3b8" }} />
            </Marker>
          ))}
        </Map>
        {selected && (
          <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-slate-700 bg-slate-950/95 p-3 text-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-amber-300">{selected.type}</p>
                <p className="text-xs text-slate-400">{selected.location}</p>
                <p className="mt-1 text-slate-200">{selected.summary}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500">{filtered.length} events with coordinates in selected window</p>
    </div>
  );
}
