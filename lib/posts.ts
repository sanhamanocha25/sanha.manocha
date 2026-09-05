import { writing, type Post } from "@/content/site";

export function sortedPosts(): Post[] {
  return [...writing.posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function postsWithBody(): Post[] {
  return sortedPosts().filter((p) => Array.isArray(p.body) && p.body.length > 0);
}

export function findPost(slug: string): Post | undefined {
  return writing.posts.find((p) => p.slug === slug);
}

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : fmt.format(d);
}

/** Where a post should link: its own page if it has a body, else the external source. */
export function postHref(p: Post): { href: string; external: boolean } | null {
  if (p.body && p.body.length) return { href: `/notes/${p.slug}`, external: false };
  if (p.href) return { href: p.href, external: true };
  return null;
}
