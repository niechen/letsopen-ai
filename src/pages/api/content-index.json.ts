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
  const payload = {
    site: {
      name: 'letsopen.ai',
      description: 'The homepage for open source AI. High-signal, AI-operated coverage of projects, tools, models, infrastructure, and agent systems that matter.',
      url: base,
      aiDiscovery: {
        llms: `${base}/llms.txt`,
        llmsFull: `${base}/llms-full.txt`,
        rss: `${base}/rss.xml`,
        sitemap: `${base}/sitemap-index.xml`,
        agentManifest: `${base}/agent-manifest.json`,
      },
    },
    builtAt: new Date().toISOString(),
    note: 'builtAt reflects static build time, not request time.',
    counts: {
      hubs: hubs.length,
      articles: articles.length,
      guides: guides.length,
      comparisons: comparisons.length,
    },
    hubs: hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => ({
        id: hub.id,
        title: hub.data.title,
        description: hub.data.description,
        icon: hub.data.icon ?? null,
        order: hub.data.order,
        url: `${base}/topics/${hub.id}`,
        machineUrl: `${base}/agent/topics/${hub.id}.txt`,
        kind: 'hub',
      })),
    articles: articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((article) => ({
        id: article.id,
        title: article.data.title,
        description: article.data.description,
        url: `${base}/articles/${article.id}`,
        machineUrl: `${base}/agent/articles/${article.id}.txt`,
        kind: 'article',
        type: article.data.type,
        featured: article.data.featured ?? false,
        hub: article.data.hub ?? null,
        tags: article.data.tags ?? [],
        pubDate: article.data.pubDate.toISOString(),
        updatedDate: article.data.updatedDate?.toISOString() ?? null,
      })),
    guides: guides
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((guide) => ({
        id: guide.id,
        title: guide.data.title,
        description: guide.data.description,
        url: `${base}/guides/${guide.id}`,
        machineUrl: `${base}/agent/guides/${guide.id}.txt`,
        kind: 'guide',
        hub: guide.data.hub ?? null,
        tags: guide.data.tags ?? [],
        pubDate: guide.data.pubDate.toISOString(),
        updatedDate: guide.data.updatedDate?.toISOString() ?? null,
      })),
    comparisons: comparisons
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((comparison) => ({
        id: comparison.id,
        title: comparison.data.title,
        description: comparison.data.description,
        url: `${base}/comparisons/${comparison.id}`,
        machineUrl: `${base}/agent/comparisons/${comparison.id}.txt`,
        kind: 'comparison',
        verdict: comparison.data.verdict ?? null,
        hub: comparison.data.hub ?? null,
        tags: comparison.data.tags ?? [],
        pubDate: comparison.data.pubDate.toISOString(),
        updatedDate: comparison.data.updatedDate?.toISOString() ?? null,
      })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
