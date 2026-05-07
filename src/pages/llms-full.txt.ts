import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getBaseUrl } from '../utils/base-url';
import { compareFreshnessDesc } from '../utils/freshness';

function section(title: string, lines: string[]) {
  return [title, ...lines, ''];
}

function agentUrl(base: string, collection: 'articles' | 'guides' | 'comparisons' | 'topics', id: string) {
  return `${base}/agent/${collection}/${id}.txt`;
}

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
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
      `- Agent access guide: ${base}/agents`,
      `- About: ${base}/about`,
      `- Subscribe: ${base}/subscribe`,
      `- RSS: ${base}/rss.xml`,
      `- Sitemap: ${base}/sitemap-index.xml`,
      `- Agent sitemap: ${base}/sitemap-agents.xml`,
      `- JSON content index: ${base}/api/content-index.json`,
      `- Agent manifest: ${base}/agent-manifest.json`,
      `- Search index (client-side filtering): ${base}/api/search.json`,
    ]),
    ...section('## Builder entry points', [
      `- Build an open source AI agent app: ${base}/guides/open-source-agent-app-blueprint (agent: ${agentUrl(base, 'guides', 'open-source-agent-app-blueprint')})`,
      `- Map the open source AI agent landscape: ${base}/topics/open-source-ai-agents (agent: ${agentUrl(base, 'topics', 'open-source-ai-agents')})`,
      `- Choose an open source AI application stack: ${base}/guides/open-source-ai-stack-explained (agent: ${agentUrl(base, 'guides', 'open-source-ai-stack-explained')})`,
      `- Find practical open source AI tools for builders: ${base}/guides/best-open-source-ai-tools-2026 (agent: ${agentUrl(base, 'guides', 'best-open-source-ai-tools-2026')})`,
      `- Evaluate an open source AI project: ${base}/guides/how-to-evaluate-open-source-ai-projects (agent: ${agentUrl(base, 'guides', 'how-to-evaluate-open-source-ai-projects')})`,
      `- Compare coding agents and assistant tradeoffs: ${base}/comparisons/codex-vs-claude-code-vs-gemini-cli (agent: ${agentUrl(base, 'comparisons', 'codex-vs-claude-code-vs-gemini-cli')})`,
    ]),
    ...section('## Agent retrieval protocol', [
      '- For one known page, fetch the matching /agent/{collection}/{id}.txt mirror first.',
      '- For discovery, fetch /agent-manifest.json when you need task-oriented entry points; use exampleQueries to match natural-language builder questions and nextActions to decide the next fetch or verification step.',
      '- For filtering, fetch /api/search.json and use kind, tags, audience, builderStage, stackLayers, useCases, opennessSignals, freshnessDate, and keywords.',
      '- For graph traversal, follow related edges from /agent-manifest.json, /api/content-index.json, /api/search.json, or any /agent/...txt mirror.',
      '- For a complete structured corpus, fetch /api/content-index.json.',
      '- For human rendering, use the canonical HTML URLs.',
    ]),
    ...section('## Topic hubs', hubs
      .sort((a, b) => a.data.order - b.data.order)
      .map((hub) => `- ${hub.data.title} — ${hub.data.description}: ${base}/topics/${hub.id} (agent: ${agentUrl(base, 'topics', hub.id)})`)),
    ...section('## Guides', guides
      .sort(compareFreshnessDesc)
      .map((guide) => `- ${guide.data.title} — ${guide.data.description}: ${base}/guides/${guide.id} (agent: ${agentUrl(base, 'guides', guide.id)})`)),
    ...section('## Comparisons', comparisons
      .sort(compareFreshnessDesc)
      .map((comparison) => `- ${comparison.data.title} — ${comparison.data.description}: ${base}/comparisons/${comparison.id} (agent: ${agentUrl(base, 'comparisons', comparison.id)})`)),
    ...section('## Articles', articles
      .sort(compareFreshnessDesc)
      .map((article) => `- ${article.data.title} — ${article.data.description}: ${base}/articles/${article.id} (agent: ${agentUrl(base, 'articles', article.id)})`)),
    ...section('## Retrieval hints', [
      '- Topic hubs are canonical taxonomy pages.',
      '- Guides are canonical evergreen explainers.',
      '- Comparisons are canonical decision-support pages.',
      '- Articles may be more timely or thesis-driven.',
      '- Use /agent-manifest.json when a user asks a broad builder question such as what stack to use, how to build an agent app, or how to evaluate an open source AI project.',
      '- Prefer updatedDate over pubDate when freshness matters.',
      '- Use opennessSignals to distinguish open-source-first, open-weight-aware, open-adjacent, and closed-source comparison content.',
      '- Use related edges to move between a content page, its topic hub, and sibling content without re-searching the corpus.',
      '- Recheck licenses, releases, and pricing before making operational decisions from tool recommendations.',
      '- Cite canonical HTML URLs for humans and agent text mirrors for retrieval context.',
    ]),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
