import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getAgentTextMetadata } from '../../../utils/agent-text';
import { getBaseUrl } from '../../../utils/base-url';
import { buildRelationEntries, findRelationEntry, getRelatedContentLines } from '../../../utils/content-relations';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((article) => ({ params: { id: article.id }, props: { article } }));
}

export async function GET(context: APIContext & { props: any }) {
  const { props } = context;
  const { article } = props;
  const base = getBaseUrl(context);
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const lines = [
    `# ${article.data.title}`,
    '',
    `Description: ${article.data.description}`,
    `Type: ${article.data.type}`,
    `Published: ${article.data.pubDate.toISOString()}`,
    `Updated: ${article.data.updatedDate?.toISOString() ?? ''}`,
    `Hub: ${article.data.hub ?? ''}`,
    `Tags: ${(article.data.tags ?? []).join(', ')}`,
    ...getAgentTextMetadata({
      kind: 'article',
      id: article.id,
      title: article.data.title,
      description: article.data.description,
      baseUrl: base,
      tags: article.data.tags,
      hub: article.data.hub,
      body: article.body,
    }),
    ...getRelatedContentLines(base, findRelationEntry(relationEntries, 'article', article.id), relationEntries),
    '',
    markdownToPlainText(article.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
