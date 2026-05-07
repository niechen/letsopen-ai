import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getAgentTextMetadata } from '../../../utils/agent-text';
import { getBaseUrl } from '../../../utils/base-url';
import { buildRelationEntries, findRelationEntry, getRelatedContentLines } from '../../../utils/content-relations';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const comparisons = await getCollection('comparisons', ({ data }) => !data.draft);
  return comparisons.map((comparison) => ({ params: { id: comparison.id }, props: { comparison } }));
}

export async function GET(context: APIContext & { props: any }) {
  const { props } = context;
  const { comparison } = props;
  const base = getBaseUrl(context);
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const lines = [
    `# ${comparison.data.title}`,
    '',
    `Description: ${comparison.data.description}`,
    'Type: comparison',
    `Published: ${comparison.data.pubDate.toISOString()}`,
    `Updated: ${comparison.data.updatedDate?.toISOString() ?? ''}`,
    `Hub: ${comparison.data.hub ?? ''}`,
    `Verdict: ${comparison.data.verdict ?? ''}`,
    `Tags: ${(comparison.data.tags ?? []).join(', ')}`,
    ...getAgentTextMetadata({
      kind: 'comparison',
      id: comparison.id,
      title: comparison.data.title,
      description: comparison.data.description,
      baseUrl: base,
      tags: comparison.data.tags,
      hub: comparison.data.hub,
      verdict: comparison.data.verdict,
      body: comparison.body,
    }),
    ...getRelatedContentLines(base, findRelationEntry(relationEntries, 'comparison', comparison.id), relationEntries),
    '',
    markdownToPlainText(comparison.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
