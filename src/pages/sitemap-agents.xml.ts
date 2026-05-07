import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getBaseUrl } from '../utils/base-url';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

type SitemapEntry = {
  url: string;
  lastmod?: Date | null;
};

function formatLastmod(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : null;
}

function latestDate(dates: Array<Date | null | undefined>) {
  const times = dates
    .filter((date): date is Date => Boolean(date))
    .map((date) => date.valueOf());

  return times.length > 0 ? new Date(Math.max(...times)) : null;
}

function urlEntry(entry: SitemapEntry) {
  const lastmod = formatLastmod(entry.lastmod);

  return [
    '  <url>',
    `    <loc>${escapeXml(entry.url)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    '  </url>',
  ].filter(Boolean).join('\n');
}

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
  const contentDates = [
    ...articles.map((article) => article.data.updatedDate ?? article.data.pubDate),
    ...guides.map((guide) => guide.data.updatedDate ?? guide.data.pubDate),
    ...comparisons.map((comparison) => comparison.data.updatedDate ?? comparison.data.pubDate),
  ];
  const latestContentDate = latestDate(contentDates);
  const urls: SitemapEntry[] = [
    { url: `${base}/llms.txt`, lastmod: latestContentDate },
    { url: `${base}/llms-full.txt`, lastmod: latestContentDate },
    { url: `${base}/agent-manifest.json`, lastmod: latestContentDate },
    { url: `${base}/api/content-index.json`, lastmod: latestContentDate },
    { url: `${base}/api/search.json`, lastmod: latestContentDate },
    ...articles.map((article) => ({
      url: `${base}/agent/articles/${article.id}.txt`,
      lastmod: article.data.updatedDate ?? article.data.pubDate,
    })),
    ...guides.map((guide) => ({
      url: `${base}/agent/guides/${guide.id}.txt`,
      lastmod: guide.data.updatedDate ?? guide.data.pubDate,
    })),
    ...comparisons.map((comparison) => ({
      url: `${base}/agent/comparisons/${comparison.id}.txt`,
      lastmod: comparison.data.updatedDate ?? comparison.data.pubDate,
    })),
    ...hubs.map((hub) => ({ url: `${base}/agent/topics/${hub.id}.txt` })),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(urlEntry),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
