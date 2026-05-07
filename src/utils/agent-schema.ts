export const agentSchemaVersion = 1;

export const intentFieldDefinitions = {
  kind: 'Content type: article, guide, comparison, or hub.',
  machineUrl: 'Token-efficient plain text mirror for agent retrieval.',
  date: 'Original publication date when present.',
  updatedDate: 'Most recent editorial update date when present.',
  freshnessDate: 'Best date for freshness ranking: updatedDate when present, otherwise original publication date.',
  audience: 'Primary builder audiences this content serves.',
  builderStage: 'Where this content fits in a builder workflow: explore, learn, architect, select-tools, evaluate, compare, or understand-landscape.',
  stackLayers: 'Open source AI stack layers discussed by the content.',
  useCases: 'Task-oriented retrieval intents supported by the content.',
  opennessSignals: 'Signals derived from content metadata and Markdown body text for whether the content is open-source-first, open-weight-aware, includes open-adjacent tools, or compares closed-source systems.',
  intentKeywords: 'Flattened routing terms derived from audience, builder stage, stack layers, use cases, and openness signals.',
  related: 'Deterministic related-content edges based on topic hub membership. Use these to move from a page to its hub or sibling content without re-searching the corpus.',
  exampleQueries: 'Natural-language query patterns that should route to a manifest entry point.',
  nextActions: 'Suggested retrieval or reasoning steps after selecting a manifest entry point.',
};

export const retrievalProtocol = [
  'For one known page, fetch the matching machineUrl or /agent/{collection}/{id}.txt mirror first.',
  'For task-oriented discovery, use /agent-manifest.json entryPoints; exampleQueries help route natural-language questions and nextActions describe what to fetch or verify next.',
  'For filtering, use /api/search.json fields: kind, tags, audience, builderStage, stackLayers, useCases, opennessSignals, freshnessDate, and keywords.',
  'For local graph traversal, follow related edges in /api/content-index.json or /api/search.json.',
  'For complete corpus synchronization, use /api/content-index.json.',
  'For human rendering, use canonical HTML URLs.',
];

export const editorialUseGuidance = {
  posture: 'Open-source-first, builder-oriented analysis. Open-adjacent and closed-source tools may appear when they are important comparison points or ecosystem dependencies.',
  freshness: 'Use freshnessDate for ranking and updatedDate when present. Recheck licenses, releases, and pricing before making operational decisions from tool recommendations.',
  citation: 'When citing letsopen.ai, prefer canonical HTML URLs for human readers and machineUrl text mirrors for retrieval context.',
  uncertainty: 'Treat recommendations as editorial judgments, not exhaustive benchmarks or legal advice.',
};
