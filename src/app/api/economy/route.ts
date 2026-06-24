import { NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchHormuzFeed, fetchOilPrices } from "@/lib/feeds";

const MILESTONES = [
  { date: "2026-02-28", title: "Operation Epic Fury begins", description: "US-Israeli strikes on Iran launch the conflict." },
  { date: "2026-04-13", title: "US naval blockade", description: "US blockade of Iranian ports begins, tightening oil exports." },
  { date: "2026-06-17", title: "Islamabad MOU signed", description: "14-point US-Iran memorandum signed; ceasefire framework takes effect." },
  { date: "2026-06-18", title: "Hormuz blockade lifted", description: "US lifts naval blockade; commercial tanker traffic resumes." },
  { date: "2026-06-22", title: "Burgenstock talks", description: "IAEA inspection agreement and 60-day sanctions oil waiver announced." },
];

export async function GET() {
  const [hormuz, oil] = await Promise.all([
    getCached("hormuz", fetchHormuzFeed, CACHE_TTL_MS),
    getCached("oil-prices", fetchOilPrices, CACHE_TTL_MS),
  ]);
  return NextResponse.json({
    hormuz: hormuz.data,
    oil_prices: oil.data.prices,
    oil_current: oil.data.current,
    milestones: MILESTONES,
    meta: { last_updated: hormuz.fetched_at, stale: hormuz.stale || oil.stale },
  });
}
