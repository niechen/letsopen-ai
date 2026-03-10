import { getCollection } from 'astro:content';

function includes(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export async function GET({ url }: { url: URL }) {
  const q = (url.searchParams.get('q') || '').trim();
  const type = (url.searchParams.get('type') || '').trim();
  const limit = Math.min(Number(url.searchParams.get('limit') || '10'), 50);

  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = 'https://letsopen.ai';
  const items = [
    ...articles.map((item) => ({
      kind: 'article',
      id: item.id,
      title: item.data.title,
      description: item.data.description,
      tags: item.data.tags ?? [],
      url: `${base}/articles/${item.id}`,
      machineUrl: `${base}/agent/articles/${item.id}.txt`,
      date: item.data.pubDate.toISOString(),
      text: `${item.data.title} ${item.data.description} ${(item.data.tags ?? []).join(' ')} ${item.data.hub ?? ''}`,
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
      text: `${item.data.title} ${item.data.description} ${(item.data.tags ?? []).join(' ')} ${item.data.hub ?? ''}`,
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
      text: `${item.data.title} ${item.data.description} ${(item.data.tags ?? []).join(' ')} ${item.data.verdict ?? ''}`,
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
      text: `${item.data.title} ${item.data.description}`,
    })),
  ];

  let filtered = items;
  if (type) filtered = filtered.filter((item) => item.kind === type);
  if (q) filtered = filtered.filter((item) => includes(item.text, q));

  filtered = filtered
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    })
    .slice(0, limit)
    .map(({ text, ...rest }) => rest);

  return new Response(JSON.stringify({
    query: q,
    type: type || null,
    limit,
    count: filtered.length,
    results: filtered,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=120',
    },
  });
}
