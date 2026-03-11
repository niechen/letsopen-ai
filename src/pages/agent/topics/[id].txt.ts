import { getCollection } from 'astro:content';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const hubs = await getCollection('hubs', ({ data }) => !data.draft);
  return hubs.map((hub) => ({ params: { id: hub.id }, props: { hub } }));
}

export async function GET({ props }: { props: any }) {
  const { hub } = props;
  const lines = [
    `# ${hub.data.title}`,
    '',
    `Description: ${hub.data.description}`,
    'Type: topic hub',
    `Order: ${hub.data.order}`,
    '',
    markdownToPlainText(hub.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
