import { NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchDiplomacyFeed, fetchDiplomacyEvents } from "@/lib/feeds";

export async function GET() {
  const [feed, events] = await Promise.all([
    getCached("diplomacy-feed", fetchDiplomacyFeed, CACHE_TTL_MS),
    getCached("diplomacy-events", fetchDiplomacyEvents, CACHE_TTL_MS),
  ]);
  return NextResponse.json({
    feed: feed.data,
    events: events.data,
    meta: { last_updated: feed.fetched_at, stale: feed.stale || events.stale },
  });
}
