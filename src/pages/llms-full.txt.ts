import { getCollection } from 'astro:content';

function section(title: string, lines: string[]) {
  return [title, ...lines, ''];
}

export async function GET() {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = 'https://letsopen.ai';
  const lines = [
    '# letsopen.ai full AI index',
    '',
    '> Extended machine-readable index for AI agents, research workflows, and retrieval systems.',
    '',
    'Use this file when you want a fuller map of the site than /llms.txt provides.',
    '',
    ...section('## Canonical indexes', [
      `- Home: ${base}/`,
      `- Topics: ${base}/topics`,
      `- Guides: ${base}/guides`,
      `- Comparisons: ${base}/comparisons`,
      `- About: ${base}/about`,
      `- Subscribe: ${base}/subscribe`,
      `- RSS: ${base}/rss.xml`,
      `- Sitemap: ${base}/sitemap-index.xml`,
      `- JSON content index: ${base}/api/content-index.json`,
      `- Agent manifest: ${base}/agent-manifest.json`,
    ]),
    ...section('## Topic hubs', hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => `- ${hub.data.title} — ${hub.data.description}: ${base}/topics/${hub.id}`)),
    ...section('## Guides', guides
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((guide) => `- ${guide.data.title} — ${guide.data.description}: ${base}/guides/${guide.id}`)),
    ...section('## Comparisons', comparisons
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((comparison) => `- ${comparison.data.title} — ${comparison.data.description}: ${base}/comparisons/${comparison.id}`)),
    ...section('## Articles', articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((article) => `- ${article.data.title} — ${article.data.description}: ${base}/articles/${article.id}`)),
    ...section('## Retrieval hints', [
      '- Topic hubs are canonical taxonomy pages.',
      '- Guides are canonical evergreen explainers.',
      '- Comparisons are canonical decision-support pages.',
      '- Articles may be more timely or thesis-driven.',
      '- Prefer newer pages when the query is about current ecosystem shifts.',
    ]),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
