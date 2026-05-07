import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { agentSchemaVersion, editorialUseGuidance, intentFieldDefinitions, retrievalProtocol } from '../utils/agent-schema';
import { getBaseUrl } from '../utils/base-url';
import { getContentIntents } from '../utils/content-intents';
import { buildRelationEntries, findRelationEntry, getRelatedContent, type RelationEntry } from '../utils/content-relations';
import { getFreshnessIso } from '../utils/freshness';

type EntryPointSource = {
  collection: 'articles' | 'guides' | 'comparisons' | 'topics';
  kind: 'article' | 'guide' | 'comparison' | 'hub';
  id: string;
  title: string;
  description: string;
  tags?: string[];
  hub?: string | null;
  verdict?: string | null;
  body?: string | null;
  pubDate?: Date;
  updatedDate?: Date | null;
};

function buildEntryPoint(
  base: string,
  source: EntryPointSource,
  intent: string,
  label: string,
  humanUrl: string,
  useWhen: string,
  exampleQueries: string[],
  nextActions: string[],
  relationEntries: RelationEntry[],
) {
  const intents = getContentIntents({
    kind: source.kind,
    id: source.id,
    title: source.title,
    description: source.description,
    tags: source.tags,
    hub: source.hub,
    verdict: source.verdict,
    body: source.body,
  });

  return {
    intent,
    label,
    kind: source.kind,
    id: source.id,
    humanUrl,
    machineUrl: `${base}/agent/${source.collection}/${source.id}.txt`,
    freshnessDate: source.pubDate ? getFreshnessIso({
      pubDate: source.pubDate,
      updatedDate: source.updatedDate,
    }) : null,
    useWhen,
    exampleQueries,
    nextActions,
    related: getRelatedContent(base, findRelationEntry(relationEntries, source.kind, source.id)!, relationEntries, 4),
    ...intents,
  };
}

function guideSource(guidesById: Record<string, any>, id: string): EntryPointSource | null {
  const guide = guidesById[id];
  if (!guide) return null;

  return {
    collection: 'guides',
    kind: 'guide',
    id: guide.id,
    title: guide.data.title,
    description: guide.data.description,
    tags: guide.data.tags,
    hub: guide.data.hub,
    body: guide.body,
    pubDate: guide.data.pubDate,
    updatedDate: guide.data.updatedDate,
  };
}

function hubSource(hubsById: Record<string, any>, id: string): EntryPointSource | null {
  const hub = hubsById[id];
  if (!hub) return null;

  return {
    collection: 'topics',
    kind: 'hub',
    id: hub.id,
    title: hub.data.title,
    description: hub.data.description,
    body: hub.body,
  };
}

function comparisonSource(comparisonsById: Record<string, any>, id: string): EntryPointSource | null {
  const comparison = comparisonsById[id];
  if (!comparison) return null;

  return {
    collection: 'comparisons',
    kind: 'comparison',
    id: comparison.id,
    title: comparison.data.title,
    description: comparison.data.description,
    tags: comparison.data.tags,
    hub: comparison.data.hub,
    verdict: comparison.data.verdict,
    body: comparison.body,
    pubDate: comparison.data.pubDate,
    updatedDate: comparison.data.updatedDate,
  };
}

