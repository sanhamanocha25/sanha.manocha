import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { findPost, formatDate, postsWithBody } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return postsWithBody().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post || !post.body?.length) notFound();

  return (
    <>
      <Masthead />
      <main id="main" className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-24 pt-14 md:pt-24">
        <p className="mono text-[0.8rem] text-pencil">
          <Link href="/notes" className="focus-marker border-b border-ink pb-0.5 text-ink no-underline hover:bg-marker">
            field notes
          </Link>
          <span aria-hidden> / </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.source ? <span> · {post.source}</span> : null}
        </p>
        <article className="mt-6 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            <h1 className="display text-[clamp(2.2rem,1.4rem+4vw,4.8rem)]">{post.title}</h1>
            <p className="italic-note measure-wide mt-6 text-[1.15rem] leading-[1.5] text-pencil">{post.excerpt}</p>
            <div className="body-serif measure-wide mt-12 space-y-6 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.7]">
              {post.body!.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>
            {post.href ? (
              <p className="mono mt-12 text-[0.8rem]">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-marker border-b border-ink pb-0.5 no-underline hover:bg-marker"
                >
                  read on {post.source ?? "the original"}
                </a>
              </p>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
