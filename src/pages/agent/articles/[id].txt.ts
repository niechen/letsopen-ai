import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((article) => ({ params: { id: article.id }, props: { article } }));
}

export async function GET({ props }: { props: any }) {
  const { article } = props;
  const lines = [
    `# ${article.data.title}`,
    '',
    `Description: ${article.data.description}`,
    `Type: ${article.data.type}`,
    `Published: ${article.data.pubDate.toISOString()}`,
    `Hub: ${article.data.hub ?? ''}`,
    `Tags: ${(article.data.tags ?? []).join(', ')}`,
    '',
    article.body,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
