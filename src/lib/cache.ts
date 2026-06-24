import fs from "fs/promises";
import os from "os";
import path from "path";

interface CacheEntry<T> {
  fetched_at: string;
  data: T;
}

const CACHE_DIR =
  process.env.VERCEL === "1"
    ? path.join(os.tmpdir(), "us-iran-war-tracker-cache")
    : path.join(process.cwd(), "data", "cache");

async function ensureCacheDir() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
}

function cachePath(key: string) {
  return path.join(CACHE_DIR, `${key}.json`);
}

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number
): Promise<{ data: T; stale: boolean; fetched_at: string }> {
  await ensureCacheDir();
  const file = cachePath(key);

  try {
    const raw = await fs.readFile(file, "utf-8");
    const entry = JSON.parse(raw) as CacheEntry<T>;
    const age = Date.now() - new Date(entry.fetched_at).getTime();

    if (age < ttlMs) {
      return { data: entry.data, stale: false, fetched_at: entry.fetched_at };
    }

    try {
      const fresh = await fetcher();
      const updated: CacheEntry<T> = { fetched_at: new Date().toISOString(), data: fresh };
      await fs.writeFile(file, JSON.stringify(updated, null, 2));
      return { data: fresh, stale: false, fetched_at: updated.fetched_at };
    } catch {
      return { data: entry.data, stale: true, fetched_at: entry.fetched_at };
    }
  } catch {
    const fresh = await fetcher();
    const entry: CacheEntry<T> = { fetched_at: new Date().toISOString(), data: fresh };
    await fs.writeFile(file, JSON.stringify(entry, null, 2));
    return { data: fresh, stale: false, fetched_at: entry.fetched_at };
  }
}
