import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getAgentTextMetadata } from '../../../utils/agent-text';
import { getBaseUrl } from '../../../utils/base-url';
import { buildRelationEntries, findRelationEntry, getRelatedContentLines } from '../../../utils/content-relations';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const hubs = await getCollection('hubs', ({ data }) => !data.draft);
  return hubs.map((hub) => ({ params: { id: hub.id }, props: { hub } }));
}

export async function GET(context: APIContext & { props: any }) {
  const { props } = context;
  const { hub } = props;
  const base = getBaseUrl(context);
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const lines = [
    `# ${hub.data.title}`,
    '',
    `Description: ${hub.data.description}`,
    'Type: topic hub',
    `Order: ${hub.data.order}`,
    ...getAgentTextMetadata({
      kind: 'hub',
      id: hub.id,
      title: hub.data.title,
      description: hub.data.description,
      baseUrl: base,
      body: hub.body,
    }),
    ...getRelatedContentLines(base, findRelationEntry(relationEntries, 'hub', hub.id), relationEntries),
    '',
    markdownToPlainText(hub.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
