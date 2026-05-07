import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getBaseUrl } from '../utils/base-url';
import { compareFreshnessDesc } from '../utils/freshness';

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
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
    `- Agent access guide: ${base}/agents`,
    `- RSS: ${base}/rss.xml`,
    `- Sitemap: ${base}/sitemap-index.xml`,
    `- Agent sitemap: ${base}/sitemap-agents.xml`,
    `- Full AI index: ${base}/llms-full.txt`,
    `- JSON content index: ${base}/api/content-index.json`,
    `- Agent manifest: ${base}/agent-manifest.json`,
    `- Search index (client-side filtering): ${base}/api/search.json`,
    `- Token-efficient agent content: ${base}/agent/{articles|guides|comparisons|topics}/{id}.txt`,
    '',
    '## Builder entry points',
    `- Build an open source AI agent app: ${base}/guides/open-source-agent-app-blueprint`,
    `- Map the open source AI agent landscape: ${base}/topics/open-source-ai-agents`,
    `- Choose an open source AI application stack: ${base}/guides/open-source-ai-stack-explained`,
    `- Find practical open source AI tools for builders: ${base}/guides/best-open-source-ai-tools-2026`,
    `- Evaluate an open source AI project: ${base}/guides/how-to-evaluate-open-source-ai-projects`,
    `- Compare coding agents and assistant tradeoffs: ${base}/comparisons`,
    '',
    '## Topic hubs',
    ...hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => `- ${hub.data.title}: ${base}/topics/${hub.id}`),
    '',
    '## Featured content',
    ...articles
      .sort(compareFreshnessDesc)
      .slice(0, 5)
      .map((article) => `- ${article.data.title}: ${base}/articles/${article.id}`),
    ...guides
      .sort(compareFreshnessDesc)
      .slice(0, 3)
      .map((guide) => `- ${guide.data.title}: ${base}/guides/${guide.id}`),
    ...comparisons
      .sort(compareFreshnessDesc)
      .slice(0, 3)
      .map((comparison) => `- ${comparison.data.title}: ${base}/comparisons/${comparison.id}`),
    '',
    '## Agent guidance',
    '- Prefer topic hubs for overview and taxonomy.',
    '- Prefer guides for canonical explanations.',
    '- Prefer comparisons for decision support.',
    '- Prefer articles for timely or opinionated analysis.',
    '- Use /agent-manifest.json entryPoints for task routing; each entry point includes exampleQueries and nextActions.',
    '- Use /api/search.json for freshnessDate and opennessSignals when freshness or source posture matters.',
    '- Follow related edges in /agent-manifest.json, /api/content-index.json, /api/search.json, or /agent/...txt mirrors to traverse from a page to its topic hub and sibling content.',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
