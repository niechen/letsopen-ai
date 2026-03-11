import { getCollection } from 'astro:content';
import { markdownToPlainText } from '../../../utils/plain-text';

export async function getStaticPaths() {
  const comparisons = await getCollection('comparisons', ({ data }) => !data.draft);
  return comparisons.map((comparison) => ({ params: { id: comparison.id }, props: { comparison } }));
}

export async function GET({ props }: { props: any }) {
  const { comparison } = props;
  const lines = [
    `# ${comparison.data.title}`,
    '',
    `Description: ${comparison.data.description}`,
    'Type: comparison',
    `Published: ${comparison.data.pubDate.toISOString()}`,
    `Verdict: ${comparison.data.verdict ?? ''}`,
    `Tags: ${(comparison.data.tags ?? []).join(', ')}`,
    '',
    markdownToPlainText(comparison.body),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
