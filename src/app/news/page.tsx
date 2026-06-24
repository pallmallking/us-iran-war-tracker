import { PageHeader } from "@/components/dashboard/PageHeader";
import { NewsList } from "@/components/feeds/NewsList";
import { getCached } from "@/lib/cache";
import { CACHE_TTL_MS } from "@/lib/constants";
import { fetchNews } from "@/lib/rss";

export default async function NewsPage() {
  const news = await getCached("news", fetchNews, CACHE_TTL_MS);
  return (
    <div>
      <PageHeader title="News Feed" description="Wire service headlines filtered for Iran, Hormuz, Lebanon, and ceasefire coverage" updated={news.fetched_at} />
      {news.stale && <p className="mb-4 text-sm text-amber-400">Showing cached news — live fetch unavailable.</p>}
      <NewsList items={news.data} />
    </div>
  );
}
