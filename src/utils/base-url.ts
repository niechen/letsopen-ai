import type { APIContext } from 'astro';

export function getBaseUrl(context: APIContext): string {
  return context.site?.href.replace(/\/$/, '') ?? 'https://letsopen.ai';
}
