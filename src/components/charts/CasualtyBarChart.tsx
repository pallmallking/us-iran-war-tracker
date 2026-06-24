"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { FactionCasualty } from "@/lib/types";

export function CasualtyBarChart({ factions }: { factions: FactionCasualty[] }) {
  const data = factions.map((f) => ({ name: f.name, killed: f.killed, wounded: f.wounded ?? 0 }));
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
          <Bar dataKey="killed" fill="#ef4444" name="Killed" radius={[4, 4, 0, 0]} />
          <Bar dataKey="wounded" fill="#f59e0b" name="Wounded" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
