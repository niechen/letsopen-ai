import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  return guides.map((guide) => ({ params: { id: guide.id }, props: { guide } }));
}

export async function GET({ props }: { props: any }) {
  const { guide } = props;
  const lines = [
    `# ${guide.data.title}`,
    '',
    `Description: ${guide.data.description}`,
    'Type: guide',
    `Published: ${guide.data.pubDate.toISOString()}`,
    `Hub: ${guide.data.hub ?? ''}`,
    `Tags: ${(guide.data.tags ?? []).join(', ')}`,
    '',
    guide.body,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
