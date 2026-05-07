import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { agentSchemaVersion, editorialUseGuidance, intentFieldDefinitions, retrievalProtocol } from '../../utils/agent-schema';
import { getContentIntents } from '../../utils/content-intents';
import { getBaseUrl } from '../../utils/base-url';
import { getFreshnessIso } from '../../utils/freshness';
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
  const results = [
    ...articles.map((item) => {
      const intents = getContentIntents({
        kind: 'article',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags,
        hub: item.data.hub,
        body: item.body,
      });

      return {
        kind: 'article',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags ?? [],
        url: `${base}/articles/${item.id}`,
        machineUrl: `${base}/agent/articles/${item.id}.txt`,
        date: item.data.pubDate.toISOString(),
        updatedDate: item.data.updatedDate?.toISOString() ?? null,
        freshnessDate: getFreshnessIso(item.data),
        keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '', ...intents.intentKeywords]
          .filter(Boolean),
        related: getRelatedContent(base, findRelationEntry(relationEntries, 'article', item.id)!, relationEntries, 4),
        ...intents,
      };
    }),
    ...guides.map((item) => {
      const intents = getContentIntents({
        kind: 'guide',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags,
        hub: item.data.hub,
        body: item.body,
      });

      return {
        kind: 'guide',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags ?? [],
        url: `${base}/guides/${item.id}`,
        machineUrl: `${base}/agent/guides/${item.id}.txt`,
        date: item.data.pubDate.toISOString(),
        updatedDate: item.data.updatedDate?.toISOString() ?? null,
        freshnessDate: getFreshnessIso(item.data),
        keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '', ...intents.intentKeywords]
          .filter(Boolean),
        related: getRelatedContent(base, findRelationEntry(relationEntries, 'guide', item.id)!, relationEntries, 4),
        ...intents,
      };
    }),
    ...comparisons.map((item) => {
      const intents = getContentIntents({
        kind: 'comparison',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags,
        hub: item.data.hub,
        verdict: item.data.verdict,
        body: item.body,
      });

      return {
        kind: 'comparison',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: item.data.tags ?? [],
        url: `${base}/comparisons/${item.id}`,
        machineUrl: `${base}/agent/comparisons/${item.id}.txt`,
        date: item.data.pubDate.toISOString(),
        updatedDate: item.data.updatedDate?.toISOString() ?? null,
        freshnessDate: getFreshnessIso(item.data),
        keywords: [item.data.title, item.data.description, ...(item.data.tags ?? []), item.data.hub ?? '', item.data.verdict ?? '', ...intents.intentKeywords]
          .filter(Boolean),
        related: getRelatedContent(base, findRelationEntry(relationEntries, 'comparison', item.id)!, relationEntries, 4),
        ...intents,
      };
    }),
    ...hubs.map((item) => {
      const intents = getContentIntents({
        kind: 'hub',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        body: item.body,
      });

      return {
        kind: 'hub',
        id: item.id,
        title: item.data.title,
        description: item.data.description,
        tags: [],
        url: `${base}/topics/${item.id}`,
        machineUrl: `${base}/agent/topics/${item.id}.txt`,
        date: null,
        updatedDate: null,
        freshnessDate: null,
        keywords: [item.data.title, item.data.description, ...intents.intentKeywords].filter(Boolean),
        related: getRelatedContent(base, findRelationEntry(relationEntries, 'hub', item.id)!, relationEntries, 4),
        ...intents,
      };
    }),
  ]
    .sort((a, b) => {
      if (!a.freshnessDate && !b.freshnessDate) return 0;
      if (!a.freshnessDate) return 1;
      if (!b.freshnessDate) return -1;
      return b.freshnessDate.localeCompare(a.freshnessDate);
    });

  return new Response(JSON.stringify({
    endpointType: 'search-index',
    schemaVersion: agentSchemaVersion,
    searchMode: 'static-client-side',
    queryParamSupport: false,
    note: 'This static endpoint returns a searchable corpus. Fetch /api/search.json and filter results client-side using title, description, tags, and keywords.',
    fieldDefinitions: intentFieldDefinitions,
    retrievalProtocol,
    editorialUseGuidance,
    count: results.length,
    results,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
