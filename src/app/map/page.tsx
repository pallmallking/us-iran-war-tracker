import { PageHeader } from "@/components/dashboard/PageHeader";
import { ConflictMap } from "@/components/map/ConflictMap";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchAllEvents } from "@/lib/feeds";

export default async function MapPage() {
  const events = await getCached("events", fetchAllEvents, CACHE_TTL_MS);
  return (
    <div>
      <PageHeader title="Conflict Map" description="Verified kinetic events across the Middle East theater" updated={events.fetched_at} />
      <ConflictMap events={events.data} height="calc(100vh - 200px)" />
    </div>
  );
}
