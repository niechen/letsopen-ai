import { getContentIntents } from './content-intents';

type AgentTextInput = {
  kind: 'article' | 'guide' | 'comparison' | 'hub';
  id: string;
  title: string;
  description: string;
  baseUrl: string;
  tags?: string[];
  hub?: string | null;
  verdict?: string | null;
  body?: string | null;
};

const collectionByKind = {
  article: 'articles',
  guide: 'guides',
  comparison: 'comparisons',
  hub: 'topics',
};

const routeByKind = {
  article: 'articles',
  guide: 'guides',
  comparison: 'comparisons',
  hub: 'topics',
};

function formatList(items: string[]) {
  return items.length > 0 ? items.join(', ') : '';
}

export function getAgentTextMetadata(input: AgentTextInput) {
  const intents = getContentIntents({
    kind: input.kind,
    id: input.id,
    title: input.title,
    description: input.description,
    tags: input.tags,
    hub: input.hub,
    verdict: input.verdict,
    body: input.body,
  });

  const collection = collectionByKind[input.kind];
  const route = routeByKind[input.kind];

  return [
    `Canonical: ${input.baseUrl}/${route}/${input.id}`,
    `Machine: ${input.baseUrl}/agent/${collection}/${input.id}.txt`,
    `Audience: ${formatList(intents.audience)}`,
    `Builder stage: ${intents.builderStage}`,
    `Stack layers: ${formatList(intents.stackLayers)}`,
    `Use cases: ${formatList(intents.useCases)}`,
    `Openness signals: ${formatList(intents.opennessSignals)}`,
  ];
}
