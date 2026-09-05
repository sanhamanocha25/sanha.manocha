import Link from "next/link";
import { writing } from "@/content/site";
import { PostRow } from "@/components/PostRow";
import { sortedPosts } from "@/lib/posts";

/**
 * Field notes, kept on the sidelines until there is something to show.
 * With no posts it is a single ruled footnote; with posts, a short feed.
 */
export function FieldNotes() {
  const posts = sortedPosts();
  const latest = posts.slice(0, 3);

  return (
    <section id={writing.id} aria-labelledby="writing-heading" className="scroll-mt-14">
      <div className="mx-auto max-w-[84rem] px-[var(--gutter)]">
        <div className="rule-dashed" />
        {latest.length === 0 ? (
          <div className="mono flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5 text-[0.75rem] text-pencil">
            <span className="inline-flex items-center gap-1 text-ink">
              <span aria-hidden className="text-pencil-light">[</span>
              <span>{writing.code}</span>
              <span aria-hidden className="text-pencil-light">]</span>
            </span>
            <h2 id="writing-heading" className="italic-note m-0 text-[0.95rem] font-normal text-ink">
              {writing.heading}
            </h2>
            <span>{writing.note[0]}</span>
            <Link href="/notes" className="focus-marker border-b border-ink pb-0.5 text-ink no-underline hover:bg-marker">
              /notes
            </Link>
          </div>
        ) : (
          <div className="py-10">
            <div className="mono flex items-baseline gap-3 text-[0.8rem] text-pencil">
              <span className="inline-flex items-center gap-1 text-ink">
                <span aria-hidden className="text-pencil-light">[</span>
                <span>{writing.code}</span>
                <span aria-hidden className="text-pencil-light">]</span>
              </span>
              <span className="italic-note text-[0.95rem]">{writing.tag}</span>
            </div>
            <h2 id="writing-heading" className="display mt-3 text-[clamp(2rem,1.4rem+2.6vw,3.4rem)]">
              {writing.heading}
            </h2>
            <div className="mt-8">
              {latest.map((p, i) => (
                <PostRow key={p.slug} post={p} index={i} />
              ))}
            </div>
            <p className="mono mt-8 text-[0.8rem]">
              <Link href="/notes" className="focus-marker border-b border-ink pb-0.5 no-underline hover:bg-marker">
                all field notes ({posts.length})
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
