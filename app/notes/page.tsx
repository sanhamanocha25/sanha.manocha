import type { Metadata } from "next";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { PostRow } from "@/components/PostRow";
import { writing } from "@/content/site";
import { sortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: writing.heading,
  description: writing.note[0],
};

export default function NotesPage() {
  const posts = sortedPosts();
  return (
    <>
      <Masthead />
      <main id="main" className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-24 pt-14 md:pt-24">
        <div className="mono flex items-baseline gap-3 text-[0.8rem] text-pencil">
          <span className="inline-flex items-center gap-1 text-ink">
            <span aria-hidden className="text-pencil-light">[</span>
            <span>{writing.code}</span>
            <span aria-hidden className="text-pencil-light">]</span>
          </span>
          <span className="italic-note text-[0.95rem]">{writing.tag}</span>
        </div>
        <h1 className="display mt-4 text-[clamp(2.6rem,1.6rem+5vw,6rem)]">{writing.heading}</h1>

        <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_15rem] md:mt-20">
          <div className="min-w-0 lg:order-1">
            {posts.length === 0 ? (
              <div className="body-serif measure-wide space-y-6 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.65]">
                {writing.note.map((p, i) => (
                  <p key={i}>
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <div className="border-b border-ink">
                {posts.map((p, i) => (
                  <PostRow key={p.slug} post={p} index={i} />
                ))}
              </div>
            )}
          </div>
          <aside className="mono text-[0.75rem] text-pencil lg:order-2 lg:sticky lg:top-20 lg:self-start">
            <p className="m-0">
              {posts.length === 0 ? "0 notes on file" : `${posts.length} note${posts.length === 1 ? "" : "s"} on file`}
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
