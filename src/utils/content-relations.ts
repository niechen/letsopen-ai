import { compareFreshnessDesc } from './freshness';

export type RelationEntry = {
  id: string;
  kind: 'article' | 'guide' | 'comparison' | 'hub';
  collection: 'articles' | 'guides' | 'comparisons' | 'topics';
  title: string;
  description: string;
  hub?: string | null;
  tags?: string[];
  pubDate?: Date;
  updatedDate?: Date | null;
};

type RelationCollections = {
  articles: any[];
  guides: any[];
  comparisons: any[];
  hubs: any[];
};

const routeByCollection = {
  articles: 'articles',
  guides: 'guides',
  comparisons: 'comparisons',
  topics: 'topics',
};

function compareEntries(a: RelationEntry, b: RelationEntry) {
  if (!a.pubDate && !b.pubDate) return a.title.localeCompare(b.title);
  if (!a.pubDate) return 1;
  if (!b.pubDate) return -1;
  return compareFreshnessDesc(
    { data: { pubDate: a.pubDate, updatedDate: a.updatedDate ?? undefined } },
    { data: { pubDate: b.pubDate, updatedDate: b.updatedDate ?? undefined } },
  );
}

function relationPayload(base: string, entry: RelationEntry, relation: string) {
  const route = routeByCollection[entry.collection];

  return {
    relation,
    kind: entry.kind,
    id: entry.id,
    title: entry.title,
    url: `${base}/${route}/${entry.id}`,
    machineUrl: `${base}/agent/${entry.collection}/${entry.id}.txt`,
  };
}

export function getRelatedContent(base: string, entry: RelationEntry, allEntries: RelationEntry[], limit = 5) {
  const related = [];
  const seen = new Set<string>();

  const add = (candidate: RelationEntry | undefined, relation: string) => {
    if (!candidate || candidate.id === entry.id || seen.has(`${candidate.kind}:${candidate.id}`)) return;
    seen.add(`${candidate.kind}:${candidate.id}`);
    related.push(relationPayload(base, candidate, relation));
  };

  if (entry.kind !== 'hub' && entry.hub) {
    add(allEntries.find((candidate) => candidate.kind === 'hub' && candidate.id === entry.hub), 'topic-hub');
  }

  const siblingHub = entry.kind === 'hub' ? entry.id : entry.hub;
  if (siblingHub) {
    allEntries
      .filter((candidate) => candidate.id !== entry.id && candidate.kind !== 'hub' && candidate.hub === siblingHub)
      .sort(compareEntries)
      .forEach((candidate) => add(candidate, entry.kind === 'hub' ? 'hub-content' : 'same-topic'));
  }

  return related.slice(0, limit);
}

export function buildRelationEntries({ articles, guides, comparisons, hubs }: RelationCollections): RelationEntry[] {
  return [
    ...articles.map((article) => ({
      collection: 'articles' as const,
      kind: 'article' as const,
      id: article.id,
      title: article.data.title,
      description: article.data.description,
      hub: article.data.hub,
      tags: article.data.tags,
      pubDate: article.data.pubDate,
      updatedDate: article.data.updatedDate,
    })),
    ...guides.map((guide) => ({
      collection: 'guides' as const,
      kind: 'guide' as const,
      id: guide.id,
      title: guide.data.title,
      description: guide.data.description,
      hub: guide.data.hub,
      tags: guide.data.tags,
      pubDate: guide.data.pubDate,
      updatedDate: guide.data.updatedDate,
    })),
    ...comparisons.map((comparison) => ({
      collection: 'comparisons' as const,
      kind: 'comparison' as const,
      id: comparison.id,
      title: comparison.data.title,
      description: comparison.data.description,
      hub: comparison.data.hub,
      tags: comparison.data.tags,
      pubDate: comparison.data.pubDate,
      updatedDate: comparison.data.updatedDate,
    })),
    ...hubs.map((hub) => ({
      collection: 'topics' as const,
      kind: 'hub' as const,
      id: hub.id,
      title: hub.data.title,
      description: hub.data.description,
    })),
  ];
}

export function findRelationEntry(entries: RelationEntry[], kind: RelationEntry['kind'], id: string) {
  return entries.find((entry) => entry.kind === kind && entry.id === id);
}

export function getRelatedContentLines(base: string, entry: RelationEntry | undefined, allEntries: RelationEntry[], limit = 5) {
  if (!entry) return [];

  const related = getRelatedContent(base, entry, allEntries, limit);
  if (related.length === 0) return [];

  return [
    '',
    'Related:',
    ...related.map((item) => `- ${item.relation}: ${item.title} — ${item.url} (agent: ${item.machineUrl})`),
  ];
}
