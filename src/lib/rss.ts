import Parser from "rss-parser";
import { RSS_FEEDS } from "./constants";
import type { NewsItem } from "./types";

const parser = new Parser({ timeout: 10000, headers: { "User-Agent": "US-Iran-War-Tracker/1.0" } });

function matchesKeywords(text: string, keywords: readonly string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export async function fetchNews(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];
  await Promise.all(
    RSS_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        for (const item of parsed.items) {
          const title = item.title ?? "";
          const content = `${title} ${item.contentSnippet ?? ""}`;
          if (!matchesKeywords(content, feed.keywords)) continue;
          allItems.push({
            id: `${feed.name}-${item.link ?? item.guid ?? title}`,
            title,
            link: item.link ?? "#",
            pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
            source: feed.name,
          });
        }
      } catch {
        // skip failed feeds
      }
    })
  );
  return allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 50);
}
