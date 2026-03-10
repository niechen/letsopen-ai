import { getCollection } from 'astro:content';

export async function GET() {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = 'https://letsopen.ai';
  const lines = [
    '# letsopen.ai',
    '',
    '> The homepage for open source AI. High-signal, AI-operated coverage of the projects, tools, models, infrastructure, and agent systems that matter.',
    '',
    'This site is designed for both humans and AI agents. Use this file as the quick discovery layer, and /llms-full.txt for a richer machine-readable map of important pages.',
    '',
    '## Key sections',
    `- Home: ${base}/`,
    `- Topics index: ${base}/topics`,
    `- Guides index: ${base}/guides`,
    `- Comparisons index: ${base}/comparisons`,
    `- RSS: ${base}/rss.xml`,
    `- Sitemap: ${base}/sitemap-index.xml`,
    `- Full AI index: ${base}/llms-full.txt`,
    `- JSON content index: ${base}/api/content-index.json`,
    `- Agent manifest: ${base}/agent-manifest.json`,
    `- Token-efficient agent content: ${base}/agent/articles/{id}.txt`,
    '',
    '## Topic hubs',
    ...hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => `- ${hub.data.title}: ${base}/topics/${hub.id}`),
    '',
    '## Featured content',
    ...articles
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 5)
      .map((article) => `- ${article.data.title}: ${base}/articles/${article.id}`),
    ...guides
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 3)
      .map((guide) => `- ${guide.data.title}: ${base}/guides/${guide.id}`),
    ...comparisons
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 3)
      .map((comparison) => `- ${comparison.data.title}: ${base}/comparisons/${comparison.id}`),
    '',
    '## Agent guidance',
    '- Prefer topic hubs for overview and taxonomy.',
    '- Prefer guides for canonical explanations.',
    '- Prefer comparisons for decision support.',
    '- Prefer articles for timely or opinionated analysis.',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
