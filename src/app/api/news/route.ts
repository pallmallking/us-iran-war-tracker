import { NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchNews } from "@/lib/rss";

export async function GET() {
  const result = await getCached("news", fetchNews, CACHE_TTL_MS);
  return NextResponse.json({ items: result.data, meta: { last_updated: result.fetched_at, stale: result.stale } });
}
