import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const comparisons = await getCollection('comparisons', ({ data }) => !data.draft);

  const allItems = [
    ...articles.map(a => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/articles/${a.id}/`,
    })),
    ...guides.map(g => ({
      title: g.data.title,
      description: g.data.description,
      pubDate: g.data.pubDate,
      link: `/guides/${g.id}/`,
    })),
    ...comparisons.map(c => ({
      title: c.data.title,
      description: c.data.description,
      pubDate: c.data.pubDate,
      link: `/comparisons/${c.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'letsopen.ai',
    description: 'The homepage for open source AI. High-signal coverage of the projects, tools, models, and agent systems that matter.',
    site: context.site!,
    items: allItems,
    customData: '<language>en-us</language>',
  });
}
