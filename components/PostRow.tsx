import Link from "next/link";
import type { Post } from "@/content/site";
import { formatDate, postHref } from "@/lib/posts";

/** One entry in the field-notes feed. An index card with a ruled top. */
export function PostRow({ post, index }: { post: Post; index: number }) {
  const link = postHref(post);
  const title = link ? (
    link.external ? (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="focus-marker no-underline hover:bg-marker">
        {post.title}
      </a>
    ) : (
      <Link href={link.href} className="focus-marker no-underline hover:bg-marker">
        {post.title}
      </Link>
    )
  ) : (
    post.title
  );
  return (
    <article className="grid gap-x-8 gap-y-2 border-t border-ink py-6 md:grid-cols-[9rem_minmax(0,1fr)]">
      <div className="mono text-[0.75rem] text-pencil md:pt-1.5">
        <p className="m-0">note {String(index + 1).padStart(2, "0")}</p>
        <time className="mt-1 block" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        {post.source ? <p className="m-0 mt-1 text-pencil-light">{post.source}</p> : null}
      </div>
      <div className="min-w-0">
        <h3 className="display-tight m-0 text-[1.5rem] md:text-[1.8rem]">{title}</h3>
        <p className="body-serif measure m-0 mt-3 text-[1rem] leading-[1.6] text-pencil md:text-[1.05rem]">{post.excerpt}</p>
      </div>
    </article>
  );
}
