import { SourceLink } from "@/components/dashboard/SourceLink";
import type { NewsItem } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";

export function NewsList({ items }: { items: NewsItem[] }) {
  if (!items.length) return <p className="text-sm text-slate-500">No matching news articles found.</p>;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-amber-400">{item.source}</span>
            <span className="text-xs text-slate-500">{formatTimestamp(item.pubDate)}</span>
          </div>
          <h3 className="mt-2 text-sm font-medium text-slate-100">{item.title}</h3>
          <div className="mt-3"><SourceLink href={item.link}>Read article</SourceLink></div>
        </article>
      ))}
    </div>
  );
}
