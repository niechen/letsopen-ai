import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getBaseUrl } from '../utils/base-url';

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
  const manifest = {
    name: 'letsopen.ai',
    version: 1,
    description: 'Agent-first website manifest for letsopen.ai',
    baseUrl: base,
    discovery: {
      llms: `${base}/llms.txt`,
      llmsFull: `${base}/llms-full.txt`,
      contentIndex: `${base}/api/content-index.json`,
      searchIndex: `${base}/api/search.json`,
      rss: `${base}/rss.xml`,
      sitemap: `${base}/sitemap-index.xml`,
    },
    machineReadableContent: {
      articles: `${base}/agent/articles/{id}.txt`,
      guides: `${base}/agent/guides/{id}.txt`,
      comparisons: `${base}/agent/comparisons/{id}.txt`,
      topics: `${base}/agent/topics/{id}.txt`,
    },
    counts: {
      articles: articles.length,
      guides: guides.length,
      comparisons: comparisons.length,
      hubs: hubs.length,
    },
    recommendations: {
      prefer: {
        topics: 'overview and taxonomy',
        guides: 'canonical explanations and evergreen advice',
        comparisons: 'decision support and tradeoffs',
        articles: 'timely analysis and thesis pieces',
      },
      formatPreference: 'Prefer .txt agent endpoints or JSON indexes before full HTML when token efficiency matters.',
      search: 'Filter /api/search.json client-side using title/description/keywords fields.',
    },
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