export async function GET(context: APIContext) {
  const [articles, guides, comparisons, hubs] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
    getCollection('hubs', ({ data }) => !data.draft),
  ]);

  const base = getBaseUrl(context);
  const guideById = Object.fromEntries(guides.map((guide) => [guide.id, guide]));
  const hubById = Object.fromEntries(hubs.map((hub) => [hub.id, hub]));
  const comparisonById = Object.fromEntries(comparisons.map((comparison) => [comparison.id, comparison]));
  const relationEntries = buildRelationEntries({ articles, guides, comparisons, hubs });
  const entryPointConfigs = [
    {
      source: guideSource(guideById, 'open-source-agent-app-blueprint'),
      intent: 'build-open-source-ai-agent-app',
      label: 'Build an open source AI agent app',
      humanUrl: `${base}/guides/open-source-agent-app-blueprint`,
      useWhen: 'A human or AI agent wants a practical blueprint for assembling an agent app with open source components.',
      exampleQueries: [
        'How should I build an open source AI agent app?',
        'What is the minimum viable architecture for an agent app?',
        'Which components do I need before adding multi-agent orchestration?',
      ],
      nextActions: [
        'Fetch the agent text mirror for the blueprint.',
        'Use related edges to reach the open source AI agents hub and sibling comparisons.',
        'Cross-check tool choices against the evaluation rubric before recommending adoption.',
      ],
    },
    {
      source: hubSource(hubById, 'open-source-ai-agents'),
      intent: 'map-open-source-ai-agent-landscape',
      label: 'Map the open source AI agent landscape',
      humanUrl: `${base}/topics/open-source-ai-agents`,
      useWhen: 'A human or AI agent wants the taxonomy of open source agents, orchestration options, and project categories.',
      exampleQueries: [
        'What kinds of open source AI agents exist?',
        'Which agent categories should I track?',
        'How do coding agents, personal agents, and orchestration frameworks relate?',
      ],
      nextActions: [
        'Start with the topic text mirror for taxonomy.',
        'Follow hub-content edges to practical guides and comparisons.',
        'Use freshnessDate to prioritize newer implementation guidance.',
      ],
    },
    {
      source: guideSource(guideById, 'open-source-ai-stack-explained'),
      intent: 'choose-open-source-ai-app-stack',
      label: 'Choose an open source AI application stack',
      humanUrl: `${base}/guides/open-source-ai-stack-explained`,
      useWhen: 'A builder needs a layer-by-layer map from models and inference to retrieval, agents, and interfaces.',
      exampleQueries: [
        'What open source AI stack should I use?',
        'How do models, inference, retrieval, orchestration, and evaluation fit together?',
        'What should I self-host first when building an AI app?',
      ],
      nextActions: [
        'Fetch the stack guide mirror before recommending a layered architecture.',
        'Use stackLayers to narrow search-index results by component type.',
        'Recommend the smallest stack that satisfies the builder stage and deployment constraint.',
      ],
    },
    {
      source: guideSource(guideById, 'best-open-source-ai-tools-2026'),
      intent: 'find-open-source-ai-builder-tools',
      label: 'Find practical open source AI tools for builders',
      humanUrl: `${base}/guides/best-open-source-ai-tools-2026`,
      useWhen: 'A builder wants a curated tool shortlist instead of a broad repository directory.',
      exampleQueries: [
        'What are the best open source AI tools for building apps?',
        'Which tools should I consider for local AI, RAG, agents, or workflows?',
        'Which projects are practical enough to build on?',
      ],
      nextActions: [
        'Use the guide mirror for curated shortlists.',
        'Filter /api/search.json by stackLayers when a user asks for a specific layer.',
        'Recheck project license, release cadence, and pricing before operational recommendations.',
      ],
    },
    {
      source: guideSource(guideById, 'how-to-evaluate-open-source-ai-projects'),
      intent: 'evaluate-open-source-ai-project',
      label: 'Evaluate an open source AI project',
      humanUrl: `${base}/guides/how-to-evaluate-open-source-ai-projects`,
      useWhen: 'A human or AI agent needs a rubric for deciding whether to adopt, prototype, watch, or avoid an open source AI project.',
      exampleQueries: [
        'How do I decide whether an open source AI project is trustworthy?',
        'What rubric should I use before adopting an AI tool?',
        'How should I score maintenance, openness, governance, and eval coverage?',
      ],
      nextActions: [
        'Fetch the evaluation guide mirror and apply the rubric dimension by dimension.',
        'Separate source posture from model, hosting, and data dependencies.',
        'Flag unknown license, governance, security, or evaluation details as unresolved risk.',
      ],
    },
    {
      source: comparisonSource(comparisonById, 'codex-vs-claude-code-vs-gemini-cli'),
      intent: 'compare-ai-agent-tools',
      label: 'Compare AI agent tools and tradeoffs',
      humanUrl: `${base}/comparisons/codex-vs-claude-code-vs-gemini-cli`,
      useWhen: 'A reader or agent needs decision support across coding agents, closed assistants, and open alternatives.',
      exampleQueries: [
        'Should I use Codex CLI, Claude Code, or Gemini CLI?',
        'Which coding agent is most open source friendly?',
        'How do terminal coding agents compare for real development work?',
      ],
      nextActions: [
        'Fetch the comparison mirror before summarizing tradeoffs.',
        'Keep source posture distinct from capability and model quality.',
        'Offer open source alternatives when openness is a hard requirement.',
      ],
    },
  ];
  const entryPoints = entryPointConfigs.flatMap((entry) => (
    entry.source
      ? [buildEntryPoint(
        base,
        entry.source,
        entry.intent,
        entry.label,
        entry.humanUrl,
        entry.useWhen,
        entry.exampleQueries,
        entry.nextActions,
        relationEntries,
      )]
      : []
  ));

  const manifest = {
    name: 'letsopen.ai',
    version: 1,
    schemaVersion: agentSchemaVersion,
    description: 'Agent-first website manifest for letsopen.ai',
    baseUrl: base,
    discovery: {
      agentAccessGuide: `${base}/agents`,
      llms: `${base}/llms.txt`,
      llmsFull: `${base}/llms-full.txt`,
      contentIndex: `${base}/api/content-index.json`,
      searchIndex: `${base}/api/search.json`,
      rss: `${base}/rss.xml`,
      sitemap: `${base}/sitemap-index.xml`,
      agentSitemap: `${base}/sitemap-agents.xml`,
    },
    machineReadableContent: {
      articles: `${base}/agent/articles/{id}.txt`,
      guides: `${base}/agent/guides/{id}.txt`,
      comparisons: `${base}/agent/comparisons/{id}.txt`,
      topics: `${base}/agent/topics/{id}.txt`,
    },
    entryPointStatus: {
      expected: entryPointConfigs.length,
      available: entryPoints.length,
      missingIntents: entryPointConfigs
        .filter((entry) => !entry.source)
        .map((entry) => entry.intent),
    },
    entryPoints,
    counts: {
      articles: articles.length,
      guides: guides.length,
      comparisons: comparisons.length,
      hubs: hubs.length,
    },
    recommendations: {
      prefer: {
        topics: 'overview and taxonomy',
        guides: 'canonical explanations and evergreen advice',
        comparisons: 'decision support and tradeoffs',
        articles: 'timely analysis and thesis pieces',
      },
      formatPreference: 'Prefer .txt agent endpoints or JSON indexes before full HTML when token efficiency matters.',
      search: 'Fetch /api/search.json as a static search index, then filter client-side using title, description, tags, intentKeywords, builderStage, opennessSignals, and freshnessDate fields.',
    },
    fieldDefinitions: intentFieldDefinitions,
    retrievalProtocol,
    editorialUseGuidance,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
