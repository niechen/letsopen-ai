import { getCollection } from 'astro:content';

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
    hub.body,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
