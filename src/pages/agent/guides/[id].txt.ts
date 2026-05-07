import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getAgentTextMetadata } from '../../../utils/agent-text';
import { getBaseUrl } from '../../../utils/base-url';
import { buildRelationEntries, findRelationEntry, getRelatedContentLines } from '../../../utils/content-relations';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  return guides.map((guide) => ({ params: { id: guide.id }, props: { guide } }));
}

export async function GET(context: APIContext & { props: any }) {
  const { props } = context;
  const { guide } = props;
  const base = getBaseUrl(context);
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const lines = [
    `# ${guide.data.title}`,
    '',
    `Description: ${guide.data.description}`,
    'Type: guide',
    `Published: ${guide.data.pubDate.toISOString()}`,
    `Updated: ${guide.data.updatedDate?.toISOString() ?? ''}`,
    `Hub: ${guide.data.hub ?? ''}`,
    `Tags: ${(guide.data.tags ?? []).join(', ')}`,
    ...getAgentTextMetadata({
      kind: 'guide',
      id: guide.id,
      title: guide.data.title,
      description: guide.data.description,
      baseUrl: base,
      tags: guide.data.tags,
      hub: guide.data.hub,
      body: guide.body,
    }),
    ...getRelatedContentLines(base, findRelationEntry(relationEntries, 'guide', guide.id), relationEntries),
    '',
    markdownToPlainText(guide.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
