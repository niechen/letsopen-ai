import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { agentSchemaVersion, editorialUseGuidance, intentFieldDefinitions, retrievalProtocol } from '../../utils/agent-schema';
import { getContentIntents } from '../../utils/content-intents';
import { getBaseUrl } from '../../utils/base-url';
import { compareFreshnessDesc, getFreshnessIso } from '../../utils/freshness';
import { buildRelationEntries, findRelationEntry, getRelatedContent } from '../../utils/content-relations';

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const payload = {
    endpointType: 'content-index',
    schemaVersion: agentSchemaVersion,
    site: {
      name: 'letsopen.ai',
      description: 'The homepage for open source AI. High-signal, AI-operated coverage of projects, tools, models, infrastructure, and agent systems that matter.',
      url: base,
      aiDiscovery: {
        agentAccessGuide: `${base}/agents`,
        llms: `${base}/llms.txt`,
        llmsFull: `${base}/llms-full.txt`,
        rss: `${base}/rss.xml`,
        sitemap: `${base}/sitemap-index.xml`,
        agentSitemap: `${base}/sitemap-agents.xml`,
        agentManifest: `${base}/agent-manifest.json`,
      },
    },
    builtAt: new Date().toISOString(),
    note: 'builtAt reflects static build time, not request time.',
    fieldDefinitions: intentFieldDefinitions,
    retrievalProtocol,
    editorialUseGuidance,
    counts: {
      hubs: hubs.length,
      articles: articles.length,
      guides: guides.length,
      comparisons: comparisons.length,
    },
    hubs: hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => {
        const intents = getContentIntents({
          kind: 'hub',
          id: hub.id,
          title: hub.data.title,
          description: hub.data.description,
          body: hub.body,
        });

        return {
          id: hub.id,
          title: hub.data.title,
          description: hub.data.description,
          icon: hub.data.icon ?? null,
          order: hub.data.order,
          url: `${base}/topics/${hub.id}`,
          machineUrl: `${base}/agent/topics/${hub.id}.txt`,
          kind: 'hub',
          related: getRelatedContent(base, findRelationEntry(relationEntries, 'hub', hub.id)!, relationEntries),
          ...intents,
        };
      }),
    articles: articles
      .sort(compareFreshnessDesc)
      .map((article) => {
        const intents = getContentIntents({
          kind: 'article',
          id: article.id,
          title: article.data.title,
          description: article.data.description,
          tags: article.data.tags,
          hub: article.data.hub,
          body: article.body,
        });

        return {
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
          freshnessDate: getFreshnessIso(article.data),
          related: getRelatedContent(base, findRelationEntry(relationEntries, 'article', article.id)!, relationEntries),
          ...intents,
        };
      }),
    guides: guides
      .sort(compareFreshnessDesc)
      .map((guide) => {
        const intents = getContentIntents({
          kind: 'guide',
          id: guide.id,
          title: guide.data.title,
          description: guide.data.description,
          tags: guide.data.tags,
          hub: guide.data.hub,
          body: guide.body,
        });

        return {
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
          freshnessDate: getFreshnessIso(guide.data),
          related: getRelatedContent(base, findRelationEntry(relationEntries, 'guide', guide.id)!, relationEntries),
          ...intents,
        };
      }),
    comparisons: comparisons
      .sort(compareFreshnessDesc)
      .map((comparison) => {
        const intents = getContentIntents({
          kind: 'comparison',
          id: comparison.id,
          title: comparison.data.title,
          description: comparison.data.description,
          tags: comparison.data.tags,
          hub: comparison.data.hub,
          verdict: comparison.data.verdict,
          body: comparison.body,
        });

        return {
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
          freshnessDate: getFreshnessIso(comparison.data),
          related: getRelatedContent(base, findRelationEntry(relationEntries, 'comparison', comparison.id)!, relationEntries),
          ...intents,
        };
      }),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
