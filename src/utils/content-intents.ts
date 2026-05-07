type ContentIntentInput = {
  kind: 'article' | 'guide' | 'comparison' | 'hub';
  id: string;
  title: string;
  description: string;
  tags?: string[];
  hub?: string | null;
  verdict?: string | null;
  body?: string | null;
};

const layerRules = [
  { layer: 'agents', terms: ['agent', 'agents', 'assistant', 'assistants', 'openclaw'] },
  { layer: 'coding-agents', terms: ['coding agent', 'coding agents', 'codex', 'claude code', 'gemini cli', 'aider', 'openhands'] },
  { layer: 'models', terms: ['model', 'models', 'llama', 'qwen', 'mistral', 'deepseek', 'gemma'] },
  { layer: 'inference', terms: ['inference', 'ollama', 'llama.cpp', 'mlx', 'vllm', 'tgi', 'sglang'] },
  { layer: 'retrieval', terms: ['retrieval', 'vector', 'rag', 'qdrant', 'chroma', 'pgvector', 'weaviate'] },
  { layer: 'orchestration', terms: ['orchestration', 'workflow', 'workflows', 'langgraph', 'crewai', 'autogen', 'multi-agent'] },
  { layer: 'local-runtime', terms: ['local', 'self-hosted', 'offline', 'privacy', 'hardware'] },
  { layer: 'evaluation', terms: ['evaluate', 'evaluation', 'monitoring', 'observability', 'promptfoo', 'phoenix'] },
  { layer: 'infrastructure', terms: ['infrastructure', 'deployment', 'serving', 'training', 'fine-tuning'] },
  { layer: 'interfaces', terms: ['interface', 'interfaces', 'ide', 'cli', 'chat', 'webui'] },
];

const useCaseRules = [
  { useCase: 'build-agent-systems', terms: ['agent', 'agents', 'multi-agent', 'openclaw'] },
  { useCase: 'choose-open-source-ai-stack', terms: ['stack', 'infrastructure', 'models', 'inference', 'retrieval'] },
  { useCase: 'prototype-open-source-agent-app', terms: ['blueprint', 'minimum viable', 'mvp', 'first version', 'acceptance checks'] },
  { useCase: 'select-builder-tools', terms: ['tools', 'tool', 'best open source ai tools'] },
  { useCase: 'compare-ai-development-tools', terms: ['comparison', 'compare', 'vs', 'codex', 'claude code', 'gemini cli'] },
  { useCase: 'run-ai-locally', terms: ['local', 'offline', 'ollama', 'llama.cpp', 'mlx', 'apple silicon'] },
  { useCase: 'evaluate-open-source-projects', terms: ['evaluate', 'evaluation', 'maintained', 'documentation', 'community'] },
  { useCase: 'understand-open-ai-strategy', terms: ['open source', 'sovereignty', 'transparency', 'trust', 'closed'] },
  { useCase: 'design-agent-workflows', terms: ['workflow', 'workflows', 'orchestration', 'pipeline', 'swarm'] },
];

const opennessRules = [
  { signal: 'open-source-first', terms: ['open source', 'self-hosted', 'inspectable', 'modifiable', 'source code'] },
  { signal: 'open-weight-aware', terms: ['open-weight', 'open weights', 'open-model', 'open model', 'model weights'] },
  { signal: 'open-adjacent-included', terms: ['open-adjacent', 'claude code', 'codex cli', 'cursor', 'closed assistant'] },
  { signal: 'closed-source-comparison', terms: ['closed source', 'closed-source', 'closed ai', 'closed assistant', 'closed assistants'] },
];

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function getBuilderStage(input: ContentIntentInput, metadataText: string, fullText: string) {
  if (input.kind === 'hub') return 'explore';
  if (input.kind === 'comparison') return 'compare';
  if (hasAny(input.id, ['evaluate', 'evaluation']) || hasAny(input.title.toLowerCase(), ['evaluate', 'evaluation', 'selection criteria'])) return 'evaluate';
  if (hasAny(metadataText, ['blueprint', 'stack', 'architecture', 'infrastructure', 'orchestration'])) return 'architect';
  if (hasAny(metadataText, ['tools', 'tool list', 'best open source ai tools'])) return 'select-tools';
  if (hasAny(metadataText, ['compare', ' vs ', 'tradeoff', 'tradeoffs'])) return 'compare';
  if (hasAny(fullText, ['evaluate', 'evaluation', 'selection criteria', 'worth using'])) return 'evaluate';
  if (input.kind === 'guide') return 'learn';
  return 'understand-landscape';
}

function getAudience(text: string, kind: ContentIntentInput['kind']) {
  const audience = ['ai-app-builders'];

  if (hasAny(text, ['agent', 'agents', 'openclaw', 'coding agent'])) audience.push('agent-builders');
  if (hasAny(text, ['local', 'self-hosted', 'privacy', 'sovereignty'])) audience.push('self-hosters');
  if (hasAny(text, ['infrastructure', 'deployment', 'serving', 'inference', 'vector', 'retrieval'])) audience.push('platform-engineers');
  if (hasAny(text, ['model', 'models', 'fine-tuning', 'training'])) audience.push('model-builders');
  if (kind === 'comparison' || hasAny(text, ['tradeoff', 'compare', 'verdict'])) audience.push('tool-evaluators');

  return unique(audience);
}

export function getContentIntents(input: ContentIntentInput) {
  const metadataText = [
    input.id,
    input.title,
    input.description,
    input.hub ?? '',
    input.verdict ?? '',
    ...(input.tags ?? []),
  ]
    .join(' ')
    .toLowerCase();

  const text = [metadataText, input.body ?? ''].join(' ').toLowerCase();

  const stackLayers = unique(layerRules
    .filter((rule) => hasAny(text, rule.terms))
    .map((rule) => rule.layer));

  const useCases = unique(useCaseRules
    .filter((rule) => hasAny(text, rule.terms))
    .map((rule) => rule.useCase));

  const audience = getAudience(text, input.kind);
  const builderStage = getBuilderStage(input, metadataText, text);
  const opennessSignals = unique([
    ...opennessRules
      .filter((rule) => hasAny(text, rule.terms))
      .map((rule) => rule.signal),
    'open-source-first',
  ]);

  return {
    audience,
    builderStage,
    stackLayers,
    useCases,
    opennessSignals,
    intentKeywords: unique([
      builderStage,
      ...audience,
      ...stackLayers,
      ...useCases,
      ...opennessSignals,
    ]),
  };
}
