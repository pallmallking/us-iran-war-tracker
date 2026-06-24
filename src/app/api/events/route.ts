import { NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchAllEvents } from "@/lib/feeds";

export async function GET() {
  const result = await getCached("events", fetchAllEvents, CACHE_TTL_MS);
  return NextResponse.json({ events: result.data, meta: { last_updated: result.fetched_at, stale: result.stale } });
}
