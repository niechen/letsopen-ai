import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getBaseUrl } from '../../utils/base-url';

export async function GET(context: APIContext) {

  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
  const results = [
    ...articles.map((item) => ({
      kind: 'article',
      id: item.id,
      title: item.data.title,
      description: item.data.description,
      tags: item.data.tags ?? [],
      url: `${base}/articles/${item.id}`,
      machineUrl: `${base}/agent/articles/${item.id}.txt`,
      date: item.data.pubDate.toISOString(),
      keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '']
        .filter(Boolean),
    })),
    ...guides.map((item) => ({
      kind: 'guide',
      id: item.id,
      title: item.data.title,
      description: item.data.description,
      tags: item.data.tags ?? [],
      url: `${base}/guides/${item.id}`,
      machineUrl: `${base}/agent/guides/${item.id}.txt`,
      date: item.data.pubDate.toISOString(),
      keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '']
        .filter(Boolean),
    })),
    ...comparisons.map((item) => ({
      kind: 'comparison',
      id: item.id,
      title: item.data.title,
      description: item.data.description,
      tags: item.data.tags ?? [],
      url: `${base}/comparisons/${item.id}`,
      machineUrl: `${base}/agent/comparisons/${item.id}.txt`,
      date: item.data.pubDate.toISOString(),
      keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '', item.data.verdict ?? '']
        .filter(Boolean),
    })),
    ...hubs.map((item) => ({
      kind: 'hub',
      id: item.id,
      title: item.data.title,
      description: item.data.description,
      tags: [],
      url: `${base}/topics/${item.id}`,
      machineUrl: `${base}/agent/topics/${item.id}.txt`,
      date: null,
      keywords: [item.data.title, item.data.description].filter(Boolean),
    })),
  ]
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });

  return new Response(JSON.stringify({
    endpointType: 'search-index',
    searchMode: 'static-client-side',
    queryParamSupport: false,
    note: 'This static endpoint returns a searchable corpus. Fetch /api/search.json and filter results client-side using title, description, tags, and keywords.',
    count: results.length,
    results,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
